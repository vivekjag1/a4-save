  import { usePurchaseContext } from "/src/contexts/purchaseContext.jsx";
  import {useEffect, useState} from "react";
  import {isInBudget} from "../../utils/isInBudget.js";
  import {EditModal} from "./EditModal.jsx";

  export const ResultsDisplay = () => {

    const {purchases, setPurchases} = usePurchaseContext();
    const [items, setItems] = useState(purchases.data||[]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [clickedTitle, setClickedTitle] = useState('')
    const [clickedItem, setClickedItem] = useState({});
    const [userName, setUsername] = useState('');


    const handleDelete = async (title, userName ) => {
      console.log("inside");
      const body = JSON.stringify({
        "title": title,
        "username": userName
      });
      const data = await(await fetch('http://localhost:3001/deletePurchase', {
        method: 'POST',
        body
      })).json();
      console.log("new data is", data);
      setPurchases(data.data);
      setItems(data.data);
    }

    const handleDeleteModal = async (title, userName) => {
      const body = JSON.stringify({
        "title": title,
        "username": userName
      });
      const data = await(await fetch('http://localhost:3001/deletePurchase', {
        method: 'POST',
        body
      })).json();
      console.log("modal delete with", body);
      console.log("new data is", data);
      setPurchases(data.data);
      setItems(data.data);
    }



    useEffect(() => {
      console.log("HELLO WORLD", purchases);
      if(purchases.data && purchases.data.length){
        setItems(purchases.data);
      }
      setPurchases(purchases);
      setItems(purchases);
      }, [purchases])
    return (

      <div className="flex flex-row justify-center bg-neutral-400 h-[40rem] w-[40rem] rounded-xl mr-20">
        {editModalOpen? <div className='backdrop:backdrop-blur-sm'/>:<></>}
        <div className="flex flex-col items-center">
          <h2 className=" flex flex-row mb-3 text-2xl italic font-bold ">Results!</h2>

          <table id="resultsTable" className="w-full text-sm text-left rtl:text-right border border-black ">
            <thead>
            <tr className="border border-black">
              <th className="border border-black">Purchase Title</th>
              <th className="border border-black">Category</th>
              <th className="border border-black">Store</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Cash on Hand</th>
              <th className="border border-black">Affordable?</th>
              <th className="border border-black">Edit</th>
              <th className="border border-black">Delete</th>
            </tr>
            {items.length > 0 ?
              items.map((item, idx) => {
              return (
                <tr key={idx}>
                   <td>{item.title}</td>
                   <td>{item.category}</td>
                   <td>{item.store}</td>
                   <td>{item.price}</td>
                   <td>{item.cashOnHand}</td>
                   <td>{isInBudget(item)? "true": "false"}</td>
                  <button onClick={() => {
                    const clickedItem = {
                      "title": item.title,
                      "category": item.category,
                      "store": item.store,
                      "price": item.price,
                      "cashOnHand": item.cashOnHand,
                      "username":item.userName
                    };
                    setClickedItem(clickedItem);
                    setEditModalOpen(!editModalOpen);
                    setClickedTitle(item.title);
                    console.log("clicked", item.title)

                  }}
                    className ="bg-black text-white rounded-lg w-20">Edit</button>
                  <td>
                  <button onClick={() => {


                    handleDelete(item.title, item.userName).then();
                  }}
                    className ="bg-red-500 text-white rounded-lg w-20">Delete</button>
                  </td>
                </tr>
              )
            }): <td colSpan="7"> No Purchases </td>}
            </thead>
          </table>
        </div>
        <EditModal open = {editModalOpen} handleDelete={(title, userName) => handleDeleteModal(title, userName)} setOpen={setEditModalOpen} clickedItem={clickedItem} />

      </div>

    )
  }
