const express = require("express");
const app = express();

app.get("/",(req,res) => {
    res.send("Bem vindo ao meu site ! 7-11-23");
});

app.listen(8080,()=>{
    console.log("App rodando !");});
