import {Schema, model} from 'mongoose';
const userSchema = new Schema({

  gitID:{
    type: String,
    required:false
  }
});
const user = model('user', userSchema);
export default user;