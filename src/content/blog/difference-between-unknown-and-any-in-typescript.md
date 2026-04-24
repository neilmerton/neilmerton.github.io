---
title: "Differences between unknown and any in TypeScript"
description: "A brief explanation of the differences between unknown and any types in TypeScript."
pubDate: "2026-04-24"
tags: ["typescript", "programming", "learning", "web development"]
---

In TypeScript, both `any` and `unknown` are "top types"; meaning they can hold any value but they handle type safety in very different ways.

Think of `any` as the **"I don't care"** type and `unknown` as the **"I don't know yet"** type.

## The Key Differences

| Feature | `any` | `unknown` |
| :--- | :--- | :--- |
| **Assignability** | Can assign anything to it. | Can assign anything to it. |
| **Usage** | Can access any property or method on it. | Can't do anything with it until you verify its type. |
| **Type Safety** | Disables type checking; essentially "turns off" TypeScript. | Maintains type safety by forcing you to perform "narrowing." |
| **Interaction** | Can be assigned to any other type (except `never`). | Can only be assigned to `any` or `unknown`. |

## 1. The `any` Type: The Escape Hatch
When you use `any`, you are telling the compiler to look the other way. It is a legacy feature that provides total flexibility but carries the risk of runtime errors.

```typescript
let value: any = 10;

// All of these are allowed by the compiler, even though they might crash:
value.toUpperCase(); // No error at compile-time, but crashes at runtime
value.trim();        
new value();        
```

## 2. The `unknown` Type: The Safe Alternative
`unknown` was introduced in TypeScript 3.0 as a safer alternative to `any`. While it allows you to store any value, the compiler won't let you use that value until you prove what it is through **type narrowing**.

```typescript
let value: unknown = "Hello World";

// value.toUpperCase(); // Error: 'value' is of type 'unknown'

// You must check the type first:
if (typeof value === "string") {
    console.log(value.toUpperCase()); // Now this works!
}
```

## When to use which?

### Use `unknown` when:
* You're dealing with values from an external source (like a dynamic API response or user input) where you don't initially know the structure.
* You want to write a generic function that can accept any input but want to ensure the consumer handles the type correctly.

### Use `any` when:
* You're migrating a large JavaScript codebase to TypeScript and don't have time to type everything yet.
* You're dealing with extremely complex third-party libraries where the types are broken or impossible to define easily.
* **Pro tip:** Try to avoid `any` whenever possible; it defeats the purpose of using TypeScript.

> **Note:** If you find yourself reaching for `any` because you're frustrated with errors, try using `unknown` first. It forces you to write safer code by checking types before using them, which prevents "undefined is not a function" errors in production.
