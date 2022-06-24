const router = require('express').Router();
const { uploadSmallImage } = require('../controllers/uploads');

router.post('/', uploadSmallImage);

module.exports = router;
