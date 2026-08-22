import type { LoginResponse } from '../auth/types';

const API_URL = 'http://localhost:3001';

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error('Invalid username or password');
  }
  return response.json();
}
