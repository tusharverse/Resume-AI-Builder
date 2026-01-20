const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -refreshToken');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ user });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password -refreshToken');
    res.json({ user });
  } catch (err) { next(err); }
};
