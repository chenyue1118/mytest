const express = require('express');
let request = require('request');
request = request.defaults({jar: true});

const app = express();

app.use(express.static('./public'));

app.get('/1', (req, res) => {
  res.redirect('/views/index.html')
})

app.get('/a', (req, res) =>　{
  request.post({url: 'https://www.bitahub.com/manage/login', form: {
    'email': '1023581658@qq.com',
    'password': '123456'
  }}, (error, response, body) => {
    if(error) {
      console.log(error);
      res.send({'state': false})
    }else {
      console.log(body);
      // res.send(body);
      console.log(body.code);

      console.log(123456);
      request.get({url: "https://www.bitahub.com/manage/checkLogin"}, (err, aa, bb) => {
        if(err) {
          console.log(err);
          res.send({'state': false})
        }else {
          console.log(bb);
          res.send(bb)
        }
      })

    }
  })
})

app.get('/login', (req, res) => {
  request.post({url: 'https://www.bitahub.com/manage/login', form: {
    'email': '1023581658@qq.com',
    'password': '123456'
  }}, (error, response, body) => {
    if(error) {
      console.log(error);
      res.send({'state': false})
    }else {
      console.log(body);
      // res.send(body);
      console.log(body.code);
      res.send(body);
    }
  })
})

app.get('/checkLogin', (req, res) => {
  request.post({url: 'http://139.129.203.44:8180/manage/registeUser',form: {
    "email": "1023581658@qq.com",
    "emailCode": "131007",
    "type": 2,
    "password": "123456"
  }}, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
      res.send(body);
    }
  })
})

app.get('/sendEmailCode', (req, res) => {
  request.post({url: 'http://139.129.203.44:8180/manage/checkEmail', form: {
    'email': '1023581658@qq.com'
  }}, (error, response, body) => {
    if (error) {
      console.log(error);
      res.send({'state': false});
    } else {
      request.post({url: 'http://139.129.203.44:8180/manage/sentEmailCode', form: {
        'email': '1023581658@qq.com'
      }}, (err, res1, body1) => {
        if(err) {
          console.log(error);
          res.send({'state': false});
        } else {
          res.send({'state': true});
        }
      })
    }
  })
})

app.get('/test', (req ,res) => {
  setTimeout(() => {
    res.send({'state': true});
  },0)
})

app.listen(8082, () => {
  console.log('Server at 8082');
})
