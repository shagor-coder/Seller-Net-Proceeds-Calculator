# Technical Design & UX Learnings: nurtureBEAST Seller Net Sheet

This document outlines the core UI/UX and engineering principles established during the development of the Seller Net Sheet. These learnings serve as a framework for building high-precision financial tools with premium aesthetics.

## 1. Responsive Typography & The "Big Number" Problem
**The Challenge:** High-value financial data (e.g., `$136,800`) uses extremely large font sizes for impact. On narrow viewports (Tablets), these strings often overflow their containers or "bleed" off-screen.

**The Solution:**
*   **Fluid Scaling:** Avoid static utility classes (like `text-9xl`) for primary hero numbers. Use responsive breakpoints or CSS `clamp()` logic to scale down aggressively on mid-sized screens.
*   **Adaptive Padding:** On tablets (MD/LG), reduce container padding (e.g., from `p-24` to `p-12`) to give the text more "room to breathe" before it hits the sidebar.
*   **Wrap Hygiene:** Use `break-words` on the primary result element to ensure that even extremely large figures remain within the viewport on mobile devices.

## 2. Viewport Integrity & Overflow Management
**The Challenge:** Browser-side "white voids" appear on the right side of mobile screens when decorative elements or absolute-positioned objects exceed the `100vw` boundary.

**The Solution:**
*   **Outer-Bound Locking:** Apply `overflow-x-hidden` to both the `html/body` and the `#root` wrapper.
*   **Decorative Constraints:** Large background icons (e.g., the house ornament) should have their scale limited on mobile (`text-[300px]` vs `text-[800px]`) and utilize very low opacity (`opacity-2`) to avoid distracting from data.
*   **Mobile Flex Stacking:** On mobile, remove `flex-1` and `justify-center` from the hero section to prevent "black hole" gaps between the input forms and the results. Let the content flow naturally vertically.

## 3. Financial UX: The "Translator" Principle
**The Challenge:** Users are often intimidated by a dense list of financial line items. They need help understanding *why* the final number is what it is.

**The Solution:**
*   **Summary Micro-Copy:** Include a "Translator Note" that explains the logic (e.g., "Your mortgage is already factored in").
*   **Visual Priority:** The net result ("Cash You'll Walk Away With") should be significantly larger and more vibrant than supporting metrics like "Appreciation."
*   **Action Clarity:** Labeling matters. Changing "View Full Audit" to "View Complete Breakdown" reduces friction by setting clear expectations for the next step.

## 4. Engineering Architecture
**The Solution:**
*   **State Decoupling:** Use `useMemo` for the primary calculation engine to ensure the UI remains performant during rapid input changes.
*   **Currency Masking:** Implement a "Raw vs. Display" strategy for input fields to allow users to see formatted numbers (with commas and symbols) without the cursor-jumping bugs often associated with controlled masked inputs.
*   **Theme Continuity:** Use long transition durations (`duration-500`) for theme toggles to create a "premium" experience that feels like a physical dimming of lights rather than a digital flicker.

## 5. Mobile Optimization Checklist
- [ ] **Root Lock:** `overflow-x-hidden` on parent.
- [ ] **Safe Areas:** Ensure a bottom-padding "safe area" exists for mobile browsers with navigation bars.
- [ ] **Icon Hierarchy:** Use icons to provide visual anchors for scannable data.
- [ ] **Touch Targets:** Ensure all buttons and toggles are at least `44px` in height for thumb accessibility.
