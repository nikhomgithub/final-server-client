const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  shopname: {
    type: String,required: true,unique:true,
  },
  email:{
    type:String,required: true,unique:true
  },
  password:{
    type:String,required: true 
  },
  level:{
    type:String,require: true
  },
  date: {
    type: Date,default: Date.now
  },
  active:{
    type:Boolean,require:true
  },
  active:Boolean,
  user:[{
    //userId: Schema.ObjectId,
    username:String,
    userpassword:String,
    userlevel:String,
    useractive:{
      type:Boolean,
      default:false
    }
  }]
  /*
  shopname: {type: String,required: true,unique:true,},
  email:{type:String,required: true,unique:true},
  password:{type:String,required: true },
  level:{type:String,require: true},
  date: {type: Date,default: Date.now},
  active:{type:Boolean,require:true},
  user:[{type:Schema.Types.ObjectId, ref:'User'}]
  */
});

module.exports = User = mongoose.model('Shop', ShopSchema);