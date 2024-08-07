const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiErrors');


//@dec get list of category
//@route GET /api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page *1||1;
    const limit = req.query.limit * 1 || 5;
    const skip=(page-1)*limit
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ reultas: categories.length,page, data: categories })
});


//@dec get specific category by id
//@route GET /api/v1/categories
//@access public
exports.getCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const category = await Category.findById(id)
    if (!category) {
       return next(new ApiError(`No category for this id ${id}`,404))
    }
    res.status(200).json({data:category})
})




//@dec create category
//@route POST /api/v1/categories
//@access private
exports.createCategory =asyncHandler( async (req, res) => {
        const {name} = req.body;
        const category = await Category.create({ name, slug: slugify(name) });
        res.status(201).json({ data: category })
    } )
    
    
//@dec update category
//@route PUT /api/v1/categories
//@access private
exports.updateCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params
    const { name } = req.body;

    const category = await Category.findOneAndUpdate({ _id: id }, { name ,slug:slugify(name)}, {new: true })
    if (!category) {
        return next(new ApiError(`No category for this id ${id}`, 404))
    }
    res.status(200).json({ data: category })
})




//@dec delete category
//@route delete /api/v1/categories
//@access private
exports.deleteCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete( id );
    if (!category) {
        return next(new ApiError(`No category for this id ${id}`, 404))
    }
    res.status(204).send()
});
