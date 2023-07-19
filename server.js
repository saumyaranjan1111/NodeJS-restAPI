const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const Product = require('./models/productModel')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// we'll need mongoose to connect nodejs to mongodb

// middleware
// //this allows the server to read json files 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send("hello");
});

// CREATE

// when any user hits the endpoint /product using the post method
app.post('/products', async (req, res) =>{
    try {

        // By using Product.create(req.body), you can create a new document in the Product collection using the data from the HTTP request body. The create() method handles the creation of the document and saves it to the database, returning the created document as a result.
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})




// READ

// get all the products in our collection
app.get('/products', async(req, res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// get the product with id = id in our collection
app.get('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            res.status(404).json({message: `cannot find any product with the id = ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})




// UPDATE

app.put('/products/:id', async(req, res)=>{
    try {

        const {id} = req.params;
        // find the product with the id = id and replace it with the req.body that is sent by the clients
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        // if the product wasnt found
        if(!product){
            return res.status(404).json({message:  `cannot find any product with the id = ${id}`});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// DELETE


app.delete('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            // if the product is not found in our collection
            return res.status(404).json({message: `cannot find any product with the id = ${id}`})
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



// connect mongodb to our application using mongoose package of npm
mongoose.
connect(process.env.URI)
.then(()=>{
    console.log("connected to mongodb");
    app.listen(PORT, ()=>{
        console.log(`node api is running on the port ${PORT}`);
    
    });
}).catch((error) => {
    console.log(error);
})


