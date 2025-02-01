import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs/promises';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import * as path from 'path';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel('product') private productModel: Model<Product>) {}

  async onModuleInit() {
    try {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'products',
        'products.json',
      );
      const data = await fs.readFile(filePath, 'utf-8');
      const products = JSON.parse(data);
      console.log(data, 'data');

      if (products.length > 0) {
        await this.productModel.insertMany(products);
        console.log('inserted successfully!');
      }
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: string): Promise<Product> {
    const product = this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product Not Found!');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
