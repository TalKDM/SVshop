const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("mongoose");
require("dotenv").config();

const stripe = require("stripe")(process.env.
    STRIPE_PRIVATE_KEY);


const url = "mongodb+srv://TalKdm:CschuldinerTkdm2988@cluster0.mfcyuc6.mongodb.net/svshop";

db.connect(url)
    .then(() => {
    console.log("DB is on.");
    })
    .catch((err) => {
    console.log(err);
    });

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const usersSchema = new db.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const productsSchema = new db.Schema ({
    id: String,
    name: String,
    price: String,
    img: String
});

const orderSchema = new db.Schema({
    name: String,
    products: [Object]
  });


const userModel = db.model("user",usersSchema);

const productModel = db.model("productsList", productsSchema);

const orderModel = db.model("orderList", orderSchema);

let result = "";

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/sign-in.html")
});

app.post("/sign-in",async (req,res) => {
    let signInUser = {
        email: req.body.mailInput,
        password: req.body.passInput
    }
        let result = await userModel.findOne({email: req.body.mailInput, password: req.body.passInput});
        if(!result) {
            res.json({message:"error"})
        }else if (result) {
            res.json({message: "ok", result});
        }
        }
)

app.get("/signup", (req,res) => {
    res.sendFile(__dirname + "/public/signup.html")
})


app.post("/signup",async (req,res) => {
    let newUser = {
        name: req.body.nameInput,
        email: req.body.mailInput,
        password: req.body.passInput
    };
    let result = await userModel.findOne({email: newUser.email});
    if(result){
        res.json({ message: "error" })
    }else if (!result) {
        await userModel.insertMany(newUser);
        res.json({ message: "ok" });
        console.log(newUser);
    }
    }
)


app.get("/productsList",async (req,res) => {
    let productObj = await productModel.find({})
    res.json(productObj)
});

app.get("/products", (req,res) => {
    res.sendFile(__dirname + "/public/products.html")
});

app.get("/buy", (req,res) => {
    res.sendFile(__dirname + "/public/buy.html");
});

app.post("/userOrderList",async (req,res) => {
    let newOrder = {
        name: req.body.currentUserName,
        products: req.body.basket
    };
    if(newOrder) {
        res.json({message: "ok"})
        console.log(newOrder);
        result = await orderModel.insertMany(newOrder);
    }else {
        res.json({message: "error"});
    }
});

app.get("/checkout", (req,res) => {
    res.sendFile(__dirname + "/public/checkout.html")
});



app.listen(3000, () => {
    console.log("Server works on port 3000");
    });