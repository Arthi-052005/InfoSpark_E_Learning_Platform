---
name: Academic SaaS
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#464555'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#571ac0'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f3dd9'
  on-tertiary-container: '#e3d5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is engineered for a high-trust, modern e-learning environment. It prioritizes clarity and focus, minimizing cognitive load for students while maintaining a sophisticated SaaS aesthetic. The style is **Corporate Modern** with a lean toward **Minimalism**, utilizing significant whitespace and a refined color palette to emphasize educational content. The emotional response is one of reliability, intellectual progress, and professional growth. High-quality typography and a systematic approach to depth ensure the interface feels both premium and functional.

## Colors
The palette centers on a Deep Indigo primary to establish authority and trust. Soft Cyan serves as a secondary accent for progress indicators, success states, and interactive highlights. A Tertiary Violet is introduced for specialized badges or advanced course tracks. 

The neutral scale is built on a Slate foundation to avoid the harshness of pure black, maintaining high legibility while feeling softer on the eyes during long study sessions. In dark mode, the background transitions to a deep Slate (#0F172A), with surface elevations using slightly lighter tints of slate to maintain hierarchy.

## Typography
Inter is used across all levels to ensure maximum legibility and a systematic, tech-forward appearance. Headlines utilize a bold weight with slightly tighter letter-spacing to create a strong visual anchor for course titles and module headers. Body text maintains a generous line height (1.5x) to facilitate long-form reading in lesson descriptions. Labels use a medium to semi-bold weight for quick scanning of metadata such as "Duration" or "Difficulty Level."

## Layout & Spacing
The design system employs a 12-column fluid grid for desktop and a 4-column grid for mobile. A strict 8px spacing power-of-two scale is used to define all margins and padding, ensuring mathematical harmony throughout the UI. 

**Breakpoints:**
- **Mobile:** Up to 640px. 16px side margins, 16px gutters. Stacked layouts for course cards.
- **Tablet:** 641px to 1024px. 24px side margins, 24px gutters. 2-column grids for cards.
- **Desktop:** 1025px and above. Max-width container of 1280px, centered. 3 or 4-column grids for course discovery.

The "No grid" philosophy is applied within complex components like lesson players, where dynamic padding adjusts based on the sidebar's presence.

## Elevation & Depth
This design system utilizes **Tonal Layers** combined with **Ambient Shadows** to create a structured hierarchy. 

1.  **Level 0 (Base):** White (#FFFFFF) background.
2.  **Level 1 (Cards/Surface):** White background with a subtle, 1px border (#E2E8F0) and a soft, diffused shadow (0 4px 6px -1px rgba(0, 0, 0, 0.1)).
3.  **Level 2 (Hover/Floating):** Increased shadow depth and 2px Indigo border for active states.
4.  **Navigation:** The fixed top bar uses a **Glassmorphism** effect: a white background at 80% opacity with a 12px backdrop blur to maintain context while scrolling.

Shadows should never be pure black; they are tinted with the Slate neutral color to ensure they feel integrated into the interface.

## Shapes
The shape language is primarily **Rounded**, conveying friendliness and modern SaaS sensibilities. 
- **Standard UI elements** (Inputs, Buttons): 0.5rem (8px).
- **Large containers** (Course Cards, Modals): `rounded-2xl` (1rem / 16px) is preferred to give the platform a soft, approachable feel.
- **Progress Bars & Badges:** These utilize a full pill-shape (9999px) to contrast against the more structured rectangular cards.

## Components

### Buttons
- **Primary:** Solid Deep Indigo with white text. 8px roundedness. Smooth 200ms transition on hover to a slightly darker indigo.
- **Secondary:** Transparent background with an Indigo border or Soft Cyan background for success-oriented actions.
- **Ghost:** No border, Indigo text; used for secondary navigation or "Cancel" actions.

### Cards
- **Course Cards:** `rounded-2xl` corners. Subtle shadow on idle, lifting (larger shadow) on hover. Image at the top with a 16:9 aspect ratio. Text content has 20px padding.

### Input Fields
- White background with a 1px Slate-200 border.
- **Focus State:** 2px solid Indigo border with a subtle Indigo outer glow (ring).
- Labels are positioned above the field in `label-sm` typography.

### Navigation
- **Top Bar:** Fixed height (72px), glassmorphism blur. Contains search bar, categories dropdown, and user profile.
- **Sidebar (Learning Mode):** Collapsible, using Tonal Layers to separate lesson lists from the video player.

### Feedback & Progress
- **Progress Bars:** Soft Cyan (#06B6D4) for the fill, Slate-100 for the track. High contrast to show immediate accomplishment.
- **Chips/Badges:** Small, `rounded-full` (pill) shapes with low-opacity background tints of the primary/secondary colors.