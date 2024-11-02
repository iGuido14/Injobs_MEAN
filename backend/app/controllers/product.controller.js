const Product = require('../models/product.model.js');
const User = require('../models/user.model.js');
const Category = require('../models/category.model.js');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
// const User = require('../models/user.model.js');

//create
const createProduct = asyncHandler(async (req, res) => {

    // return res.json({ message: req.body.author })

    const productData = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        images: req.body.images,
        img: req.body.img || null,
        id_cat: req.body.id_cat || null,
        // favorited: req.body.favorited || null,
        // favoritesCount: req.body.favoritesCount || null,
        author: req.body.author || null
    };

    const id_cat = req.body.id_cat;

    const category = await Category.findOne({ id_cat }).exec();

    if (!category) {
        res.status(400).json({ message: "Ha ocurrido un error al buscar la categoria" });
    }

    const nuevoProducto = await new Product(productData);
    await nuevoProducto.save();

    if (!nuevoProducto) {
        res.status(400).json({ message: "Ha ocurrido un error" });
    }

    await category.addProduct(nuevoProducto._id);

    return res.status(200).json({
        product: await nuevoProducto.toProductResponse()
    })
});

//findALL
const findAllProduct = asyncHandler(async (req, res) => {
    let query = {};
    let transUndefined = (varQuery, otherResult) => {
        return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    const { offset, limit } = req.query;
    let category = transUndefined(req.query.category, "");
    let name = transUndefined(req.query.name, "");
    let price_min = transUndefined(req.query.price_min, 0);
    let price_max = transUndefined(req.query.price_max, Number.MAX_SAFE_INTEGER);
    let nameReg = new RegExp(name, 'i');
    let favorited = transUndefined(req.query.favorited, null);

    query = {
        name: { $regex: nameReg },
        $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
        isClosed: false,
        isAccepted: true
    };

    if (category != "") {
        query.id_cat = category;
    }

    if (favorited) {
        // return res.json({ message: "hola" });
        const favoriter = await User.findOne({ username: favorited });
        query._id = { $in: favoriter.favorites };
    }

    // return res.json({ message: "res" });

    const products = await Product.find(query).limit(Number(limit)).skip(Number(offset));

    const product_count = await Product.find(query).countDocuments();

    // return res.json(products)

    if (!products) {
        res.status(404).json({ msg: "Falló" });
    }

    // return res.json({ message: req.userId });

    const user = await User.findById(req.userId);

    // return res.json(user);

    return res.status(200).json({
        products: await Promise.all(products.map(async product => {
            return await product.toProductResponse(user);
        })), product_count: product_count
    });
});

const findOneProduct = asyncHandler(async (req, res) => {

    const products = await Product.findOne(req.params)

    // const user = await User.findById(req.userId);

    if (!products) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    return res.status(200).json({
        products: await products.toProductResponse()
    })
});

//DELETE ONE
const deleteOneProduct = asyncHandler(async (req, res) => {
    // return res.json("holaaa");
    const slug = req.params;

    // res.send(slug);
    const product = await Product.findOne(slug).exec();
    // res.send(product);
    // res.send(product);
    if (!product) {
        res.status(400).json({ message: "Producto no encontrado" });
    }

    const id_cat = product.id_cat
    // res.send(id_cat);
    const category = await Category.findOne({ id_cat }).exec();

    if (!category) {
        res.status(400).json({ message: "Ha ocurrido un error" });
    }

    await Product.deleteOne({ _id: product._id });
    await category.removeProduct(product._id)
    return res.status(200).json({
        message: "Producto eliminado"
    });
});

const GetProductsByCategory = asyncHandler(async (req, res) => {
    const slug = req.params;
    let product_count = "";
    query = {
        id_cat: category.id_cat,
        isClosed: false,
        isAccepted: true
    };

    const category = await Category.findOne(slug).exec();

    if (!category) {
        res.status(400).json({ message: "Categoria no encontrada" });
    }

    const products = await Product.find(query);
    product_count = products.length;

    return res.status(200).json({
        products: products,
        product_count: product_count
    });
});

const updateProduct = asyncHandler(async (req, res) => {

    const userId = req.userId;

    const product = req.body;
    const { slug } = req.params;
    // return res.json(req.params);
    // const loginUser = await User.findById(userId).exec();

    const target = await Product.findOne({ slug }).exec();

    if (product.name) {
        target.name = product.name;
    }
    if (product.description) {
        target.description = product.description;
    }
    if (product.price) {
        target.price = product.price;
    }

    await target.save();
    return res.status(200).json({
        product: await target.toProductResponse()
    })
});

const favoriteProduct = asyncHandler(async (req, res) => {
    const id = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(id).exec();

    if (!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }

    const product = await Product.findOne({ slug }).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    // console.log(`product info ${product}`);

    await loginUser.favorite(product._id);

    // return res.json({ message: "hola" })

    const updatedProduct = await product.updateFavoriteCount();

    // return res.json(updatedProduct)

    return res.status(200).json({
        product: await updatedProduct.toProductResponse(loginUser)
    });
});

const unfavoriteProduct = asyncHandler(async (req, res) => {
    const id = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(id).exec();

    if (!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }

    const product = await Product.findOne({ slug }).exec();

    if (!product) {
        return res.status(401).json({
            message: "product Not Found"
        });
    }

    // return res.json({ message: "hola" })

    await loginUser.unfavorite(product._id);
    // return res.json(product)

    const updatedProduct = await product.updateFavoriteCount();
    // return res.json(updatedProduct)

    return res.status(200).json({
        product: await updatedProduct.toProductResponse(loginUser)
    });
});

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    deleteOneProduct,
    GetProductsByCategory,
    updateProduct,
    favoriteProduct,
    unfavoriteProduct
}