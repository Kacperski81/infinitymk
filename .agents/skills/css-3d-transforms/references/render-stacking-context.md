# Preserve 3D & Rendering: Stacking Context Creation

## Principle
Applying 3D transforms creates a new stacking context for the element and its children. This affects z-index layering and can impact how overlapping content renders.

## Application
```css
/* 3D transform creates stacking context */
.transformed {
  transform: rotateY(45deg);
  z-index: 1;  /* stacking context: doesn't apply to siblings outside parent */
}

.sibling {
  z-index: 2;  /* may not appear above .transformed if context doesn't allow */
}

/* Stacking context grouping */
.card {
  perspective: 1000px;
  /* Creates stacking context for card and children */
}

.card > * {
  /* All children stack within card's context */
}
```

## Key Guidelines
- **All 3D transforms** create new stacking contexts (perspective, rotateX, etc.)
- **Context isolation**: Children don't stack above/below outside elements
- **z-index isolation**: Numeric z-index values are local to context
- **Parent boundaries**: Content stays contained within transformed parent
- **Rendering order**: Parent's stacking context determines placement

## Visual Mental Model
- Think: 3D transforms group element + children into single layer
- Layer appears as single unit in page stacking order
- Children can't escape parent's stacking context
- Useful for: Modals, overlays, complex component layering

## Why It Matters
Stacking context prevents visual surprises when combining 3D transforms with overlapping content. Dropdown menus, tooltips, or modals inside transformed elements behave differently.

## Common Scenarios
```css
/* Modal with 3D backdrop (background becomes backdrop filter) */
.modal-wrapper {
  transform: translateZ(0);  /* creates stacking context */
}

.modal-overlay {
  z-index: 100;  /* stacks within wrapper's context */
}

.modal-content {
  z-index: 101;
}

/* Dropdown inside transformed container */
.dropdown-parent {
  transform: rotateY(10deg);  /* creates context */
  position: relative;
}

.dropdown-menu {
  position: absolute;
  z-index: 999;  /* appears above siblings within wrapper */
  /* But may not escape parent's stacking context */
}
```

## Gotchas
```css
/* ❌ Problem: dropdown hidden by stacking context */
.card {
  transform: rotateY(5deg);  /* creates context */
  z-index: 1;
}

.card-dropdown {
  z-index: 999;  /* high z-index, but trapped in card context */
}

.other-element {
  z-index: 10;  /* appears above dropdown because it's outside card's context */
}

/* ✅ Solution: move dropdown outside transformed container */
.dropdown-container {
  position: relative;
  z-index: 999;  /* context outside transformed element */
}
```

## Performance Note
- Creating stacking context is lightweight
- No layout impact; purely rendering optimization
- Helps with GPU layering

## Related Rules
- [`render-preserve-3d-required`](render-preserve-3d-required.md)
- [`perspectiv-define`](perspective-define.md)
