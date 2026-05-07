import { test, expect } from '@playwright/test';
import crypto from 'crypto';

function md5(buf: Buffer): string {
  return crypto.createHash('md5').update(buf).digest('hex');
}

test('canvas is actively rendering (frames change over time)', async ({ page }) => {
  await page.goto('/');

  // Wait for boot and first rendered frame.
  await page.waitForTimeout(3_000);

  const canvas = page.locator('canvas').first();

  const shot1 = await canvas.screenshot();
  await page.waitForTimeout(1_000);
  const shot2 = await canvas.screenshot();

  expect(
    md5(shot1),
    'Canvas screenshot did not change after 1 second — game may not be rendering',
  ).not.toBe(md5(shot2));
});
