import classes from "./AdminProduct.module.css";

const AdminProduct = (props) => {

  const deleteProductHandler = async () => {
    await fetch(`http://localhost:8080/api/products/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await props.onProductDelete();
  };

  return (
    <div className={classes.productForm}>
      <label htmlFor={props.id}>
        {props.name} - Id - <strong>{props.id}</strong>
      </label>
      <div className={classes.container}>
        <button
          type="button"
          className={classes.button}
          onClick={deleteProductHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProduct;
