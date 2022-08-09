import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/slices/cart-slice";
import classes from "./Product.module.css";

const Product = (props) => {
  const dispatch = useDispatch();

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const addToCartHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    dispatch(
      cartActions.addItem({
        name: props.name,
        id: props.id,
        price: props.price,
        amount: +enteredAmount,
      })
    );
  };
  const price = `$${props.price.toFixed(2)}`;

  return (
    <form onSubmit={addToCartHandler} className={classes.productForm}>
      <label htmlFor={props.id}>
        {props.name} - {price}
      </label>
      <div className={classes.container}>
        <span>Amount:</span>
        <input
          ref={amountInputRef}
          id={props.id}
          type="number"
          step="1"
          max="5"
          min="0"
          defaultValue="1"
          className={classes.input}
        ></input>
        <button type="submit" className={classes.button}>
          Add to cart
        </button>
      </div>
      {!amountIsValid && <p>Please enter an amount between 1 and 5!</p>}
    </form>
  );
};

export default Product;
