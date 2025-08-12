// GEÇİCİ
const express = require("express");
const router = express.Router();

// Basit test route
router.get("/", (req, res) => {
  res.send("Görevler listesi");
});

module.exports = router;
