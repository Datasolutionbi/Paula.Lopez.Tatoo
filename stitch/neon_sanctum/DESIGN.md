# Design System Strategy: The Synthetic Cathedral

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Synthetic Cathedral."** 

This system rejects the "flat and friendly" SaaS aesthetic in favor of a high-contrast, editorial experience that feels both ancient and futuristic. It is a digital sanctuary where the user is guided not by rigid lines, but by light, shadow, and poetic typography. By leaning into the "no-roundedness" (0px radius) constraint, we embrace a sharp, brutalist architecture that is softened by the ethereal glow of neon primary tones and the manuscript-like warmth of serif italics. 

The layout should prioritize intentional asymmetry, treating the viewport as a canvas rather than a grid. Use vast amounts of `surface` space to allow high-intensity accents to "burn" through the darkness, creating a sense of sacred importance around every interaction.

## 2. Colors & Atmospheric Depth
Our palette is rooted in an absolute nocturnal base, where color is used sparingly as a source of light rather than a decorative element.

*   **Primary (Magenta #8C2786 / #ffabf1):** The "Sacred Glow." Use for high-intent actions and focal points.
*   **Secondary (Electric Blue #0096f1 / #9bcaff):** The "Synthetic Pulse." Use for navigation cues and information-dense interactive elements.
*   **Tertiary (Earthy Umber #7a462a / #fdb693):** The "Manuscript Foundation." Use to ground the neon elements and provide warmth to background transitions.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for defining layout sections. We define space through:
*   **Tonal Shifts:** Transitioning from `surface` (#0f1223) to `surface-container-low` (#171b2c).
*   **Light Bleed:** Using a soft `primary-container` (#8c2786) gradient at 5% opacity to "wash" over a section.
*   **Negative Space:** Using the Spacing Scale to create massive gutters that act as invisible boundaries.

### Signature Textures & Glass
To provide a premium feel, floating elements (modals, dropdowns, sticky navs) should utilize **Glassmorphism**. Apply `surface` or `surface-container-highest` at 60% opacity with a `backdrop-blur` of 20px. This mimics the appearance of light passing through heavy, smoked glass within a dark chamber.

## 3. Typography
The typographic soul of this system lies in the tension between the modern, wide-spaced sans-serif and the classical, flowing serif.

*   **Display & Headline (Epilogue):** Set with a generous letter-spacing (+2% to +5%). These are your architectural pillars. They should feel authoritative and digital.
*   **Title & Body (Newsreader):** Use the italic variant of Newsreader for "poetic" interventions—pull quotes, manuscript-style captions, or secondary titles. This creates a human, sacred touchpoint against the cold neon environment.
*   **Label (Epilogue):** All-caps, small-scale labels in `secondary` or `on-surface-variant` serve as technical readouts.

## 4. Elevation & Depth
In this system, depth is not "up and down"—it is "light and dark."

*   **The Layering Principle:** Stack containers to create hierarchy. Place `surface-container-lowest` (#090d1d) as a base for content, then use `surface-container` (#1b1f30) for interactive cards. This creates a subtle "inset" or "recessed" look.
*   **Ambient Shadows:** If a card must float, use a shadow that is color-matched to the `primary` or `secondary` tokens. Shadows should be ultra-diffused: `box-shadow: 0 20px 50px rgba(140, 39, 134, 0.08)`. 
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use the `outline-variant` token (#51424d) at 15% opacity. It should be felt, not seen.

## 5. Components

### Buttons
*   **Primary:** Sharp 0px corners. Solid `primary-container` (#8c2786) background. On hover, apply a `primary` (#ffabf1) outer glow (drop-shadow) to simulate a neon tube turning on.
*   **Secondary:** Ghost-style. No background. Border is `outline-variant` at 20% opacity. Text is `secondary` (#9bcaff).
*   **Tertiary:** Underlined `Newsreader` italics. No container.

### Cards & Lists
*   **The No-Divider Rule:** Never use horizontal rules. Separate list items using a 16px vertical gap. On hover, the list item background should shift to `surface-bright` (#35384b).
*   **Structure:** Cards must use sharp 0px corners. Use `surface-container-low` (#171b2c) as the base. If content is grouped, use an inner nesting of `surface-container-highest` (#303446) for the header of the card.

### Input Fields
*   **States:** Resting state has no bottom border; it is a solid `surface-container-lowest` block. On focus, a 2px bottom border of `secondary` (#0096f1) appears, accompanied by a subtle 5px blur glow of the same color.
*   **Typography:** Labels use `label-md` (Epilogue) in `on-surface-variant`.

### Signature Component: The "Altar" Hero
A unique component for this system—a massive, centered container with a high-intensity `primary` to `secondary` gradient bleed behind it, housing a single `display-lg` headline. This represents the "Sacred" heart of the page.

## 6. Do's and Don'ts

### Do
*   **Do** use 0px border-radius everywhere. Sharpness is our signature.
*   **Do** use Newsreader Italics for "Editorial Moments" (e.g., intro text, testimonials).
*   **Do** allow the `background` (#00010d) to breathe. Whitespace is "Blackspace" here; it is the source of the mood.
*   **Do** use the `tertiary` (Umber) tones to provide a "physical" feel to backgrounds, preventing the UI from feeling too purely digital.

### Don't
*   **Don't** use standard grey shadows. Shadows must be tinted or non-existent.
*   **Don't** use 1px solid borders for layout—it breaks the "light and shadow" illusion.
*   **Don't** use "Soft" or "Round" iconography. Use sharp, thin-stroke geometric icons.
*   **Don't** overcrowd the UI. If a screen feels "busy," remove an element rather than adding a divider.