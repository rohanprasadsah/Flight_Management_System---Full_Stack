import { useState } from "react";

const Footer = () => {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* About Us Section */}
      <section id="about" className="py-16 px-4 border-b border-indigo-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ✈️ About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-300">
                Your Trusted Flight Management Partner
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Flight Management System, where your journey begins
                with excellence. We are dedicated to providing seamless flight
                booking and management services that make your travel experience
                extraordinary.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With years of experience in the aviation industry, we understand
                that every journey matters. Our platform combines cutting-edge
                technology with personalized service to ensure your flights are
                managed with precision and care.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl mb-2">🌍</div>
                  <h4 className="text-xl font-semibold text-blue-300">
                    Global Reach
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Connecting you to destinations worldwide
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="text-xl font-semibold text-blue-300">
                    Secure & Safe
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Your safety and security is our priority
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-xl font-semibold text-blue-300">
                    Fast Booking
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Quick and easy flight reservations
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl mb-2">💎</div>
                  <h4 className="text-xl font-semibold text-blue-300">
                    Premium Service
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Exceptional customer experience
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <h4 className="text-2xl font-bold text-blue-300 mb-4">
                  Our Mission
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  To revolutionize air travel by providing an intuitive,
                  reliable, and comprehensive flight management platform that
                  empowers travelers to explore the world with confidence and
                  ease.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <h4 className="text-2xl font-bold text-purple-300 mb-4">
                  Our Vision
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  To become the world's most trusted flight management system,
                  connecting people, cultures, and opportunities across the
                  globe through seamless air travel experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              📞 Contact Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you with
              your flight management needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800 to-indigo-800 rounded-2xl p-8 h-full border border-indigo-700/50">
                <h3 className="text-2xl font-bold text-green-300 mb-6">
                  Get In Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 rounded-full p-3">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300">Email</h4>
                      <p className="text-gray-300">
                        support@flightmanagement.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 rounded-full p-3">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-300">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 rounded-full p-3">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">Address</h4>
                      <p className="text-gray-300">
                        123 Aviation Street
                        <br />
                        Sky City, SC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-600 rounded-full p-3">
                      <span className="text-2xl">🕒</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-300">Hours</h4>
                      <p className="text-gray-300">24/7 Customer Support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-indigo-700/50">
                  <h4 className="font-semibold text-blue-300 mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-colors duration-300">
                      <span className="text-xl">📘</span>
                    </button>
                    <button className="bg-sky-500 hover:bg-sky-600 rounded-full p-3 transition-colors duration-300">
                      <span className="text-xl">🐦</span>
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 rounded-full p-3 transition-colors duration-300">
                      <span className="text-xl">📷</span>
                    </button>
                    <button className="bg-blue-800 hover:bg-blue-900 rounded-full p-3 transition-colors duration-300">
                      <span className="text-xl">💼</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-800 to-purple-800 rounded-2xl p-8 h-full border border-purple-700/50">
                <h3 className="text-2xl font-bold text-green-300 mb-6">
                  Send us a Message
                </h3>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm transition-all duration-300">
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Assistance</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows="5"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    🚀 Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="bg-slate-900/80 py-8 px-4 border-t border-indigo-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9XbxURnujHTdyDvVSNOVPO2PLkl6m1-201g&sg"
                className="h-10 w-10 rounded-full border-2 border-white/20"
                alt="Flight Management Logo"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Flight Management System
                </h3>
                <p className="text-sm text-gray-400">
                  Your Gateway to the Skies
                </p>
              </div>
            </div>

            <div className="flex space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Contact
              </button>
              <span className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </span>
            </div>

            <p className="text-sm text-gray-400">
              © 2024 Flight Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
