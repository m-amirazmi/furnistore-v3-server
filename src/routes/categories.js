const { createCategory, getCategories, getCategory, updateCategory, removeCategory } = require('../controllers/categories');
const { checkAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', getCategories);
router.post('/', checkAuth, createCategory);
router.get('/:id', getCategory);
router.put('/:id', checkAuth, updateCategory);
router.delete('/:id', checkAuth, removeCategory);

module.exports = router;
