const { createCategory, getCategories, getCategory, updateCategory, removeCategory } = require('../controllers/categories');

const router = require('express').Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', removeCategory);

module.exports = router;
