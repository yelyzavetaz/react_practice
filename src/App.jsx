/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import ProductTable from './components/ProductTable/ProductTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    ctgr => ctgr.id === product.categoryId,
  );
  const user = usersFromServer.find(
    usr => usr.id === (product.userId || category.ownerId),
  );

  return {
    id: product.id,
    name: product.name,
    category,
    user,
  };
});

const getFilteredProducts = (productList, filters) => {
  let filteredProducts = [...productList];

  if (filters.userIdSelected !== -1) {
    filteredProducts = filteredProducts.filter(
      product => product.user.id === filters.userIdSelected,
    );
  }

  return filteredProducts;
};

export const App = () => {
  const [userIdSelected, setUserIdSelected] = useState(-1);

  const filteredProducts = getFilteredProducts(products, {
    userIdSelected,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={userIdSelected === -1 ? 'is-active' : ''}
                onClick={() => setUserIdSelected(-1)}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={userIdSelected === 1 ? 'is-active' : ''}
                onClick={() => setUserIdSelected(1)}
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={userIdSelected === 2 ? 'is-active' : ''}
                onClick={() => setUserIdSelected(2)}
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={userIdSelected === 3 ? 'is-active' : ''}
                onClick={() => setUserIdSelected(3)}
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          <ProductTable
            products={filteredProducts}
            userIdSelected={userIdSelected}
          />
        </div>
      </div>
    </div>
  );
};
