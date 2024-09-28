import {useState} from "react";
import axios from 'axios';
import { usePurchaseContext } from "/src/contexts/purchaseContext.jsx";
import {PurchaseContextProvider} from "/src/contexts/purchaseContext.jsx";

export const InputForm = () => {
  const {purchases, setPurchases} = usePurchaseContext();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [store, setStore] = useState('');
  const [price, setPrice] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);

  const handleSubmit = async () => {
    const body = JSON.stringify({
      "title": title,
      "category": type,
      "store": store,
      "price": price,
      "cashOnHand": cashOnHand
    });
    console.log(purchases);
    const getResults = await(await fetch('http://localhost:3001/addPurchase', {
      credentials:"include",
      method: 'POST',
      body

    })).json();
    setPurchases(getResults.data);
    console.log("get results returned", getResults);



  }

  return(
    <PurchaseContextProvider>


    <div className = "flex flex-row justify-center bg-neutral-400 h-[40rem] w-[40rem] rounded-xl ml-20">

      <form id = "budgetForm" className = "flex flex-col  items-center ">
        <h2 className=" flex flex-row mb-3 text-2xl italic font-bold">Add a purchase!</h2>
        <label  className = "flex flex-row mb-5 text-lg italic font-bold">Add a title: </label >
        <input onChange={(e) => setTitle((e.target.value))} name = "title" id = "title" value={title} />
          <label  className = "flex flex-row mb-3 text-lg italic font-bold">Add a category!</label>
        <input onChange={(e) => setType((e.target.value))} name = "type" id = "type" value={type} />


        <label  className = "flex flex-row mb-3 text-lg italic font-bold">Add the store name!: </label>

          <input onChange={(e) => setStore(e.target.value)} name = "store" id = "store" value = {store}/>
            <label  className = "flex flex-row mb-3 text-lg italic font-bold">Add the item price!: </label>
            <input onChange={(e) => setPrice(parseInt(e.target.value))} name = "price" id = "price" value = {price}/>
              <label  className = "flex flex-row mb-3 text-lg italic font-bold">Add your cash on hand!: </label>
              <input onChange={(e) => setCashOnHand(parseInt(e.target.value))} name = "coh" id = "coh" value = {cashOnHand}/>
                <button className = "mt-5 w-[5rem] bg-black hover:bg-blue-700 text-white font-bold py-1 px-2 rounded " type = "button" onClick={handleSubmit} >Submit</button>
      </form>


    </div>
    </PurchaseContextProvider>
  )
}