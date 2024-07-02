import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext({})

export function UserContextProvider({children}) {

    const [userInfo, setUserInfo] = useState({})

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
         {children}
        </UserContext.Provider>
    )
}