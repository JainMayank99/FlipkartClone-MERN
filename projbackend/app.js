require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const cloudinary = require('cloudinary');

cloudinary
    .config({
        cloud_name: process.env.CLOUDNAME,
        api_key: process.env.CLOUDINARYAPIKEY,
        api_secret: process.env.CLOUDINARYAPISECRET,
    });

//DB Connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("DB CONNECTED");
    }).catch(() => {
        console.log("Error in DB Connection");
    });


//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const addressRoutes = require("./routes/address");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const wishListRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");
// const orderRoutes = require("./routes/order");

// const homeScreenRoutes = require("./routes/homeScreen");
// const productSearchRoutes = require("./routes/productSearch");


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// //Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", addressRoutes)
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", wishListRoutes);
app.use("/api", cartRoutes);
// app.use("/api", orderRoutes);

// app.use("/api", homeScreenRoutes);
// app.use("/api", productSearchRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Start
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});
