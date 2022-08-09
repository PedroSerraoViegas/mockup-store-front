import classes from "./AddProduct.module.css";
import useValidation from "../../hooks/useValidation";
import { Fragment, useState } from "react";

const AddProduct = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(false);

  const name = useValidation((value) => value.trim() !== "");

  const price = useValidation((value) => value.trim() !== "" && value > 0);

  const category = useValidation((value) => value.trim() !== "");

  const createProductHandler = async (event) => {
    event.preventDefault();
    let newProduct = {
      name: name.value,
      price: price.value,
      category: category.value,
    };

    const data = newProduct;

    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    category.reset();
    name.reset();
    price.reset();
  };

  const formIsValid = price.isValid && name.isValid && category.isValid;

  const usernameClasses = name.hasError ? classes.error : "";
  const passwordClasses = price.hasError ? classes.error : "";
  const emailClasses =
    category.hasError && !selectedCategory ? classes.error : "";

  const onSelectHandler = (event) => {
    if (event.target.value === "none") {
      setSelectedCategory(false);
    } else {
      setSelectedCategory(true);
    }
  };

  return (
    <Fragment>
      <form className={classes.login} onSubmit={createProductHandler}>
        <div className={classes.container}>
          <h3>Add a new product</h3>
          <label className={usernameClasses} htmlFor="product">
            Name:
          </label>
          <input
            type="text"
            category
            placeholder="Product Name"
            id="product"
            onChange={name.inputHandler}
            value={name.value}
            onBlur={name.blurHandler}
            className={classes.input}
          ></input>
          {name.hasError && (
            <p className={classes.errorText}>Name can't be empty!</p>
          )}
          <label className={emailClasses} htmlFor="category">
            New Category:
          </label>
          <input
            type="text"
            placeholder="Product category"
            id="category"
            onChange={category.inputHandler}
            onBlur={category.blurHandler}
            value={category.value}
            className={classes.input}
            disabled={selectedCategory}
          ></input>
          {category.hasError && !selectedCategory && (
            <p className={classes.errorText}>Category can't be empty</p>
          )}
          <label htmlFor="category-select">Sort by existing category:</label>
          <select id="category-select" onChange={onSelectHandler}>
            <option value={"none"}>None</option>
            {props.categoryList?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <label className={passwordClasses} htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            placeholder="Product price"
            id="price"
            onChange={price.inputHandler}
            onBlur={price.blurHandler}
            value={price.value}
            className={classes.input}
          ></input>
          {price.hasError && (
            <p className={classes.errorText}>Price has to be greater than 0</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!formIsValid}
          className={classes.button}
        >
          Create new Product
        </button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
