"use client";

import { PAGE_SIZE, PAGE_URL } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { ProductData } from "./Product.type";
import "./ProductList.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductList = () => {
  const router = useRouter();
  const [productsData, setProductsData] = useState<ProductData>({
    products: [],
    totalProducts: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = Math.ceil(productsData?.totalProducts / PAGE_SIZE);

  const handleFetchProducts = async (page: number) => {
    const skip = (page - 1) * PAGE_SIZE;
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
      );
      const data = await res.json();
      setProductsData({
        ...productsData,
        products: data?.products || [],
        totalProducts: data?.total,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(`Error fetching products: ${error}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productsData?.currentPage) {
      handleFetchProducts(productsData?.currentPage);
    }
  }, [productsData?.currentPage]);

  const handlePreviousButton = () => {
    setProductsData((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  };

  const handleNextButton = () => {
    setProductsData((prev) => ({
      ...prev,
      currentPage:
        prev.currentPage < totalPages ? prev.currentPage + 1 : totalPages,
    }));
  };

  console.log({ productsData });
  return (
    <div className="product-list-container">
      <h2 className="product-title">Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Price ($)</th>
            <th>Discount (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsData?.products?.length > 0 ? (
            productsData?.products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image
                    width={200}
                    height={200}
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-thumbnail"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
                <td>{product.discountPercentage}%</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      router.push(`${PAGE_URL.PRODUCTS}/${product.id}`)
                    }
                  >
                    <AiOutlineEye size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="loading-cell">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePreviousButton}
          disabled={productsData?.currentPage === 1 || isLoading}
        >
          Prev
        </button>
        <span>
          Page {productsData?.currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextButton}
          disabled={productsData?.currentPage === totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
