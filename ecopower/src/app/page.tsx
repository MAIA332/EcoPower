'use client'

// Home component
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/navbar";
import Image from "next/image";
import Card from "./components/card";
import data from "../../cards.json";
import Submenu from "./components/submenu";
import FadeInItem from "./components/fadein";
import TypebotBubble from "./components/typebotBubble";
import Carousel from "./components/carrousell";
import Button from "./components/button";
import Footer from "./components/footer";

const Home: React.FC = () => {
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

  type CarouselSlide = {
    src: string;
    alt: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonVariant: 'light' | 'dark' | 'disable'; 
  };


  const carouselSlides: CarouselSlide[] = [
    {
      src: "/sizeComp.avif",
      alt: "Banner Image 1",
      title: "Eco Power",
      description: "O poder do Light Charge chegou.",
      buttonText: "COMPRAR AGORA",
      buttonLink: "/store",
      buttonVariant: "light" as const, 
    },
    {
      src: "/placeholder2.avif",
      alt: "Banner Image 2",
      title: "Eficiência energética",
      description: "Economize bateria e ajude o meio ambiente!",
      buttonText: "SAIBA MAIS",
      buttonLink: "/about",
      buttonVariant: "dark" as const, 
    }
  ];


  return (
    <div className="bg-slate-950 !scroll-smooth">
      <Navbar />
      <TypebotBubble />

      <div
        id="submenu"
        className={`transition-all duration-200 ease-in-out bg-gray-100 ${isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100 transform translate-y-0' : 'relative transform translate-y'}`}
      >
        <Submenu />
      </div>
      {/* Carousel Banner */}
      <Carousel slides={carouselSlides} />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-100">Características e Benefícios Adicionais</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="cardsSc">
          {data.map((item) => (
            <FadeInItem key={item.id}>
              <Card
                imageSrc={item.imageSrc}
                title={item.title}
                text={item.text}
                linkRedirect={item.linkRedirect}
                linkText={item.linkText}
                id={item.id}
              />
            </FadeInItem>
          ))}
        </div>
      </div>
      <div>
      <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white text-center overflow-hidden">
      <FadeInItem>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/productRenderPlaceholder.mp4"
          autoPlay
          loop
          muted
        />
      </FadeInItem>

        <div className="text-xl mb-4 relative z-10">DESIGN</div>
        <h1 className="text-3xl font-bold mb-8 relative z-10">Mais inovação,<br />menos emissões
          <p><Button
              onClick={() => window.location.href = "/store"}
              variant={"light"}
              className="text-lg font-semibold mt-5"
            >
              Confira já!
            </Button>
          </p>
        </h1>
        
        <div className="absolute right-4 bottom-4 text-2xl text-white z-10">
         
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
