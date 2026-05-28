import { createContext } from "react";

export const AppContext = createContext();

export default function AppProvider({children}){
    const baseUrl = "http://localhost:9000";
    return(
        <AppContext.Provider value={ {baseUrl} }>
            {children}
        </AppContext.Provider>
    )
}