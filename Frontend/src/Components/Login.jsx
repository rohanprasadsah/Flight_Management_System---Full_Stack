import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../Services/authService';
import { useAuth } from '../Context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await authService.login(formData.email, formData.password);
      
      // Update auth context with user data
      login({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role
      }, response.token);
      
      setMessage(`Login successful! Welcome ${response.name}`);
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 opacity-20"></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      
      {/* Login form */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
