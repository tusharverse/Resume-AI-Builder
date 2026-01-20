const Template = require('../models/Template');

exports.listTemplates = async (req, res, next) => {
  try {
    const items = await Template.find().limit(100);
    res.json({ items });
  } catch (err) { next(err); }
};
