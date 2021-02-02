//import the modules
import * as express from "express";
import * as mongodb from "mongodb";
import * as cors from "cors";
import * as bodyparser from "body-parser";

const ObjectID = mongodb.ObjectID;

//create the rest object
let app:any = express();
//where "app" is the rest object, used to develop the rest services.


//enable the cors policy
app.use(cors());


//set the json as MIME Type
app.use(bodyparser.json());

//read the json coming from client
app.use(bodyparser.urlencoded({extended:false}));



//create the ref variable to connect to mongodb database
let ashokIT:any = mongodb.MongoClient;


//create the rest api
app.get("/api/products",(req:any,res:any):any=>{
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/amazona?retryWrites=true&w=majority",(err:any,connection:any)=>{
        if(err) throw err;
        else{
            let db:any = connection.db("amazona");
            db.collection("products").find().toArray((err:any,array:any)=>{
                if(err) throw err;
                else{
					const final_res:any = {
						"products":array
					};
                    res.send(array);
                }
            });
        }
    });
});


app.get("/api/products/:id",(req:any,res:any)=>{
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/amazona?retryWrites=true&w=majority",(err:any,conn:any)=>{
        if(err) throw err;
        else{
            let db = conn.db("amazona");
            try{
                db.collection("products").find({"_id":new ObjectID(req.params.id)}).toArray((err:any,array:any)=>{
                    if(array.length>0){
                        res.send(array[0]);
                    }else{
                        res.send({message:"product not available"});
                    }
                });
            }catch(error){
                res.send({message:"invalid id"});
            }
        }
    });
});


let port:any = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started");
});
