'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-bold text-2xl">Change the Narrative</span>
              <span className="text-accent font-extrabold ml-1">333</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">About</Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Blog</Link>
            <Link href="/donate" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">Donate</Link>
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-accent text-white hover:bg-accent/90">Get Help</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-300">Home</Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-300">About</Link>
            <Link href="/blog" className="block text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-300">Blog</Link>
            <Link href="/donate" className="block text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-300">Donate</Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-accent text-white hover:bg-accent/90">Get Help</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
