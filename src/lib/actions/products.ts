"use server";

import { serverFetch, serverMutation } from "../core/server";

/**
 * Get featured products
 */
export const getFeaturedProducts = async () => {
  return serverFetch("/api/products/featured");
};

/**
 * Get latest products
 */
export const getLatestProducts = async () => {
  return serverFetch("/api/products/latest");
};

/**
 * Get all products
 */
export const getProducts = async () => {
  return serverFetch("/api/products");
};

/**
 * Protected mutation to create a new product
 */
export const createProductAction = async (productData: any) => {
  return serverMutation("/api/products", productData, "POST");
};

/**
 * Protected mutation to patch a product
 */
export const patchProductAction = async (
  productId: string,
  productData: any,
) => {
  return serverMutation(`/api/products/${productId}`, productData, "PATCH");
};

/**
 * Protected mutation to delete a product
 */
export const deleteProductAction = async (productId: string) => {
  return serverMutation(`/api/products/${productId}`, {}, "DELETE");
};
