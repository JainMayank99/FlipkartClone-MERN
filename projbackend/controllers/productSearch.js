const ProductSchema = require('../models/product')

exports.searchProduct = async (req, res) => {
    // let search = req.body.searchTerm;
  
    // let val = new RegExp(`^${search}|${search}$|${search}`, "gi");
  
    await ProductSchema.find()
      .select("name image")
      .then((result) => {
        return res.send(result);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  };
  