import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
    imageSrc: string,
    title: string,
    text: string,
    linkText: string,
    id: string,
    className?: string;
};

const Card: React.FC<CardProps> = ({
    imageSrc = "",
    title = "",
    text = "",
    linkText = "",
    id = "",
    className = "" // Definindo um valor padrão
}) => {
    return (
        <div className={className}> {/* Aplicando a className aqui */}
            <div className="bg-black p-6 rounded-2xl">
                <Image src={imageSrc} alt="Carregamento Solar Inovador" className="mb-4" width={600} height={400} />
                <h2 className="text-xl font-bold mb-2 text-slate-100">{title}</h2>
                <p className="mb-4 text-slate-100">{text}</p>
                <Link href={`/blog/${id}`} className="text-green-500 font-bold">
                    {linkText} <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    );
};

export default Card;