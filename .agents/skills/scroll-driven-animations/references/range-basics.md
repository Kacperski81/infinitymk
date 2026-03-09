# range-basics — Animation Range Control

## Rule

Always use `animation-range` to control exactly when a scroll-driven animation starts and ends. Never let animations span the full scroll distance unless intentional (e.g., progress bars).

## Why

- Prevents animations from playing too early or too late
- Gives precise control over the "active zone" of the animation
- Allows entry-only, exit-only, or partial animations

## Syntax

```css
animation-range: <start> <end>;

/* Longhand */
animation-range-start: <timeline-range-name> <percentage>;
animation-range-end: <timeline-range-name> <percentage>;
```

## Timeline Range Keywords

| Keyword | Start | End | Use Case |
|---------|-------|-----|----------|
| `cover` | Element starts entering | Element fully left | Full visibility cycle |
| `entry` | Element starts entering | Element fully inside | Entrance animations |
| `exit` | Element starts leaving | Element fully gone | Exit animations |
| `contain` | Element fully inside | Element starts leaving | While fully visible |
| `entry-crossing` | Leading edge crosses entry | Leading edge finishes entry | Fine-grained entry |
| `exit-crossing` | Leading edge crosses exit | Leading edge finishes exit | Fine-grained exit |

## Examples

### Entry-only animation (most common)

```css
.reveal {
  animation: fade-slide-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Partial entry — Animate during first half of entry

```css
.quick-reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}
```

### Entry + Exit — Fade in and back out

```css
.fade-through {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}
```

### Exit-only animation

```css
.fade-out-on-exit {
  animation: fade-out linear both;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

### Contain — Only animate while fully visible

```css
.scale-while-visible {
  animation: scale-up linear both;
  animation-timeline: view();
  animation-range: contain 0% contain 100%;
}
```

## Anti-patterns

```css
/* ❌ BAD — No range specified, animates across full scroll */
.element {
  animation: fade-in linear both;
  animation-timeline: view();
  /* Fades across the entire scroll range — too slow */
}

/* ✅ GOOD — Constrained to entry only */
.element {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}
```
