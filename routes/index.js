var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('views/film.html');
});

router.post('/',function (req,res,next) {
    console.log(req.body.left);
    var connection =mysql.createConnection({
        host:'111.230.55.129',
        user:'root',
        password:'Fys@20151022',
        port:'3306',
        database:'web作业'
    });
    connection.connect();
    var sql='SELECT filmjson FROM web作业.film where idfilm between '+req.body.left+' and '+req.body.right+';';
    console.log(sql);
    connection.query(sql,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log('-------------select--------------');
        res.send(result);
    });
    connection.end();
})

module.exports = router;
