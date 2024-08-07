const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiErrors");


exports.setCategoryIdToBody = (req, res,next) => {
  //nested royte
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
}
//@dec create subCategory
//@route POST /api/v1/categories
//@access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  
        const {name,category} = req.body;
        const subCategory = await SubCategory.create({
          name,
          slug: slugify(name),
          category
        });
        res.status(201).json({ data: subCategory })
})
    



exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
}
//@dec get list of sub categories
//@route GET /api/v1/subcategories
//@access public
exports.getsubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page *1||1;
    const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit

  

    const subCategories = await SubCategory.find(req.filterObj)
      .skip(skip)
      .limit(limit);
      // .populate({ path: "category", select: "name -_id" });
                    
    res.status(200).json({ reultas: subCategories.length,page, data: subCategories });
});


//@dec get specific subCategory by id
//@route GET /api/v1/categories
//@access public
exports.getSubCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
  const subCategory = await SubCategory.findById(id)
    // .populate({
    //   path: "category",
    //   select: "name -_id",
    // });
    if (!subCategory) {
      return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
})


//@dec update subCategory
//@route PUT /api/v1/categories
//@access private
exports.updateSubCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params
    const { name,category } = req.body;

    const subCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name), category },

      { new: true }
    );
    if (!subCategory) {
        return next(new ApiError(`No subCategory for this id ${id}`, 404))
    }
    res.status(200).json({ data: subCategory })
})


//@dec delete subCategory
//@route delete /api/v1/categories
//@access private
exports.deleteSubCategory = asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete( id );
    if (!subCategory) {
      return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(204).send()
});
