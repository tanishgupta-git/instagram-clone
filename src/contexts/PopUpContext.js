import React,{useState,createContext} from 'react';

export const PopUpContext = createContext()

const PopUpContextProvider = (props) => {

const [openPop,SetopenPop] = useState(false);

 return (
    <PopUpContext.Provider value={{openPop,SetopenPop}}>
      {props.children}
    </PopUpContext.Provider>
    )

}

export default PopUpContextProvider;