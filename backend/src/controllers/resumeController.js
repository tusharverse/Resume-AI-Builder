const Resume = require('../models/Resume');
const { v4: uuidv4 } = require('uuid');

exports.createResume = async (req, res, next) => {
  try {
    const payload = { ...req.body, userId: req.user.id };
    const resume = await Resume.create(payload);
    res.status(201).json({ resume });
  } catch (err) { next(err); }
};

exports.listResumes = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const filter = { userId: req.user.id };
    const items = await Resume.find(filter).skip((page-1)*limit).limit(Number(limit));
    const total = await Resume.countDocuments(filter);
    res.json({ items, page: Number(page), limit: Number(limit), total });
  } catch (err) { next(err); }
};

exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (!resume.public && String(resume.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json({ resume });
  } catch (err) { next(err); }
};

exports.updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (String(resume.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(resume, req.body);
    await resume.save();
    res.json({ resume });
  } catch (err) { next(err); }
};

exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (String(resume.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await resume.deleteOne();
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findById(req.params.id);
    if (!original) return res.status(404).json({ message: 'Not found' });
    const copy = original.toObject();
    delete copy._id;
    copy.title = copy.title + ' (copy)';
    copy.userId = req.user.id;
    const newResume = await Resume.create(copy);
    res.status(201).json({ resume: newResume });
  } catch (err) { next(err); }
};

exports.shareResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (String(resume.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    resume.public = true;
    resume.publicToken = uuidv4();
    await resume.save();
    res.json({ publicUrl: `/share/${resume.publicToken}`, token: resume.publicToken });
  } catch (err) { next(err); }
};

// Public resume fetch by token (no auth)
exports.getPublicResume = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ message: 'Missing token' });
    const resume = await Resume.findOne({ publicToken: token });
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (!resume.public) return res.status(403).json({ message: 'Not public' });
    res.json({ resume });
  } catch (err) { next(err); }
};

// Create an export job for this resume (protected)
exports.exportResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Not found' });
    if (String(resume.userId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    // create job record
    const Job = require('../models/Job');
    const job = await Job.create({ type: 'export', status: 'pending', meta: { resumeId: resume._id, userId: req.user.id } });
    // In a real app we'd enqueue a worker job here; return job id so frontend can poll
    res.status(201).json({ jobId: job._id, status: job.status });
  } catch (err) { next(err); }
};
