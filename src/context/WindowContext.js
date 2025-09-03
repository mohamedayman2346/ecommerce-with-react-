import { useEffect, useState, createContext} from "react";

export const WindowSize = createContext(null)

export default function WindowContext({ children }){

    const [windowResize, setWindowResize] = useState(window.innerWidth);

    useEffect( () => {
        function screenWidth(){
            setWindowResize(window.innerWidth);
        }

        window.addEventListener('resize', screenWidth)

        return () => {
            window.removeEventListener('resize', screenWidth);
        }
    }, [])

    return (
         <WindowSize.Provider value = {{windowResize, setWindowResize}}>
                {children}
            </WindowSize.Provider>
    )

}