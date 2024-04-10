const express = require("express");
const router = express.Router();
const drugcontroller = require("../controllers/drugscontroller");

router.get("/", drugcontroller.getalldrugs);
router.get("/:id", drugcontroller.getdrugs);
router.post("/", drugcontroller.createdrugs);
router.patch("/:id", drugcontroller.updatedrugs);
router.delete("/:id", drugcontroller.deletedrugs);

module.exports = router;
