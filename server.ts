import * as express from "express";

const app = express();
import * as http from "http";
const httpClient = http.createServer(app);
// Express App Config
app.use(express.json());

// routes
import userRoutes from "./api/user/user.routes";

app.use("/api/user", userRoutes);

const port = process.env.PORT || 3030;
httpClient.listen(port, () => {
  console.log("Server connected to port: " + port);
});
