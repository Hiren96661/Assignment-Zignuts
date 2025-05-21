export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface ProductData {
  products: Product[]
  totalProducts: number
  currentPage: number
}
