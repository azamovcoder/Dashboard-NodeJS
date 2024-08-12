import { Products, validateProduct } from "../models/productSchema.js";

class ProductsController {
  async get(req, res) {
    try {
      const product = await Products.find()
        .populate([{ path: "userId", select: ["fname", "username"] }])
        .sort({ createdAt: -1 });
      if (!product.length) {
        return res.status(400).json({
          msg: "Products is not defined",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "All product",
        variant: "success",
        payload: product,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  // async create(req, res) {
  //   try {
  //     // Map the uploaded files to get the URLs
  //     const urls = req.files.map(
  //       (i) => `${req.protocol}://${req.get("host")}/upload/${i.filename}`
  //     );

  //     // Merge the body and urls into a new product object
  //     const newProduct = {
  //       ...req.body,
  //       userId: req.user._id,
  //       urls, // Include the urls in the product object
  //     };

  //     // Validate the combined product object
  //     const { error } = validateProduct(newProduct);
  //     if (error) {
  //       return res.status(400).json({
  //         msg: error.details[0].message,
  //         variant: "warning",
  //         payload: null,
  //       });
  //     }

  //     // Create the product
  //     const product = await Products.create(newProduct);
  //     res.status(201).json({
  //       msg: "Product is created",
  //       variant: "success",
  //       payload: product,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       msg: "Server error",
  //       variant: "error",
  //       payload: null,
  //     });
  //   }
  // }
  async create(req, res) {
    try {
      // Validate the form data excluding files
      const { error } = validateProduct(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }

      // Extract URLs from files if files are provided
      const urls = req.files
        ? req.files.map(
            (file) =>
              `${req.protocol}://${req.get("host")}/upload/${file.filename}`
          )
        : [];

      // Create the product with data and files
      const product = await Products.create({
        ...req.body,
        userId: req.user._id,
        urls,
      });

      res.status(201).json({
        msg: "Product is created",
        variant: "success",
        payload: product,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Products.findByIdAndDelete(id);
      res.status(200).json({
        msg: "Product is deleted",
        variant: "success",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new ProductsController();
