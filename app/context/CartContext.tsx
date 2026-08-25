'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Product } from '../data/products'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  product: Product
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  addProductsToCart: (products: Product[]) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  hydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'cart'

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)


  /* ============================================================
     LOAD CART ONCE
  ============================================================ */

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        const parsed = JSON.parse(stored)

        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
      setItems([])
    } finally {
      setHydrated(true)
    }
  }, [])


  /* ============================================================
     SAVE CART
  ============================================================ */

  useEffect(() => {
    if (!hydrated) return

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      )
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }, [items, hydrated])


  /* ============================================================
     CREATE ITEM
  ============================================================ */

  const createCartItem = (
    product: Product,
    quantity: number
  ): CartItem => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
    image: product.image,
    product,
  })


  /* ============================================================
     ADD SINGLE PRODUCT
  ============================================================ */

  const addToCart = (
    product: Product,
    quantity: number = 1
  ) => {
    if (!hydrated) return

    setItems((currentItems) => {
      const existing = currentItems.find(
        item => item.id === product.id
      )

      if (existing) {
        return currentItems.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      }

      return [
        ...currentItems,
        createCartItem(product, quantity),
      ]
    })
  }


  /* ============================================================
     ADD COMPLETE ROUTINE
  ============================================================ */

  const addProductsToCart = (
    productsToAdd: Product[]
  ) => {
    if (!hydrated || productsToAdd.length === 0) {
      return
    }

    setItems((currentItems) => {
      const nextItems = [...currentItems]

      productsToAdd.forEach(product => {
        const existingIndex = nextItems.findIndex(
          item => item.id === product.id
        )

        if (existingIndex !== -1) {
          nextItems[existingIndex] = {
            ...nextItems[existingIndex],
            quantity:
              nextItems[existingIndex].quantity + 1,
          }
        } else {
          nextItems.push(
            createCartItem(product, 1)
          )
        }
      })

      return nextItems
    })
  }


  /* ============================================================
     REMOVE
  ============================================================ */

  const removeFromCart = (id: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.id !== id)
    )
  }


  /* ============================================================
     UPDATE QUANTITY
  ============================================================ */

  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    )
  }


  /* ============================================================
     CLEAR
  ============================================================ */

  const clearCart = () => {
    setItems([])
  }


  /* ============================================================
     TOTALS
  ============================================================ */

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )


  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addProductsToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider'
    )
  }

  return context
}