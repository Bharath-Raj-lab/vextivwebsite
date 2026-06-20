---
name: Lithos
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#dec0b3'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a68b7f'
  outline-variant: '#574238'
  surface-tint: '#ffb692'
  primary: '#ffb692'
  on-primary: '#562000'
  primary-container: '#e8702a'
  on-primary-container: '#4e1c00'
  inverse-primary: '#9f4200'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#939292'
  on-tertiary-container: '#2b2b2b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb692'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
  display-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.1'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is built to evoke the weight of geological time and the raw beauty of the earth's mantle. It targets a sophisticated audience—researchers, collectors, and explorers—who appreciate scientific precision paired with high-end editorial aesthetics.

The style is **Modern Minimalist with Glassmorphic accents**. It utilizes deep, layered blacks to create a sense of subterranean depth, contrasted by "volcanic" highlights that simulate heat and energy. The emotional response should be one of quiet awe: a mysterious, premium atmosphere that feels both ancient and technologically advanced.

## Colors
The palette is dominated by **Obsidian Black (#0F0F0F)** and **Basalt Gray (#1A1A1A)**, providing a low-light foundation that makes content feel luminous. 

**Volcanic Orange (#E8702A)** is reserved strictly for primary actions, critical state indicators, and rare brand moments, acting as the "magma" within the dark crust of the UI. Background surfaces use subtle gradients and translucent overlays to prevent a "flat" black appearance, ensuring the interface feels three-dimensional and immersive.

## Typography
This design system employs a dual-font strategy to balance scientific clarity with editorial sophistication.

- **Playfair Display (Italic):** Used for large display headings and pull-quotes. The italic slant provides a human, curated touch against the rigid dark background.
- **Inter:** The workhorse for all functional UI components, body copy, and data visualization. Its high x-height and neutral character ensure legibility even at small sizes in dark mode.

Use **Label-caps** for section headers and technical metadata to reinforce the scientific, catalog-like nature of the content.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous whitespace (or "dark space") to emphasize the premium positioning of the brand.

- **Desktop:** 12-column grid with 64px outer margins. Use wide gutters (24px) to allow elements room to breathe.
- **Mobile:** 4-column grid with 16px margins.
- **Vertical Rhythm:** Content blocks should be separated by large increments (`lg` or `xl`) to create a slow, deliberate scrolling experience.

Elements should be center-aligned for editorial layouts and left-aligned for data-heavy research screens.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism**, rather than traditional shadows.

1.  **Base Layer:** Solid #0F0F0F.
2.  **Surface Layer:** #1A1A1A with a 1px subtle inner border (rgba 255, 255, 255, 0.05) to define edges.
3.  **Floating Elements:** Use a backdrop filter (Blur: 12px) and a semi-transparent background (rgba 26, 26, 26, 0.8). 

Avoid heavy drop shadows. Instead, use a very faint, large-radius **Orange Glow** (primary color at 10% opacity) behind primary buttons to simulate thermal radiation.

## Shapes
The shape language is defined by **Extreme Roundedness (Pill-shaped)**. This softens the "harshness" of the dark theme and makes the UI feel more like polished river stones. 

Buttons and chips must always be fully pill-shaped. Cards and containers use a `rounded-xl` (1.5rem / 24px) corner radius to maintain a consistent organic flow throughout the interface.

## Components
- **Buttons:** Primary buttons are Volcanic Orange with white text. They are pill-shaped. Secondary buttons are "Ghost" style with a 1px Basalt Gray border and a soft hover blur.
- **Chips/Tags:** Small pill shapes with a dark gray background and high-contrast Inter SemiBold text. Used for specimen classifications (e.g., *Igneous*, *Metamorphic*).
- **Input Fields:** Minimalist design with only a bottom border that glows Volcanic Orange on focus. Labels use the `label-caps` typography style.
- **Cards:** Use the Glassmorphic treatment—blurred backgrounds and thin, crisp light-gray borders. 
- **Lists:** Clean, borderless rows separated by subtle 1px lines (rgba 255, 255, 255, 0.05).
- **Specialty Component (The Specimen Viewer):** A large, high-resolution image container with an absolute-positioned floating info-panel using maximum backdrop blur.