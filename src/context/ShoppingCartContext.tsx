import { createContext, useContext, ReactNode, useState } from "react";

type ShoppingCardProviderProps = {
    children: ReactNode
};

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
};

type CartItem  = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCardProvider ({ children }: ShoppingCardProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    function getItemQuantity(id: number) {
        return cartItems?.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const itemExists = currItems.find(item => item.id === id);
            if (itemExists) {
                return currItems.map(item => 
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...currItems, { id, quantity: 1 }];
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            const itemExists = currItems.find(item => item.id === id);
            if(itemExists?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => 
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    const cartQuantity = cartItems.reduce((quantity, item )=> item.quantity +  quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    
    return (
        <ShoppingCartContext.Provider 
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart
            }}>
            { children }
        </ShoppingCartContext.Provider>

    )
}

