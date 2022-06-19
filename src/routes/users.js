const router = require('express').Router();
const { createUser, updateUser, getOneUser, removeUser } = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

router.post('/', createUser);
router.get('/', checkAuth, getOneUser);
router.put('/update', checkAuth, updateUser);
router.delete('/:id', checkAuth, removeUser);

module.exports = router;
