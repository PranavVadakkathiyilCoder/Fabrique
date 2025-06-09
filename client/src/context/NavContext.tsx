import React, { createContext, useState,useContext } from "react";

type NavContextType = {
    userNav: boolean;
    setuserNav: React.Dispatch<React.SetStateAction<boolean>>;
    sellerNav: boolean;
    setsellerNav: React.Dispatch<React.SetStateAction<boolean>>;
    adminNav: boolean;
    setadminNav: React.Dispatch<React.SetStateAction<boolean>>;
    filter:boolean;
    setfilter:React.Dispatch<React.SetStateAction<boolean>>

};

export const NavContext = createContext<NavContextType | undefined>(undefined);

type ContextProps = {
    children: React.ReactNode;
};

export const NavContextProvider = ({ children }: ContextProps) => {
    const [userNav, setuserNav] = useState(false);
    const [sellerNav, setsellerNav] = useState(false);
    const [adminNav, setadminNav] = useState(false);
    const [filter, setfilter] = useState(false);

    return (
        <NavContext.Provider
            value={{
                userNav,
                setuserNav,
                sellerNav,
                setsellerNav,
                adminNav,
                setadminNav,
                filter,
                setfilter
            }}
        >
            {children}
        </NavContext.Provider>
    );
}; 


export const useNavContext = ()=>{
    const context = useContext(NavContext)
    if(context === undefined){
        throw new Error("Context error occured");
        
    }
    return context
} 
