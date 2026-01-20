const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: String, enum: ['pending','done','failed'], default: 'pending' },
  resultUrl: { type: String },
  meta: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
