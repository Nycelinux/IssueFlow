import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';
import { loginUser } from '../api/auth';

vi.mock('../api/auth.ts', () => ({
  loginUser: vi.fn(),
}));

function TestComponent() {
  const { user, token, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="username">{user?.username ?? 'not-logged-in'}</span>
      <span data-testid="token">{token ?? 'no-token'}</span>
      <span data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</span>

      <button onClick={() => login('admin', 'admin1234')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('starts unauthenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByTestId('username')).toHaveTextContent('not-logged-in');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('logs in successfully', async () => {
    vi.mocked(loginUser).mockResolvedValue({
      token: 'test-token',
      user: { id: 1, username: 'admin', role: 'Admin' },
    });
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByTestId('username')).toHaveTextContent('admin');
    expect(screen.getByTestId('token')).toHaveTextContent('test-token');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');

    expect(localStorage.getItem('authToken')).toBe('test-token');
    expect(localStorage.getItem('authUser')).toContain('admin');
  });
  it('logs out successfully', async () => {
    localStorage.setItem('authToken', 'test-token');
    localStorage.setItem('authUser', JSON.stringify({ id: 1, username: 'admin', role: 'Admin' }));

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('authUser')).toBeNull();
  });
});
