const Job = require('../models/Job');

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json({ job });
  } catch (err) { next(err); }
};