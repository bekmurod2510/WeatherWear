/**
 * Set authentication cookie
 * @param {Object} res - Express response object
 * @param {string} token - JWT token
 */
const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/'
  });
};

/**
 * Clear authentication cookie
 * @param {Object} res - Express response object
 */
const deleteCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/'
  });
};

/**
 * Get cookie from request
 * @param {Object} req - Express request object
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
const getCookie = (req, name) => {
  return req.cookies[name] || null;
};

module.exports = {
  setCookie,
  deleteCookie,
  getCookie
};