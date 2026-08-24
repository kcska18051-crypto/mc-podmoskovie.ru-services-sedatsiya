# VK video grid design

## Goal

Fill the existing “Видео” section on the sedation page with the eight VK clips supplied by the client. Match the visual language of the clinic’s orthopaedy page while keeping the block lightweight and responsive.

## Approved approach

Use embedded VK players directly on the page. Do not add separate captions because clip titles are not available and should not be invented. The video frame itself provides the preview and playback control.

## Layout

- Desktop: three equal-width cards per row.
- Tablet: two cards per row.
- Mobile: one card per row.
- Maintain the current container width, heading typography, spacing rhythm, and rounded corners of the sedation page.
- Use a 16:9 media frame with a dark background; vertical clips remain centered inside the VK player.

## Video sources

Embed the following clips in the supplied order using VK’s external player URL (`video_ext.php`) with owner ID `-202085834`:

1. `456241100`
2. `456241491`
3. `456241327`
4. `456241063`
5. `456241204`
6. `456241175`
7. `456241399`
8. `456241520`

## Behaviour and accessibility

- Playback happens inside the page; users are not redirected to VK.
- Iframes use `loading="lazy"` so off-screen players do not block the initial page load.
- Each iframe receives a unique descriptive `title` such as “Видео о лечении во сне 1”.
- Allow autoplay only after user interaction, encrypted media, fullscreen, picture-in-picture, and screen wake lock.
- No custom JavaScript playback layer is required.

## Testing

- Automated test confirms that the section contains exactly eight VK iframe embeds and all supplied clip IDs.
- Automated test confirms lazy loading and accessible iframe titles.
- Browser checks at desktop and mobile widths confirm the expected column count, no horizontal overflow, and successful iframe loading.

## Out of scope

- Editing video content or VK metadata.
- Managing clips from a CMS in this static prototype.
- Adding captions before the client supplies approved titles.
