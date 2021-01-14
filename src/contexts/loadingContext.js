import React,{useState,createContext} from 'react';

export const LoadingContext = createContext()

const LoadingContextProvider = (props) => {
  
const [loading,Setloading] = useState(true);

 return (
    <LoadingContext.Provider value={{loading,Setloading}}>
      {props.children}
    </LoadingContext.Provider>
    )

}

export default LoadingContextProvider;