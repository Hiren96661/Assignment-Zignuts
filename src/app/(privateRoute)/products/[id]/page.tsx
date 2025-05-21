import React from "react";
import ProductDetail from "./components/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail",
  description: "Product Detail",
};

const ProductDetailPage = () => {
  return (
    <ProductDetail />
  );
};

export default ProductDetailPage;
