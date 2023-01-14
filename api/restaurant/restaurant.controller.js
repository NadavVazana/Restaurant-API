const {
  query,
  addRestaurant,
  deleteRestaurant,
  getRestaurantById,
  updateRestaurant,
  updateProduct,
  addProduct,
  getProducts,
  removeProduct,
} = require("./restaurant.service");

async function getRestaurants(req, res) {
  try {
    const restaurants = await query();
    res.json(restaurants);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function registerRestaurant(req, res) {
  try {
    const newRestaurant = req.body;
    console.log(newRestaurant);
    await addRestaurant(newRestaurant);
    res.json(newRestaurant);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function removeRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    await deleteRestaurant(restaurantId);
    res.send(`Restaurant has been deleted!`);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await getRestaurantById(restaurantId);
    res.json(restaurant);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function updateRestaurantDetails(req, res) {
  try {
    let updatedRestaurant = req.body;
    const restaurantId = req.params.restaurantId;
    await updateRestaurant(updatedRestaurant, restaurantId);
    res.send(`${updatedRestaurant.name} has been updated successfully!`);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getRestaurantProducts(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const products = await getProducts(restaurantId);
    res.json(products);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function addProductToRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const newProduct = req.body;
    await addProduct(restaurantId, newProduct);
    res.send("Product has been added!");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function changeProduct(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const product = req.body;
    const productId = req.params.productId;
    await updateProduct(restaurantId, product, productId);
    res.send("Product has been updated!");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function removeProductFromRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const productId = req.params.productId;
    await removeProduct(restaurantId, productId);
    res.send("Product has been deleted!");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  getRestaurants,
  registerRestaurant,
  removeRestaurant,
  getRestaurant,
  updateRestaurantDetails,
  getRestaurantProducts,
  addProductToRestaurant,
  changeProduct,
  removeProductFromRestaurant,
};
