# Dental illustration assets

Created 2026-09-16 with the built-in image_gen tool. Source-generated PNG alpha was preserved without background-removal postprocessing. Full exact prompt set: [prompts.md](prompts.md).

| File | Subject | Size |
|---|---|---|
| single-tooth.png | One implant with separated crown and abutment in a jaw segment | 1536×1024 |
| bridge.png | Three-unit bridge on exactly two implants | 1536×1024 |
| all-on-four.png | Lower full arch on four implants | 1536×1024 |
| zygoma.png | Upper arch with two long zygomatic and two short anterior implants | 1536×1024 |
| cap-ct.png | Dental cone beam CT scanner | 1536×1024 |
| cap-guide.png | Clear surgical guide with four titanium sleeves | 1536×1024 |
| cap-sedation.png | Anesthesia workstation | 1536×1024 |
| cap-bone.png | Educational bone augmentation jaw model | 1536×1024 |
| cap-lab.png | Dental articulator with casts | 1536×1024 |
| nobelactive-cutout.png | Reference-based NobelActive implant cutout | 1024×1536 |

## Provenance

The first nine assets are generated conceptual educational illustrations, not manufacturer product photographs. The common styling specifies neutral white studio lighting, ivory enamel, brushed titanium, restrained pale pink gingiva, no cyan tint, no labels or branding, and transparent alpha.

NobelActive input: `C:/Users/User/Documents/Подмосковье/implant-center/dist/assets/system-Nobel-v2.webp`, supplied by the coordinating task as an official manufacturer reference. The exact source URL was not supplied to this asset task. The image was inspected before an image_gen edit retained the large right-hand implant, removed the peach background, text and separate top view, and centered it. This is an AI-edited derivative of that reference; it is not a pixel-identical extraction, and exact engineering geometry should not be asserted.

## Verification

All ten PNGs were visually inspected and decoded using System.Drawing. Every file has a real 32-bit ARGB alpha channel, with transparent pixels (alpha 0). Sampled implant object alpha is predominantly 252–253 out of 255, and maximum observed alpha is 254; this slight translucency comes from the generator. Do not flatten the files or use their hidden RGB background as a visible backdrop. The generated preview can show blurred RGB edge coloration that is invisible in fully transparent pixels.

The solution illustrations visibly contain the requested 1, 2, 4 and 4 implants. Zygoma shows two long posterior and two short anterior implants. These remain conceptual medical illustrations; the zygomatic bone anatomy is stylized. The nine generated concept assets were made in separate requests; no discarded variants were generated.
