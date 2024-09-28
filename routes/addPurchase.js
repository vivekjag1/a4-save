import express from 'express';
// import {mongoose} from 'mongoose';
import PurchaseItem from '../mongoose/purchases/schema.js';
import {isInBudget} from '../utils/isInBudget.js';

const router = express.Router();


router.post('/addPurchase', async (req, res) =>{
  const body = JSON.parse(req.body);
  console.log("i hate life so goddamn much", req.user['username']);
  body.affordable = isInBudget(body);
  body.userName = req.user['username'];
  // body.userName = 'vivekjag1';
  console.log("I hate life", body);


  await PurchaseItem.create(body);
  const toSend = await PurchaseItem.find({});
  res.json({"data": toSend});

});
export default router;