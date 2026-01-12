import OrderModel from "../models/orders.model.js";

export default {
  getAllOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find({});
      res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { shippment_address, status, total_price, user_id, createdAt, items } = req.body;
      const newOrder = new OrderModel({ shippment_address, status, total_price, user_id, createdAt, items });
      await newOrder.save();
      res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
      if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  },

  getAllUserOrders: async (req, res) => {
    try {
      const { id } = req.params;
      const orders = await OrderModel.find({ user_id: id });
      res.status(200).json({ message: "User orders fetched successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
  },
};
