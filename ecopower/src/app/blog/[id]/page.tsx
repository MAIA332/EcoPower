'use client'

import React from 'react'
import Navbar from '../../components/navbar'
import Submenu from '../../components/submenu'
import cards from "../../../../cards.json"
import { useParams } from 'next/navigation';

function Blog() {
    const { id } = useParams();

    const card = cards.find((card) => card.id === id);

    if (!card) return <p>Card não encontrado.</p>;

    return (
        <div className="bg-slate-100">
            <Navbar />
            <Submenu />
            <div className="bg-slate-950 pt-20 h-full">
                <div className="max-w-screen-sm mx-auto py-10 h-screen overflow-auto">
                    <h1 className="text-4xl font-bold leading-tight mb-6 text-slate-100">
                    {card.title}
                    </h1>
                    <p className="text-sm text-gray-400 mb-6">
                    Por <span className="text-white font-bold">{card.author}</span> em {card.data}
                    </p>
                    {card.content.map((item, index) => (
                    <div key={index} className="bg-slate-800 w-full rounded-lg p-6 mb-6">
                        <h2 className="text-white text-2xl font-bold leading-tight mb-4">
                        {item.subtitle}
                        </h2>
                        {item.pharagraphs.map((paragraph, index) => (
                        <p key={index} className="text-white mb-4">
                            {paragraph}
                        </p>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blog
