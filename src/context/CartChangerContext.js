import { createContext, useState } from "react"

export const Cart = createContext(true);

export default function CartChangeContext({children}){

    const [isChanger, setIsChanger] = useState(true);
    
    return (
    <Cart.Provider value = {{isChanger, setIsChanger}}>
        {children}
    </Cart.Provider>
    )
}