const { getProducts, createProduct, getProduct, updateProduct, removeProduct } = require('../controllers/products');
const { checkAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', getProducts);
router.post('/', checkAuth, createProduct);
router.get('/:id', getProduct);
router.put('/:id', checkAuth, updateProduct);
router.delete('/:id', checkAuth, removeProduct);

module.exports = router;
