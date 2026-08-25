---
title: "Switching from Mac to Windows + WSL: A Survival Guide After 8 Years on macOS"
description: "My field guide to surviving the jump from Mac to Windows and WSL, without losing a week to filesystem gotchas."
pubDate: "2026-08-25"
tags: ["docker", "learning", "mac", "windows", "wsl", "vscode", "web development"]
---

After eight years of `brew install`, Terminal.app, and never thinking twice about file paths, I recently had to move my day-to-day development work onto Windows with WSL (Windows Subsystem for Linux). It was not the horror show I expected, but it also wasn't a drop-in replacement. Here's what I wish someone had told me before I started.

## The Core Concept You Need to Internalize First

WSL2 isn't a compatibility layer bolted onto Windows — it's a real, lightweight Linux virtual machine running inside Windows, with its own kernel and its own filesystem. That single fact explains almost every gotcha you'll run into.

The practical consequence: **you now have two filesystems that are not the same thing.**

- Your Windows drives are visible from Linux at `/mnt/c/`, `/mnt/d/`, etc.
- Your WSL Linux filesystem is visible from Windows at `\\wsl$\Ubuntu\home\yourname\` (or similar).

Crossing between the two is slow — sometimes dramatically so. Reading/writing thousands of small files (which is exactly what `node_modules`, git operations, and build tools do) across the `/mnt/c` boundary can be 5-10x slower than doing it natively.

**The rule that fixes 90% of performance complaints:** keep your code inside the Linux filesystem (`~/projects/`, not `/mnt/c/Users/you/projects/`), and do your work from a WSL terminal, not PowerShell or cmd.exe.

## Other Mental Model Shifts

A few things that felt automatic on Mac now need conscious thought:

- **Case sensitivity.** Linux (and therefore WSL's ext4 filesystem) is case-sensitive; Windows' NTFS is not. macOS's default filesystem is technically case-insensitive too, but because it's still Unix-like underneath, most of the sharp edges you'll hit are new. A repo with `Button.tsx` and `button.tsx` can genuinely cause chaos.
- **Line endings.** Windows tools love CRLF, git and Linux tools expect LF. If you ever touch a file from both a native Windows editor and a Linux tool, set `git config --global core.autocrlf input` and consider a `.gitattributes` file to pin line endings per project — don't leave it to chance.
- **Symlinks** work differently and can require enabling developer mode or elevated permissions on the Windows side, depending on your setup.
- **Environment variables and PATH** are now split — Windows has its own PATH, WSL has its own, and by default WSL appends the Windows PATH onto the Linux one, which can cause version conflicts (e.g. a Windows-installed `node` shadowing your WSL one). Trim `appendWindowsPath` in `/etc/wsl.conf` if this trips you up.

## Setting Up VS Code Properly

This is the part that makes or breaks the experience, and it's also the part most people configure wrong on day one.

**Install the WSL extension, and let VS Code run inside WSL — not just look at WSL files.**

The key distinction: you don't want the Windows copy of VS Code editing files across the network boundary at `\\wsl$\...`. You want to open VS Code *from inside* your WSL terminal:

```bash
cd ~/projects/my-app
code .
```

This launches the Windows VS Code UI but connects a VS Code Server process running natively inside the Linux VM. Your editor, your terminal, your extensions, your language servers — all running on Linux, at Linux speed, with zero cross-filesystem overhead. You'll know it worked when you see a green "WSL: Ubuntu" indicator in the bottom-left corner.

A few setup habits worth adopting immediately:

- **Extensions install twice.** Some extensions need to be installed "in WSL" separately from your Windows-side extensions (this happens automatically the first time you connect, but expect a wait and a re-install if you had things pre-installed on Windows only).
- **Set your integrated terminal default to WSL** so every new terminal panel opens where your code actually lives, rather than defaulting to PowerShell.
- **Use the Remote Explorer** to keep track of which WSL distro/folder you're connected to — it's easy to accidentally open a project from `/mnt/c` out of muscle memory.
- **Git integration just works** once VS Code is running in WSL context — no special config needed, as long as git is installed inside the WSL distro itself (not relying on the Windows git.exe).

## Docker Desktop: The One Extra Piece Mac Didn't Require

On Mac, Docker Desktop runs its own lightweight VM and you don't think about it much. On Windows, Docker Desktop needs to be told to use the **WSL2 backend** (not Hyper-V) so it can share the same Linux kernel your dev environment is using. This matters for two reasons:

1. **Performance.** With the WSL2 backend, bind-mounting a project directory into a container is fast *if the project lives inside the Linux filesystem*. Mount a `/mnt/c` project into a container and you'll feel the same cross-boundary slowness described above, just inside Docker too.
2. **Integration.** In Docker Desktop settings, under Resources → WSL Integration, you need to explicitly enable integration with your specific distro (e.g. Ubuntu). Skip this step and `docker` commands inside your WSL terminal simply won't be found, even though Docker Desktop is "running."

Practical setup checklist:

- Install Docker Desktop on Windows (not inside WSL directly — there's no need to install a separate Docker Engine inside the distro).
- Settings → General → confirm "Use the WSL 2 based engine" is checked.
- Settings → Resources → WSL Integration → toggle on your distro.
- Keep your `docker-compose.yml` and any bind-mount paths referencing your Linux home directory, not `/mnt/c/...`.
- Allocate memory limits deliberately — WSL2 by default can consume a large chunk of your system RAM under load (see the `vmmem` pitfall below), and Docker workloads make this worse if unbounded.

## GitHub Commit Signing: Slightly More Moving Parts

Signed commits are more fiddly to set up here than they were on Mac, mostly because your git identity now potentially spans two separate credential stores (Windows and WSL) and you need to decide where signing actually happens.

Two viable approaches:

**Option 1 — GPG signing, key lives inside WSL.**
Generate or import your GPG key inside the WSL distro itself, and configure git (also inside WSL) normally:

```bash
git config --global user.signingkey <YOUR_KEY_ID>
git config --global commit.gpgsign true
```

This is the simplest mental model — everything, including the key, lives in one place. The catch is you'll need `pinentry` configured correctly for passphrase prompts to actually show up in a WSL terminal (`pinentry-curses` is a reasonable default if you don't want a GUI prompt).

**Option 2 — SSH signing (newer, and arguably simpler).**
GitHub now supports signing commits with your existing SSH key instead of GPG:

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

If you're already using an SSH key for authentication, this avoids maintaining a separate GPG identity entirely, and if you use Windows' `ssh-agent` or a tool like 1Password's SSH agent, it can be forwarded into WSL so the same key/agent works on both sides without duplicating secrets.

Whichever route you pick, **don't split it** — decide whether git identity and signing live on the Windows side or the WSL side, and be consistent so you don't end up with commits signed with one identity from PowerShell and a different one from your WSL terminal.

## Common Pitfalls Worth Knowing About in Advance

- **`vmmem` eating your RAM.** WSL2's VM doesn't always release memory back to Windows promptly. If your machine feels sluggish after hours of coding, a `.wslconfig` file in your Windows user folder can cap memory and CPU usage for the VM.
- **Localhost networking quirks.** Generally `localhost` from Windows now correctly reaches services running in WSL2 (this improved a lot in recent versions), but older tools, firewalls, or VPN software can still interfere — worth knowing this is a plausible cause if a local dev server "isn't responding."
- **Antivirus scanning your Linux filesystem.** Windows Defender (or corporate antivirus) sometimes scans the WSL virtual disk file or watches file changes inside it, which tanks performance. Excluding your WSL distro's virtual disk and your project directories from real-time scanning can make a noticeable difference.
- **Clock drift after sleep.** WSL2's clock can occasionally drift out of sync with the host after your laptop sleeps/resumes, which shows up as confusing TLS/certificate errors. Running `wsl.exe --shutdown` and reopening your terminal is the quick fix.
- **Line-ending surprises in git diffs.** If a teammate on native Windows and you on WSL both touch the same repo, watch for entire files showing as changed due to line-ending mismatches — this is almost always a missing or inconsistent `.gitattributes`.
- **Two Node/Python/whatever installs.** It's very easy to end up with a Windows-installed toolchain and a WSL-installed toolchain both on your PATH, silently fighting each other. Keep your actual development toolchain installed *inside* WSL, and treat the Windows side as mostly hands-off.

## The Short Version

If you only take away three things: do your work inside the Linux filesystem, launch VS Code from a WSL terminal so it runs server-side in Linux, and make sure Docker Desktop's WSL integration is explicitly turned on for your distro. Everything else — commit signing, line endings, memory limits — is a one-time setup cost, not an ongoing tax. Once it's configured, the day-to-day experience is closer to your old Mac workflow than you'd expect.