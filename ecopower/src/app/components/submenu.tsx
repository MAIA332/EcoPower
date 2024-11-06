import React from 'react'
import Link from 'next/link'
import Button from './button';

function Submenu() {
  return (
    <div>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center bg-slate-100">
            <Link href='/'><h1 className="text-lg font-bold text-slate-950">Eco Power</h1></Link>
            <div className="flex space-x-4">
              <Button variant='sky-blue'>
                <Link href="/store">Comprar</Link>
              </Button>
              <Button variant='light'>
                <Link href="/specs">Especificações</Link>
              </Button>
            </div>
        </div>
    </div>
  )
}

export default Submenu
