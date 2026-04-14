const express = require('express');
const { getWallet, setWallet, getWallets } = require('../controllers/walletController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getWallet);
router.get('/all', getWallets);
router.post('/', setWallet);

module.exports = router;
