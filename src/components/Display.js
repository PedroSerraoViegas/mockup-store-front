import Card from "./UI/Card";
import Product from "./Product";
import { useState, useEffect } from "react";
import classes from "./Display.module.css";

//TODO: consertar interaçõo de vários failed to fetch e loadings aparecendo ao mesmo tempo

const Display = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [categoryList, setCategoryList] = useState();

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

  return (
    <Card>
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
      {!isLoading &&
        category.map((product) => (
          <Product
            name={product.name}
            id={product.id}
            price={product.price}
            key={product.id}
          />
        ))}
      {isLoading && <p>Loading...</p>}
      {httpError && <p>{httpError}</p>}
    </Card>
  );
};

export default Display;
