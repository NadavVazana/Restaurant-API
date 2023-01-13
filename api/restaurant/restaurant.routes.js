const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
  registerRestaurant,
  removeRestaurant,
  updateRestaurantDetails,
  getRestaurantProducts,
  addProductToRestaurant,
  removeProductFromRestaurant,
  changeProduct,
} = require("./restaurant.controller");

router.get("/", getRestaurants);
router.get("/:restaurantId", getRestaurant);
router.get("/products/:restaurantId", getRestaurantProducts);
router.put("/:restaurantId", changeProduct);
router.put("/", updateRestaurantDetails);
router.post("/:restaurantId", addProductToRestaurant);
router.post("/", registerRestaurant);
router.delete("/", removeRestaurant);
router.delete("/:restaurantId/:productId", removeProductFromRestaurant);

module.exports = router;
