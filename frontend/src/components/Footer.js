import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">🥡 KGN</h3>
            <p className="text-gray-300 mb-4">Authentic Indo-Chinese cuisine crafted with passion.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#menu" className="hover:text-yellow-300 transition">Menu</a></li>
              <li><a href="#reservations" className="hover:text-yellow-300 transition">Book a Table</a></li>
              <li><a href="#about" className="hover:text-yellow-300 transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-yellow-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><Clock size={16} /> Mon-Thu: 11 AM - 10 PM</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Fri-Sat: 11 AM - 11 PM</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Sun: 12 PM - 10 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><MapPin size={16} /> 123 Main Street, City</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail size={16} /> info@kgnrestaurant.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} KGN Chinese Corner. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
