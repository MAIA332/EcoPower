'use client'

// Home component
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/navbar";
import Card from "./components/card";
import data from "../../cards.json";
import Submenu from "./components/submenu";
import FadeInItem from "./components/fadein";
import TypebotBubble from "./components/typebotBubble";
import Carousel from "./components/carrousell";
import Button from "./components/button";
import Footer from "./components/footer";
import Image from "next/image";

const Home: React.FC = () => {
  const [isSubmenuFixed, setIsSubmenuFixed] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string>("/ra.jpg");
  const [hasRenderedTypebot, setHasRenderedTypebot] = useState<boolean>(
    () => !!sessionStorage.getItem('hasRenderedTypebot')
  );


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

  const changeImage = (zoomLevel:string) => {
    let imageUrl = '';

    switch (zoomLevel) {
      case 'macro':
        imageUrl = '/ra.jpg';
        break;
      case '0.5x':
        imageUrl = '/05.jpg';
        break;
      case '1x':
        imageUrl = '/1.jpg';
        break;
      case '2x':
        imageUrl = '/2.jpg';
        break;
      default:
        imageUrl = '/ra.jpg';
    }

    setMainImage(imageUrl);
  };

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

  useEffect(() => {
    if (!hasRenderedTypebot) {
      setHasRenderedTypebot(true);
      sessionStorage.setItem('hasRenderedTypebot', 'true');
    }
  }, [hasRenderedTypebot]);

  const carouselSlides: CarouselSlide[] = [
    {
      src: "/photo-1730653223607-d06982f92a74.avif",
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
      buttonLink: "/store",
      buttonVariant: "dark" as const, 
    }
  ];

  return (
    <div className="bg-white !scroll-smooth">
      <Navbar />
      {hasRenderedTypebot && <TypebotBubble />}

      <div
        id="submenu"
        className={`transition-all duration-200 ease-in-out bg-gray-100 ${isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100 transform translate-y-0' : 'relative transform translate-y'}`}
      >
        <Submenu />
      </div>
      <Carousel slides={carouselSlides} />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Características e Benefícios Adicionais</h1>
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
        <h1 className="text-3xl font-bold mb-8 relative z-10">
          Mais inovação,<br />menos emissões
          <p>
            <Button
              onClick={() => window.location.href = "/store"}
              variant={"light"}
              className="text-lg font-semibold mt-5"
            >
              Confira já!
            </Button>
          </p>
        </h1>
      </div>
      <FadeInItem>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-5xl font-bold leading-tight mb-4">Câmera ultra-angular.<br/>Riqueza de detalhes<br/>para mais ou para menos.</h1>
        <p className="text-lg text-gray-500">
          A nova câmera ultra-angular com foco automático faz <span className="font-bold">fotos e vídeos macro</span> com <span className="font-bold">detalhes nítidos e surpreendentes</span>. Você também pode enquadrar <span className="font-bold">planos mais abertos</span> sem precisar dar passos para trás. E, com mais aproveitamento dos pixels e abertura maior, ela captura até <span className="font-bold">2,6 vezes mais luz</span> para elevar a qualidade da imagem, mesmo com pouca iluminação.
        </p>
      </div>
      </FadeInItem>
      <FadeInItem>
      <div className="text-center py-10">
        <Image
          id="mainImage"
          alt="A green frog with red eyes and orange feet on a blue background"
          className="mx-auto"
          height="400"
          src={mainImage}
          width="800"
        />
        
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded-full" onClick={() => changeImage('macro')}>Macro</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-full" onClick={() => changeImage('0.5x')}>0,5x</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-full" onClick={() => changeImage('1x')}>1x</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-full" onClick={() => changeImage('2x')}>2x</button>
        </div>
      </div>
      </FadeInItem>
      <FadeInItem>

      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-5xl font-bold leading-tight mb-4"><span className="text-pink-500">Novo sistema de câmera.</span><br/>Escolha por qual lente<br/>você quer ver o mundo.</h1>
        <p className="text-lg text-gray-500">
          A nova câmera ultra-angular com foco automático faz <span className="font-bold">fotos e vídeos macro</span> com <span className="font-bold">detalhes nítidos e surpreendentes</span>. Você também pode enquadrar <span className="font-bold">planos mais abertos</span> sem precisar dar passos para trás. E, com mais aproveitamento dos pixels e abertura maior, ela captura até <span className="font-bold">2,6 vezes mais luz</span> para elevar a qualidade da imagem, mesmo com pouca iluminação.
        </p>
      </div>
      </FadeInItem>
      <FadeInItem>
      <Image
          id="mainImage"
          alt="A green frog with red eyes and orange feet on a blue background"
          className=""
          height="400"
          src="/hero_camera__bsixees3ujte_xlarge.jpg"
          width="800"
        />
        </FadeInItem>

      <Footer />
    </div>
  );
}

export default Home;
