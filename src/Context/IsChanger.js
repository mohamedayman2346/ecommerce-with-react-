import { createContext, useState } from "react";

export const cart = createContext(false)

export default function IsChanger({children}){

    const [isChanger, setIsChanger] = useState(false);
    return <cart.Provider value = {{isChanger, setIsChanger}} >
        {children}
    </cart.Provider>
}