"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FcRating } from "react-icons/fc";
import { IoArrowBackOutline } from "react-icons/io5";
import "./ProductDetail.css";
import { toast } from "react-toastify";
import { Product } from "./ProductDetail.type";
import Image from "next/image";

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log({ product });

  const handleFetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error(`Failed to fetch product: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchProduct();
    }
  }, [id]);

  if (isLoading)
    return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => router.back()}>
        <IoArrowBackOutline style={{ marginRight: "8px", fontSize: "18px" }} />
        Back
      </button>

      <h1 className="product-detail-title">{product.title}</h1>

      <div className="product-detail-wrapper">
        <Image
          width={300}
          height={300}
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            <span className="price">${product.price}</span>
          </p>
          <p>
            <strong>Discount:</strong>{" "}
            <span className="discount">{product.discountPercentage}%</span>
          </p>
          <p>
            <strong>Rating:</strong>
            <span className="rating-wrapper">
              {" "}
              <FcRating size={18} /> {product.rating}
            </span>
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} units
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight}g
          </p>
          <p>
            <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
            {product.dimensions.height} x {product.dimensions.depth} cm
          </p>
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <p>
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Availability:</strong> {product.availabilityStatus}
          </p>
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
          <p>
            <strong>Min Order Qty:</strong> {product.minimumOrderQuantity}
          </p>
          <p>
            <strong>Barcode:</strong> {product.meta.barcode}
          </p>
          <div className="qr-code">
            <strong>QR Code:</strong>
            <br />
            <Image
              width={150}
              height={150}
              src={product.meta.qrCode}
              alt="QR Code"
            />
          </div>

          <div className="tags-section">
            <strong>Tags:</strong>
            <div className="tag-list">
              {product.tags?.map((tag: string) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="images-section">
        <h3>Gallery</h3>
        <div className="gallery">
          {product?.images?.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`product-${idx}`}
              className="gallery-img"
            />
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review: any, index: number) => (
            <div key={index} className="review-card">
              <p>
                <strong>{review.reviewerName}</strong> —{" "}
                <span className="rating-inline">
                  <FcRating size={18} /> {review.rating}
                </span>
              </p>
              <p>{review.comment}</p>
              <p className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
