import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Order } from "../models/patient";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.patch(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized to view this order");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(204).send(order);
  }
);

export { router as patchOrdersRouter };
