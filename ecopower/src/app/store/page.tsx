"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Submenu from '../components/submenu'
import TypebotBubble from "../components/typebotBubble";
import Footer from '../components/footer'


function page() {
    const [isSubmenuFixed, setIsSubmenuFixed] = useState<boolean>(false);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);

    const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.scrollY;

    // Atualiza o estado do submenu com base na rolagem
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
    handleScroll(); // Chama a função de rolagem para definir o estado inicial

    return () => {
        window.removeEventListener("scroll", onScroll);
    };
    }, [handleScroll]);

  return (
    <div>
        <Navbar />
        <TypebotBubble />
        <div
        id="submenu"
        className=" bg-slate-50"
        >
        <div
        id="submenu"
        className={`transition-all duration-200 ease-in-out bg-gray-100 ${isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100 transform translate-y-0' : 'relative transform translate-y'}`}
        >
            <Submenu />
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
            {/* Background video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/abstract3.mp4"
                autoPlay
                loop
                muted
            />

            {/* Foreground content */}
            <div className="relative z-10">
                <h1 className="text-5xl font-semibold mb-2 text-white">Eco Power Pro</h1>
                <p className="text-xl mb-2 text-white">Uma obra-prima da inteligência.</p>
                <p className="text-lg mb-6 text-white">Confira em breve a disponibilidade.</p>
                <div className="flex space-x-4 mb-10">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-full">Saiba mais</button>
                    <button className="border border-white py-2 px-4 rounded-full text-white"><Link href="#products_cards">Ver preços</Link></button>
                </div>
            </div>
        </div>
      </div>
        <div className="container mx-auto p-4">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">Loja. <span className="font-normal">O melhor jeito de comprar o que você ama.</span></h1>
            </header>
            <section id='products_cards'>
                <h2 className="text-2xl font-bold mb-4">As novidades. <span className="font-normal">Veja o que acabou de chegar.</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-black text-white p-4 rounded-lg h-96">
                        <h3 className="text-xl font-bold">Eco Power Pro</h3>
                        <p>Feito para Apple Intelligence^</p>
                        <p>A partir de R$ 19.999</p>
                        <Image src="/50x50.svg" alt="Eco Power Pro" className="mt-4" width={100} height={100}/>
                    </div>
                    <div className="bg-white text-black p-4 rounded-lg h-96">
                        <h3 className="text-xl font-bold">iEco</h3>
                        <p>Feito para Apple Intelligence^</p>
                        <p>A partir de R$ 15.499</p>
                        <Image src="/50x50.svg" alt="iEco" className="mt-4"width={100} height={100}/>
                    </div>
                    <div className="bg-white text-black p-4 rounded-lg h-96">
                        <h3 className="text-xl font-bold">Eco mini</h3>
                        <p>Feito para Apple Intelligence^</p>
                        <p>A partir de R$ 7.499</p>
                        <Image src="/50x50.svg" alt="Eco mini" className="mt-4"width={100} height={100}/>
                    </div>
                    <div className="bg-black text-white p-4 rounded-lg h-96">
                        <h3 className="text-xl font-bold">NOVO</h3>
                        <h3 className="text-xl font-bold">Eco Power Z-flip</h3>
                        <p>O iPhone definitivo.</p>
                        <p>A partir de R$ 10.499</p>
                        <Image src="/50x50.svg" alt="iPhone 16 Pro" className="mt-4"width={100} height={100}/>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
    </div>
  )
}

export default page