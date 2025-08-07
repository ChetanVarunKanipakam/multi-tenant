const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getScreens } = require('../controllers/screenController');

router.get('/me',auth, getScreens);

module.exports = router;
