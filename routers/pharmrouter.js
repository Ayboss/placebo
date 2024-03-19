const express = require("express");
const pharmcontroller = require("../controllers/pharmcontroller");
const router = express.Router();

// CRUD
router.get("/", pharmcontroller.getAllpharmacy);
router.get("/:id", pharmcontroller.getonepharmacy);
router.post("/", pharmcontroller.createonepharmacy);
router.patch("/:id", pharmcontroller.updateonepharmacy);
router.delete("/:id", pharmcontroller.deleteonepharmacy);

module.exports = router;
