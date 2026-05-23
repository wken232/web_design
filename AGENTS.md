# Project Background

## Overview

This project is a single-page design showcase website built around a curated set of brand and packaging visuals stored in the local `images/` directory. The site presents itself as a high-end, motion-led portfolio with a dark editorial interface, oversized typography, and image-first storytelling.

The current public-facing identity has been adapted to the Chinese creator brand `靖哥教你做` / `靖哥教你做AI`, while the visual asset set still comes from the existing SNOW-inspired packaging and campaign imagery inside the project.

## Primary Goal

The site is meant to feel like a premium AIGC and design showcase page rather than a generic gallery. The intended experience is:

- cinematic hero section with full-screen motion
- strong typographic presence
- curated image sequencing instead of dense information layout
- interactive hover states that feel polished and modern
- clear separation between hero, statement, showcase, portfolio, archive, and contact sections

## Creative Direction

The visual direction is influenced by high-end portfolio websites similar to Studio Namma:

- dark background with restrained gradients
- large, compressed headline treatment
- clean black/white/blue visual rhythm
- rounded media cards and wide image rails
- hover interactions that feel light, premium, and intentional

Even when content is updated, the site should continue to feel minimal, sharp, and design-led rather than overly commercial or template-like.

## Content Positioning

The current messaging positions the page as a creator/education brand that publishes original AI and AIGC content on a weekly basis. In particular:

- the header brand reads `靖哥教你做`
- the contact identity reads `靖哥教你做AI`
- the statement section introduces the site as a place for original weekly AIGC learning content

If future edits expand this positioning, keep the tone concise, confident, and visually compatible with the premium layout.

## Asset Notes

All visual assets currently used by the page come from the local `images/` folder and include:

- still images in `.webp` and `.jpg`
- short motion clips in `.mp4`

The assets are mostly packaging, product, poster, and campaign-style compositions. They are currently reused across:

- the hero
- the showcase section
- the interactive portfolio preview area
- the archive/gallery section

When swapping assets, prefer:

1. wide cinematic images for full-width archive rows
2. bold product or packaging stills for the `FRAMES` section
3. motion clips only where they materially improve the experience

## Technical Structure

This project is a lightweight static site:

- `index.html`: page structure and content
- `styles.css`: layout, visual system, responsive rules, hover states
- `script.js`: loader behavior, menu interaction, portfolio preview switching, reveal motion, ripple hover effect

There is no framework or build step at the moment. Any future changes should remain easy to run locally by simply opening `index.html`.

## Existing Interaction Patterns

The site already includes several designed interactions:

- animated loader for desktop
- elastic menu opening motion
- scroll-triggered reveal animations
- hover-based portfolio preview switching
- archive image hover lift and highlight pass
- ripple-style hover effect on the two `FRAMES` images

Future interactions should match this level of polish and avoid heavy or noisy motion.

## Design Constraints

When extending the project, try to preserve these principles:

- keep layouts spacious
- avoid cluttered text blocks
- prefer fewer, larger media moments
- maintain clear hierarchy through typography and scale
- preserve strong mobile fallbacks
- avoid decorative effects that darken or obscure the images too much

## Suggested Future Edits

Reasonable next steps for future contributors may include:

- replacing the remaining English labels with fully localized Chinese copy
- refining the hero headline and CTA copy for AI education branding
- introducing a dedicated course or content section
- replacing placeholder contact/support text with real creator/community details
- optimizing image order so the visual narrative flows from cool blue packaging into warmer campaign moments

## Working Assumption

This project should be treated as a polished visual landing page for a creator-led AI brand, built on top of an existing premium packaging-style asset library. Any edits should strengthen the brand story without losing the current art-direction quality.
