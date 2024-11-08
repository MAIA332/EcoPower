/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Submenu from '../components/submenu'
import Footer from '../components/footer'
import Button from '../components/button'
import products from "../../../products.json"


function page() {
    const [isSubmenuFixed, setIsSubmenuFixed] = useState<boolean>(false);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    const [hasRenderedTypebot, setHasRenderedTypebot] = useState<boolean>(false); // Novo estado

  
    const handleScroll = useCallback(() => {
      const scrollY = window.scrollY || window.scrollY;
      if (scrollY === 0) {
        setIsSubmenuFixed(false);
      } else if (scrollY > prevScrollY) {
        setIsSubmenuFixed(true);
      } else {
        if (scrollY < 100) {
          setIsSubmenuFixed(false);
        }
      }
      setPrevScrollY(scrollY);
    }, [prevScrollY]);
  
    useEffect(() => {
      const onScroll = () => {
        requestAnimationFrame(handleScroll);
      };
      window.addEventListener("scroll", onScroll);
      handleScroll();
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }, [handleScroll]);

    useEffect(() => {
        if (!hasRenderedTypebot) {
          setHasRenderedTypebot(true);
        }
      }, [hasRenderedTypebot]);
  
    return (
      <div>
        <Navbar />
        {/* {hasRenderedTypebot && <TypebotBubble />} */}
        <div id="submenu" className="bg-slate-50">
          <div
            id="submenu"
            className={`transition-all duration-200 ease-in-out bg-gray-100 ${
              isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100 transform translate-y-0' : 'relative transform translate-y'
            }`}
          >
            <Submenu />
          </div>
          <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
            <video className="absolute top-0 left-0 w-full h-full object-cover" src="/abstract3.mp4" autoPlay loop muted />
            <div className="relative z-10">
              <h1 className="text-5xl font-semibold mb-2 text-white">Eco Power Pro</h1>
              <p className="text-xl mb-2 text-white">Uma obra-prima da inteligência.</p>
              <p className="text-lg mb-6 text-white">Confira em breve a disponibilidade.</p>
              <div className="flex space-x-4 mb-10">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full">Saiba mais</button>
                <button className="border border-white py-2 px-4 rounded-full text-white">
                  <Link href="#products_cards">Ver preços</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4">
                <header className="text-center my-8">
                    <h1 className="text-2xl md:text-4xl font-bold"><span className='text-pink-500'>Loja.</span> <span className="font-normal">O melhor jeito de comprar o que você ama.</span></h1>
                </header>
                <section id="products_cards">
                    <h2 className="text-xl md:text-2xl font-bold mb-4"><span className='text-purple-700'>As novidades.</span> <span className="font-normal">Veja o que acabou de chegar.</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white text-black p-4 rounded-lg shadow-lg flex flex-col justify-between h-96">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold">{product.name}</h3>
                                    <p className="text-sm md:text-base mt-1">{product.description}</p>
                                    <p className="text-sm mt-2 font-semibold">A partir de R${product.price},00</p>
                                    <Image
                                        src={product.image[0]}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="mx-auto mt-4"
                                    />
                                </div>
                                <div className="mt-4">
                                    <Link href={`/product/${product.id}?id=${product.id}`}>
                                        <Button variant="modern" className="w-full mt-2">Comprar</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default page;