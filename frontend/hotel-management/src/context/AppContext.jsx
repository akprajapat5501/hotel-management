import { createContext } from "react";

export const AppContext = createContext();

export default function AppProvider({children}){
    const baseUrl = "https://hotel-management-1-k9qc.onrender.com";
    return(
        <AppContext.Provider value={ {baseUrl} }>
            {children}
        </AppContext.Provider>
    )
}
