import { createContext, useContext, useState } from "react";

const initialContext = {
  purchases:[],
  setPurchases: () => {}
};
const PurchaseContext = createContext(initialContext);

export const usePurchaseContext = () => {
  const context = useContext(PurchaseContext);
  return context;
}
export function PurchaseContextProvider({children}){
  const [purchases, setPurchases] = useState([]);
  const setPurchasesEvent = (purchases) => {
    console.log("running set event function");
    console.log("why god", purchases);
    setPurchases(purchases)
  }
  const value = {
    purchases,
    setPurchases:setPurchasesEvent
  };
  return(
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  )
}