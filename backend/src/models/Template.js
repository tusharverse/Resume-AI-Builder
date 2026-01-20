const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  previewUrl: { type: String },
  files: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
