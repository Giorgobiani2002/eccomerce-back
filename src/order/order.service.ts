import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
    @InjectModel('user') private userModel: Model<User>,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
  
    let order = await this.orderModel.findOne({ user: userId });
  
    if (!order) {
      // If no order exists, create a new one
      order = await this.orderModel.create({
        user: user._id,
        products: createOrderDto.products.map(product => ({
          ...product,
          quantity: product.quantity || 1,
        })),
      });
  
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { order: order._id },
      });
    } else {
      // If an order exists, update the product list
      createOrderDto.products.forEach(newProduct => {
        const existingProduct = order.products.find(p => p.productId === newProduct.productId);
        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity || 1;
        } else {
          order.products.push({ ...newProduct, quantity: newProduct.quantity || 1 });
        }
      });
    }
  
    // Dynamically calculate total price
    order.totalPrice = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  
    await order.save();
    return order;
  }
  

  async findAll() {
    return this.orderModel.find().populate({ path: 'user', select: '-order -_id -createdAt -__v' });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!existingOrder) throw new NotFoundException('Order not found');
    return existingOrder;
  }

  async remove(id: string) {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) throw new NotFoundException('Order not found');
    return deletedOrder;
  }

  async removeAll() {
    const deletedOrders = await this.orderModel.deleteMany({});
    await this.userModel.updateMany({}, { $set: { order: [] } });
    return { deletedCount: deletedOrders.deletedCount };
  }
}
