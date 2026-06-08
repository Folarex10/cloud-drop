const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadFile,
  getFiles,
  deleteFile
} = require("../controllers/fileController");

router.post("/upload", upload.single("file"), uploadFile);

router.get("/files", getFiles);

router.delete("/files/:id", deleteFile);

module.exports = router;