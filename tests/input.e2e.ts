import { test, expect } from '@playwright/test';
import crypto from 'crypto';

function md5(buf: Buffer): string {
  return crypto.createHash('md5').update(buf).digest('hex');
}

test('keyboard / touch input changes the canvas', async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name.toLowerCase().includes('mobile');

  await page.goto('/');
  await page.waitForTimeout(3_000);

  const canvas = page.locator('canvas').first();
  const shot1 = await canvas.screenshot();

  if (isMobile) {
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not found');

    const cx = box.x + box.width  / 2;
    const cy = box.y + box.height / 2;
    const d  = Math.min(box.width, box.height) * 0.2;

    // Tap center to focus the canvas.
    await page.touchscreen.tap(cx, cy);
    await page.waitForTimeout(100);

    // Four directional swipes using mouse (translated to touch in mobile context).
    for (const [sx, sy, ex, ey] of [
      [cx, cy + d, cx, cy - d],  // up
      [cx, cy - d, cx, cy + d],  // down
      [cx + d, cy, cx - d, cy],  // left
      [cx - d, cy, cx + d, cy],  // right
    ]) {
      await page.mouse.move(sx, sy);
      await page.mouse.down();
      await page.mouse.move(ex, ey, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(200);
    }
  } else {
    // Desktop: keyboard input.
    await canvas.click();
    for (const key of ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']) {
      await page.keyboard.press(key);
      await page.waitForTimeout(200);
    }
  }

  await page.waitForTimeout(1_000);
  const shot2 = await canvas.screenshot();

  expect(
    md5(shot1),
    `Canvas did not change after ${isMobile ? 'touch' : 'keyboard'} input — input may not be wired up`,
  ).not.toBe(md5(shot2));
});
