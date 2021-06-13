const express = require('express');
const {addItemToCart} = require('../controller/cart');
const { requireSignin, userMiddleware , getCartItems, removeCartItems}= require('../common-middleware')
const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, addItemToCart )

// router.post("/user/getCartItems", requireSignin,  getCartItems);
// //new update
// router.post(
//   "/user/cart/removeItem",
//   requireSignin,
//   userMiddleware,
//   removeCartItems
// );


module.exports = router;