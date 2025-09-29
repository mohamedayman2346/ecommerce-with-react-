import { createContext, useState } from "react";

export const Best = createContext(false)

export default function BestChange({children}){

    const [BestChanger, setBestChanger] = useState(false);
    return <Best.Provider value = {{BestChanger, setBestChanger}} >
        {children}
    </Best.Provider>
}