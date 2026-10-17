---
name: TI Ninja
description: Night shopfront for a Campinas IT practice — painted fascia, lime tube, price on dark glass.
colors:
  lime: "#92c417"
  lime-deep: "#7ead12"
  purple: "#44335c"
  purple-deep: "#2a1e3c"
  jamb: "#5c4a78"
  custo: "#6d5a8c"
  imposto: "#d5de78"
  fault: "#ffb1a3"
  night: "#100e12"
  night-2: "#1a1520"
  ink: "#f3f0e8"
  ink-dim: "#d5cce2"
typography:
  display:
    fontFamily: '"Darker Grotesque", "Arial Narrow", "Arial", sans-serif'
    fontSize: "clamp(2.7rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Darker Grotesque", "Arial Narrow", "Arial", sans-serif'
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Darker Grotesque", "Arial Narrow", "Arial", sans-serif'
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  price:
    fontFamily: '"Darker Grotesque", "Arial Narrow", "Arial", sans-serif'
    fontSize: "clamp(3.4rem, 8vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  body:
    fontFamily: '"Atkinson Hyperlegible", "Segoe UI", sans-serif'
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Darker Grotesque", "Arial Narrow", "Arial", sans-serif'
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
rounded:
  plate: "2px"
spacing:
  gutter: "clamp(1.1rem, 4vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 1.15rem 0.45rem"
    height: "3.1rem"
  button-primary-hover:
    backgroundColor: "{colors.lime-deep}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 1.15rem 0.45rem"
    height: "3.1rem"
  button-glass:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 1.15rem 0.45rem"
    height: "3.1rem"
  button-glass-hover:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 1.15rem 0.45rem"
    height: "3.1rem"
  button-disabled:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 1.15rem 0.45rem"
    height: "3.1rem"
  input:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0.65rem 0.9rem 0.55rem 3.1rem"
    height: "3.25rem"
  fascia:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.ink}"
    padding: "0.95rem clamp(1.1rem, 4vw, 2.5rem) 0.8rem"
  nav-link:
    textColor: "{colors.ink}"
    height: "2.75rem"
  nav-link-current:
    textColor: "{colors.lime}"
    height: "2.75rem"
  result-panel:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.ink}"
    padding: "1.25rem 1.25rem 1.4rem"
  price-figure:
    textColor: "{colors.lime}"
    typography: "{typography.price}"
  phone-rail:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.lime}"
    padding: "0.75rem clamp(1.1rem, 4vw, 2.5rem) calc(0.75rem + env(safe-area-inset-bottom))"
  photo-window:
    backgroundColor: "{colors.purple-deep}"
  channel-row:
    textColor: "{colors.ink}"
    padding: "1rem 0 0.8rem"
---

# Design System: TI Ninja

## Overview

**Creative North Star: "The Night Shopfront"**

TI Ninja is a painted fascia and a sheet of glass after dark. The floor is near-black, the board is purple, and a flat lime tube is the only light that draws itself. Type does the work of a shop sign: large, tight, and mostly the paper color, with lime reserved for whatever is switched on — the price, the primary plate, the active word.

The sign stays open: a title in a dark bay, one sentence, two plates. The account is tighter: a readable form, one deep-purple result panel, a split bar, a ledger. Photographs sit in square windows under the same tube. Layers are opaque. The system refuses an eyebrow over the sign, a hero full of badges, a floating pill for navigation, and a row of equal cards.

Motion is two beats, then quiet. The fascia tube draws once from the left. The price figure settles when its text changes. On a phone, a rail repeats that same price only after the big figure has left upward.

**Key Characteristics:**

- Night floor, painted purple board, flat lime tube
- Sign face for the letreiro, readable face for the form
- Opaque layers and a 2px plate radius
- Lime price on deep-purple glass; the phone rail waits until that figure has left
- One tube draw, one price settle; everything else stays still

## Colors

The palette is the logo pair — tube lime and painted purple — on a purple-black floor with warm paper ink.

### Primary

