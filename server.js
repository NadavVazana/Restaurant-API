const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const utils = require("./services/util.service.js");

const app = express();
const http = require("http").createServer(app);
// Express App Config
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const restaurantRoutes = require("./api/restaurant/restaurant.routes");

// routes

app.use("/api/restaurant", restaurantRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/wap/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service.js");
const { ObjectId } = require("mongodb");
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});

// console.log(
//   JSON.stringify({
//     name: "Orange Juice",
//     photo:
//       "https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Juice-1-of-1.jpeg",
//     price: 5,
//     category: "Juice",
//     saleInfo: {
//       promotion: "50% discount",
//       promotionalPrice: 2.5,
//       saleDays: {
//         monday: { start: "12:00", end: "20:00" },
//         tuesday: { start: null, end: null },
//         wednesday: { start: "12:00", end: "20:00" },
//         thursday: { start: "12:00", end: "20:00" },
//         friday: { start: null, end: null },
//         saturday: { start: "12:00", end: "20:00" },
//         sunday: { start: "12:00", end: "20:00" },
//       },
//     },
//   })
// );
// console.log(
//   JSON.stringify([
//     {
//       name: "Mexicana",
//       photo:
//         "https://mexicana.co.il/wp-content/uploads/sites/356/2021/11/09_0002_ba_0002_%D7%97%D7%95%D7%9C%D7%95%D7%9F.jpeg.jpg",
//       address: "Bugrashov 7 - Tel Aviv",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Orange Juice",
//           photo:
//             "https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Juice-1-of-1.jpeg",
//           price: 5,
//           category: "Juice",
//           saleInfo: {
//             promotion: "50% discount",
//             promotionalPrice: 2.5,
//             saleDays: {
//               monday: { start: "12:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "20:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: "12:00", end: "20:00" },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Lemon Juice",
//           photo:
//             "https://yellowchilis.com/wp-content/uploads/2022/07/lemon-juice.jpg",
//           price: 10,
//           category: "Juice",
//           saleInfo: {
//             promotion: "20% discount",
//             promotionalPrice: 8,
//             saleDays: {
//               monday: { start: "11:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: "11:00", end: "21:00" },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//       ],
//     },
//     {
//       name: "American Burger",
//       photo:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWZ2NiSmefg1wTIjfDgey3LI0FgeYWZaj3IxnlMKB5D6eKgWvtybs5k7E_CgrEvqzIeM&usqp=CAU",
//       address: "Dizingof 14 - Tel Aviv",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Cheese Burger",
//           photo:
//             "https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267.jpg",
//           price: 15,
//           category: "Burgers",
//           saleInfo: {
//             promotion: "30% discount",
//             promotionalPrice: 10,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Diet Coke",
//           photo:
//             "https://thehungrypigcafe.com/wp-content/uploads/DIET-COKE.jpg",
//           price: 3,
//           category: "Drinks",
//           saleInfo: {
//             promotion: null,
//             promotionalPrice: null,
//             saleDays: {
//               monday: { start: null, end: null },
//               tuesday: { start: null, end: null },
//               wednesday: { start: null, end: null },
//               thursday: { start: null, end: null },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: null, end: null },
//             },
//           },
//         },
//       ],
//     },
//     {
//       name: "KFC",
//       photo:
//         "https://images.globes.co.il/images/NewGlobes/big_image_800/2019/9B201AFF761F1057A661A548022D8178_800x392.20190219T113539.jpg",
//       address: "Begin 144 - Petah Tikva",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Coke",
//           photo: "https://images.heb.com/is/image/HEBGrocery/001397056",
//           price: 3,
//           category: "Drinks",
//           saleInfo: {
//             promotion: null,
//             promotionalPrice: null,
//             saleDays: {
//               monday: { start: null, end: null },
//               tuesday: { start: null, end: null },
//               wednesday: { start: null, end: null },
//               thursday: { start: null, end: null },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: null, end: null },
//             },
//           },
//         },
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Chicken Bucket",
//           photo:
//             "https://img.freepik.com/premium-photo/crispy-fried-chicken-bucket-chicken-bucket_434193-7699.jpg?w=2000",
//           price: 20,
//           category: "Chicken",
//           saleInfo: {
//             promotion: "50% discount",
//             promotionalPrice: 10,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//       ],
//     },
//     {
//       name: "PizzaHut",
//       photo:
//         "https://www.eatthis.com/wp-content/uploads/sites/4/2021/07/pizza-hut.jpg",
//       address: "Hahashmonaim 99 - Haifa",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Slice of Pizza",
//           photo:
//             "https://media.istockphoto.com/id/496546118/photo/slice-of-fresh-italian-classic-original-pepperoni-pizza-isolated.jpg?s=612x612&w=0&k=20&c=7aYapAwoe4fO5jRiNMIFiflIztcBAA8s-GLqAmBiSgA=",
//           price: 10,
//           category: "Chicken",
//           saleInfo: {
//             promotion: "50% discount",
//             promotionalPrice: 5,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//         {
//           _id: ObjectId(utils.makeId(12)),
//           name: "Garlic Bread",
//           photo:
//             "https://www.foodnetwork.com/content/dam/images/food/fullset/2015/5/28/2/TM1A14F_Garlic-Bread_s4x3.jpg",
//           price: 10,
//           category: "Bread",
//           saleInfo: {
//             promotion: "10% discount",
//             promotionalPrice: 9,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//       ],
//     },
//     {
//       _id: ObjectId(utils.makeId(12)),
//       name: "Popina",
//       photo:
//         "https://www.popina.co.il/wp-content/uploads/2018/11/img_8217-custom.jpg",
//       address: "Ehad ha'am 3",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           name: "Honey Garlic Shrimp",
//           photo:
//             "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/07/Honey-Garlic-Shrimp-main-1.jpg",
//           price: 10,
//           category: "Shrimps",
//           saleInfo: {
//             promotion: "1+1",
//             promotionalPrice: 10,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//         {
//           name: "Steak",
//           photo:
//             "https://www.seriouseats.com/thmb/WzQz05gt5witRGeOYKTcTqfe1gs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg",
//           price: 50,
//           category: "Meat",
//           saleInfo: {
//             promotion: "10%",
//             promotionalPrice: 45,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//       ],
//     },
//     {
//       _id: ObjectId(utils.makeId(12)),
//       name: "Hiba",
//       photo: "https://pitsou.com/wp-content/uploads/2021/06/Hiba_cover.jpg",
//       address: "Begin 144 - Tel Aviv",
//       openingHours: {
//         monday: { open: "12:30", close: "20:00" },
//         thursday: { open: "12:30", close: "20:00" },
//         wednesday: { open: "12:00", close: "20:00" },
//         thursday: { open: "12:00", close: "20:00" },
//         wednesday: { open: null, close: null },
//         friday: { open: "08:00", close: "12:00" },
//         saturday: { open: "08:00", close: "11:00" },
//         sunday: { open: null, close: null },
//       },
//       products: [
//         {
//           name: "Caviar",
//           photo:
//             "https://www.simfisch.de/wp-content/uploads/2019/02/kaluga-kaviar.jpg",
//           price: 50,
//           category: "Fish",
//           saleInfo: {
//             promotion: "10%",
//             promotionalPrice: 45,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//         {
//           name: "Cheese Cake",
//           photo:
//             "https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4.jpg",
//           price: 20,
//           category: "Fish",
//           saleInfo: {
//             promotion: "10%",
//             promotionalPrice: 18,
//             saleDays: {
//               monday: { start: "10:00", end: "20:00" },
//               tuesday: { start: null, end: null },
//               wednesday: { start: "12:00", end: "22:00" },
//               thursday: { start: "12:00", end: "20:00" },
//               friday: { start: null, end: null },
//               saturday: { start: null, end: null },
//               sunday: { start: "12:00", end: "20:00" },
//             },
//           },
//         },
//       ],
//     },
//   ])
// );
