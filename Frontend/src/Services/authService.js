// Simple authentication service - just sends credentials to backend
const API_BASE_URL = 'http://localhost:8080/auth';

class AuthService {
  // Login user - just send credentials to backend
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }

  // Register user - just send details to backend
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
