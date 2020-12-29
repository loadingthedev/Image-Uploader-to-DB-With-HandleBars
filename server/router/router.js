const express = require('express');
const router = express.Router();
const { home, uploads } = require('../controller/controller');
const store = require('../middleware/multer');

router.get('/', home);
router.post('/uploadmultiple', store.array('images', 12), uploads);

module.exports = router;
