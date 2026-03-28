---
title: "JavaScript Array Manipulation Cheat Sheet (ES2024+)"
description: "My overview of the more common JavaScript array methods, including use-cases and examples."
pubDate: "2026-03-28"
tags: ["javascript", "programming", "learning", "web development"]
---

I've compiled a useful list of the various array methods in JavaScript, mainly for my personal reference.

**Version Note:** 
* **ES2023** introduced Immutable Array Methods (`toSorted`, `with`, etc.).
* **ES2024** introduced Grouping Methods (`Object.groupBy`, `Map.groupBy`).
* This cheat sheet covers the **latest finalized standards**.

**Key Legend:**
* ✅ **Non-Mutating:** Returns a new array/object (Safe for React/Redux).
* ❌ **Mutating:** Changes the original array (Use with caution).

## 1. Grouping & Aggregation (ES2024)
**Why use these?** Before ES2024, grouping required verbose `reduce()` logic. These **static methods** simplify categorizing data.

| Method | Returns | Use-Case | Example |
| :--- | :--- | :--- | :--- |
| **`Object.groupBy()`** | Object | Group items by key (string keys). | `Object.groupBy(arr, cb)` |
| **`Map.groupBy()`** | Map | Group items by key (any type key). | `Map.groupBy(arr, cb)` |

### Deep Dive: `Object.groupBy()`
**Use-Case:** You have a flat list of items and need to organise them into categories. Note that this is called on `Object`, passing the array as the first argument.

```javascript
const inventory = [
  { name: 'Apple', type: 'Fruit' },
  { name: 'Carrot', type: 'Vegetable' },
  { name: 'Banana', type: 'Fruit' },
  { name: 'Broccoli', type: 'Vegetable' }
];

// Group by the 'type' property
const grouped = Object.groupBy(inventory, item => item.type);

console.log(grouped);
/*
{
  Fruit: [
    { name: 'Apple', type: 'Fruit' },
    { name: 'Banana', type: 'Fruit' }
  ],
  Vegetable: [
    { name: 'Carrot', type: 'Vegetable' },
    { name: 'Broccoli', type: 'Vegetable' }
  ]
}
*/
```

### Deep Dive: `Map.groupBy()`
**Use-Case:** Same as `Object.groupBy`, but returns a `Map`. Use this if your **keys are not strings** (e.g., Numbers, Objects, Dates).

```javascript
const logs = [
  { id: 101, status: 200 },
  { id: 102, status: 404 },
  { id: 103, status: 200 }
];

// Group by status code (Number key)
const groupedMap = Map.groupBy(logs, log => log.status);

console.log(groupedMap.get(200)); 
// [{ id: 101, status: 200 }, { id: 103, status: 200 }]
```

## 2. Modern Immutable Methods (ES2023)
**Why use these?** They replace classic mutating methods (`sort`, `reverse`, `splice`) with safe alternatives that **return a new array**, leaving the original untouched. These are instance methods.

| Method | Replaces | Use-Case | Example |
| :--- | :--- | :--- | :--- |
| **`toSorted()`** | `sort()` | Sort without mutating original. | `arr.toSorted((a,b)=>a-b)` |
| **`toReversed()`**| `reverse()` | Reverse without mutating original. | `arr.toReversed()` |
| **`toSpliced()`** | `splice()` | Add/remove without mutating original. | `arr.toSpliced(1, 1, 'new')` |
| **`with()`** | `arr[i] = x` | Copy array with one changed element. | `arr.with(0, 99)` |

### Deep Dive: The `with()` Method
**Use-Case:** You need to update a specific index in an array without mutating the original. Common in state management (React, Redux).

#### Scenario A: Primitives (Numbers/Strings)
```javascript
const scores = [10, 20, 30];
const updated = scores.with(1, 99);

console.log(updated); // [10, 99, 30]
console.log(scores);  // [10, 20, 30] (Original Safe)
```

#### Scenario B: Objects (Critical Shallow Copy Note)
`with()` creates a **new array**, but it **doesn't clone the objects** inside. You must spread the object manually to avoid mutating the original data.

```javascript
const originalUser = { name: 'John', age: 30 };
const users = [originalUser];

// ❌ BAD: New array, but SAME object reference inside
const badUpdate = users.with(0, users[0]); 
badUpdate[0].age = 31; 
console.log(users[0].age); // 31 ⚠️ ORIGINAL CORRUPTED!

// ✅ GOOD: New array AND new object copy (Spread Syntax)
const goodUpdate = users.with(0, { ...users[0], age: 31 });
console.log(users[0].age); // 30 ✅ ORIGINAL SAFE!
```

## 3. Classic Mutating Methods (Use with Caution)
**Warning:** These change the original array. Avoid these in functional programming or React state updates unless you intentionally want to modify the source.

