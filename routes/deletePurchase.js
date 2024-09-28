import express, {Router} from 'express';
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router();
router.post('/deletePurchase', async (req, res) =>{
  const body = JSON.parse(req.body);
  await PurchaseItem.deleteMany({title: body.title, userName:body.username});
  console.log("trying to delete", body);
console.log(body)
  const data = await PurchaseItem.find({userName: body.username});
  console.log("the data from the backend", data);
  res.json({"data":data});
});
export default router;