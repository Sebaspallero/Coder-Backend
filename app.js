import ProductManager from "./productManager.js";
import express from 'express'


const path = "./db.json"
const app = express()

app.use(express.urlencoded({extended: true}))
app.listen(8080, ()=> console.log('Listening on port 8080'))

app.get('/products', async(req, res) =>{
    let {limit} = req.query
    let products = await manager.getProducts()
    if(limit){
        let filteredProducts = products.slice(0, limit)
        res.send(filteredProducts)
    }
    else{
        res.send(products)
    }
})

app.get('/products/:pid', async(req, res) =>{
    let productId = req.params.pid
    let products = await manager.getProducts()
    let filteredProduct = products.find(product => product.id == productId)
    res.send({filteredProduct})
})


// Se Crea la instacia de ProductManager
const manager = new ProductManager(path)

//DESCOMENTAR LAS FUNCIONES PARA PROBAR LOS METODOS

// ADD PRODUCT:

const addProduct = async() => {
    await manager.addProduct({
        title: "Uva",
        description: "Uva de Mendoza",
        price: 90,
        thumbnail: "https://images.app.goo.gl/VVHm5zYYH6NZjQSP7",
        code: "4",
        stock: 20,
    });
}

/*  addProduct(); */ //DESCOMENTAR
 

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