const mongoose = require('mongoose')

// create a structure or a schema for the data which is going to be entered in our collection
// this is basically a format we'd expect from the new data which is to be entered into our collection
// The productSchema variable is created using the mongoose.Schema function. This function is used to define the structure or schema for the data that will be stored in the product collection.

// By defining a schema, you can ensure that the data being stored in the product collection follows a specific structure and meets certain validation requirements. Mongoose provides powerful features for working with MongoDB in a structured and organized manner.

const productSchema = mongoose.Schema(
    {
        "name":{
            type: String, 

            // If a product document is inserted without a name, Mongoose will throw an error with the provided message.
            required: [true, "Please enter product name "]
        },
        "quantity":{
            type:Number,
            required: true,
            default: 0,
        }, 
        "price":{
            type:Number,
            required:true
        },
        "image":{
            type:String, 
            required:false
        }

    },
    {
        // The saved product document will have the createdAt and updatedAt fields populated with the respective timestamps.
        timestamps : true,
    }
)


// now that we have defined the schema , we can now create the product model

const Product = mongoose.model('Product', productSchema);

module.exports = Product;