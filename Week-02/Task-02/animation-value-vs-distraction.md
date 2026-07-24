# Animation Value vs Distraction: My Decision Framework

## Purpose-Driven Animation

I used animations to guide attention and create a sense of energy, not just for decoration. The hero's floating shapes and typing code window establish a tech-forward, dynamic feel that reinforces the product's **"fast and modern"** positioning. The subtle float animation makes the page feel alive without being overwhelming.

## Progressive Enhancement

The scroll-triggered reveal for feature cards adds a layer of polish that rewards scrolling, but the content is fully accessible without it. This ensures users on slower devices still get the full experience, while those with capable browsers enjoy the extra delight. The staggered reveal (**100ms delay between cards**) creates a natural, satisfying flow.

## Restraint in Transitions

I limited hover effects to meaningful interactions (**buttons, cards, icons**) and kept them subtle — a slight lift, color shift, or scale bump. Buttons scale on hover but also have a micro-press effect (`:active`) for tactile feedback. I avoided flashy animations on every element because that would compete for attention and slow down perceived performance.

## Performance Considerations

All animations use `transform` and `opacity` properties, which are GPU-accelerated, ensuring smooth 60fps rendering. The `Intersection Observer` is efficient because it stops observing cards once they're revealed, preventing unnecessary calculations. I also avoided heavy layout-triggering animations like `width`, `height`, or `margin` changes.
