import express, {Router} from 'express';
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router();




router.get('/deleteAll', async (req, res) =>{

  await PurchaseItem.deleteMany({});
  res.json({"status":"db clear"});
});
export default router;