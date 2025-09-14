const API_BASE_URL = 'http://localhost:8080/auth';

class AuthService {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(name, email, password, role) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role })
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return await response.json();
  }
}

export default new AuthService();
