import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  desc: string;
  @Prop({ type: Number, index: true })
  price: number;
  @Prop({ type: String })
  imageUrl: string;
  @Prop({ type: Number })
  quantity: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
