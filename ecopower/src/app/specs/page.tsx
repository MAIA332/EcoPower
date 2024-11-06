"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Image from 'next/image';
import Submenu from '../components/submenu';
import Footer from '../components/footer';

const capacities = ['128 GB', '256 GB', '512 GB'];

const phoneSpecs = [
  {
    id: 1,
    dimensions: {
      height: '147,6 mm',
      width: '71,6 mm',
      thickness: '7,80 mm',
      weight: '170 gramas'
    },
    imageSrc: '/1188076-800-auto.webp',
    altText: 'Imagem de um telefone com altura: 147,6 mm, largura: 71,6 mm, espessura: 7,80 mm'
  },
  {
    id: 2,
    dimensions: {
      height: '160,9 mm',
      width: '77,8 mm',
      thickness: '7,80 mm',
      weight: '199 gramas'
    },
    imageSrc: '/218210.png',
    altText: 'Imagem de um telefone com altura: 160,9 mm, largura: 77,8 mm, espessura: 7,80 mm'
  }
];

function CapacitySection() {
  return (
    <div className="border-b border-gray-300 pb-8 mb-8 rounded-lg shadow-md p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Capacidade<sup className="text-sm text-gray-500">1</sup></h2>
      <div className="grid grid-cols-3 gap-4 text-lg text-center text-gray-700">
        {capacities.map((capacity, index) => (
          <div key={index} className="p-2 rounded-lg hover:bg-gray-100 transition duration-150">
            <p>{capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecsSection() {
  return (
    <div className="rounded-lg shadow-md p-6 bg-white mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tamanho e peso<sup className="text-sm text-gray-500">2</sup></h2>
      <div className="grid grid-cols-2 gap-8">
        {phoneSpecs.map((spec) => (
          <div key={spec.id} className="text-center p-4 rounded-lg hover:shadow-lg transition duration-150 bg-gray-50">
            <Image
              src={spec.imageSrc}
              alt={spec.altText}
              className="mx-auto mb-4 rounded-lg"
              width={200}
              height={200}
            />
            <p className="text-lg text-gray-700">Altura: {spec.dimensions.height}</p>
            <p className="text-lg text-gray-700">Largura: {spec.dimensions.width}</p>
            <p className="text-lg text-gray-700">Espessura: {spec.dimensions.thickness}</p>
            <p className="font-bold mt-2 text-gray-900">Peso: {spec.dimensions.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessorSection() {
  return (
    <div className="rounded-lg shadow-md p-6 bg-white mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Processador</h2>
      <div className="text-center p-4 rounded-lg bg-gray-50 hover:shadow-lg transition duration-150">
        <p className="text-lg text-gray-700">Modelo: Snapdragon 986</p>
        <p className="text-lg text-gray-700">Alta performance com eficiência energética aprimorada, ideal para multitarefas e jogos.</p>
      </div>
    </div>
  );
}

function LightChargeSection() {
  return (
    <div className="rounded-lg shadow-md p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tecnologia Light Charge</h2>
      <div className="text-center p-4 rounded-lg bg-gray-50 hover:shadow-lg transition duration-150">
        <p className="text-lg text-gray-700">Carregamento por energia solar</p>
        <p className="text-lg text-gray-700">
          Sistema inovador que permite carregar o dispositivo apenas com exposição à luz solar, oferecendo autonomia extra e sustentabilidade.
        </p>
      </div>
    </div>
  );
}

function Page() {
  const [isSubmenuFixed, setIsSubmenuFixed] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

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
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div
        id="submenu"
        className={`transition-all duration-200 ease-in-out bg-gray-100 ${isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100 transform translate-y-0' : 'relative transform translate-y'}`}
      >
        <Submenu />
      </div>
      <div className="container mx-auto p-8">
        <CapacitySection />
        <SpecsSection />
        <ProcessorSection />
        <LightChargeSection />
      </div>
      <Footer/>
    </div>
  );
}

export default Page;
