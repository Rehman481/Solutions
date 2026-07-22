# How I Kept the DOM and Data in Sync

This project uses a simple and predictable approach to keep the application's data and the DOM (Document Object Model) synchronized.

The main principle is:

> **The `tasks` array is the single source of truth, and the DOM is always generated from the current state of that array.**

Whenever the data changes, the `render()` function is called to update the user interface.

---

## 1. Single Source of Truth

All task data lives exclusively in a `tasks` array.

The `tasks` array is the only place where the actual application state is stored. No other part of the application maintains a separate copy of the task data.

For example:

```javascript
let tasks = [
  {
    id: 1,
    text: "Complete project",
    completed: false
  },
  {
    id: 2,
    text: "Read documentation",
    completed: true
  }
];