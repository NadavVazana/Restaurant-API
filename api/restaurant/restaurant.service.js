const { ObjectId } = require("mongodb");
const httpErrors = require("http-errors");
const dbService = require("../../services/db.service");
const utils = require("../../services/util.service.js");
const createHttpError = require("http-errors");

const EntityType = {
  Restaurant: "Restaurant",
  Product: "Product",
};

async function collection() {
  return dbService.getCollection("restaurant");
}

function NotFoundError(entityType, entityId) {
  return new createHttpError.NotFound(
    `${entityType}'s id: ${entityId} was not found..`
  );
}

async function query() {
  return await (await collection()).find({}).toArray();
}

async function addRestaurant(restaurant) {
  const insertInfo = await (await collection()).insertOne(restaurant);

  if (!insertInfo.acknowledged) {
    throw NotFoundError(EntityType.Restaurant, "");
  }
}

async function deleteRestaurant(restaurantId) {
  const deleteInfo = await (
    await collection()
  ).deleteOne({
    _id: ObjectId(restaurantId),
  });

  if (!deleteInfo.acknowledged) {
    throw NotFoundError(EntityType.Restaurant, restaurantId);
  }
}

async function getRestaurantById(restaurantId) {
  const restaurant = await (
    await collection()
  ).findOne({
    _id: ObjectId(restaurantId),
  });

  if (!restaurant) {
    throw NotFoundError(EntityType.Restaurant, restaurantId);
  }

  return restaurant;
}

async function updateRestaurant(restaurant, restaurantId) {
  const restaurantToSave = {
    name: restaurant.name,
    photo: restaurant.photo,
    address: restaurant.address,
    openingHours: restaurant.openingHours,
    products: restaurant.products,
  };
  const restaurantToUpdate = await getRestaurantById(restaurantId);
  restaurantToUpdate;
  const updateInfo = await (
    await collection()
  ).updateOne({ _id: ObjectId(restaurantId) }, { $set: restaurantToSave });

  if (!updateInfo.acknowledged) {
    throw NotFoundError(EntityType.Restaurant, restaurant._id);
  }
}

async function getProducts(restaurantId) {
  const restaurant = await getRestaurantById(restaurantId);
  return restaurant.products;
}

async function addProduct(restaurantId, product) {
  product = { _id: utils.makeId(12), ...product };
  let restaurant = await getRestaurantById(restaurantId);
  restaurant = {
    ...restaurant,
    products: [...restaurant.products, product],
  };
  await updateRestaurant(restaurant, restaurantId);
}

async function updateProduct(restaurantId, product, productId) {
  let restaurant = await getRestaurantById(restaurantId);
  const oldProductIndex = restaurant.products.findIndex(
    (currProduct) => currProduct._id === productId
  );
  const products = restaurant.products;
  product = { _id: productId, ...product };
  products[oldProductIndex] = product;
  restaurant = { ...restaurant, products };
  await updateRestaurant(restaurant, restaurantId);
}

async function removeProduct(restaurantId, productId) {
  let restaurant = await getRestaurantById(restaurantId);
  const oldProductIndex = restaurant.products.findIndex(
    (currProduct) => currProduct._id === productId
  );
  let products = restaurant.products;
  products.splice(oldProductIndex, 1);
  restaurant = { ...restaurant, products };
  await updateRestaurant(restaurant, restaurantId);
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
