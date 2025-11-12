import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Controller('products')
export class ProductsController {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 25, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 75, description: 'Mechanical keyboard' },
  ];

  @Get()
  findAll(): Product[] {
    return this.products;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    const product =  this.products.find((product) => String(product.id === parseInt(id)));
    if(!product){
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  @Post()
  create(@Body() product: Omit<Product, 'id'>): Product {
    const newProduct = { id: this.products.length + 1, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index > -1) {
      this.products.splice(index, 1);
      return { message: 'Product deleted successfully' };
    }
    return { message: 'Product not found' };
  }
}