| Method | Use-Case | Example |
| :--- | :--- | :--- |
| **`push()`** | Add item(s) to **end**. | `arr.push(4)` |
| **`pop()`** | Remove item from **end**. | `arr.pop()` |
| **`unshift()`** | Add item(s) to **start**. | `arr.unshift(0)` |
| **`shift()`** | Remove item from **start**. | `arr.shift()` |
| **`splice()`** | Add/Remove at **specific index**. | `arr.splice(1, 1, 'a')` |
| **`sort()`** | Sort elements (default is string). | `arr.sort((a,b)=>a-b)` |
| **`reverse()`**| Reverse order. | `arr.reverse()` |

### Example
```javascript
let nums = [1, 2, 3];
nums.push(4);       // [1, 2, 3, 4] (Original changed)
nums.splice(1, 1);  // [1, 4] (Removed '2')
```

## 4. Functional Transformation (Non-Mutating)
The standard for data processing pipelines. These are instance methods.

| Method | Returns | Use-Case | Example |
| :--- | :--- | :--- | :--- |
| **`map()`** | New Array | Transform every element. | `arr.map(x => x * 2)` |
| **`filter()`** | New Array | Keep elements matching condition. | `arr.filter(x => x > 2)` |
| **`reduce()`** | Single Value | Accumulate array into one value. | `arr.reduce((a,b)=>a+b, 0)` |
| **`forEach()`**| `undefined` | Run side-effects (logs, API calls). | `arr.forEach(x => log(x))` |

### Example
```javascript
const nums = [1, 2, 3, 4];

// Chain them together, chained methods go top to bottom
const result = nums
  .filter(n => n % 2 === 0)              // get even numbers  [2, 4]
  .map(n => n * 10)                      // multiple by ten   [20, 40]
  .reduce((acc, curr) => acc + curr, 0); // add them together  60
```

## 5. Searching & Validation (Non-Mutating)

| Method | Returns | Use-Case | Example |
| :--- | :--- | :--- | :--- |
| **`find()`** | Element | Get **first** item matching condition. | `arr.find(x => x > 2)` |
| **`findIndex()`**| Index | Get **index** of first match. | `arr.findIndex(x => x > 2)` |
| **`includes()`** | Boolean | Check if value **exists**. | `arr.includes(2)` |
| **`some()`** | Boolean | Check if **any** match condition. | `arr.some(x => x > 3)` |
| **`every()`** | Boolean | Check if **all** match condition. | `arr.every(x => x > 0)` |

### Example
```javascript
const users = [{ id: 1, active: true }, { id: 2, active: false }];

// Find first active user
const activeUser = users.find(u => u.active); 

// Check if ALL users are active
const allActive = users.every(u => u.active); // false
```

## 6. Copying, Merging & Nested Arrays

| Method | Mutating? | Use-Case | Example |
| :--- | :---: | :--- | :--- |
| **`slice()`** | ❌ | Copy portion of array (shallow). | `arr.slice(1, 3)` |
| **`concat()`** | ❌ | Merge arrays. | `arr1.concat(arr2)` |
| **`flat()`** | ❌ | Flatten nested arrays by depth. | `arr.flat()` |
| **`flatMap()`**| ❌ | Map then flatten (depth 1). | `arr.flatMap(x => [x, x*2])` |
| **Spread `[...]`**| ❌ | Shallow copy/merge (Modern standard). | `[...arr1, ...arr2]` |

### Example
```javascript
const nested = [1, [2, 3], [4, [5]]];

// Flat: Remove nesting
nested.flat();      // [1, 2, 3, 4, [5]]
nested.flat(2);     // [1, 2, 3, 4, 5]

// FlatMap: Map + Flat in one step (Great for splitting strings)
const sentences = ['Hello World', 'Foo Bar'];
sentences.flatMap(s => s.split(' ')); 
// ['Hello', 'World', 'Foo', 'Bar']
```

## Common Pitfalls & Best Practices

1.  **`groupBy` Syntax:** Remember `groupBy` is **static**, not an instance method.
    ```javascript
    // ❌ Wrong
    inventory.groupBy(...)
    // ✅ Right
    Object.groupBy(inventory, ...)
    ```
2.  **`sort()` Mutates:** Always use `toSorted()` or copy before sorting.
    ```javascript
    // ✅ Good
    const sorted = nums.toSorted((a, b) => a - b); 
    ```
3.  **`with()` Object References:** Remember `with()` is a **shallow copy**. If updating objects inside the array, spread the object too:
    ```javascript
    // ✅ Correct Pattern
    arr.with(index, { ...arr[index], updatedProp: true })
    ```
4.  **`reduce()` Initial Value:** Always provide the initial value (second argument) to avoid errors on empty arrays.
    ```javascript
    // ✅ Safe
    arr.reduce((acc, curr) => acc + curr, 0);
    ```
5.  **Browser Support:** 
    *   **ES2023** (`toSorted`, `with`): Chrome 110+, Firefox 110+, Safari 16.4+.
    *   **ES2024** (`Object.groupBy`): Chrome 119+, Firefox 121+, Safari 17.2+.
    *   For older support, use polyfills or `reduce()` workarounds.