import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo ou Nome da Empresa */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl font-bold text-white">Eco Power</h1>
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
          <a href="#about" className="hover:text-white">
            Sobre Nós
          </a>
          <a href="#products" className="hover:text-white">
            Produtos
          </a>
          <a href="#benefits" className="hover:text-white">
            Benefícios
          </a>
          <a href="#contact" className="hover:text-white">
            Contato
          </a>
        </nav>

        {/* Redes Sociais */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-6">
        &copy; {new Date().getFullYear()} Eco Power. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
