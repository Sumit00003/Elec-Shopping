const express = require("express");
const {
  createCoupon,
  GetAllCoupons,
  UpdateCoupon,
  DeleteCoupon,
  GetaCoupon,
} = require("../controller/couponctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);

router.get("/", authMiddleware, isAdmin, GetAllCoupons);
router.get("/:id", authMiddleware, isAdmin, GetaCoupon);

router.put("/:id", authMiddleware, isAdmin, UpdateCoupon);

router.delete("/:id", authMiddleware, isAdmin, DeleteCoupon);





module.exports = router