import {useEffect, useState} from "react";
import { usePurchaseContext } from "/src/contexts/purchaseContext.jsx";

export const EditModal = (props) => {
  const[oldTitle, setOldTile] = useState(props.clickedItem.title);
  const[title, setTitle] = useState(props.clickedItem.title);
  const[category, setCategory] = useState(props.clickedItem.category);
  const[store, setStore]=useState(props.clickedItem.store);
  const[price, setPrice] = useState(props.clickedItem.price);
  const[cashOnHand, setCashOnHand] = useState(props.clickedItem.cashOnHand);
  console.log(props.itemTitle)
  const {purchases, setPurchases} = usePurchaseContext();
  const [items, setItems] = useState(purchases.data||[]);
  const [selectedItem, setSelectedItem] = useState({});
  const [userName, setUserName] = useState('');
  const handleUpdate = async () => {
    console.log("inside")
    const body = JSON.stringify({
      "oldTitle": oldTitle,
      "title": title,
      "category": category,
      "store": store,
      "price": parseInt(price),
      "cashOnHand": parseInt(cashOnHand),
      "userName": userName,
    });
    const makeRequest = await (await fetch(`${import.meta.env.VITE_BE_PORT}/updatePurchase`, {
      method: 'POST',
      body
    })).json();
    console.log("egeekey", makeRequest);
    setPurchases(makeRequest.data);
    props.setOpen(false);

  }


  useEffect(() => {
    setUserName(props.clickedItem.username)
    setOldTile(props.clickedItem.title);
    setTitle((props.clickedItem.title));
    setCategory(props.clickedItem.category);
    setStore(props.clickedItem.store);
    setPrice(parseInt(props.clickedItem.price))
    setCashOnHand(parseInt(props.clickedItem.cashOnHand))
  },[props]);


  return(

    <dialog open={props.open}
            className="bg-neutral-200 text-lg font-mono w-[20rem]  rounded-xl backdrop:backdrop-blur-sm">

      <form className="flex flex-col  items-center w-[20rem] ">
        <h2 className="font-bold text-2xl text-center">Delete/modify a purchase!</h2>
        <h2 className="formHeader">Title: </h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <h2 className="formHeader">Category</h2>
        <input value={category} onChange={(e) => setCategory(e.target.value)}/>

        <h2 className="formHeader">Store: </h2>

        <input value={store} onChange={(e) => setStore(e.target.value)}/>
        <h2 className="formHeader">Price </h2>

        <input value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
        <h2 className="formHeader">Cash On Hand </h2>

        <input value={cashOnHand} onChange={(e) => setCashOnHand(parseInt(e.target.value))}/>
        <div onClick={() => {
          props.handleDelete(oldTitle, userName)
          props.setOpen(false);

        }} className="flex flex-row mb-10">
          <button id="deletePurchase"
                  className=" mt-5 w-[5rem] bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-5"
                  type="button">Delete
          </button>
          <button onClick={handleUpdate}
                  className="mt-5 w-[5rem] bg-black hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-5"
                  type="button">Submit Updates
          </button>

        </div>


      </form>

    </dialog>
  )
}