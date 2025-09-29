import { createContext, useEffect, useState } from "react";

export const WindowSizeContext = createContext(null);

export default function WindowSize({ children }) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect( () => {
        function screenWidth() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', screenWidth);

        return() => {
           window.removeEventListener('resize', screenWidth);
        }
    }, [])
   

    return <WindowSizeContext.Provider value = {{width, setWidth}}>
        {children}
    </WindowSizeContext.Provider>
}