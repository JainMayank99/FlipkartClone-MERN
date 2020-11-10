const CategorySchema = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    CategorySchema.findById(id, (err, cate) => {
        if (err || !cate) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    })
}

exports.addCategory = (req, res) => {
    const cate = new CategorySchema(req.body);

    cate.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                err: 'NOT able to save Category in DB !',
            });
        }
        return res.json(cate)
    })
}

exports.getAllCategory = (req, res) => {
    CategorySchema.find({ parentId: null }, (err, cate) => {
        if (err || !cate) {
            return res.status(400).json({
                err: 'DB error or No category found',
            });
        }
        return res.json(cate)
    })
}

exports.updateCategory = (req, res) => {
    CategorySchema.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, cate) => {
            if (err || !cate) {
                return res.status(400).json({
                    err: 'DB error or category not updated',
                });
            }
            return res.json(cate)
        })
}

exports.removeCategory = (req, res) => {
    CategorySchema.findByIdAndDelete(
        { _id: req.category._id },
        (err, cate) => {
            if (err || !cate) {
                return res.status(400).json({
                    err: 'DB Error or Category not Deleted',
                });
            }
            return res.json(cate)
        }
    )
}

exports.addSubCategory = (req, res) => {
    const subCate = new CategorySchema();
    subCate.CategoryName = req.body.SubCategoryName
    subCate.parentId = req.category._id;

    subCate.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                err: 'NOT able to save Category in DB !',
            });
        }
        return res.json(cate)
    })
}

exports.getAllSubCategoryToACategory = (req, res) => {
    CategorySchema.find({ parentId: req.category },
        (err, cate) => {
            if (err || !cate) {
                return res.status(400).json({
                    err: 'DB error or No SubCategory found',
                });
            }

            return res.json(cate)
        })
}

exports.updateSubCategory = (req, res) => {
    // const CategoryName = req.body.SubCategoryName
    CategorySchema.findByIdAndUpdate(
        { _id: req.category._id },
        { CategoryName: req.body.SubCategoryName },
        { new: true, useFindAndModify: false },
        (err, cate) => {
            if (err || !cate) {
                return res.status(400).json({
                    err: 'DB error or Subcategory not updated',
                });
            }
            return res.json(cate)
        })
}

exports.removeSubCategory = (req, res) => {
    CategorySchema.findByIdAndDelete(
        { _id: req.category._id },
        (err, cate) => {
            if (err || !cate) {
                return res.status(400).json({
                    err: 'DB error or Subcategory not Deleted',
                });
            }
            return res.json(cate)
        }
    )
}