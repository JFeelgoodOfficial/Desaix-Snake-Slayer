import { test, expect } from '@playwright/test';

const CANONICAL = 'https://dss-flame.vercel.app/';

test('meta description exists and is non-empty', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[name="description"]').getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.trim().length).toBeGreaterThan(0);
});

test('og:title exists and is non-empty', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[property="og:title"]').getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.trim().length).toBeGreaterThan(0);
});

test('og:description exists and is non-empty', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[property="og:description"]').getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.trim().length).toBeGreaterThan(0);
});

test('og:image exists and is non-empty', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.trim().length).toBeGreaterThan(0);
});

test('og:url exists and is non-empty', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[property="og:url"]').getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.trim().length).toBeGreaterThan(0);
});

test('page title contains game name', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Desaix Snake Slayer/i);
});

test('canonical link points to production URL', async ({ page }) => {
  await page.goto('/');
  const href = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(href).toBe(CANONICAL);
});

test('JSON-LD VideoGame schema is present and valid', async ({ page }) => {
  await page.goto('/');

  const ldText = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();

  expect(ldText).toBeTruthy();

  let parsed: Record<string, unknown>;
  expect(() => { parsed = JSON.parse(ldText!); }).not.toThrow();

  expect(parsed!['@type']).toBe('VideoGame');
});
