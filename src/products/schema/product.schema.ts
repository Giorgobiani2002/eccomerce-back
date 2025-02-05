import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class ChooseColor {
  @Prop({ type: String })
  img: string;

  @Prop({ type: String })
  color: string;
}

// უნდა ქონდეს name
//უნდა ქონდეს starts //შეფასება ვარსვლავბსს მიხედვით ანუ
//უნდა ქოდეს desc აღწერა
//უნდა ქოდეს price ფასი
//უნდა ქოდეს old price ფასი
//უნდა ქოდეს Measurements ანუ რა ფერი იყოს
//უნდა ქოდეს quantity
// და Wishlist ანუ ფავორიტია თუ არა გულები როა
// ასევე category
// და რაღაცა SKU ნომერი
// არის თუ არა აცალი New
// და რამდენ პროცენტიანი ფასდაკლენაა

//და ფლიტრებიც უნდა მუშაობდეს სერვისდან

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  oldPrice: number;

  @Prop({ type: String })
  discount: string;

  @Prop({ type: Number, min: 0, max: 5 })
  rating: number;

  @Prop({ type: Boolean, default: false })
  isNew: boolean;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [String] })
  color: string[];

  @Prop({ type: String })
  measurements: string;

  @Prop({ type: Number })
  reviews: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: [String] })
  stars: string[];

  @Prop({ type: String })
  category: string;
  @Prop({ type: String })
  imageUrl: string;

  @Prop({ type: Boolean, default: false })
  wishlist: boolean;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: String, unique: true })
  SKU: string;

  @Prop({ type: [ChooseColor], default: [] })
  chooseColor: ChooseColor[];
}

export const productSchema = SchemaFactory.createForClass(Product);
