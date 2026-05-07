import { test, expect } from '@playwright/test';

test('page title contains game name', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Desaix Snake Slayer/i);
});

test('canvas element is in DOM with non-zero dimensions', async ({ page }) => {
  await page.goto('/');

  const canvas = page.locator('canvas').first();
  await canvas.waitFor({ state: 'attached', timeout: 5_000 });

  const width  = await canvas.evaluate((el: HTMLCanvasElement) => el.width);
  const height = await canvas.evaluate((el: HTMLCanvasElement) => el.height);

  expect(width).toBeGreaterThan(0);
  expect(height).toBeGreaterThan(0);
});

test('no console errors during first 10 seconds', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await page.waitForTimeout(10_000);

  expect(errors, `Console errors: ${errors.join('\n')}`).toHaveLength(0);
});

test('no failed network requests during initial load', async ({ page }) => {
  const failures: string[] = [];

  page.on('response', (res) => {
    if (res.status() >= 400) failures.push(`${res.status()} ${res.url()}`);
  });

  await page.goto('/');
  // Allow a short window for deferred asset loads triggered by the game engine.
  await page.waitForTimeout(3_000);

  expect(failures, `Failed requests:\n${failures.join('\n')}`).toHaveLength(0);
});
