import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    });
    await page.reload();
  });

  test('shows login form', async ({ page }) => {
    await expect(page.getByTestId('login-page')).toBeVisible();
    await expect(page.getByTestId('login-username')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('shows error for innvalid credentials', async ({ page }) => {
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('wrong-password');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
  });

  test('logs inwith valid credentials', async ({ page }) => {
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('admin1234');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('http://localhost:5173/login');
    await expect(page.getByTestId('login-page')).toBeVisible();
  });
});
