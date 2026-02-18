---
title: "Semantic HTML is not optional"
description: "A screen reader user, a search engine crawler, and a developer reading your code all benefit from the same thing: semantic markup."
pubDate: "2024-09-03"
tags: ["html", "accessibility", "opinion"]
---

When I review code, the issue I raise most often isn't about TypeScript, or performance, or architecture. It's about HTML. Specifically: using `<div>` and `<span>` for everything.

It's not just an accessibility problem — though it is that. It's a signal about how we think about the web.

## What semantics actually means

Semantic HTML means using elements for their intended purpose. `<nav>` for navigation. `<article>` for self-contained content. `<time>` for dates. `<button>` for actions. `<a>` for links.

These aren't style choices. They carry meaning that browsers, assistive technologies, search engines, and developers all use.

## The assistive technology case

A screen reader user navigating your site isn't reading word-by-word from top to bottom. They're jumping between landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`), scanning headings (`<h1>` through `<h6>`), and tabbing through interactive elements.

A `<div>` with a click handler is invisible to this navigation. A `<button>` is not.

```html
<!-- This doesn't work for keyboard users or screen readers -->
<div class="btn" onclick="handleSubmit()">Submit</div>

<!-- This does -->
<button type="submit">Submit</button>
```

The `<button>` is focusable, activatable with Enter or Space, announced correctly, and styleable to look however you want. You lose nothing.

## The developer experience case

Reading someone else's HTML is much easier when the elements mean what they look like. A codebase full of nested `<div>`s has no information density. A codebase with `<article>`, `<section>`, `<aside>`, `<figure>`, `<dl>` tells you something about what's on the page before you've read any class names or comments.

## Starting points

A few simple habits that make a big difference:

- Use `<button>` for anything that does something on the current page
- Use `<a>` for anything that navigates to a URL
- Wrap your main navigation in `<nav>`
- Put your page's primary content inside `<main>` (only one per page)
- Use heading levels sequentially — don't skip from `<h1>` to `<h4>`
- Use `<ul>` or `<ol>` for actual lists, not just groups of styled elements

None of this takes extra time once it's habitual. And the compounding effect across a codebase is significant.
