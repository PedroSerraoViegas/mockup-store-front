import { useDispatch } from "react-redux";
import { cartActions } from "../store/slices/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addCartItemHandler = () => {
    dispatch(
      cartActions.addItem({
        name: props.name,
        id: props.id,
        price: props.price,
        amount: 1,
      })
    );
  };

  const removeCartItemHandler = () => {
    dispatch(
      cartActions.removeItem({
        id: props.id,
        price: props.price,
      })
    );
  };

  return (
    <li key={props.id}>
      <div className={classes.container}>
        <h3 className={classes.productInfo}>{props.name}</h3>
        <div className={classes.info}>
          <span className={classes.price}>{price}</span>
          <span className={classes.productAmount}> x {props.amount}</span>
          <div className={classes.buttons}>
            <button className={classes.minus} onClick={removeCartItemHandler}>
              -
            </button>
            <button className={classes.plus} onClick={addCartItemHandler}>
              +
            </button>
          </div>
        </div>
      </div>
      <hr></hr>
    </li>
  );
};

export default CartItem;
