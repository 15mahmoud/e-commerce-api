
const mongoose = require('mongoose')



//Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category required"],
        unique: [true, "category must be unique"],
        minlength: [3, "Too short category name"],
        maxlength:[32,"Too long category name"]
    },
    slug: {
        type: String,
        lowercase:true
    },
    image: String
},{timestamps:true})


//model
const categoryModel = mongoose.model('Category', categorySchema);


module.exports = categoryModel;