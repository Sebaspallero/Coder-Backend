class productManager {
    constructor(){
        this.productsList = []
    }

    getProducts = () =>{
        return console.log(this.productsList)
    }

    getProductById = (id) =>{
        const product = this.productsList.find(product => product.id == id)
        if(!product){
            console.log("El producto no fue encontrado")
            return
        }
        else{
            return console.log(product)
        }
       
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if(this.productsList.length === 0){
            product.id = 1;
        }else{
            product.id=this.productsList[this.productsList.length-1].id + 1;
        };

        const codeExist = this.productsList.some(product =>product.code === code);

        if(codeExist){
            console.log(`el producto ${product.title}, está usando un código ya existente en otro producto => ${product.code}`)
            return
        };

        if(!title, !description, !price, !thumbnail, !code, !stock){
            console.log('Debe completar todos los campos')
        }else{
            this.productsList.push(product)
        };
    }
}


const productHandler = new productManager();
productHandler.getProducts();
productHandler.addProduct('Manzana', 'Manzana Roja de Río Negro', 60, 'https://images.app.goo.gl/VVHm5zYYH6NZjQSP7', 001, 20);
productHandler.getProducts();
productHandler.addProduct('Manzana', 'Manzana Roja de Río Negro', 60, 'https://images.app.goo.gl/VVHm5zYYH6NZjQSP7', 001, 20);
productHandler.getProductById(1);
productHandler.getProductById(2);