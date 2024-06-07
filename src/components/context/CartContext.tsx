'use client'
import { TImage } from "@/types/components/types"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const CartContext = createContext<ReturnType<typeof CartContextValues>|undefined>(undefined)

const CartContextValues = () => {
    const [cart, setCart] = useState<TImage[]>(localStorage.getItem('cart')!==null ? JSON.parse(localStorage.getItem('cart') as string) : [])
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])
    
    const findImageIndex = (_cart: TImage[], image: TImage) => {
        return _cart.findIndex((cartImage) => (
            cartImage.id === image.id
        )
        )
    }

    const addImageToCart = (image: TImage) => {
        if(!image.id) return toast.error("SKU not found")

        const prevCart = [...cart]

        // if Image is already in cart
        if(findImageIndex(prevCart, image) !== -1) return

        setCart((prev) => {
            return [...prev, image]
        })
    }

    const removeImageFromCart = (image: TImage) => {
        // check if product already exists in cart add the quantity
        const prevCart = [...cart]

        const index = findImageIndex(prevCart, image)

        if(index === -1) return

        setCart((prev) => {
            const newCart = [...prev]
            newCart.splice(index, 1)
            return newCart
        })
    }

    return {
        cart,
        setCart,
        addImageToCart,
        removeImageFromCart,
        findImageIndex,
        cartOpen,
        setCartOpen
    }
}

export const CartContextProvider = ({children}: PropsWithChildren) => {
    return (
      <CartContext.Provider value = {CartContextValues()}>
        {children}
      </CartContext.Provider>
    )
  }

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within an CartContextProvider');
    }
    return context;
};
