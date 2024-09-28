import React from 'react';
import ScreenIndicator from '@/components/utils/ScreenIndicator';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-2 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">App</a></li>
              <li><a href="#" className="hover:underline">Analytics</a></li>
              <li><a href="#" className="hover:underline">Token List</a></li>
              <li><a href="#" className="hover:underline">Defi</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-2 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-2 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-2 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.559c-.883.392-1.832.658-2.825.775a4.92 4.92 0 0 0 2.165-2.717 9.827 9.827 0 0 1-3.13 1.197A4.915 4.915 0 0 0 16.96 2a4.918 4.918 0 0 0-4.924 4.924c0 .386.044.762.127 1.126-4.088-.205-7.72-2.16-10.219-5.354-13.093-.713 1.228-1.122 2.657-1.122 4.177 0 2.87 1.463 5.393 3.7 6.859a4.934 4.934 0 0 1-2.228-.616v.062a4.922 4.922 0 0 0 3.95 4.825 4.934 4.934 0 0 1-2.222.084 4.926 4.926 0 0 0 4.596 3.418A9.867 9.867 0 0 1 0 19.547a13.894 13.894 0 0 0 7.548 2.211c9.055 0 14.017-7.498 14.017-14.018 0-.214-.006-.427-.014-.639A10.03 10.03 0 0 0 24 4.559z" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.23 5.924c-.79.35-1.633.588-2.522.695a4.475 4.475 0 0 0 1.962-2.476 8.915 8.915 0 0 1-2.828 1.084A4.47 4.47 0 0 0 16.618 4c-2.483 0-4.496 2.018-4.496 4.501 0 .352.042.694.12 1.022a12.747 12.747 0 0 1-9.274-4.684 4.477 4.477 0 0 0-.61 2.265c0 1.564.798 2.945 2.004 3.755a4.449 4.449 0 0 1-2.036-.564v.057c0 2.19 1.558 4.017 3.623 4.425a4.48 4.48 0 0 1-2.023.076c.573 1.785 2.235 3.084 4.205 3.124a8.96 8.96 0 0 1-5.557 1.916c-.359 0-.712-.021-1.059-.063a12.741 12.741 0 0 0 6.91 2.025c8.297 0 12.838-6.86 12.838-12.82 0-.195-.005-.39-.014-.585a9.174 9.174 0 0 0 2.25-2.318z" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.29c-5.335 0-9.72 4.235-9.72 9.745 0 4.233 2.7 7.803 6.435 9.098.473.086.646-.207.646-.459 0-.227-.008-.831-.012-1.628-2.623.556-3.172-1.267-3.172-1.267-.428-1.087-1.045-1.375-1.045-1.375-.855-.585.065-.573.065-.573.946.067 1.512.972 1.512.972.839 1.434 2.2 1.019 2.735.781.084-.608.329-1.019.598-1.256-2.096-.24-4.295-1.051-4.295-4.684 0-1.036.373-1.889.989-2.559-.099-.241-.429-1.211.094-2.528 0 0 .81-.26 2.65 1.006.723-.201 1.5-.301 2.276-.304.775.003 1.551.103 2.274.304 1.838-1.267 2.647-1.006 2.647-1.006.527 1.317.191 2.287.093 2.528.616.67.988 1.523.988 2.559 0 3.651-2.208 4.439-4.316 4.676.345.298.655.887.655 1.781 0 1.287-.011 2.32-.011 2.638 0 .252.174.548.655.459 1.062-1.295 3.015-4.184 5.184-8.007 5.184" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} EsiOverlow. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
