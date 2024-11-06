import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="top-0 left-0 w-full bg-white shadow z-10 relative">
      <div className="container mx-auto py-4 flex justify-between items-center relative z-20">
        <div id="logo">
          <Link href="/">
            <Image src="/placeLogo-removebg-preview.png" alt="Logo" className="h-10" width={80} height={100} />
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <FaTimes className="text-2xl text-black" /> : <FaBars className="text-2xl text-black" />}
          </button>
        </div>

        <nav
          className={`lg:flex space-x-4 fixed lg:relative top-0 left-0 w-full lg:w-auto lg:top-auto lg:left-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 z-30`}
        >
          <Link href="/store" className="block lg:inline-block py-2 px-4 text-black">Loja</Link>
          <Link href="/" className={`block lg:inline-block py-2 ${isMobileMenuOpen?``:`px-4`} text-black`}>Sobre</Link>
        </nav>

        <div className="hidden lg:flex space-x-6 items-center">
          <Link href="/profile" aria-label="Profile">
            <FaUser className="text-gray-800 text-2xl hover:text-gray-600" />
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMobileMenu} // Fecha o menu ao clicar no overlay
        />
      )}
    </header>
  );
}

export default Navbar;
