require('dotenv').config();
const express = require('express');
const app = express();
const iyzicoApi = require('./router/iyzico');
const paynetApi = require('./router/paynet');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000, () => {
    console.log('3000 portuna başarıyla bağlandı');
});

app.use('/api/iyzico', iyzicoApi);
app.use('/api/paynet', paynetApi);