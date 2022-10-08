const router = require('express').Router();
const paynetController = require('../controller/paynet')

router.post('/pay', paynetController.pay);
router.post('/payFinish', paynetController.payFinish);


module.exports = router;