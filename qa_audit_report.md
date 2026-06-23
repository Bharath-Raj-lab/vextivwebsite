# QA Audit Report — Cross-Browser & Mobile

## 1. CSS Modern Features & Fallbacks
- **Status:** **Pass**
- **Details:** The codebase correctly provides vendor prefixes for `backdrop-filter`. For example, in `components/sections/Hero.tsx` (Lines 515-516) and `components/layout/Navbar.tsx` (Lines 302-303, 393-394), both `backdrop-filter` and `-webkit-backdrop-filter` are defined. No unsupported usage of `:has()` or `@container` queries was found. CSS nesting is handled securely via Tailwind.

## 2. Framer Motion & prefers-reduced-motion
- **Status:** **Pass**
- **Details:** The codebase handles reduced motion gracefully. Components like `Hero.tsx`, `Navbar.tsx`, `ExitIntentPopup.tsx`, and `WhyVextiv.tsx` manually implement the `useReducedMotion()` hook. 
- **Example:** `components/sections/Hero.tsx` (Lines 117-118) disables the `y` transform animation for users who prefer reduced motion.

## 3. Touch Target Sizes
- **File:** `components/layout/Navbar.tsx`
- **Line:** 516-517
- **Issue:** The mobile hamburger button is sized at `44px × 44px`. Apple's HIG and Android's Material Design require a minimum touch target size of `48px × 48px` to prevent missed taps.
- **Affected:** iOS Safari, Android Chrome (Mobile Devices)
- **Exact Fix:** 
  Change `.navbar__hamburger` dimensions on mobile from `44px` to `48px`:
  ```css
  @media (max-width: 767px) {
    .navbar__hamburger {
      width: 48px;
      height: 48px;
    }
  }
  ```

## 4. Viewport Overflow Prevention
- **File:** `app/layout.tsx`
- **Line:** 114
- **Issue:** The `body` element does not have `overflow-x-hidden`. If any absolute or animated element (like Framer Motion entrance animations) exceeds the viewport width on mobile, it will cause horizontal scrolling/wobble.
- **Affected:** iOS Safari, Android Chrome (Mobile Devices)
- **Exact Fix:** Add `overflow-x-hidden` to the body's class list.
  ```tsx
  <body className="min-h-full flex flex-col overflow-x-hidden">
  ```

## 5. Safari-Specific Quirks (100vh)
- **File:** `components/sections/Hero.tsx`
- **Line:** 252
- **Issue:** Using `height: 100vh;` on mobile Safari causes the bottom of the hero section to be obscured by the browser's bottom navigation bar (address bar UI).
- **Affected:** iOS Safari (Mobile)
- **Exact Fix:** Use dynamic viewport height (`dvh`).
  ```css
  .hero {
    height: 100dvh;
  }
  ```
- **Note for Manual Testing:** Deploy to a staging environment and open on a physical iPhone using Safari. Scroll up and down to ensure the hero background resizes smoothly without sudden layout shifts as the address bar expands/collapses.

## 6. Form Inputs — iOS Auto-Zoom
- **File:** `app/audit/AuditForm.tsx` & `app/globals.css`
- **Line:** 797 (`AuditForm.tsx`) mapping to `--text-sm` (14px in `globals.css`)
- **Issue:** The `font-size` for `.audit-input` and `.audit-select` is set to `var(--text-sm)` (14px). When a user focuses an input with a font size smaller than 16px on iOS Safari, the browser automatically zooms in, ruining the layout.
- **Affected:** iOS Safari
- **Exact Fix:** Force inputs to be at least 16px on mobile.
  ```css
  @media (max-width: 768px) {
    .audit-input, .audit-select {
      font-size: 16px;
    }
  }
  ```

## 7. Form Inputs — Autofill Styling
- **File:** `app/audit/AuditForm.tsx`
- **Line:** 788
- **Issue:** No explicit styling exists for `:-webkit-autofill`. When Chrome/Safari autofills the form, it will inject a solid white or pale-yellow background, breaking the dark mode aesthetic (`var(--bg-surface-2)`).
- **Affected:** Chrome, Safari (Desktop & Mobile)
- **Exact Fix:** Add autofill overrides to the `.audit-input` CSS block.
  ```css
  .audit-input:-webkit-autofill,
  .audit-input:-webkit-autofill:hover,
  .audit-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px var(--bg-surface-2) inset !important;
    -webkit-text-fill-color: var(--text-primary) !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  ```

## 8. next/image Sizes
- **Status:** **Pass**
- **Details:** The `<Image />` component is used correctly. In `app/work/WorkClient.tsx` (Line 59), a proper `sizes` attribute is provided (`sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`), ensuring mobile devices download an appropriately sized image instead of the desktop master.

## 9. WhatsApp Button vs. Overlays (z-index Conflict)
- **File:** `components/ui/WhatsAppButton.tsx`
- **Line:** 69
- **Issue:** The WhatsApp button has a `z-index: 9999`. The mobile navigation menu (`Navbar.tsx` L414) has a `z-index: 40`, and the Exit Intent popup (`ExitIntentPopup.tsx` L135) has a `z-index: 50`. Because the WhatsApp button's z-index is so high, it will clip through and sit on top of the mobile menu and modal overlays.
- **Affected:** All browsers (Mobile & Desktop)
- **Exact Fix:** Lower the WhatsApp button's z-index so it sits below the overlays.
  ```css
  .wa-btn {
    z-index: 30; /* Under the mobile nav overlay (40) and exit intent popup (50) */
  }
  ```

## 10. Exit Intent Popup Logic
- **Status:** **Pass**
- **Details:** `components/ui/ExitIntentPopup.tsx` (Lines 33-36) correctly checks for touch capabilities (`window.matchMedia("(pointer: coarse)").matches`) and screen width (`window.innerWidth < 768`). It intentionally bypasses attaching the `mouseleave` event on mobile devices.

## 11. Font Rendering (FOIT/FOUT)
- **Status:** **Pass**
- **Details:** `app/layout.tsx` correctly configures both `Syne` (Line 16) and `DM_Sans` (Line 23) with `display: "swap"`. This ensures text renders immediately using system fallback fonts on slow connections, avoiding the Flash of Invisible Text (FOIT).
