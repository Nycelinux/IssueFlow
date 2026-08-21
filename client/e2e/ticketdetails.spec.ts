import { test, expect } from '@playwright/test';
const API_URL = 'http://localhost:3001/tickets';
test.describe('TicketDetails', () => {
  test('opens ticket details', async ({ page, request }) => {
    const createResponse = await request.post(API_URL, {
      data: {
        title: 'Status Test ticket',
        description: 'Ticket used for status zeszing',
        priority: 'Medium',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdTicket = await createResponse.json();
    await page.goto('/');
    await page.locator('.ticket-card').first().locator('a').click();
    const details = page.getByTestId('ticket-details');
    await expect(details).toBeVisible();
    await expect(details.getByText(/Priority:/)).toBeVisible();
    await expect(details.getByText(/Status:/)).toBeVisible();
    await expect(details.getByText(/^ID$/)).toBeVisible();
    await request.delete(`http://localhost:3001/tickets/${createdTicket.id}`);
  });

  test('changes ticket status from ticket details', async ({ page, request }) => {
    const createResponse = await request.post(API_URL, {
      data: {
        title: 'Status Test ticket',
        description: 'Ticket used for status zeszing',
        priority: 'Medium',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdTicket = await createResponse.json();

    await page.goto('/');
    await page.locator('.ticket-card').first().locator('a').click();
    const details = page.getByTestId('ticket-details');
    const status = details.getByTestId('ticket-status');
    const statusBefore = await status.textContent();
    await page.getByRole('button', { name: /change status/i }).click();
    await expect(status).not.toHaveText(statusBefore!);
    const statusAfter = await status.textContent();

    expect(statusAfter).not.toBe(statusBefore);
    await request.delete(`http://localhost:3001/tickets/${createdTicket.id}`);
  });

  test('returns to dashboard from ticket details', async ({ page, request }) => {
    const createResponse = await request.post(API_URL, {
      data: {
        title: 'Status Test ticket',
        description: 'Ticket used for status zeszing',
        priority: 'Medium',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdTicket = await createResponse.json();
    await page.goto('/');
    const ticket = page.locator('.ticket-card').last().getByTestId('ticket-card-link');
    await ticket.click();
    await expect(page.getByTestId('ticket-details')).toBeVisible();
    await page.getByRole('link', { name: /back to dashboard/i }).click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
    await request.delete(`http://localhost:3001/tickets/${createdTicket.id}`);
  });

  test('deletes ticket from ticket details', async ({ page, request }) => {
    const createResponse = await request.post(API_URL, {
      data: {
        title: 'Status Test ticket',
        description: 'Ticket used for status zeszing',
        priority: 'Medium',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdTicket = await createResponse.json();

    await page.goto('/');

    await page.getByTestId('newTicket-button').click();
    await expect(page.getByTestId('new-ticket-modal')).toBeVisible();
    await page.getByTestId('ticketTitle').fill('Playwright delete Test');
    await page.getByTestId('ticketDescription').fill('Creaated with Playwright by me');
    await page.getByRole('combobox').selectOption('Critical');
    await page.getByRole('button', { name: 'Create Ticket' }).click();
    const ticket = page.locator('div', { hasText: 'Playwright delete Test' }).last();
    await expect(ticket).toBeVisible();

    const firstTicket = await page.locator('.ticket-card').first();
    const title = await firstTicket.locator('h3').textContent();
    await firstTicket.locator('a').click();
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });

    await page.getByRole('button', { name: /delete ticket/i }).click();
    await expect(page.getByTestId('dashboard')).toBeVisible();
    if (title) {
      await expect(page.getByText(title.trim())).not.toBeVisible();
    }
    await request.delete(`http://localhost:3001/tickets/${createdTicket.id}`);
  });
});
