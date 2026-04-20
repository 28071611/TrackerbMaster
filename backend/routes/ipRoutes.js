const express = require('express');
const router = express.Router();
const { trackIP, getHistory } = require('../controllers/ipController');

router.post('/', trackIP);
router.get('/history', getHistory);

module.exports = router;
