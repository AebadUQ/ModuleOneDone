const express=require('express')
const app = express();
const mysql=require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db= mysql.createConnection({
    user:"root",
    host:'localhost',
    password:'admin',
    database:'meet',
});

//main meet  post
app.post('/addmain',(req,res)=>{
    const maintitle=req.body.maintitle;
    const started=req.body.started;
    const maintime=req.body.maintime;
    const maindes=req.body.maindes;
    const done=req.body.done;
    db.query("INSERT INTO main (maintitle,started,maintime,maindes,done) VALUE (?,?,?,?,?)",[maintitle,started,maintime,maindes,done],
    (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("inserting into main table")
        }
    }
    )
})
//mom meet post
app.post('/addmom',(req,res)=>{
    
    const subtitle= req.body.subtitle;
     const status = req.body.status;
    const duedate = req.body.duedate;
    const resp = req.body.resp;
    const autho= req.body.autho;
  

db.query("INSERT INTO abc (subtitle,status,duedate,resp,autho) VALUES (?,?,?,?,?)",[subtitle,status,duedate,resp,autho],
(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        res.send("inserting in meet table ")
    }
}
)
})
// mom get 
app.get('/getmom',(req,res)=>{
    
    db.query("Select * from abc",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("dispalying in meet table ")
        }
    })
})


//emp get
app.get('/getemp',(req,res)=>{
  
    db.query("Select * from emp",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
//mom get manager 
app.get('/getman',(req,res)=>{
  
    db.query("Select * from man",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
app.listen(3001,()=>{
    console.log("db working")
})