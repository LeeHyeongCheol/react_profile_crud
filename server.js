const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});
connection.connect();

const multer = require('multer'); //image를 업로드시 multer를 이용해서 업로드 시킵니다.
const upload = multer({dest:'./upload'}); //업로드된 image 파일은 upload폴더에 저장 됩니다.

app.use('/image', express.static('./upload'));

app.get('/api/customers', (req,res) => { //게시판전체읽기
    connection.query(
        "SELECT*FROM NOTICE WHERE isDeleted = 0", // delete 삭제시 isDeleted를 값을 1로 바꾸기 때문에 
        (err,rows,fields)=>{                      // isDeleted 값이 0인 데이터만 받아와서 게시판을 구성한다.
            res.send(rows);
        }
    );
});

app.get('/api/customers/read/:id',(req,res)=>{ //상세읽기
    let sql = "SELECT * FROM NOTICE where isDeleted = 0 and id = ?"; //넘겨 받은 id 값을 통해서 해당 데이터만 찾아서 페이지를 구성한다.
    let params = [req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.post('/api/customers/comment/:id',(req,res)=>{ //댓글등록
    let sql = 'INSERT INTO COMMENT VALUES (null,?,?)'; //댓글의 정보와 어떤 게시판의 댓글인지 확인하기 위해서 게시판의 id도 같이 등록한다.
    let commentes = req.body.commentes;
    let params = [commentes,req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.get('/api/customers/commentread/:id',(req,res)=>{ //댓글읽기
    let sql = "SELECT * FROM COMMENT where commentuser = ? ";  //넘겨 받은 id값에 해당하는 댓글만 불러서 화면에 보여줍니다.
    let params = [req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.delete('/api/customers/commentdelete/:id',(req,res)=>{ //댓글삭제
    let sql = 'DELETE FROM COMMENT WHERE id = ?'; //댓글의 id을 받아서 해당 id의 데이터를 삭제합니다.
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.post('/api/customers',upload.single('image'),(req,res)=>{ //게시판생성,upload.sing('image')를 통해서 업로드 된 image는 image폴더에 저장된다.
    let sql = 'INSERT INTO NOTICE VALUES (null,?,?,?,?,?,now(),0)'; //Notice라는 테이블에 데이터를 입력합니다.
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image,name,birthday,gender,job];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.delete('/api/customers/:id',(req,res)=>{ //게시판삭제
    let sql = 'UPDATE NOTICE SET isDeleted = 1 WHERE id = ?'; //데이터를 완전 삭제하는 것이 아니라 isDeleted 라는 데이터 값을 1로 바꾸어서 삭제 된 것처럼 보이게 합니다.
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});
 
app.post('/api/customers/update/:id',upload.single('image'),(req,res)=>{ //게시판업데이트 
    let sql = 'UPDATE NOTICE SET image =?, name = ?, birthday = ?, gender = ?, job = ? where id = ?'; //넘겨받은 id값을 통해서 데이터를 업데이트 합니다.
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image,name,birthday,gender,job,req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.post('/api/customers/user',upload.single('image'),(req,res)=>{ //회원가입
    let sql = 'INSERT INTO member VALUES (null,?,?,?,?,?)'; //member table에 유저의 정보를 등록 합니다.
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let password = req.body.password;
    let name = req.body.name;
    let number = req.body.number;
    let emails = req.body.emails;
    let params = [password,name,emails,number,image];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        });
});

app.post('/api/customers/login',(req,res)=>{ //로그인
    let sql = 'SELECT * FROM member where email = ? and password = ?'; //넘겨받은 eamil과password가 있는 데이터인지 조회합니다.
    let email = req.body.userEmail;
    let passwords = req.body.userPassword;
    let params = [passwords,email];
    connection.query(sql,params,
        (err,rows,fields)=>{
            if(rows){
                res.send(rows); //맞으면 데이터를 보냅니다.
            }else{
                res.send({message:"Wrong email/password combination"}) //맞지 않으면 message를 보냅니다.
            }
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));