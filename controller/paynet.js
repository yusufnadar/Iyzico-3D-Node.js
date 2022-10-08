const axios = require('axios');

async function pay(req, res) {
    try {
        const { amount, card_holder, month, year, cvc, pan } = req.body;
        const code = Math.floor(Math.random() * 10000000);
        axios.post('https://api.paynet.com.tr/v2/transaction/tds_initial', {
            'amount': amount,
            'reference_no': code,
            'return_url': 'http://10.0.2.2:3000/api/paynet/payFinish',
            'card_holder': card_holder,
            'month': month,
            'year': year,
            'cvc': cvc,
            'pan': pan
        },
            {
                headers: {
                    'Authorization': `Basic ${process.env.PAYNETSECRETKEY}`
                }
            }
        ).then((res2) => {
            if (res2.data.code === 0) {
                return res.status(200).json({ page: res2.data.html_content });
            } else {
                return res.status(400).json({ message: res2.data.message });
            }
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
}


async function payFinish(req, res) {
    try {
        await axios.post('https://api.paynet.com.tr/v2/transaction/tds_charge', {
            'session_id': req.body.session_id,
            'token_id': req.body.token_id,
        }, {
            headers: {
                'Authorization': `Basic ${process.env.PAYNETSECRETKEY}`
            }
        }).then((res2)=>{
            res.setHeader('content-type','text/html');
            if(res2.data.code === 0){
                 return res.status(200).send(
                    `
               <html>
                       <head>
                       <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
                       </head>
                       <style>
                       body {
                       text-align: center;
                       padding: 40px 0;
                       background: #EBF0F5;
                       }
                       h1 {
                       color: #88B04B;
                       font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                       font-weight: 900;
                       font-size: 40px;
                       margin-bottom: 10px;
                       }
                       p {
                       color: #404F5E;
                       font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                       font-size:20px;
                       margin: 0;
                       }
                       i {
                       color: #9ABC66;
                       font-size: 100px;
                       line-height: 200px;
                       margin-left:-15px;
                       }
                       .card {
                       background: white;
                       padding: 60px;
                       border-radius: 4px;
                       box-shadow: 0 2px 3px #C8D0D8;
                       display: inline-block;
                       margin: 0 auto;
                       }
                       </style>
                       <body>
                       <div class="card">
                       <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
                       <i class="checkmark">✓</i>
                       </div>
                       <h1>Başarılı</h1>
                       <p>Ödeme işleminiz başarıyla tamamlandı!</p>
                       </div>
                       </body>
                       </html>
               `);
            }else{
                return res.status(500).send(
                    `
                 <html>
                         <head>
                          <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
                          </head>
                          <style>
                          body {
                          text-align: center;
                          padding: 40px 0;
                          background: #EBF0F5;
                          }
                          h1 {
                         color: #ff0e0e;
                          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                          font-weight: 900;
                         font-size: 40px;
                         margin-bottom: 10px;
                         }
                          p {
                          color: #404F5E;
                          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                         font-size:20px;
                          margin: 0;
                         }
                          i {
                          color: #ff0e0e;
                         font-size: 200px;
                         line-height: 200px;
                         margin-left:-15px;
                         }
                        .card {
                          background: white;
                         padding: 60px;
                          border-radius: 4px;
                         box-shadow: 0 2px 3px #C8D0D8;
                          display: inline-block;
                         margin: 0 auto;
                          }
                         </style>
                         <body>
                          <div class="card">
                         <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
                          <i class="checkmark">×</i>
                          </div>
                          <h1>Başarısız</h1>
                          <p>${res2.data.message}!</p>
                          </div>
                          </body>
                          </html>
                 `);
            }
        })
    } catch (error) {
        return res.status(500).send(
            `
         <html>
                 <head>
                  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
                  </head>
                  <style>
                  body {
                  text-align: center;
                  padding: 40px 0;
                  background: #EBF0F5;
                  }
                  h1 {
                 color: #ff0e0e;
                  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                  font-weight: 900;
                 font-size: 40px;
                 margin-bottom: 10px;
                 }
                  p {
                  color: #404F5E;
                  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                 font-size:20px;
                  margin: 0;
                 }
                  i {
                  color: #ff0e0e;
                 font-size: 200px;
                 line-height: 200px;
                 margin-left:-15px;
                 }
                .card {
                  background: white;
                 padding: 60px;
                  border-radius: 4px;
                 box-shadow: 0 2px 3px #C8D0D8;
                  display: inline-block;
                 margin: 0 auto;
                  }
                 </style>
                 <body>
                  <div class="card">
                 <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
                  <i class="checkmark">×</i>
                  </div>
                  <h1>Başarısız</h1>
                  <p>${error}!</p>
                  </div>
                  </body>
                  </html>
         `);
    }
}


module.exports = {
    pay,
    payFinish
}