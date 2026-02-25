import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/products", (req, res) => {
  res.json({ message: "Get all products" });
});

router.get(
  "/products/:id",
  validateRequest(productSchemas.idParam),
  (req, res) => {
    res.json({ message: `Get product ${req.params.id}` });
  }
);

router.post(
  "/products",
  validateRequest(productSchemas.create),
  (req, res) => {
    res.status(201).json({ message: "Product created", data: req.body });
  }
);

router.put(
  "/products/:id",
  validateRequest(productSchemas.update),
  (req, res) => {
    res.json({
      message: `Product ${req.params.id} updated`,
      data: req.body,
    });
  }
);

router.delete(
  "/products/:id",
  validateRequest(productSchemas.idParam),
  (req, res) => {
    res.json({ message: `Product ${req.params.id} deleted` });
  }
);

export default router;