import ProductManager from "./productManager.js";
const path = "./db.json";

// Se Crea la instacia de ProductManager
const manager = new ProductManager(path);

//DESCOMENTAR LAS FUNCIONES PARA PROBAR LOS METODOS

// ADD PRODUCT:

const addProduct = async() => {
    await manager.addProduct({
        title: "Manzana",
        description: "Manzana Roja de Río Negro",
        price: 60,
        thumbnail: "https://images.app.goo.gl/VVHm5zYYH6NZjQSP7",
        code: "1",
        stock: 20,
    });
}

/* addProduct();  */ //DESCOMENTAR
 

// GET ALL PRODUCTS

const getProducts = async() =>{
    console.log(await manager.getProducts());
}

/* getProducts(); */ //DESCOMENTAR


// GET PRODUCT BY ID

const getProductById = async() =>{
    console.log(await manager.getProductById(1))
}

/* getProductById(); */ //DESCOMENTAR

// UPDATE PRODUCT BY ID

const updateProduct = async() => {
    await manager.updateProductById(1, { price: 150 })
}

/* updateProduct(); */ //DESCOMENTAR


// DELETE PRODUCT BY ID

const deleteProduct = async() =>{
    await manager.removeProductById(1)
}

/* deleteProduct(); */ //DESCOMENTAR

// DELETE ALL PRODUCTS

const deleteAllProducts = async() =>{
    await manager.removeAllProducts()
}

/* deleteAllProducts(); */ //DESCOMENTAR