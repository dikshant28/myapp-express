var express=require("express");
var app=express();
var mysql=require("mysql");

var connection= mysql.createConnection({
    host: "localhost",
    database:"emp",
    user:"dac",
    password:"dac"
});

connection.connect();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/emps",(request, response)=>{
    var queryText=`select * from Emp`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});


app.get("/emps/:empid",(request,response)=>{
    var queryText=`select * from Emp where empid=${request.params.empid}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});


app.post("/emps",(request, response)=>{
    var empid= request.body.empid;
    var empname= request.body.empname;
    var empsal= request.body.empsal;

    var queryText=`insert into Emp values(${empid},'${empname}',${empsal})`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});

app.put("/emps/:empid",(request,response)=>{
    var empid=request.params.empid;
    var empname=request.body.empname;
    var empsal=request.body.empsal;

    var queryText=`update Emp set empname='${empname}',empsal=${empsal} where empid=${empid}`;
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});


app.delete("/emps/:empid",(request,response)=>{
    var empid=request.params.empid;
    var queryText=`delete from Emp where empid=${empid}`;
    console.log(queryText);
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});

app.listen(9999,()=>{
    console.log("Server Started...!");
});
