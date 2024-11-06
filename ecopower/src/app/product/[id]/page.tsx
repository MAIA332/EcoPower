"use client"
// Product.tsx

import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar';
import Submenu from '@/app/components/submenu';
import Footer from '@/app/components/footer';
import Cart from '@/app/components/cart';
import { FaShoppingCart } from 'react-icons/fa';
import productsData from "../../../../products.json";
import { useSearchParams  } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/components/button';

interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
}

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div>
            <div
                className="py-4 border-b border-gray-300 flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </div>
            {isOpen && <div className="py-4">{answer}</div>}
        </div>
    );
};

const Product: React.FC = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    console.log("id",id);
    

    const [product, setProduct] = useState<ProductData | null>(null);
    const [isSubmenuFixed, setIsSubmenuFixed] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [cartItems, setCartItems] = useState<ProductData[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        if (scrollY === 0) {
            setIsSubmenuFixed(false);
        } else if (scrollY > prevScrollY) {
            setIsSubmenuFixed(true);
        } else if (scrollY < 100) {
            setIsSubmenuFixed(false);
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
        if (id) {
            const foundProduct = productsData.find((item) => item.id === id);

            console.log("found product",foundProduct);
            
            if (foundProduct) {
                setProduct({
                    ...foundProduct,
                    price: Number(foundProduct.price),
                    image: Array.isArray(foundProduct.image) ? foundProduct.image : [foundProduct.image]
                });
            }
        }
    }, [id]);

    console.log(product);
    

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const addToCart = (item: ProductData) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <Navbar />
            
            {isCartOpen && <Cart items={cartItems} onClose={toggleCart} />}
            <div
                id="submenu"
                className={`transition-all duration-200 ease-in-out bg-gray-100 ${isSubmenuFixed ? 'fixed left-0 right-0 top-0 z-20 opacity-100' : 'relative'}`}
            >
                <Submenu />
            </div>
            
            <div className="max-w-screen-lg mx-auto p-4">
                <button onClick={toggleCart} className=" right-4 top-4">
                    {cartItems.length > 0 && <span className="bg-red-500 text-white rounded-full px-2">{cartItems.length}</span>}
                    <FaShoppingCart className="text-gray-800 text-2xl hover:text-gray-600" />
                </button>
                <div className="text-center">
                    <p className="text-red-600 font-bold">Novo</p>
                    <h1 className="text-4xl font-bold">Comprar {product.name}</h1>
                    <p className="text-lg mt-2">A partir de R$ {product.price},00</p>
                </div>
                <div className="flex flex-col lg:flex-row mt-8">
                    <div className="lg:w-1/3 lg:pr-8">
                        <div className="mt-4 space-y-4">
                            <div className="border rounded-lg p-4 flex flex-col">
                                <div>
                                    <p className="font-bold">{product.name}</p>
                                    <p className="text-gray-500">{product.description}</p>
                                </div>
                                <p className="font-bold justify-start">R$ {product.price},00</p>
                                <Button variant='dark' onClick={() => addToCart(product)}>Adicionar</Button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/3 flex justify-center mt-8 lg:mt-0">
                        {product.image?.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`${product.name} image ${index + 1}`}
                                className="w-1/2 max-w-xs"
                                width={900}
                                height={900}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Perguntas frequentes</h1>
                <div className="border-t border-gray-300">
                    <FAQItem 
                        question="Por que o EcoPower é considerado um smartphone sustentável?" 
                        answer="O EcoPower é desenvolvido com materiais reciclados e recicláveis, e utiliza um sistema de gerenciamento de energia otimizado para reduzir o consumo de bateria e o impacto ambiental. Além disso, para cada EcoPower vendido, uma árvore é plantada, ajudando a compensar a pegada de carbono."
                    />
                    <FAQItem 
                        question="Como o sistema de gerenciamento de energia do EcoPower funciona?" 
                        answer="O EcoPower conta com uma bateria de longa duração e um sistema inteligente de gerenciamento de energia que otimiza o uso, prolongando o tempo entre recargas e garantindo menor consumo de energia, sem comprometer o desempenho."
                    />
                    <FAQItem 
                        question="O EcoPower é durável?" 
                        answer="Sim, o EcoPower foi projetado para resistir ao desgaste diário. Sua estrutura robusta e a utilização de materiais duráveis aumentam a vida útil do aparelho, reduzindo a necessidade de trocas frequentes."
                    />
                    <FAQItem 
                        question="Quais são as opções de compra disponíveis?" 
                        answer="Você pode adquirir o EcoPower em nosso site oficial, em lojas parceiras e em lojas físicas. Aceitamos diversas formas de pagamento, incluindo cartões de crédito, débito e opções de parcelamento."
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;
