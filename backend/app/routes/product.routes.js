module.exports = (app) => {

    const products = require('../controllers/product.controller.js');
    const verifyJWT = require('../middleware/verifyJWT.js');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');

    // Create
    app.post('/products', products.createProduct);

    //GET ALL
    app.get('/products', verifyJWTOptional, products.findAllProduct);
    // app.get('/products', products.findAllProduct);

    //GET ONE
    app.get('/products/:slug', verifyJWTOptional, products.findOneProduct);

    // Delete a Note with noteId
    app.delete('/products/:slug', products.deleteOneProduct);

    //get products by category
    app.get('/categories/:slug', verifyJWTOptional, products.GetProductsByCategory);

    //Favorite
    app.post('/:slug/favorite', verifyJWT, products.favoriteProduct);

    //Unfavorite
    app.delete('/:slug/favorite', verifyJWT, products.unfavoriteProduct);

    //Update
    app.put('/products/:slug', verifyJWT, products.updateProduct);
}

// {
//     "category_name": "Santiago",
//     "image": "santiago.jpg"
// }

// {
//     "name": "prod_1",
//     "price": 50,
//     "description": "hola buenas",
//     "images": null,
//     "img": "path/to/img",
//     "id_cat": "id_cat_1",
//     "author": null
// }