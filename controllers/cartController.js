const Cart = require("../models/cartModel");
const FoodItem = require("../models/foodItem");
const Restaurant = require("../models/restaurant");

async function addItemToCart(req, res) {
  const { userId, foodItemId, restaurantId, quantity } = req.body;

  try {
    // Run independent existence checks in parallel instead of one after another
    const [foodItem, restaurant, existingCart] = await Promise.all([
      FoodItem.findById(foodItemId),
      Restaurant.findById(restaurantId),
      Cart.findOne({ user: userId }),
    ]);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    let cart = existingCart;

    if (cart) {
      if (cart.restaurant.toString() !== restaurantId) {
        await Cart.deleteOne({ _id: cart._id });
        cart = new Cart({
          user: userId,
          restaurant: restaurantId,
          items: [{ foodItem: foodItemId, quantity }],
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.foodItem.toString() === foodItemId
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ foodItem: foodItemId, quantity });
        }
      }
    } else {
      cart = new Cart({
        user: userId,
        restaurant: restaurantId,
        items: [{ foodItem: foodItemId, quantity }],
      });
    }

    await cart.save();

    // Populate the SAME cart document we already have in memory —
    // no need to hit the database again with another findOne().
    await cart.populate([
      { path: "items.foodItem", select: "name price images" },
      { path: "restaurant", select: "name" },
    ]);

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// Update Cart

async function updateCartItemQuantity(req, res) {
  const { userId, foodItemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodItem.toString() === foodItemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Food item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    await cart.populate([
      { path: "items.foodItem", select: "name price images" },
      { path: "restaurant", select: "name" },
    ]);

    res
      .status(200)
      .json({ message: "Cart item quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

//Delete cart

async function deleteCartItem(req, res) {
  const { userId, foodItemId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodItem.toString() === foodItemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Food item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({ message: "Cart deleted" });
    } else {
      await cart.save();

      await cart.populate([
        { path: "items.foodItem", select: "name price images" },
        { path: "restaurant", select: "name" },
      ]);

      res.status(200).json({ message: "Cart item deleted", cart });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

//Fetch cart Item

async function getCartItem(req, res) {
  const userId = req.user;
  try {
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.foodItem",
        select: "name price images",
      })
      .populate({
        path: "restaurant",
        select: "name",
      });

    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    } else {
      return res.status(200).json({ status: "success", data: cart });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  addItemToCart,
  updateCartItemQuantity,
  deleteCartItem,
  getCartItem,
};