const express = require("express");
const router = express.Router();
const driversController = require("../controllers/drivers");

router.get("/drivers", driversController.getDrivers);
router.post("/drivers", driversController.createDrivers);

module.exports = router;