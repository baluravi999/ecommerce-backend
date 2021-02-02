"use strict";
exports.__esModule = true;
//import the modules
var express = require("express");
var mongodb = require("mongodb");
var cors = require("cors");
var bodyparser = require("body-parser");
var ObjectID = mongodb.ObjectID;
//create the rest object
var app = express();
//where "app" is the rest object, used to develop the rest services.
//enable the cors policy
app.use(cors());
//set the json as MIME Type
app.use(bodyparser.json());
//read the json coming from client
app.use(bodyparser.urlencoded({ extended: false }));
//create the ref variable to connect to mongodb database
var ashokIT = mongodb.MongoClient;
//create the rest api
app.get("/api/products", function (req, res) {
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/amazona?retryWrites=true&w=majority", function (err, connection) {
        if (err)
            throw err;
        else {
            var db = connection.db("amazona");
            db.collection("products").find().toArray(function (err, array) {
                if (err)
                    throw err;
                else {
                    var final_res = {
                        "products": array
                    };
                    res.send(array);
                }
            });
        }
    });
});
app.get("/api/products/:id", function (req, res) {
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/amazona?retryWrites=true&w=majority", function (err, conn) {
        if (err)
            throw err;
        else {
            var db = conn.db("amazona");
            try {
                db.collection("products").find({ "_id": new ObjectID(req.params.id) }).toArray(function (err, array) {
                    if (array.length > 0) {
                        res.send(array[0]);
                    }
                    else {
                        res.send({ message: "product not available" });
                    }
                });
            }
            catch (error) {
                res.send({ message: "invalid id" });
            }
        }
    });
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("server started");
});
