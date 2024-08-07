const express = require("express");

const {
  createSubCategory,
  getsubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategoryService");
const {
  createsubCategoryValidator,
  getsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");


//mergeParams allows us to access parameters on other routers
const router = express.Router({mergeParams:true});


router
  .route("/")
  .get(createFilterObj, getsubCategories)
  .post(setCategoryIdToBody, createsubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getsubCategoryValidator, getSubCategory)
  .put(updatesubCategoryValidator, updateSubCategory)
  .delete(deletesubCategoryValidator, deleteSubCategory);



module.exports = router;
