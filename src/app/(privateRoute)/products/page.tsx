import React from 'react'
import ProductList from './components/ProductList'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Products",
  description: "Product List",
};

const ProductsPage = () => {
  return (
    <ProductList />
  )
}

export default ProductsPage