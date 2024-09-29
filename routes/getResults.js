import express, {Router} from 'express';
import PurchaseItem from '../mongoose/purchases/schema.js';
const router = express.Router();

router.get('/getResults', async (req, res) =>{
    try{
        const data = await PurchaseItem.find({userName: req.user['username']});
        res.json({"data": data});
    }
    catch (err){

        res.sendStatus(400);
    }



});
export default router;