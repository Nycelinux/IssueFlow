import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('loads Dashboard successfully', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await expect(page.getByTestId('statistics-open')).toBeVisible();
    await expect(page.getByTestId('statistics-inProgress')).toBeVisible();
    await expect(page.getByTestId('statistics-closed')).toBeVisible();
    await expect(page.getByTestId('statistics-critical')).toBeVisible();
  });

  test('shows tickets on Dashboard', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await expect(page.getByTestId('dashboard-content')).toBeVisible();
  });

  test('creates a new Ticket', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await page.getByTestId('newTicket-button').click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('ticketTitle').fill('Playwright Test');
    await page.getByTestId('ticketDescription').fill('Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Critical');
    await page.getByRole('button', { name: 'Create Ticket' }).click();
    await expect(page.getByText('Playwright Test')).toBeVisible();
  });
});
