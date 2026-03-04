---
title: "null vs undefined in JavaScript"
description: "A deep dive into the differences between null and undefined in JavaScript."
pubDate: "2026-03-04"
tags: ["javascript", "programming", "typescript", "web development", "learning"]
mainClass: "javascript-review"
draft: false
---

This one of those classic "wait, why are there two?" moments in JavaScript, and to be honest it wasn't immediately clear to me either. At first glance, they both seem to mean "nothing," but they represent different *kinds* of nothing.

Think of it like a **box**:

* **`undefined`**: The box hasn't even been labeled or set up yet.
* **`null`**: The box is there, but you’ve intentionally decided it should be empty.

## 1. `undefined`: "I don't know this yet"

`undefined` is JavaScript’s default way of saying a value is missing. It usually happens automatically.

* **Variable declaration:** If you declare a variable but don’t assign it a value.
* **Missing function arguments:** If a function expects three arguments but you only send two.
* **Non-existent properties:** Trying to access a key in an object that isn't there.

```typescript
let user; 
console.log(user); // undefined
```

## 2. `null`: "I know this is empty"

`null` is an **assignment value**. It never happens by accident; a developer must explicitly write `null` to indicate that a variable should have no value.

* **Intentional absence:** Clearing out a user's profile picture.
* **Resetting:** Setting a "currentTask" variable to `null` once the work is finished.

```typescript
let user = null; 
console.log(user); // null
```
## Key Technical Differences

| Feature | `undefined` | `null` |
| --- | --- | --- |
| **Type** | `undefined` | `object` (This is a famous JS bug!) |
| **Meaning** | Value is not initialized/missing. | Value is explicitly empty. |
| **JSON** | Keys with `undefined` are often omitted. | `null` is preserved as a value. |
| **Arithmetic** | Converts to `NaN`. | Converts to `0`. |

### The Equality Check

When comparing them, you’ll get different results depending on how "strict" you are:

* **Loose Equality (`==`):** Returns `true`. JavaScript treats them as "loosely" the same because they are both falsy.
* **Strict Equality (`===`):** Returns `false`. They are different types, so they are not strictly equal.

## TypeScript Nuance

In TypeScript, if you have `strictNullChecks` enabled (which you usually should), you cannot assign `null` or `undefined` to a variable unless you explicitly allow it using a **Union Type**.

```typescript
let name: string | null = "Gemini";
name = null; // This is fine
name = undefined; // Error! 'undefined' is not assignable to 'string | null'
```

**Pro-tip:** Modern JS/TS developers often prefer `undefined` for almost everything to stay consistent with the language's defaults, using `null` only when interacting with APIs or databases where "null" has a specific meaning.

## Handling Both Gracefully

Since both `null` and `undefined` can break your code if you try to access properties on them (the dreaded "Cannot read property of null" error), JavaScript introduced two elegant operators to handle them: **Optional Chaining** and **Nullish Coalescing**.

### Optional Chaining (`?.`)

This operator allows you to read the value of a property located deep within a chain of connected objects without having to manually check if each reference in the chain is valid.

If the value before the `?.` is `null` or `undefined`, the expression **short-circuits** and returns `undefined` instead of throwing an error.

```typescript
const user = {
  profile: {
    // name is missing here
  }
};

// ❌ The old way:
const name = user && user.profile && user.profile.name;

// ✅ The Optional Chaining way:
const name = user?.profile?.name; 
// result: undefined (No crash!)
```

### Nullish Coalescing (`??`)

This is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`.

#### Why not just use OR (`||`)?

The `||` operator returns the right side for **any** "falsy" value (like `0`, `""`, or `false`). Often, you want to keep `0` or an empty string as a valid value and only provide a fallback if the data is truly missing.

| Scenario | Input | `input \|\| "Default"` | `input ?? "Default"` |
| :--- | :--- | :--- | :--- |
| **Missing** | `undefined` | `"Default"` | `"Default"` |
| **Explicitly Empty** | `null` | `"Default"` | `"Default"` |
| **Number Zero** | `0` | `"Default"` | `0` |
| **Empty String** | `""` | `"Default"` | `""` |

## Combining Both

In real-world TypeScript, you’ll often see these used together to safely access a value and provide a backup if it’s not there.

```typescript
interface User {
  settings?: {
    theme?: string;
  };
}

const user: User = {};

// Safely drill down, and if anything is missing, use "dark"
const activeTheme = user?.settings?.theme ?? "dark";

console.log(activeTheme); // "dark"
```

### Quick Summary

* **`?.`** says: "Keep going if this exists, otherwise stop and return `undefined`."
* **`??`** says: "If the left side is 'null-ish' (`null` or `undefined`), use the right side."

These operators are game-changers for writing clean, safe code without a lot of boilerplate checks. They help you handle the quirks of `null` and `undefined` gracefully, making your code more robust and easier to read.