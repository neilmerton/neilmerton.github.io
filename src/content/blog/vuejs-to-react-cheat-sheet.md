---
title: "Vue.js to React Cheat Sheet"
description: "An introductory guide for Vue developers (like me) who are curious about transitioning to React."
pubDate: "2026-02-26"
updatedDate: "2026-03-16"
tags: ["vue.js", 'react', "web development"]
mainClass: "vue-to-react-cheat-sheet"
draft: false
---

Here's my Vue-to-React cheat sheet, designed to help Vue developers quickly understand the key differences and similarities when transitioning to React. Whether you're moving to React for a new project or just want to expand your skill set, this guide will cover the essential concepts and syntax changes you need to know.

I'm still learning React myself, so this is a work in progress, but I hope it can serve as a helpful reference for others making the switch. Let's dive in!

## The Vue-to-React "Cheat Sheet"

| Vue Directive / Feature | React / Next.js Equivalent | Key Difference |
| --- | --- | --- |
| **`v-if="condition"`** | `{condition && <Component />}` | React uses JS short-circuiting. |
| **`v-else`** | `{condition ? <A /> : <B />}` | React uses ternary operators. |
| **`v-for="item in items"`** | `{items.map(item => ...)}` | React treats the list as a JS array method. |
| **`v-model="val"`** | `value={val}` + `onChange={...}` | React is "one-way"; you must manually update. |
| **`v-bind:id="myId"` / `:id="myId"`** | `id={myId}` | No colon needed; just use curly braces. |
| **`v-on:click="handleClick"` / `@click="handleClick"`** | `onClick={handleClick}` | CamelCase is mandatory in React props. |
| **`v-show="isVisible"`** | `style={{ display: isVisible ? 'block' : 'none' }}` | React doesn't have a built-in helper for this. |
| **`v-html`** | `dangerouslySetInnerHTML={{ __html: data }}` | React makes it sound scary on purpose for security. |

## Deep Dive: Common Scenarios

### 1. Conditional Rendering (`v-if` / `v-else`)

In Vue, the template handles the logic. In React, the logic is "inline" JavaScript.

**Vue:**

```html
<div v-if="isLoggedIn">Welcome back!</div>
<div v-else>Please log in.</div>
```

**React:**

```jsx
{isLoggedIn ? (
  <div>Welcome back!</div>
) : (
  <div>Please log in.</div>
)}
```

Or a shorter version:

**Vue:**

```html
<div>{{ isLoggedIn ? "Welcome back!" : "Please log in." }}</div>
```

**React:**

```jsx
<div>{isLoggedIn ? "Welcome back!" : "Please log in."}</div>
```

### 2. List Rendering (`v-for`)

In Vue, the `key` is recommended but sometimes ignored. In React, a **missing `key`** will trigger a console warning and can cause unexpected rendering bugs.

**Vue:**

```html
<li v-for="user in users" :key="user.id">{{ user.name }}</li>
```

**React:**

```jsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}
```

### 3. Computed Properties (`computed`)

Vue’s `computed` is "lazy" and caches automatically. React’s `useMemo` does the same, but you have to manually tell it which variables to "watch."

**Vue:**

```javascript
const doubleCount = computed(() => count.value * 2);
```

**React:**

```javascript
const doubleCount = useMemo(() => count * 2, [count]); // Only re-runs if 'count' changes
```

### 4. Watchers (`watch`)

In Vue, you watch a specific variable. In React, `useEffect` is a "catch-all" for side effects.

**Vue:**

```javascript
watch(count, (newVal) => console.log(`Count is ${newVal}`));
```

**React:**

```javascript
useEffect(() => {
  console.log(`Count is ${count}`);
}, [count]); // This "dependency array" is the most important part of React
```

Vue does have a `watchEffect` that runs on every render, but it’s less common in React. You can achieve similar behavior with `useEffect` without a dependency array, but be careful of infinite loops!

## 5. Slots vs. Children

Vue’s `slots` are a powerful way to pass content into components. In React, you use `props.children` for a similar effect.

**Vue:**

```html
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

**React:**

```jsx
interface MyComponentProps {
  children: ReactNode;
}

const MyComponent = ({ children }: MyComponentProps) => {
  return <div>{children}</div>;
};
```

## 6. Composables vs. Custom Hooks

In Vue, composables are functions that encapsulate reusable logic. In React, custom hooks serve a similar purpose.

**Vue:**

```javascript
import { ref, onMounted } from 'vue';

export function useUser() {
  const user = ref(null);

  onMounted(() => {
    fetchUser().then((data) => {
      user.value = data;
    });
  });

  return { user };
}
```

**React:**

```javascript
import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then((data) => {
      setUser(data);
    });
  }, []);

  return { user };
}
```

**Note:** you should rarely fetch data in Vue.js `onMounted`, but I wanted to keep the example simple. In React, you would typically fetch data in a `useEffect` hook. 

## The "Hidden" Gotcha: Style Scoping

In Vue, `<style scoped>` is a superpower. In React, there is no direct equivalent.

* **The React Way (CSS Modules):** You name your file `Button.module.css` and import it as an object: `import styles from './Button.module.css'`. Then use `className={styles.button}`.
* **The Modern Way (Tailwind):** Most Next.js projects in 2026 use Tailwind CSS, which bypasses the "scoping" problem entirely by using utility classes.

For me this was the biggest surprise when switching. I'm having to rethink how I structure my styles and components. It’s a different mindset, but once you get used to it, it can actually be more flexible. I also see why Tailwind CSS has become so popular in the React ecosystem; it solves the scoping problem without needing a special syntax.

## Final Thoughts

Transitioning from Vue to React is like switching from a high-level language to a lower-level one. You gain more control and flexibility, but you also have to manage more of the details yourself. This cheat sheet should help you navigate the most common syntax differences and get up to speed quickly. Happy coding!