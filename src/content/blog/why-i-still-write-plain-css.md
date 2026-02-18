---
title: "Why I still write plain CSS"
description: "Utility frameworks are great. But there's a lot of value in understanding the underlying cascade — and CSS has never been more powerful."
pubDate: "2024-11-12"
tags: ["css", "opinion"]
---

Utility-first CSS frameworks have become the default for a lot of frontend teams, and I understand why. The developer experience is excellent, the constraint of a design system is baked in, and you rarely have to leave your markup to style a component.

But I still reach for plain CSS on most of my personal projects, and increasingly I'm using it on professional ones too. Here's why.

## The cascade is a feature

One of the biggest complaints about CSS — that styles "leak" — is also one of its biggest strengths. The cascade lets you express relationships between elements that are genuinely hard to capture in a component model. A parent's state changing how children look, a `data-theme` attribute on `body` propagating down through an entire tree — these things are elegant in CSS.

```css
[data-theme="dark"] .card {
  --card-bg: hsl(220 13% 18%);
  --card-border: hsl(220 13% 26%);
}
```

That's one rule. No component-level logic, no prop drilling, no conditional class lists.

## CSS custom properties are incredibly powerful

The recent improvements to CSS — `@layer`, container queries, `color-mix()`, `@property`, logical properties — make the language dramatically more capable than it was five years ago. Custom properties in particular let you build a design token system that actually lives in CSS, not in a config file.

## The cost of abstractions

Every abstraction has a cost. Utility frameworks bundle their own mental model, and debugging often means understanding how the framework handles specificity, breakpoints, and variants — not just CSS itself.

When something looks wrong, I want to be able to open DevTools and immediately understand what's happening. With plain CSS, there's no translation layer.

## When I'd choose a framework

None of this is to say utility frameworks are bad. If I'm on a large team with multiple designers and engineers, or building a product where design consistency needs to be enforced systematically, a framework like Tailwind is often the right tool.

But for a personal site? For a small team with a shared taste for craft? I'll take the cascade.
