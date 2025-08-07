const registry = require('../registry.json');

exports.getScreens = (req, res) => {
  const screens = registry.filter((entry) => {
    return entry.tenant == req.user.user.customerId}
  );
  console.log(screens)
  res.json(screens);
};
