require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")

// //My Routes
const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const sellerRoutes = require("./routes/seller");
// const adminRoutes = require("./routes/admin");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");
// const homeScreenRoutes = require("./routes/homeScreen");
// const productSearchRoutes = require("./routes/productSearch");



//DB Connection
mongoose
    .connect('mongodb://localhost:27017/FlipClone', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("DB CONNECTED");
    }).catch(() => {
        console.log("Error with DB Connection");
    });


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// //Routes
app.use("/api", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api", sellerRoutes);
// app.use("/api", adminRoutes);
// app.use("/api", productRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", homeScreenRoutes);
// app.use("/api", productSearchRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Start
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});
