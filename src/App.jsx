import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";
import RegisterComponent from "./components/register/Register";
import LoginComponent from "./components/login/Login";

import "./App.css";

const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItem([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }
  return (
    <Router>
      <div>
        <div className="body__container">
          <Routes>
            <Route path="/" exact={true} element={<RegisterComponent />}/>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/list" element={
                <>
                  <div className="nav">
                    <Header />
                    <div className="nav-right">
                      <Search
                        products={items}
                        value={searchValue}
                        onChangeData={changingSearchData}
                      />
                      <Button num={addedItems.length} click={setShowAddProducts} />
                    </div>
                  </div>

                  {showAddProducts && (
                    <AddProducts
                      click={setShowAddProducts}
                      items={addedItems}
                      removeItem={removeItem}
                      setAddedItem={setAddedItem}
                    />
                  )}
                  <CardBody
                    products={itemsFilter}
                    addItem={addItem}
                    removeItem={removeItem}
                    addedItems={addedItems}
                  />
                </>
              } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
