---
title: "Next.js PWA Manifest Gotcha"
description: "How to fix using Next.js PWA with protected routes."
pubDate: "2026-04-10"
tags: ["next.js", "web development", "pwa"]
---

As part of my learning Next.js I've created a fairly simple web app that has protected routes and uses `manifest.ts` for App Router to generate a dynamic manifest file.

The gotcha I came across is because there are protected routes for the web app (a user my login to access main functionality) the browser was unable to load the manifest file, instead I was getting the following error in the browser console:

```
Manifest: Line: 1, column: 1, Syntax error.
```

What happens is the browser requests the manifest before any auth context exists, even for already-installed PWAs, which means a change is needed to ensure it is publicly accessible.

The fix is to ensure the `manifest.webmanifest` path is excluded from the auth middleware matcher, so browsers and PWA installers can fetch it without needing a session.

I had to update my `proxy.ts` file to include `manifest\\.webmanifest|` in the `matcher`:

``` ts
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

Hopefully this will help others (and myself) in the future. It's a pity the [official guide](https://nextjs.org/docs/app/guides/progressive-web-apps) doesn't mention this anywhere.