import Modal from "./UI/Modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/slices/cart-slice";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartState = useSelector((state) => state.cart);
  const loggedUser = useSelector((state) => state.login.username);
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const dispatch = useDispatch();

  const amountOnDisplay = `$${cartState.totalAmount.toFixed(2)}`;
  const emptyCart = cartState.products.length === 0;

  const cartItems = (
    <ul className={classes.cartList}>
      {cartState.products.map((product) => (
        <CartItem
          id={product.payload.id}
          key={product.payload.id}
          name={product.payload.name}
          amount={product.payload.amount}
          price={product.payload.price}
        ></CartItem>
      ))}
    </ul>
  );

  const confirmHandler = async () => {
    if (loggedUser === "") {
      setCheckout(true);
      return;
    } else {
      setCheckout(false);
      setIsSubmitting(true);

      //TODO: CORRIGIR BUG DE ERRO AO USAR POST REQUEST

      const response = await fetch(
        "https://react-demo-cv-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            username: loggedUser,
            order: cartState.products.map((product) => ({
              name: product.payload.name,
              price: product.payload.price,
              amount: product.payload.amount,
            })),
            totalPrice: amountOnDisplay,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      setIsSubmitting(false);
      setOrderSent(true);
      dispatch(cartActions.clearCart());
    }
  };

  const confirmClasses = !emptyCart ? classes.confirm : classes.confirmDisabled;

  return (
    <Modal onClick={props.onCartClick}>
      {emptyCart && !orderSent && <p>Your cart is empty!</p>}
      {isSubmitting && !orderSent && <p>Processing order...</p>}
      {orderSent && (
        <p>
          Dear <span className={classes.username}>{loggedUser}</span>, your
          order has been succesfully registered! We will notify you as soon as
          it leaves for delivery!
        </p>
      )}
      <div className={classes.cart}>
        {cartItems}
        <p className={classes.totalAmount}>Total Amount: {amountOnDisplay}</p>
        <div className={classes.actions}>
          <button
            className={classes.cancel}
            type="button"
            onClick={props.onCartClick}
          >
            Cancel
          </button>
          <button
            className={confirmClasses}
            type="button"
            disabled={emptyCart}
            onClick={confirmHandler}
          >
            Confirm
          </button>
        </div>
        {checkout && loggedUser === "" && (
          <p>Log in before you can confirm your order!</p>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
