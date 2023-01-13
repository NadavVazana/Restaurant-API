const { ObjectId } = require("mongodb");
const dbService = require("../../services/db.service");
const utils = require("../../services/util.service.js");

async function query() {
  const collection = await dbService.getCollection("restaurant");
  return await collection.find({}).toArray();
}

async function addRestaurant(restaurant) {
  try {
    const collection = await dbService.getCollection("restaurant");
    await collection.insertOne(restaurant);
  } catch (error) {
    console.log(error);
  }
}

async function deleteRestaurant(restaurantId) {
  try {
    const collection = await dbService.getCollection("restaurant");
    await collection.deleteOne({ _id: ObjectId(restaurantId) });
  } catch (error) {
    console.log(error);
  }
}

async function getRestaurantById(restaurantId) {
  try {
    const collection = await dbService.getCollection("restaurant");
    return await collection.findOne({
      _id: ObjectId(restaurantId),
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateRestaurant(restaurant) {
  try {
    const collection = await dbService.getCollection("restaurant");
    const restaurantToSave = {
      _id: ObjectId(restaurant._id),
      name: restaurant.name,
      photo: restaurant.photo,
      address: restaurant.address,
      openingHours: restaurant.openingHours,
      products: restaurant.products,
    };
    await collection.updateOne(
      { _id: restaurantToSave._id },
      { $set: restaurantToSave }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getProducts(restaurantId) {
  try {
    const restaurant = await getRestaurantById(restaurantId);
    return restaurant.products;
  } catch (error) {
    console.log(error);
  }
}

async function addProduct(restaurantId, product) {
  try {
    product = { _id: utils.makeId(12), ...product };
    let restaurant = await getRestaurantById(restaurantId);
    restaurant = {
      ...restaurant,
      products: [...restaurant.products, product],
    };
    await updateRestaurant(restaurant);
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(restaurantId, product) {
  try {
    const collection = await dbService.getCollection("restaurant");
    let restaurant = await getRestaurantById(restaurantId);
    const oldProductIndex = restaurant.products.findIndex(
      (currProduct) => currProduct._id === product._id
    );
    let products = restaurant.products;
    products[oldProductIndex] = product;
    restaurant = { ...restaurant, products };
    await updateRestaurant(restaurant);
  } catch (error) {
    console.log(error);
  }
}

async function removeProduct(restaurantId, productId) {
  try {
    const collection = await dbService.getCollection("restaurant");
    let restaurant = await getRestaurantById(restaurantId);
    const oldProductIndex = restaurant.products.findIndex(
      (currProduct) => currProduct._id === productId
    );
    let products = restaurant.products;
    products.splice(oldProductIndex, 1);
    restaurant = { ...restaurant, products };
    await updateRestaurant(restaurant);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  query,
  addRestaurant,
  deleteRestaurant,
  getRestaurantById,
  updateRestaurant,
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
};
