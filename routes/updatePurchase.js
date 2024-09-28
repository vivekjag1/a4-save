import express, {Router} from 'express';
import PurchaseItem from '../mongoose/purchases/schema.js';
import { isInBudget } from '../utils/isInBudget.js';

const router = express.Router();
router.post('/updatePurchase', async (req, res) =>{
  const body = JSON.parse(req.body);
  console.log("inside", body);
  const newPurchase = {
    "title": body.title,
    "category": body.category,
    "store": body.store,
    "price": body.price,
    "cashOnHand": body.cashOnHand,
    "userName": req.user['username']
  };
  const affordable =   isInBudget(newPurchase);
  newPurchase.affordable = affordable


  const data = await PurchaseItem.findOneAndDelete({title: body.oldTitle, userName:req.user['username']});
  const newData = await PurchaseItem.create(newPurchase);
  const allResults = await PurchaseItem.find();



  res.json({"data": allResults});
});
export default router;