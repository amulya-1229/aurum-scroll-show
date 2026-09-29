# Build Aurum restaurant experience

## Scope

- Replace the blank home screen with the selected emerald-and-sunset Aurum design.
- Add dedicated Home, Menu, Order, Reservations, About, Contact, and Account pages with shared navigation.
- Include every menu item from the supplied document, preserving category and item order exactly.
- Add working search, dietary filters, spice labels, cart controls, checkout flow, reservation availability feedback, and account forms.
- Add restrained scroll reveals, image parallax, and floating ingredient details, with reduced-motion support.

## Visual direction

- Use the approved “Embrald green and cream” composition: deep emerald green, cream typography, sunset orange actions, translucent surfaces, and editorial Cormorant headings.
- Generate cohesive food imagery for the opening feature and four signature dishes.
- Keep controls compact, accessible, and responsive across desktop and mobile.

## Technical approach

- Implement within this project’s required Django , Django templates + Tailwind or Bootstrap, plus HTMX for a dynamic cart.
- Keep customer data and checkout interactions in browser state for this preview; no payment charge, email delivery, persistent account, or owner dashboard will be connected without a backend service.
- Use semantic design tokens, route-level metadata, reusable shared components, and local React state.

## Verification

- Check the live preview at desktop and mobile sizes.
- Verify all menu categories and 30 dishes appear in document order, cart totals update, and forms provide feedback.
- Confirm the project builds without errors.