import {Schema, model} from 'mongoose';
const purchaseSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  category:{
    type: String,
    required:true
  },
  store:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required: true,
  },
  cashOnHand:{
    type:Number,
    required:true
  },
  affordable:{
    type:Boolean,
    required:true,
  },
  userName:{
    type:String,
    required:true,
  }
});
const PurchaseItem = model('PurchaseItem', purchaseSchema);
export default PurchaseItem;