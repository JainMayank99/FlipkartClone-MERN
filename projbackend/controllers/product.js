const ProductSchema = require('../models/product')
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
var cloudinary = require("cloudinary").v2;

exports.getProductById = (req, res, next, id) => {
    ProductSchema.findById(id)
        .populate('sellerDetails')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Product not found in DB"
                })
            }
            req.product = product;
            next();
        })
}

exports.addProduct = (req, res) => {
    let form = new formidable
        .IncomingForm({
            multiples: true,
            keepExtensions: true,
            maxFileSize: 2 * 1024 * 1024
        });

    //fields to contain name,description
    //send at max 4
    form.parse(req, (err, fields, files) => {
        // console.log('fields:', fields);
        // console.log('files:', files);

        const product = new ProductSchema(fields);
        product.sellerDetails = req.profile._id
        product.category = req.category._id

        let imgDetails = new Array();

        Object.keys(files).map(async (key, index) => {
            // console.log(key + ":" + files[key].path);
            const uniqueFileName = uuidv4();

            await cloudinary.uploader.upload(
                files[key].path.toString(),
                {
                    public_id: `FlipkartClone/${uniqueFileName}`,
                    tags: `FlipkartClone`,
                    quality: "auto",
                },
                (err, image) => {
                    if (err) {
                        console.log("Error:" + err);
                        return res.status(500).send(err);
                    }
                    // console.log(image);
                    console.log("PIC UPLOADED to Cloudinary");
                    let obj = { ImgPath: image.public_id, url: image.url }
                    imgDetails.push(obj);
                    console.log(index, ",", Object.keys(files).length);
                    if (index == Object.keys(files).length - 1) {
                        product.image.push(...imgDetails);
                        console.log("Product" + product);

                        product.save((err, product) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Saving product in DB failed"
                                });
                            }
                            return res.status(202).json(product);
                        });
                    }
                }
            )
        })

    });

    // form.on('progress', (bytesReceived, bytesExpected) => {
    //     console.log("InProgress");
    //     console.log("bytesReceived " + bytesReceived);
    //     console.log("bytesExpected " + bytesExpected);
    // });


    // form.on('fields', (name, value) => {
    //     console.log("fieldsname " + name);
    //     console.log("value " + value);
    // })
    // form.on('file', (name, file) => {
    //     console.log("filename " + name);
    //     console.log("file " + file);
    // })

    form.on('error', (err) => {
        // console.log("error in uploading");
        return res.status(500).send("Server error");
    });

    form.on('aborted', () => {
        console.log("Aborted by user or timeout");
        return res.status(408).send("Aborted by user or timeout");
    });

    // form.on('end', () => {
    //     console.log("Uploaded successfully");
    //     return res.status(200).send("Uploaded successfully")
    // });
}

//multiple file to clodinary using promises
//incomplete , for reference
//https://scotch.io/@codebyomar/how-to-upload-multiple-images-with-cloudinary-and-node-js

// exports.addProduct = (req, res) => {
//     let form = new formidable
//         .IncomingForm({
//             multiples: true,
//             keepExtensions: true,
//             maxFileSize: 2 * 1024 * 1024
//         });

//     //fields to contain name,description
//     //send at max 4
//     form.parse(req, (err, fields, files) => {
//         // console.log('fields:', fields);
//         // console.log('files:', files);

//         const product = new ProductSchema(fields);
//         product.sellerDetails = req.profile._id
//         product.category = req.category._id

//         let imgDetails = new Array();



//         let multipleUpload = new Promise(async (resolve, reject) => {
//             let upload_len = filePaths.length
//                 , upload_res = new Array();

//             for (let i = 0; i <= upload_len + 1; i++) {
//                 let filePath = filePaths[i];
//                 await cloudinary.v2.uploader.upload(filePath, (error, result) => {

//                     if (upload_res.length === upload_len) {
//                         /* resolve promise after upload is complete */
//                         resolve(upload_res)
//                     } else if (result) {
//                         /*push public_ids in an array */
//                         upload_res.push(result.public_id);
//                     } else if (error) {
//                         console.log(error)
//                         reject(error)
//                     }

//                 })

//             }
//         })
//             .then((result) => result)
//             .catch((error) => error)

//         /*waits until promise is resolved before sending back response to user*/
//         let upload = await multipleUpload; 
//         res.json({ 'response': upload })
//     })

//         // form.on('progress', (bytesReceived, bytesExpected) => {
//         //     console.log("InProgress");
//         //     console.log("bytesReceived " + bytesReceived);
//         //     console.log("bytesExpected " + bytesExpected);
//         // });


//         // form.on('fields', (name, value) => {
//         //     console.log("fieldsname " + name);
//         //     console.log("value " + value);
//         // })
//         // form.on('file', (name, file) => {
//         //     console.log("filename " + name);
//         //     console.log("file " + file);
//         // })

//         form.on('error', (err) => {
//             console.log("error in uploading");
//         });

//         form.on('aborted', () => {
//             console.log("Aborted by user or timeout");
//         });

//         // form.on('end', () => {
//         //     console.log("Uploaded successfully");
//         //     return res.status(200).send("Uploaded successfully")
//         // });
// }


exports.getAllProducts = (req, res) => {
    ProductSchema.find((err, products) => {
        if (err || !products) {
            return res.status(400).json({
                error: "Products not found in DB"
            })
        }
        return res.status(200).json(products)
    })
}

exports.getProductByUserId = (req, res) => {

}