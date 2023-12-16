import { createContext, useContext,useState } from "react";

export const FirebaseContext = createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}


export const authContext = createContext(null);

export default function Context({children}){
const [user,setUser] = useState(null)
  return (
    <authContext.Provider value={{user,setUser}}>
       {children}
    </authContext.Provider>
  )
}