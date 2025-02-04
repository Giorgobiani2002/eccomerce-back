import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private usersModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.usersModel.findOne({
      email: createUserDto.email,
    });
    // anu is bcrypt js it shvebodi ro schemis doneze pirdapir imas hashavdi rac arasworia
    // bandzi tutoriali naxe savaraudod :d exa gaswroda mushoabs gijivit
    // debuging unda miyve line by line logicas ris mere ras idzaxebs rato idzaxebs ra abrunebs am pasuxs da a.sh.
    // wavedi aba dalshe mixede shenit
    if (existUser) {
      throw new BadRequestException('user already exist');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    console.log(createUserDto, 'createUserDto');
    const user = await this.usersModel.create(createUserDto);
    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found');
    console.log('current pasword,', password);
    console.log('hashed password in database', user.password);

    console.log(
      await bcrypt.compare(
        'gela1234',
        '$2a$10$BzO4lw208oSqiv2PrmPZ/uVqcbTvYU0hZKt2kYW//P8gu1O7l3/BK',
      ),
      'bycruyt',
    );
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Password check', isPasswordValid);

    console.log('Hashed password:', user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return {
      access_token: token,
      userId: user._id, 
    };
  }

  findAll() {
    return this.usersModel.find();
  }
  // aa daica ara
  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id ');
    const user = await this.usersModel.findById(id);
    if (!user) throw new NotFoundException('not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id ');
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) throw new BadRequestException('user not found');
    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id ');

    const deletedUser = await this.usersModel.findByIdAndDelete(id);
    if (!deletedUser) throw new BadRequestException('user not found');

    return deletedUser;
  }
}
