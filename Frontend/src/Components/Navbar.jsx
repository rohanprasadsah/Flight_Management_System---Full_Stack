import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const getNavLinks = () => {
    const baseLinks = [
      { path: "/", name: "🏠 Home", icon: "✈️", isRoute: true },
      { path: "#about", name: "ℹ️ About Us", icon: "🏢", isRoute: false },
      { path: "#contact", name: "📞 Contact Us", icon: "📧", isRoute: false },
    ];

    if (isLoggedIn) {
      return [
        ...baseLinks.slice(0, 1), // Home
        { path: "/add", name: "➕ Add Flight", icon: "🛫", isRoute: true },
        ...baseLinks.slice(1), // About, Contact
      ];
    } else {
      return [
        ...baseLinks.slice(0, 1), // Home
        { path: "/login", name: "🔐 Login", icon: "👤", isRoute: true },
        ...baseLinks.slice(1), // About, Contact
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-2xl sticky top-0 z-50 border-b-4 border-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9XbxURnujHTdyDvVSNOVPO2PLkl6m1-201g&sg"
                className="relative h-12 w-12 rounded-full border-2 border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-300"
                alt="Flight Management Logo"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors duration-300">
                Flight Management
              </h1>
              <p className="text-indigo-100 text-sm font-medium hidden sm:block">
                Your Gateway to the Skies
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                      isActive(link.path)
                        ? "bg-white/20 text-white shadow-xl border-2 border-white/30 backdrop-blur-sm"
                        : "text-indigo-100 hover:bg-white/10 hover:text-white hover:shadow-lg border-2 border-transparent"
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name.split(" ").slice(1).join(" ")}
                  </Link>
                ) : (
                  <a
                    key={link.path}
                    href={link.path}
                    className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 text-indigo-100 hover:bg-white/10 hover:text-white hover:shadow-lg border-2 border-transparent"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name.split(" ").slice(1).join(" ")}
                  </a>
                )
              )}

              {/* User info and logout when logged in */}
              {isLoggedIn && user && (
                <div className="flex items-center space-x-4 ml-6">
                  <div className="text-white text-sm">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-indigo-200 text-xs">{user.role}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-indigo-100 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <div
                  className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-indigo-700 to-purple-700 border-t border-indigo-500/50">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-white/20 text-white shadow-lg border-l-4 border-yellow-400"
                    : "text-indigo-100 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name.replace(/^[^\s]+\s/, "")}
              </Link>
            ) : (
              <a
                key={link.path}
                href={link.path}
                className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 text-indigo-100 hover:bg-white/10 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name.replace(/^[^\s]+\s/, "")}
              </a>
            )
          )}

          {/* Mobile user info when logged in */}
          {isLoggedIn && user && (
            <div className="px-4 py-3 bg-indigo-800 rounded-lg mx-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="text-white text-sm">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-indigo-300 text-xs">{user.role}</div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors duration-300"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400"></div>
    </nav>
  );
};

export default Navbar;
