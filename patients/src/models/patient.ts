// import mongoose from "mongoose";
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// export { OrderStatus };

// enum PatientStatus {
//   inquiry = "Inquiry",
//   onboarding = "Onboarding",
//   active = "Active",
//   churned = "Churned"
// }

// //parameters required to make order model
// interface PatientAttrs {
//   patientId: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   status: PatientStatus
// }

// // interface that describes the properties
// // that a order document has
// interface OrderDoc extends mongoose.Document {
//   userId: string;
//   status: OrderStatus;
//   expiresAt: Date;
//   ticket: TicketDoc;
//   version: number;
// }

// // interface that describes the properties
// // that a order model has
// interface OrderModel extends mongoose.Model<OrderDoc> {
//   build(attrs: OrderAttrs): OrderDoc;
// }

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: Object.values(OrderStatus),
//       default: OrderStatus.Created,
//     },
//     expiresAt: {
//       type: mongoose.Schema.Types.Date,
//       required: true,
//     },
//     ticket: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Ticket",
//     },
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );

// orderSchema.set("versionKey", "version");
// orderSchema.plugin(updateIfCurrentPlugin);

// // to allow typescript to enforce attribute checking
// // when creating new instance of order, bc no type checking
// // in new Order(attrs)
// orderSchema.statics.build = (attrs: OrderAttrs) => {
//   return new Order(attrs);
// };

// const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

// export { Order };
