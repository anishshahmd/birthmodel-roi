import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:demo@birthmodel.com" className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                demo@birthmodel.com
              </a>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                (555) 123-4567
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Innovation Drive, Suite 100
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/benefits" className="hover:text-blue-400">Benefits</a></li>
              <li><a href="/calculator" className="hover:text-blue-400">ROI Calculator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400">
              Stay updated with the latest in AI-driven maternal care solutions.
              Follow us on social media for news and updates.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} BirthModel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;