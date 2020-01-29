const bcrypt=require('bcryptjs');
const Shop=require('../models/Shop');
const jwt=require('jsonwebtoken');

exports.user_get_all = (req,res,next) => {
    Shop.findById(req.params.shopId)
    .select('-password -user.userpassword')
    .then(resultfind=>{
        res.status(200).json(resultfind)
    })
    .catch(err => {res.status(500).json({error: err});})
}

exports.user_delete=(req,res,next)=>{
    //console.log(req.body)
    const {shopId,userId}=req.body
    Shop.update(
        {_id:shopId},
        {$pull:{user:{_id:userId}}}
    )
    .then(resultpull=>{
        res.status(200).json(resultpull)
    
    })
    .catch(err => {res.status(500).json({error: err});})
}

exports.user_update=(req,res,next)=>{
    const {shopId,userId,username,userlevel,useractive}=req.body
    Shop.update(
        {_id:shopId, "user._id":userId},
        {$set:{"user.$.username":username,"user.$.userlevel":userlevel,"user.$.useractive":useractive}}
    )
    .then(resultupdate=>{res.status(200).json(resultupdate)})
    .catch(err => {res.status(500).json({error: err});})  
}

exports.user_updatepassword=(req,res,next)=>{
    const {shopId,userId,userpassword}=req.body
    Shop.update(
        {_id:shopId, "user._id":userId},
        {$set:{"user.$.userpassword":userpassword}}
    )
    .then(resultupdate=>{res.status(200).json(resultupdate)})
    .catch(err => {res.status(500).json({error: err});})  
}

exports.user_add = (req,res,next) => {
    //const userId= new mongoose.Types.ObjectId()
    const {shopId,username,userpassword,userlevel,useractive}=req.body;
    const newuser={username,userpassword,userlevel,useractive};
    
    Shop.update(
        {_id:shopId},
        {$push:{user:newuser}}
    )
    .then(result=>{res.status(200).json(result)})
    .catch(err => {res.status(500).json({error: err});})
}
//========================================
exports.shop_signup = (req, res, next) => {
    const {shopname,email,password}=req.body;
    console.log(req.body)
    //Simple validation
    if(!shopname || !email || !password){
        return res.status(400).json({message:'Please enter all field'});  
    }
    
    //Check for existing shop
    Shop.findOne({email})          
        .then(shop => {
            if (shop) {return res.status(409).json({ message: "Mail exists"});} 
            
            else {
                const level="owner";
                const active=true;
                const newShop = new Shop({shopname,email,password,level,active});
                console.log(newShop)
                //Create salt & hash
                bcrypt.hash(newShop.password, 10, (err, hash) => {
                    if (err) { return res.status(500).json({error: err}); } 
                    else {
                        const shop = new Shop({
                            //_id:new mongoose.Types.ObjectId(),
                            shopname:newShop.shopname,
                            email:newShop.email,
                            password:hash, //Do not save orginal password in DB
                            level:newShop.level,
                            active:newShop.active
                        });
                        shop
                            .save()
                            .then(result => {
                                //console.log(result);
                                res.status(201).json({message: "Shop created"});
                            })
                            .catch(err => {
                                //console.log(err);
                                res.status(500).json({error: err});
                            });
                    }//else
                });//bcrypt
            }//else
        })//then
        .catch(err => {res.status(500).json({error: err});});
};//export
  
exports.shop_login = (req, res, next) => {
    const {email,password}=req.body;
    //Simple validation
    if(!email || !password){
        return res.status(400).json({message:'Please enter all field'});  
    }
    //Check for existing shop
    Shop.findOne({email})
        .then(shop => {
            if(!shop) return res.status(400).json({msg:'Shop Do not exists'});           
            //Copare password with password from hash
            bcrypt
                .compare(password,shop.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({msg:'Invalid credential'});
                    
                    jwt.sign(
                        {id:shop._id}, //token=id+jwtScret+3600
                        process.env.JWT_SECRET,
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err;  
                            res.json({ //send back to client = token, shop(id,name,email)
                                token,
                                shop:{
                                    _id:shop._id,
                                    shopname:shop.shopname,
                                    email:shop.email
                                }//shop
                            })//res.json
                        }//(err,token)
                    )//jwt.sign   
                })//.then
                .catch(err => {res.status(500).json({error: err});}); 
        })//then
        .catch(err => {res.status(500).json({error: err});});    
};//export

exports.shop_delete = (req, res, next) => {
    Shop.remove({ _id: req.params.shopId })
        .then(result => {
                res.status(200).json({message: "Shop deleted"});
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({error: err});
    });
};//export


exports.shop_get_all = (req,res,next) => {
    Shop.find()
        .select('-password -user.userpassword')
        .then(shops=>{
            res.status(200).json(shops)
        })
        .catch(err => {res.status(500).json({error: err})});
}//

