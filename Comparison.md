# Pricing Cards: Flexbox vs CSS Grid

This project demonstrates two different CSS layout techniques for creating the same three-column pricing card layout:

1. **Flexbox**
2. **CSS Grid**

Both implementations produce a similar visual result, but they use different approaches to create and manage the layout.

---

## 📌 Overview

The project contains two versions of a pricing card layout. Each version displays multiple pricing cards in a three-column structure on larger screens and automatically stacks the cards into a single column on smaller screens.

The main goal is to demonstrate the differences between **Flexbox** and **CSS Grid** when creating responsive layouts.

---

## 🟦 Flexbox Implementation

The Flexbox version uses:

- `display: flex`
- `flex-wrap: wrap`
- A flexible `flex` property on each card
- `flex-direction` for responsive behavior

The cards are given a flexible base size, allowing them to fit into rows and wrap automatically when there is not enough horizontal space.

### Equal Card Heights

To make the content inside the cards fill the available vertical space, the inner content uses:

```css
flex: 1;