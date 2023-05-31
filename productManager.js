import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.nextId = 1;
    }

    async addProduct(product) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    // Validar que todos los campos sean obligatorios
                    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                        console.log("Error: Todos los campos son obligatorios");
                        return;
                    }

                    // Validar que no se repita el campo "code"
                    if (this.products.find((p) => p.code === product.code)) {
                        console.log("Error: El código ya existe");
                        return;
                    }
                    // Agregar el producto con un id autoincrementable
                    product.id = this.nextId++;
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                }
                console.log("Producto agregado correctamente")
            }  else {
                product.id = this.nextId++;
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, "\t"));
            } 
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    return this.products;
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        }
        catch (error) {
            throw new Error("Error: ", error);

        }
    }

    async getProductById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const product = await this.products.find((p) => p.id === id);
                    if (product) {
                        return product;
                    } else {
                        console.log(`Error: Producto con el id "${id}" no encontrado`);
                    }
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }
    }

    async updateProductById(id, product) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const index = this.products.findIndex((p) => p.id === id);
                    if (index !== -1) {
                        this.products[index] = { ...this.products[index], ...product };
                        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                        console.log("Has actualizado correctamente el producto =>");
                        console.log(this.products)
                    } else {
                        console.log("Error: Producto no encontrado")
                    }
                } else {
                    console.log("No existe el archivo, por favor cree uno");
                }
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }
    }

    async removeProductById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const index = this.products.findIndex((p) => p.id == id);
                    if (index !== -1) {
                        this.products.splice(index, 1);
                        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                        console.log("Producto eliminado correctamente");
                    }
                } else {
                    console.log("Error: Producto no encontrado");
                }
            } else {
                console.log("No existe el archivo, por favor cree uno");
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }
    }

    async removeAllProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = [];
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                    console.log("Todos los productos han sido eliminados");
                } else {
                    console.log("Error: no hay productos para eliminar");
                }
            }
        } catch (error) {
            throw new Error("Error: ", error);
        }

    }

}

