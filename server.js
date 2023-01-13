const express = require("express");

const app = express();
const http = require("http").createServer(app);
// Express App Config
app.use(express.json());

// routes
const restaurantRoutes = require("./api/restaurant/restaurant.routes");

app.use("/api/restaurant", restaurantRoutes);

const logger = require("./services/logger.service.js");
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
