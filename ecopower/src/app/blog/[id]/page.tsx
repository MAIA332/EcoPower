'use client'

import React from 'react'
import Navbar from '../../components/navbar'
import Submenu from '../../components/submenu'
import cards from "../../../../cards.json"
import { useParams } from 'next/navigation'; // Import from next/navigation

function Blog() {
    const { id } = useParams(); // Use the new useParams hook

    const card = cards.find((card) => card.id === id);

    if (!card) return <p>Card não encontrado.</p>;

    return (
        <div className="bg-slate-100 h-screen">
            <Navbar />
            <Submenu />
            <div className="bg-black pt-20">
                <div className="max-w-screen-sm mx-auto py-10 h-screen">
                    <h1 className="text-4xl font-bold leading-tight mb-4 text-slate-100">
                        {card.title}
                    </h1>
                    <p className="text-sm text-gray-400 mb-6">
                        Por <span className="text-white font-bold">{card.author}</span> em {card.data}
                    </p>
                    {card.content[0].pharagraphs.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-slate-100">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blog
