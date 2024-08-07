const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const Brand = require('../models/brandModel');
const ApiError = require('../utils/apiErrors');


//@dec get list of brand
//@route GET /api/v1/brands
//@access public
exports.getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page *1||1;
    const limit = req.query.limit * 1 || 5;
    const skip=(page-1)*limit
    const brands = await Brand.find({}).skip(skip).limit(limit);
    res.status(200).json({ reultas: brands.length,page, data: brands })
});


//@dec get specific brand by id
//@route GET /api/v1/brands
//@access public
exports.getBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id)
    if (!brand) {
       return next(new ApiError(`No brand for this id ${id}`,404))
    }
    res.status(200).json({data:brand})
})




//@dec create brand
//@route POST /api/v1/brands
//@access private
exports.createBrand =asyncHandler( async (req, res) => {
        const {name} = req.body;
        const brand = await Brand.create({ name, slug: slugify(name) });
        res.status(201).json({ data: brand })
    } )
    
    
//@dec update brand
//@route PUT /api/v1/brands
//@access private
exports.updateBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params
    const { name } = req.body;

    const brand = await Brand.findOneAndUpdate({ _id: id }, { name ,slug:slugify(name)}, {new: true })
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404))
    }
    res.status(200).json({ data: brand })
})




//@dec delete brand
//@route delete /api/v1/brands
//@access private
exports.deleteBrand = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete( id );
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404))
    }
    res.status(204).send()
});
