const {
  PutObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");
const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const key = `${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const savedFile = await File.create({
      filename: key,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: fileUrl
    });

    res.status(201).json(savedFile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.filename
    });

    await s3.send(command);

    await file.destroy();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};