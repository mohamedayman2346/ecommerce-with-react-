import { createContext, useState } from "react";

export const Bars = createContext(false)

export default function IsOpen({children}){

    const [isOpen, setIsOpen] = useState(false);
    return <Bars.Provider value = {{isOpen,setIsOpen}} >
        {children}
    </Bars.Provider>
}