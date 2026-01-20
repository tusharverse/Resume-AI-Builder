const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: "Untitled" },
  template: { type: String, default: 'minimal' },
  personal_info: { type: Object, default: {} },
  skills: { type: [String], default: [] },
  experience: { type: [Object], default: [] },
  education: { type: [Object], default: [] },
  project: { type: [Object], default: [] },
  accent_color: { type: String },
  public: { type: Boolean, default: false },
  publicToken: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
