import React from 'react';
import { Leaf, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = ({ setCurrentView }) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CarbonTrack</h3>
                <p className="text-green-200 text-sm">Track. Reduce. Sustain.</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering individuals and organizations to understand, track, and reduce their carbon footprint.
              Together, we can create a sustainable future for our planet.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentView('dashboard')} className="text-gray-300 hover:text-green-400 transition-colors">Dashboard</button></li>
              <li><button onClick={() => setCurrentView('insights')} className="text-gray-300 hover:text-green-400 transition-colors">Insights</button></li>
              <li><button onClick={() => setCurrentView('achievements')} className="text-gray-300 hover:text-green-400 transition-colors">Achievements</button></li>
              <li><button onClick={() => setCurrentView('about')} className="text-gray-300 hover:text-green-400 transition-colors">About Us</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">hello@carbontrack.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
            <span>© 2024 CarbonTrack. Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for our planet</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-green-400 transition-colors">Privacy Policy</button>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;