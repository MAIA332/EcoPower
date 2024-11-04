"use client"
// components/Cart.tsx
import React, { useEffect } from 'react';
import Button from './button';

interface CartItem {
    id: string;
    name: string;
    price: number;
}

const Cart: React.FC<{ items: CartItem[]; onClose: () => void }> = ({ items, onClose }) => {
    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-4 z-30">
            <h2 className="text-xl font-bold">Seu Carrinho</h2>
            <button className="mt-4 mb-2 text-red-600" onClick={onClose}>Fechar</button>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="flex justify-between py-2">
                            <span>{item.name}</span>
                            <span>R$ {item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="border-t mt-4 pt-2">
                <h3 className="font-bold">Total: R$ {items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h3>
            </div>

            <Button
                className='mt-10'
                variant='dark'
            >
                Finalizar

            </Button>
        </div>
    );
};

export default Cart;
