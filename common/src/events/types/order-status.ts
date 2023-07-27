export enum OrderStatus {
  //   when order has been created, but ticket has not been reserved
  Created = "created",
  //   when ticket the order is trying to reserve has already been reserved,
  //   or when user has cancelled the order,
  //   or when order expires before payment
  Cancelled = "cancelled",
  //   whenever order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",
  //   the order has reserved the ticket and the user has provided payment successfully
  Complete = "complete",
}
