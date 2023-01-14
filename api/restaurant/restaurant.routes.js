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

// Restaurants
router.get("/", getRestaurants);
router.get("/:restaurantId", getRestaurant);
router.post("/", registerRestaurant);
router.patch("/:restaurantId", updateRestaurantDetails);
router.delete("/:restaurantId", removeRestaurant);

// Products
router.get("/:restaurantId/products", getRestaurantProducts);
router.post("/:restaurantId/products", addProductToRestaurant);
router.delete(
  "/:restaurantId/products/:productId",
  removeProductFromRestaurant
);
router.patch("/:restaurantId/products/:productId", changeProduct);

module.exports = router;
