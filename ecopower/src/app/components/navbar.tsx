import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Import icons from React Icons
import Submenu from "./submenu";

function Navbar() {
  return (
    <header className="top-0 left-0 w-full bg-white shadow z-10">
      <div className="container mx-auto py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div id="logo">
          <Link href="/">
            <Image src="/placeLogo-removebg-preview.png" alt="Logo" className="h-10" width={80} height={100} />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link href="/store" className="text-black">Loja</Link>
          <Link href="/" className="text-black">Sobre</Link>
        </nav>

        {/* Icons */}
        <div className="flex space-x-6 items-center">
          <Link href="/profile" aria-label="Profile">
            <FaUser className="text-gray-800 text-2xl hover:text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
