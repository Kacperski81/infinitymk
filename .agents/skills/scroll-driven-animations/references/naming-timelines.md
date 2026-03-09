# naming-timelines — Named Timelines & Scoping

## Rule

Use named scroll/view timelines when the animated element is not a descendant of the scroller, or when you need to sync multiple elements to the same scroll source.

## Why

- Anonymous `scroll()` and `view()` only traverse the ancestor chain
- Named timelines let any element reference any scroller
- `timeline-scope` extends visibility of named timelines to sibling or distant nodes

## Syntax

### Named Scroll Timeline

```css
/* On the scroller */
.container {
  scroll-timeline-name: --my-timeline;
  scroll-timeline-axis: block;
  /* Shorthand: scroll-timeline: --my-timeline block; */
}

/* On the animated element */
.animated {
  animation: my-animation linear both;
  animation-timeline: --my-timeline;
}
```

### Named View Timeline

```css
/* On the tracked element */
.tracked-element {
  view-timeline-name: --card-visibility;
  view-timeline-axis: block;
  /* Shorthand: view-timeline: --card-visibility block; */
}

/* On the animated element (can be different from tracked) */
.related-indicator {
  animation: highlight linear both;
  animation-timeline: --card-visibility;
}
```

### Timeline Scope

When the animated element and the timeline source don't share an ancestor-descendant relationship:

```css
/* On a common ancestor */
.page-wrapper {
  timeline-scope: --hero-scroll;
}

/* On the scroller (descendant of .page-wrapper) */
.sidebar {
  scroll-timeline: --hero-scroll block;
}

/* On the animated element (different branch, also descendant of .page-wrapper) */
.main-content .progress {
  animation: grow linear both;
  animation-timeline: --hero-scroll;
}
```

## Examples

### Sync multiple elements to one scroller

```css
.scroll-container {
  overflow-y: auto;
  scroll-timeline: --container-scroll block;
}

.progress-bar {
  animation: fill-bar linear both;
  animation-timeline: --container-scroll;
}

.chapter-indicator {
  animation: update-chapter linear both;
  animation-timeline: --container-scroll;
}
```

### Animate a sibling based on another element's visibility

```css
.parent {
  timeline-scope: --card-view;
}

.card {
  view-timeline: --card-view block;
}

.card-label {
  animation: highlight linear both;
  animation-timeline: --card-view;
  animation-range: contain 0% contain 100%;
}
```

## Anti-patterns

```css
/* ❌ BAD — Trying anonymous timeline across non-ancestors */
.sidebar-element {
  animation-timeline: scroll(); /* Won't find the main scroller */
}

/* ✅ GOOD — Named timeline with scope */
.layout {
  timeline-scope: --main-scroll;
}
.main { scroll-timeline: --main-scroll; }
.sidebar-element { animation-timeline: --main-scroll; }
```
