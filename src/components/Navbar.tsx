'use client'

import { BsCart3, BsCartX, BsHeart } from "react-icons/bs"
import BorderedButton from "./Buttons/BorderedButton"
import BorderlessButton from "./Buttons/BorderlessButton"
import { useCartContext } from "./context/CartContext"
import { useRef, useState } from "react"
import { BiUser } from "react-icons/bi"
import Image from "next/image"
import { IMAGE_SIZES } from "@/constants"
import Link from "next/link"
import { TImage } from "@/types/components/types"
import { FaTimes } from "react-icons/fa"

const Navbar = () => {
  const {cart, setCartOpen, cartOpen, removeImageFromCart} = useCartContext()

  let imageGroups: TImage[][] = []

  cart.length && [...Array(Math.ceil(cart.length / 2))].forEach((_, key) => {
      imageGroups.push(cart.slice((key * 2), (key * 2) + 2)) 
  })

  return (
    <>
      <nav className="bg-black p-2 flex justify-between items-center max-w-screen ">
          <h1 className='text-xl font-bold text-white'>My Image Search</h1>

          <ul className="flex items-center space-x-2">
            <BorderlessButton className="text-white flex items-center space-x-2 min-w-min sm:w-max"><BsHeart className="text-lg"/> <span className="hidden sm:block">Sign in</span></BorderlessButton>
            <BorderlessButton onClick={() => setCartOpen(prev => !prev)} className="text-white flex items-center space-x-2 min-w-min sm:w-max"><BsCart3 className="text-lg"/> <span className="hidden sm:block">Cart {cart.length > 0 ? `(${cart.length})`: ''}</span></BorderlessButton>
            <BorderedButton className="text-white border-white flex items-center min-w-min sm:w-max space-x-2 "><BiUser className='text-lg'/><span className="hidden sm:block">Sign in</span></BorderedButton>
          </ul>
      </nav>
      {
        cartOpen && <div className="fixed top-0 right-0 h-full max-w-screen bg-white border w-[350px] z-50 overflow-y-auto p-2 space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="py-2 text-base font-bold">Cart</h1>

            <button type="button" onClick={() => setCartOpen(false)}><FaTimes className="text-lg hover:text-gray-300"/></button>
          </div>
          {
            cart.length > 0 && cart.map((image, key) => {
                      return <div key = {key} className="relative group" title={image.alt}>
                      <div className="absolute z-10 w-full h-full bg-black bg-opacity-20 hidden group-hover:flex p-2 flex-col justify-between">
                          <div>
                              <Link href={image.photographer_url} target="_blank">
                                  <p className="text-white truncate leading-1 max-w-full">
                                      <span className="bg-gray-400 text-white font-bold p-1.5 rounded aspect-square inline-block">{image.photographer.slice(0,2)}</span>
                                      <span className="font-bold text-sm pl-1">{image.photographer}</span> - {image.alt}
                                  </p>
                              </Link>
                          </div>

                          <div className="flex justify-end space-x-2 flex-wrap">
                              <button 
                                  onClick={() => removeImageFromCart(image)}
                                  type = "button" 
                                  className="text-white bg-black bg-opacity-90 hover:bg-red-400 hover:text-black hover:bg-opacity-100 rounded p-3">
                                      <BsCartX className="text-lg"/>
                              </button>
                          </div>
                      </div>
                      <Image
                          src = {image.src[IMAGE_SIZES.SMALL]}
                          alt={image.alt}
                          quality={10}
                          width={image.width}
                          height={image.height}
                          className="object-cover"
                      />
                  </div>
            })
          }
          
        </div>
          }
      </>

  )
}

export default Navbar