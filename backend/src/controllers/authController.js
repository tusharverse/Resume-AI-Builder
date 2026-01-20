const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User exists' });
    const user = await User.create({ name, email, password });
    const tokens = jwtUtil.generateTokens({ id: user._id, email: user.email, role: user.role });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, ...tokens });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Email not registered' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid password' });
    const tokens = jwtUtil.generateTokens({ id: user._id, email: user.email, role: user.role });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.json({ user: { id: user._id, email: user.email, name: user.name }, ...tokens });
  } catch (err) { next(err); }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });
    const payload = jwtUtil.verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid refresh' });
    const tokens = jwtUtil.generateTokens({ id: user._id, email: user.email, role: user.role });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.json(tokens);
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing' });
    const payload = jwtUtil.verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ ok: true });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    // if auth middleware attached user id
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    res.json({ user });
  } catch (err) { next(err); }
};
