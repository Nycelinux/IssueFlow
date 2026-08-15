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

  test('close creates a new Ticket modal', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await page.getByTestId('newTicket-button').click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('modal-close-button').click();
    await expect(page.getByTestId('new-ticket-modal')).not.toBeVisible();
  });

  test(' deletes new created Ticket', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await page.getByTestId('newTicket-button').click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('ticketTitle').fill('Playwright Delete Test');
    await page.getByTestId('ticketDescription').fill('Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Critical');
    await page.getByRole('button', { name: 'Create Ticket' }).click();
    const ticket = page.locator('div', { hasText: 'Playwright Delete Test' }).last();
    await expect(ticket).toBeVisible();
    const deleteBtn = ticket.getByTestId(/^ticket-deleteBtn-/);
    await deleteBtn.click();
    const confirmDelete = await page.getByTestId('confirmDialog-delete');
    await confirmDelete.click();
    await expect(page.getByText('Playwright Delete Test')).not.toBeVisible();
  });

  test(' edit new created Ticket', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.goto('/');
    await page.getByTestId('newTicket-button').click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('ticketTitle').fill('Playwright Edit Test');
    await page.getByTestId('ticketDescription').fill('Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Critical');
    await page.getByRole('button', { name: 'Create Ticket' }).click();
    const ticket = page.locator('div', { hasText: 'Playwright Edit Test' }).last();
    await expect(ticket).toBeVisible();
    const editBtn = ticket.getByTestId(/^ticket-editBtn-/);
    await editBtn.click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('ticketTitle').fill('Playwright edit Test');
    await page.getByTestId('ticketDescription').fill('Edit Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Medium');
    await page.getByRole('button', { name: 'save changes' }).click();

    const editedticket = page.locator('div', { hasText: 'Playwright edit Test' }).last();
    await expect(editedticket).toBeVisible();

    const deleteBtn = editedticket.getByTestId(/^ticket-deleteBtn-/);
    await deleteBtn.click();
    const confirmDelete = await page.getByTestId('confirmDialog-delete');
    await confirmDelete.click();
    await expect(page.getByText('Playwright Delete Test')).not.toBeVisible();
  });
});
