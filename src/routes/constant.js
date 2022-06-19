const router = require('express').Router();
const { createConstant, getConstants } = require('../controllers/constant');

router.post('/', createConstant);
router.get('/', getConstants);

module.exports = router;
