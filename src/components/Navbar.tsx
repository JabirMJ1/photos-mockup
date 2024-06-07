'use client'

import { BsCart3, BsHeart } from "react-icons/bs"
import BorderedButton from "./Buttons/BorderedButton"
import BorderlessButton from "./Buttons/BorderlessButton"
import { useCartContext } from "./context/CartContext"
import { useState } from "react"
import { BiUser } from "react-icons/bi"

const Navbar = () => {
  const {cart, setCartOpen, cartOpen} = useCartContext()

  return (
    <>
      <nav className="bg-black p-2 flex justify-between items-center max-w-screen ">
          <h1 className='text-xl font-bold text-white'>My Image Search</h1>

          <ul className="flex items-center space-x-2">
            <BorderlessButton className="text-white flex items-center space-x-2 min-w-min sm:w-max"><BsHeart className="text-lg"/> <span className="hidden sm:block">Sign in</span></BorderlessButton>
            <BorderlessButton className="text-white flex items-center space-x-2 min-w-min sm:w-max"><BsCart3 className="text-lg" onClick={() => setCartOpen(prev => !prev)}/> <span className="hidden sm:block">Cart {cart.length > 0 ? `(${cart.length})`: ''}</span></BorderlessButton>
            <BorderedButton className="text-white border-white flex items-center min-w-min sm:w-max space-x-2 "><BiUser className='text-lg'/><span className="hidden sm:block">Sign in</span></BorderedButton>
          </ul>
      </nav>
      {
        cartOpen && <div className="fixed top-0 right-0 h-full max-w-screen ">

        </div>
      }
    </>
  )
}

export default Navbar