const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: { type:String,required:true,unique:true},
      description: String,
      price: Number,
      discountPercentage: Number,
      rating: Number,
      stock: Number,
      brand: String,
      category: String,
      thumbnail: String,
      images: [
       String
      ]
 
});

const Product= mongoose.model('product',blogSchema);

exports.Products=Product;

