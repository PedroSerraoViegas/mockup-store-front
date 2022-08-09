import Card from "../UI/Card";
import AdminProduct from "./AdminProduct";
import AddProduct from "./AddProduct";
import { useState, useEffect } from "react";
import classes from "./ProductManagement.module.css";

const ProductManagement = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [categoryList, setCategoryList] = useState();
  const [httpError, setHttpError] = useState(null);

  const fetchCategories = async (category) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:8080/api/products?category=${category}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    const loadedProducts = [];

    for (const key in responseData) {
      loadedProducts.push({
        name: responseData[key].name,
        price: responseData[key].price,
        id: responseData[key].id,
      });
    }

    setCategory(loadedProducts);
    setIsLoading(false);
  };

  const fetchList = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:8080/api/products`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    const loadedCategories = [];

    for (const key in responseData) {
      if (!loadedCategories.includes(responseData[key].category)) {
        loadedCategories.push(responseData[key].category);
      }
    }
    setCategoryList(loadedCategories);
    setIsLoading(false);
  };

  const onSelectHandler = (event) => {
    fetchCategories(event.target.value).catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    setSelected(event.target.value);
  };

  useEffect(() => {
    fetchCategories("dairy").catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    fetchList().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const productAlterHandler = () => {
    fetchCategories(selected).catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  };

  let loadedProducts = category.map((product) => (
    <AdminProduct
      name={product.name}
      id={product.id}
      price={product.price}
      key={product.id}
      onProductDelete={productAlterHandler}
    />
  ));

  return (
    <Card>
      <AddProduct categoryList={categoryList} />
      <div className={classes.select}>
        <label htmlFor="category-select">Sort by category:</label>
        <select id="category-select" onChange={onSelectHandler}>
          {categoryList?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {!isLoading && loadedProducts}
      {isLoading && <p>Loading...</p>}
      {httpError && <p>{httpError}</p>}
    </Card>
  );
};

export default ProductManagement;
