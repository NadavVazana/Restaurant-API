const express = require("express");
const logger = require("./services/logger.service.js");

const app = express();
const http = require("http").createServer(app);
// Express App Config
app.use(express.json());

// routes
const restaurantRoutes = require("./api/restaurant/restaurant.routes");

app.use("/api/restaurants", restaurantRoutes);

const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
