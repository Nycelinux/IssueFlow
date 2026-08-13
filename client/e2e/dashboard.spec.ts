import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('loads Dashboard successfully', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await expect(page.getByText('Open Tickets', { exact: true })).toBeVisible();
    await expect(page.getByText('In Progress', { exact: true })).toBeVisible();
    await expect(page.getByText('Closed Tickets', { exact: true })).toBeVisible();
    await expect(page.getByText('Critical', { exact: true })).toBeVisible();
  });

  test('shows tickets on Dashboard', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await expect(page.getByText('Login Error', { exact: true })).toBeVisible();
    await expect(page.getByText('Cannot login', { exact: true })).toBeVisible();
  });

  test('creates a new Ticket', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await page.getByRole('button', { name: /create ticket/i }).click();
    await expect(page.getByRole('heading', { name: /add new ticket/i })).toBeVisible();
    await page.getByPlaceholder(/enter ticket title/i).fill('Playwright Test');
    await page.getByPlaceholder(/enter ticket description/i).fill('Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Critical');
    await page.getByRole('button', { name: /create ticket/i }).click();
    await expect(page.getByText('Playwright Test')).toBeVisible();
  });
});
