const express = require("express");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const PORT = 8080;
var fileUpload = require('express-fileupload');
var cors = require('cors');
app.use(cors())
const publicDirectory = './public';
app.use('image',express.static(publicDirectory+'/image/'))
app.use(express.static(publicDirectory))
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public'));     

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
});
   



app.post('/uploadFile', (req, res) => {
    const { name,fname,mname,blood,gender,service,email,tshirt,paddress,peraddress,year,number,password } = req.body;
    var file = '';

    if (req.files != null) {
        if (req.files.file !== undefined) {
            var uploadedFile = req.files.file;
            file = uploadedFile.name;
            uploadedFile.mv(publicDirectory + '/image/' + file, (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
            })   
        }
    }



    db.query('SELECT email from user WHERE email = ?', [email], async (err, results) => {
        if(err) throw err;
  
        if(results.length > 0) {
          res.json({'alert':"Email ALready Exist",'message':false})
        } else {
          
            let hashedPassword = await bcrypt.hash(password,10);
            db.query('INSERT INTO user SET ?', {   name:name,fname:fname,mname:mname,blood:blood,gender:gender,service:service,email:email,tshirt:tshirt,paddress:paddress,peraddress:peraddress,year:year,number:number,password:hashedPassword,file:file }, (err, results) => {
                var id = results.insertId;
                const token = jwt.sign({id}, 'This is my secret key fkr', {expiresIn: 90});
                
              
            res.json({'message':true,'token':token, 'alert':'successful'})
         
        
            });
        }
      })
})





app.post('/loginUser',(req,res)=>{
    const {number,password} = req.body;
    console.log(req.body);
    db.query('SELECT * FROM user WHERE number = ?', [number], async (err, results) => {
        if (err) {
            console.log(err);
            res.json({'alert': "An error occurred", 'message': false});
        } else if (!results.length || !results[0].password) {
            res.json({'alert': "mobile and password is incorrect", 'message': false});
        } else {
            try {
                if (await bcrypt.compare(password, results[0].password)) {
                    const id = results[0].id;
                    const token = jwt.sign({id}, 'This is my secret key fkr', {expiresIn: 90});
                    res.json({'message': true, 'alert': 'successful', 'token': token});
                } else {
                    res.json({'alert': "mobile and password is incorrect", 'message': false});
                }
            } catch (err) {
                console.log(err);
                res.json({'alert': "An error occurred", 'message': false});
            }
        }
    });
});




// app.post('/welcome', (req, res) => {
//     db.query('SELECT * FROM user  ', async (err, results) => {
//     res.json({'message':results})
//     })

// })



app.post('/welcome', (req, res) => {
    const {token} = req.body;
    const id = jwt.verify(token, 'This is my secret key fkr',(err,decoded)=>{
if (!err){
    return decoded.id;
}
else{
    return 0;
}


    })
        db.query('SELECT * FROM user WHERE id = ?',id, async (err, result) => {
    res.json({'message':result})
    })

})




app.listen(PORT);
console.log( `The server is running on ${PORT}`)