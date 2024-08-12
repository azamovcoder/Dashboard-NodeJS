import { Products, validateProduct } from "../models/productSchema.js";

import BlogsController from "../controller/blog.js";
import ProductsController from "../controller/product.js";
import UsersController from "../controller/user.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { auth } from "../middleware/auth.js";
import express from "express";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
import { upload } from "../middleware/uploader.js";

// import ProductsController from "../controller/product.js";

const router = express.Router();
// Blogs
router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get);
router.post("/api/blogs", [auth, adminMiddleware], BlogsController.create);
router.patch("/api/blogs/:id", BlogsController.updateBlog);
router.delete("/api/blogs/:id", BlogsController.delete);

// Users
router.get("/api/profile", [auth], UsersController.getProfile);
router.get(
  "/api/users",
  // , [auth, ownerMiddleware],
  UsersController.getAllUsers
);
router.get(
  "/api/users/search",
  [auth, ownerMiddleware],
  UsersController.getUserSearch
);
router.post("/api/users/sign-up", UsersController.registerUser);
router.post("/api/users/sign-in", UsersController.loginUser);
router.delete(
  "/api/users/:id",
  // [auth, ownerMiddleware],
  UsersController.deleteUser
);
router.patch(
  "/api/users/:id",
  [auth, ownerMiddleware],
  UsersController.updateUser
);

// Products
router.get("/api/product", [auth], ProductsController.get);
router.post(
  "/api/product",
  [auth, upload.array("rasm")],
  ProductsController.create
);
router.delete(
  "/api/product/:id",
  // [auth, adminMiddleware, ownerMiddleware],
  ProductsController.delete
);

export default router;
