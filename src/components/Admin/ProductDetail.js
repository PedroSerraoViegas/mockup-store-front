import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import classes from "./ProductDetail.module.css";
import Card from "../UI/Card";

const ProductDetail = () => {
  const params = useParams();
  const [loadedProduct, setLoadedProduct] = useState();

  const name = useValidation((value) => value.trim() !== "");
  const price = useValidation((value) => value.trim() !== "" && value > 0);
  const category = useValidation((value) => value.trim() !== "");

  const fetchProductDetails = async (params) => {
    const response = await fetch(
      `http://localhost:8080/api/products/${params}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    let loaded = responseData;

    setLoadedProduct(loaded);
  };

  const updateProduct = async (updatedProduct) => {
    await fetch(`http://localhost:8080/api/products/${loadedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    name.reset();
    category.reset();
    price.reset();
  };

  const updateProductHandler = async (event) => {
    event.preventDefault();
    let updatedProduct = {
      name: name.value,
      price: price.value,
      category: category.value,
    };

    updateProduct(updatedProduct);
    fetchProductDetails(params.id);
  };

  useEffect(() => {
    fetchProductDetails(params.id);
  }, [params.id, loadedProduct]);

  const formIsValid = name.isValid && price.isValid && category.isValid;
  const buttonClasses = formIsValid ? classes.button : classes.buttonDisabled;

  return (
    <Card>
      <h3>Product Details</h3>
      <form className={classes.form} onSubmit={updateProductHandler}>
        <label htmlFor="name">Product Name:</label>
        <input
          id="name"
          type="text"
          onChange={name.inputHandler}
          value={name.value}
          onBlur={name.blurHandler}
          placeholder={loadedProduct && loadedProduct.name}
        ></input>
        <label htmlFor="price">Product Price:</label>
        <input
          id="price"
          type="number"
          onChange={price.inputHandler}
          value={price.value}
          onBlur={price.blurHandler}
          placeholder={loadedProduct && loadedProduct.price}
        ></input>
        <label htmlFor="category">Product Category:</label>
        <input
          id="category"
          type="text"
          onChange={category.inputHandler}
          value={category.value}
          onBlur={category.blurHandler}
          placeholder={loadedProduct && loadedProduct.category}
        ></input>
        <button type="submit" className={buttonClasses} disabled={!formIsValid}>
          Update Product
        </button>
      </form>
      {loadedProduct && <p>Product ID:{loadedProduct.id}</p>}
    </Card>
  );
};

export default ProductDetail;
