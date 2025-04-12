import { createContext, useState } from "react";

//Default values
export const WebsiteContext = createContext({
    currentUser: "default",
    setcurrentUser: () => {}
})

export default function WebsiteProvider(props){
    const [currentUser, setCurrentUser] = useState("default");
    const fetchCurrentUser = async () => {
        try{
            const response = await fetch('/api/currentUser');
            const userCurrentData = await response.json();
            setCurrentUser(userCurrentData);
        }catch(err){
            console.log("Error fetching session data, or more specifically: "+err);
        }
    }
    return(
        <WebsiteContext.Provider value ={{currentUser, setCurrentUser}}>
            {props.children}
        </WebsiteContext.Provider>
    )
}