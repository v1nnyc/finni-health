import { NotAuthorizedError, NotFoundError, requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Order } from "../models/patient";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized to view this order");
    }

    res.send(order);
  }
);

export { router as showOrdersRouter };
