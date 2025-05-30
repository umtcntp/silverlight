const express = require("express");
require("dotenv").config();

const analyseRoute = require("./routes/analyse");

const app = express();
const port = process.env.PORT || 5002;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/analyse", analyseRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
