---
title: "Understanding State Management in React: Server vs. Client"
description: "An introductory guide to understanding state management in React by distinguishing between server and client state, and choosing the right tools for each."
pubDate: "2026-03-16"
tags: ["react", "tanstack query", "state management", "web development"]
---

One of the most common questions in the React ecosystem isn't "How do I build a component?" but rather "**Where do I put this data?**". Coming from a background of Vue.js, developers often struggle to understand the nuances of state management in React. The ecosystem is rich with libraries and patterns, and it can be overwhelming to choose the right tool for the job.

For years, developers shoved everything into Redux or Context. But as the ecosystem matured, a clear distinction emerged: **Server State** and **Client State**. Treating these two types of state differently is the key to building performant, maintainable, and bug-free React applications.

In this post, I'll break down the differences I've learnt recently, explore the best libraries for each, and clarify when to use React's built-in hooks (`useState`, `useReducer`, `Context`).

## 1. Server State: Data from the Backend

**Server State** is data that lives on the server but is fetched and displayed on the client. This includes user profiles, product lists, dashboard analytics, or blog posts.

### Characteristics of Server State
*   **Asynchronous:** It requires network requests to fetch.
*   **Shared:** Multiple users see the same data.
*   **Outdated:** The data on the client can become stale compared to the server.
*   **Cached:** You usually want to keep a copy locally to avoid refetching on every navigation.

### When to Use Server State Management
You need a dedicated server state tool when you need to handle:
*   Caching and deduplication of requests.
*   Background refetching (keeping data fresh).
*   Loading, error, and success states.
*   Pagination and infinite loading.
*   Mutations (POST/PUT/DELETE) with optimistic updates.

### Recommended Libraries

#### **TanStack Query (React Query)**
The industry standard, and one I've used in Vue.js. It hooks into the component lifecycle to manage caching and synchronization automatically.
*   **Best for:** Most applications needing robust data fetching.
*   **Vibe:** "Set it and forget it" caching.

```jsx
// Example: Fetching data with React Query
const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

You can learn more about React Query by visiting the [official website](https://www.tanstack.com/query).

#### **SWR**
Built by Vercel and I've not investigated it much, but will explore more in the future. It's lighter than React Query and follows a "stale-while-revalidate" strategy.
*   **Best for:** Smaller apps or teams who prefer a minimalistic API.

Curious about SWR? Check out the [SWR documentation](https://swr.vercel.app/).

## 2. Client State: UI and Interaction

**Client State** is data that lives only in the browser and is managed entirely by the client. It is usually derived from user interactions.

### Characteristics of Client State
*   **Synchronous:** Updates happen immediately.
*   **Local:** Specific to the user's session (e.g., dark mode, open sidebar).
*   **Ephemeral:** Often doesn't need to be persisted to a database.

### When to Use Client State Management
Use client state tools for:
*   Toggle states (modals, dropdowns, tabs).
*   Form input values (before submission).
*   Multi-step wizard progress.
*   Shopping cart contents (sometimes).
*   Complex UI logic that doesn't involve the API.

### Recommended Libraries

#### **Zustand**
A tiny, fast, and scalable bear-bones state-management solution. It uses a simple store pattern without providers.
*   **Best for:** Most modern apps needing global client state.
*   **Vibe:** Minimal boilerplate, easy to read.

```jsx
// Example: Zustand Store
const useStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
```

Eager to explore how Zustand compares to other libraries? Visit the [Zustand Comparison page](https://zustand.docs.pmnd.rs/learn/getting-started/comparison) for great insights.

#### **Redux Toolkit**
The modern, official way to use Redux. It reduces boilerplate significantly compared to old Redux.
*   **Best for:** Large enterprise apps where strict structure and time-travel debugging are required.

#### **Jotai / Recoil**
Atomic state management libraries. They allow you to split state into tiny atoms that components subscribe to individually.
*   **Best for:** Apps with highly granular state dependencies (e.g., complex data visualizations).

## 3. The Built-in Toolkit: `useState`, `useReducer`, `Context`

Before reaching for an external library, you should master React's built-in primitives. However, they are easily and often misused.

### `useState`
**The Default Choice.**
*   **Use when:** You need to track simple data within a single component.
*   **Example:** A counter, a form input field, a boolean toggle.
*   **Rule:** Lift state up only when two components need to share it.

```jsx
const [isOpen, setIsOpen] = useState(false);
```

### `useReducer`
**For Complex Local Logic.**
*   **Use when:** Your state logic is complex (e.g., the next state depends on the previous one, or you have many sub-values). It keeps your component clean by moving logic into a reducer function.
*   **Example:** A rich text editor, a complex multi-step form, or a state machine.
*   **Note:** This is still **local** state. Do not use it just to avoid external libraries if `useState` suffices.

```jsx
const [state, dispatch] = useReducer(todoReducer, initialTodos);
```

### `Context`
**The Most Misused Hook.**
*   **What it is:** A dependency injection tool, **not** a state management tool.
*   **Use when:** You need to pass data deep down the tree without prop drilling (e.g., Theme, Auth User, Locale).
*   **Warning:** Do **not** use Context for high-frequency updates (like typing in an input). If the Context value changes, **all** consumers re-render. This causes performance issues.
*   **Pattern:** Often used to pass down a `dispatch` function from `useReducer` or a store hook from Zustand/Redux.

```jsx
// Good Use Case
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Bad Use Case
// Storing a massive object that changes every keystroke
```

## 4. Decision Framework: Which One Do I Choose?

Still unsure? Run through this checklist:

1.  **Does this data come from an API?**
    *   **Yes:** Use **TanStack Query** or **SWR**. (Do not store API data in Redux/Zustand manually unless you have a very specific reason).
    *   **No:** Go to question 2.

2.  **Does only one component need this data?**
    *   **Yes:** Use **`useState`**.
    *   **No:** Go to question 3.

3.  **Is the logic complex (multiple sub-values, complex transitions)?**
    *   **Yes:** Use **`useReducer`** (local) or **Zustand/Redux** (global).
    *   **No:** Go to question 4.

4.  **Do many components across the app need access?**
    *   **Yes:** Use **Zustand** (preferred for simplicity) or **Redux Toolkit**.
    *   **Is it just for configuration (Theme/Auth)?** Use **Context**.

## Summary Table

| Feature | `useState` / `useReducer` | Context | Zustand / Redux | TanStack Query / SWR |
| :--- | :--- | :--- | :--- | :--- |
| **Scope** | Local Component | Tree-wide | Global App | Global App (Server) |
| **Persistence** | Memory (Lost on refresh) | Memory | Memory (can persist) | Cache + Server |
| **Performance** | High | Low (if overused) | High (selectors) | High (caching) |
| **Best For** | UI Toggles, Forms | Themes, Auth User | Cart, Complex UI | API Data, Sync |
| **Boilerplate** | None | Low | Medium | Low/Medium |

## Conclusion

The era of putting *everything* into a global Redux store is over. By separating **Server State** (data fetching, caching, syncing) from **Client State** (UI interactions, local logic), you reduce boilerplate and improve performance.

**The Golden Rule:** Start with `useState`. If you need to fetch data, reach for React Query. If you need global UI state, reach for Zustand. Only use Context for dependency injection, not as a database for your UI.

I hope this helps you navigate the complex world of state management in React!
