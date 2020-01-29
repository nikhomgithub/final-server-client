const express = require("express");
const router = express.Router();
const ShopController = require('../controllers/shopCt');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", ShopController.shop_signup);

router.post("/login", ShopController.shop_login);

router.delete("/delete/:shopId",checkAuth, ShopController.shop_delete);

router.get("/getall",ShopController.shop_get_all);

//================================
router.post("/useradd", ShopController.user_add);

router.get("/usergetall/:shopId",ShopController.user_get_all)

router.post("/userdelete",ShopController.user_delete)

router.post("/userupdate",ShopController.user_update)

router.post("/userupdatepassword",ShopController.user_updatepassword)
//=================================

module.exports = router;