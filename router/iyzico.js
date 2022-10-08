const router = require('express').Router();
const iyzicoController = require('../controller/iyzico')

router.post('/pay', iyzicoController.pay);
router.post('/payFinish', iyzicoController.payFinish);


module.exports = router;