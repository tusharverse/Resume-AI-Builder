const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resume-uploads',
    allowed_formats: ['pdf', 'doc', 'docx', 'txt'],
    resource_type: 'raw', // For non-image files
  },
});

// Create multer upload middleware
const upload = multer({ storage: storage });

module.exports = {
  cloudinary,
  upload,
};