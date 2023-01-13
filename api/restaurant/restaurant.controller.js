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
    res.send(restaurants);
  } catch (error) {
    res.status(404).send({ err: "Failed to get the list of the restaurants " });
  }
}

async function registerRestaurant(req, res) {
  try {
    const newRestaurant = req.body;
    await addRestaurant(newRestaurant);
    res.send(`The restaurant that was added: ${JSON.stringify(newRestaurant)}`);
  } catch (error) {
    res.status(404).send({ err: "Failed to add a restaurant" });
  }
}

async function removeRestaurant(req, res) {
  try {
    const restaurantId = req.query.id;
    await deleteRestaurant(restaurantId);
    res.send(`Restaurant with the id of: ${restaurantId} has been deleted!`);
  } catch (error) {
    res.status(404).send(`Failed to remove the restaurant`);
  }
}

async function getRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await getRestaurantById(restaurantId);
    console.log(restaurant);
    res.json(restaurant);
  } catch (error) {
    res.status(404).send("Failed to get the restaurant");
  }
}

async function updateRestaurantDetails(req, res) {
  try {
    let updatedRestaurant = req.body;
    await updateRestaurant(updatedRestaurant);
    res.send(`${updatedRestaurant.name} has been updated successfully!`);
  } catch (error) {
    res.status(404).send("Failed to update the details of this restaurant");
  }
}

async function getRestaurantProducts(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const products = await getProducts(restaurantId);
    res.json(products);
  } catch (error) {
    res.status(404).send("Failed to get the products from this restaurant");
  }
}

async function addProductToRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const newProduct = req.body;
    await addProduct(restaurantId, newProduct);
    res.send("Product has added!");
  } catch (error) {
    res.status(404).send("Failed to add the product");
  }
}

async function changeProduct(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const product = req.body;
    await updateProduct(restaurantId, product);
    res.send("Product has updated!");
  } catch (error) {
    res.status(404).send("Failed to update the product");
  }
}

async function removeProductFromRestaurant(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const productId = req.params.productId;
    await removeProduct(restaurantId, productId);
    res.send("Product has been deleted!");
  } catch (error) {
    res.status(404).send("Failed to remove the product");
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

// {
//               name: "Coke",
//               photo: "https://images.heb.com/is/image/HEBGrocery/001397056",
//               price: 3,
//               category: "Drinks",
//               saleInfo: {
//                 promotion: null,
//                 promotionalPrice: null,
//                 saleDays: {
//                   monday: { start: null, end: null },
//                   tuesday: { start: null, end: null },
//                   wednesday: { start: null, end: null },
//                   thursday: { start: null, end: null },
//                   friday: { start: null, end: null },
//                   saturday: { start: null, end: null },
//                   sunday: { start: null, end: null },
//                 },
//               },
//             },

// console.log(
//   JSON.stringify({
//     name: "Coke",
//     photo: "https://images.heb.com/is/image/HEBGrocery/001397056",
//     price: 3,
//     category: "Drinks",
//     saleInfo: {
//       promotion: null,
//       promotionalPrice: null,
//       saleDays: {
//         monday: { start: null, end: null },
//         tuesday: { start: null, end: null },
//         wednesday: { start: null, end: null },
//         thursday: { start: null, end: null },
//         friday: { start: null, end: null },
//         saturday: { start: null, end: null },
//         sunday: { start: null, end: null },
//       },
//     },
//   })
// );
