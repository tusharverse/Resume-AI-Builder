const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  // user: { id, email, role }
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS || 'dev_access_secret';
  if (!process.env.JWT_ACCESS_SECRET) console.warn('Warning: using fallback JWT_ACCESS_SECRET (development only)');
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  });
};

const generateRefreshToken = (user) => {
  // sign a refresh token with longer expiry and dedicated secret
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH || 'dev_refresh_secret';
  if (!process.env.JWT_REFRESH_SECRET) console.warn('Warning: using fallback JWT_REFRESH_SECRET (development only)');
  return jwt.sign({ id: user.id }, secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  });
};

const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS || 'dev_access_secret';
  return jwt.verify(token, secret);
};

const verifyRefreshToken = (token) => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH || 'dev_refresh_secret';
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};