- **Tube Lime** (#92c417): the lit mark. The 4px tube, the price, the primary plate, hovered and current links, form prefixes, the caret, text selection, the scrollbar thumb, and the margin slice of the split bar. A single clause inside a sign may switch to this color. Selection pairs it with the night floor.
- **Pressed Lime** (#7ead12): the primary plate while hovered. Nowhere else.

The shopfront brief named lime for the tube and the price. Shipped pages also use it on plates, links, prefixes, the caret, selection, and the margin slice. Those uses are the mark.

**The Lit Mark Rule.** Lime is a flat fill, with no gradient and no glow. It marks the tube, the price, the primary plate, hovered and current links, form prefixes, the caret, text selection, the scrollbar thumb, and the margin slice of the split bar. One clause inside a sign may switch to lime. It does not fill a section.

### Secondary

- **Painted Purple** (#44335c): the fascia board and the closing e-book band. Also the 7rem wash at 35% opacity that opens the calculator section, and the footer hairline at 90% opacity.
- **Glass Purple** (#2a1e3c): the deep pane. Result panel, photo window, phone rail, glass-plate hover, and disabled plates. Scrollbar track.
- **Jamb** (#5c4a78): the 1px stroke on fields, and the inset line on a disabled plate. Not a fill.

**The Two Purples Rule.** Painted purple is the fascia and the closing band. Deep purple is the glass: the result panel, the photo window, the phone rail, and the pressed glass plate. They do not trade places.

### Tertiary

- **Cost Violet** (#6d5a8c): the cost slice of the price bar and its 0.75rem legend swatch. Nowhere else.
- **Tax Straw** (#d5de78): the tax slice of the price bar and its legend swatch. Nowhere else.
- **Fault Clay** (#ffb1a3): the invalid field border and the error line. Status lines stay paper.

### Neutral

- **Night Floor** (#100e12): the page background, the hero shade's solid end, the price-bar track, and the text on a lime plate. `color-scheme` is dark.
- **Counter Night** (#1a1520): the well inside a field. Not a section background.
- **Sign Paper** (#f3f0e8): text on night and on purple, the glass-plate label, and the 3px focus ring.
- **Dim Lavender** (#d5cce2): notes, help, formulas, the glass-plate inset line, and secondary lines in the result panel.

## Typography

**Display Font:** Darker Grotesque (with Arial Narrow, then Arial)
**Body Font:** Atkinson Hyperlegible (with Segoe UI)

**Character:** The sign face is heavy, tight, and set with a line-height under 1, like a painted letreiro. The form face is wider and calmer, and figures are tabular on the page, on plates, and in fields so the account does not jump.

### Hierarchy

- **Display** (800, clamp(2.7rem, 8vw, 6rem), line-height 0.92, tracking −0.035em): the hero sign and the missing-page sign.
- **Headline** (800, clamp(2.2rem, 5vw, 3.6rem), line-height 0.92, tracking −0.035em): section signs. Headlines keep 0.7rem under them.
- **Title** (800, clamp(1.6rem, 3vw, 2.2rem), line-height 0.92, tracking −0.035em): the monthly ledger heading inside the result panel.
- **Price** (800, clamp(3.4rem, 8vw, 5.6rem), line-height 0.86, tracking −0.045em): the minimum hour price, in tube lime. On the phone rail the same figure is 2.1rem.
- **Body** (400, 1.0625rem, line-height 1.5): paragraphs, stopped at 68ch. Ledes are 1.15–1.2rem. Notes and help are 0.95–0.98rem in dim lavender.
- **Label** (700, 1.4rem, line-height 1, tracking −0.03em): plates. Nav links are 1.35rem and field names are 1.45rem, same face, weight, and tracking. The small unit beside a field name drops to the body face at 0.95rem, regular, dim lavender.

**The Sign and the Form Rule.** Darker Grotesque carries the sign: headings, the price, nav, plates, and field names. Atkinson Hyperlegible carries paragraphs, help, and input values. The two do not swap.

**The Empty Bay Rule.** The title sits in the dark bay. Nothing is labeled above it.

## Layout

The floor is full-bleed night. A sticky fascia (block size 4.6rem) carries the gutter, clamp(1.1rem, 4vw, 2.5rem). Content columns stop at min(1120px, 100% minus two gutters). Section bands pad clamp(3.5rem, 8vw, 5.5rem) on top and clamp(2.5rem, 6vw, 3.5rem) below. The closing band is full-bleed painted purple with clamp(3rem, 8vw, 5rem) of padding.

From 900px up, the account becomes two columns, about 1.15fr and 0.85fr, and the result panel sticks 1rem under the fascia. Photo-and-text pairs split near half and alternate which side holds the window. The footer becomes three columns. Below 900px, those regions stack. The hero, from 900px up, is at least the viewport minus the fascia and 11rem.

A bleed photograph is covered by opaque night gradients so type sits on the floor: on wide screens a left bay, on narrow screens a bottom-weighted shade. The calculator section opens with a 7rem wash of painted purple at 35% over the floor. The missing page centers its sign in the space under the fascia.

**The Column Rule.** Body copy stops at 68ch. The hero lede stops at 36ch. The content column stops at 1120px inside the gutters.

**The Rail After the Figure Rule.** Below 900px, the fixed rail repeats the price only once that figure's bottom edge has crossed the top of the viewport. Until then the rail stays hidden.

## Elevation & Depth

Depth is tonal and opaque: night floor, painted board, deep-purple glass, photograph. There is no backdrop blur. Three soft shadows exist, all ambient, none a hard offset. Glass plates and disabled plates use a 1px inset line instead of a shadow.

The shopfront brief refused blur as a way to make depth, and the build keeps that. When the price text changes, the figure alone moves up from 0.4rem and a 5px blur to rest. That blur is the settle, not a material.

### Shadow Vocabulary

- **Fascia** (`box-shadow: 0 12px 28px rgba(6, 4, 8, 0.35)`): the sticky board, at rest.
- **Result** (`box-shadow: 0 18px 36px rgba(6, 4, 8, 0.38)`): the price panel, at rest.
- **Rail** (`box-shadow: 0 -14px 30px rgba(6, 4, 8, 0.45)`): the phone rail, only while it is on screen.

**The Flat Layer Rule.** Depth is opaque stacks — floor, painted board, deep glass, photograph — not blur. Soft shadows sit only under the fascia, the result panel, and the phone rail.

**The Tube Once Rule.** The fascia tube scales from the left once, over 900ms. The tube on a result panel or photo window is already lit. Reduced motion shows every tube at full length and does not settle the price.

## Shapes

Corners are cut almost square. Plates and fields share a 2px radius. The result panel, photo windows, the price rail, the split bar, and nav links are square. The tube is a 4px band along the top edge of the fascia, the result panel, each photo window, and the phone rail.

Hairlines are 1px, not cards. Ledger rows use dim lavender at 25% opacity. Channel rows use it at 35%. The craft list uses lime at 45%. The footer uses painted purple at 90%. The split bar is 0.85rem tall on a night track, three flat slices, no gaps.

**The Near-Square Rule.** Plates, fields, and the notice field use a 2px radius. The nav, the result panel, photo windows, and the price rail are square. Nothing is a pill.

## Components

### Plates

Shop signs you can press. The fill swaps immediately on hover; the plate does not lift.

- **Shape:** 2px radius, minimum height 3.1rem, padding 0.55rem 1.15rem 0.45rem, sign face at 700 / 1.4rem, tracking −0.03em.
- **Primary:** tube lime fill, night text. Hover fills with pressed lime.
- **Glass:** transparent, paper text, a 1px inset line of dim lavender. Hover fills with glass purple and keeps the line.
- **Focus:** the page ring, 3px sign paper, offset 3px.
- **Disabled:** glass-purple fill, dim-lavender text, a 1px inset jamb, `not-allowed` cursor. Copy and share start here until the account is valid.

### Fields

The account field is the counter.

- **Style:** counter-night well, 1px jamb border, 2px radius, minimum height 3.25rem, padding 0.65rem 0.9rem 0.55rem 3.1rem. Value type is the body face at 1.2rem, with a lime caret. The prefix (R$, h, %) is the sign face, 700, 1.25rem, tube lime, and it does not take clicks.
- **Plain field:** the notice form uses the same well, border, and radius, with padding 0.6rem 0.9rem, no prefix, and a 1.125rem value.
- **Labels:** sign face, 700, 1.45rem on the account (1.4rem on the notice). Help sits under the field in dim lavender.
- **Focus:** the same 3px paper ring.
- **Error:** an invalid field switches its border to fault clay. The error line is fault clay. A status line is sign paper.

### Navigation

The fascia is a sticky painted-purple board, not a floating pill. The color logo sits at 2.4rem tall. Links are the sign face at 700 / 1.35rem, paper, no underline at rest, minimum height 2.75rem, and they wrap. Hover and the current page turn the word lime and add a 2px underline offset 0.28em. The footer repeats paper links at body weight 700; hover turns them lime. The footer logo is 2rem tall.

### Result panel

One deep-purple glass pane, square, padded 1.25rem 1.25rem 1.4rem, with the result shadow and a static 4px lime tube pulled out to the pane's edges. The label is the sign face at 700 / 1.35rem. The price uses the price role in tube lime. From 900px up the pane sticks 1rem under the fascia. The split bar and the monthly ledger live inside this pane, not in separate cards.

The price settles only when the formatted figure changes, not on the first paint: 420ms, cubic-bezier(0.16, 1, 0.3, 1), from 0.4rem below and a 5px blur. Reduced motion skips it.

### Phone rail

Hidden at rest. Below 900px, after the big price's bottom edge has crossed the top of the viewport, a fixed glass-purple bar docks to the bottom with a 4px lime tube on its top edge, the rail shadow, and padding that clears the safe area. It shows the words "Preço mínimo" in the sign face at 700 / 1.25rem and the same price at 800 / 2.1rem in tube lime. While it is up, the page gains 4.75rem of bottom padding. The rail is hidden from assistive tech; it repeats the figure and does not calculate a second one.

### Photo window

A square deep-purple frame with a static 4px lime tube on the top edge. The photograph covers the frame and is centered. It caps at 28rem tall below 900px; from 900px up it fills the column and stays at least 18rem tall.

### Channel rows

Large sign links, clamp(2rem, 5vw, 3.2rem), weight 800, tracking −0.04em, stacked with 0.8rem between them. Each row has a 1px dim-lavender hairline at 35% opacity and a body-size dim handle on the right. Hover turns the row lime.

## Do's and Don'ts

### Do:

- **Do** paint the floor night (#100e12) and the fascia painted purple (#44335c), with a 4px tube of lime (#92c417) on the fascia, the result panel, each photo window, and the phone rail.
- **Do** set signs, plates, nav, and field names in Darker Grotesque, and set paragraphs, help, and input values in Atkinson Hyperlegible.
- **Do** keep plates and fields at a 2px radius and a minimum height of 3.1–3.25rem, with the 3px sign-paper focus ring offset by 3px.
- **Do** keep the phone rail off until the big price's bottom edge has left the viewport upward, and only below 900px.
- **Do** draw the fascia tube once over 900ms with cubic-bezier(0.16, 1, 0.3, 1), and settle the price over 420ms on the same curve only when its text changes. Skip both when reduced motion is requested.

### Don't:

- **Don't** place an eyebrow, kicker, or row of badges above a sign.
- **Don't** build a section as a row of equal cards. Use one glass panel, a photo window beside text, or a list.
- **Don't** frost a surface with backdrop blur, and don't use a hard offset shadow. The only blur is the price figure's settle.
- **Don't** wash a region in lime, and don't set the price in any color but lime.
- **Don't** use pill shapes for the nav, plates, fields, or the rail.
