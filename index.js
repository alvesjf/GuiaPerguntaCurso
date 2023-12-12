const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso !")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// curso de GIT - - - https://www.youtube.com/watch?v=192HgwRgOYE
//* * * DISPARAR CMD - - - nodemon index.js * * *
// QUANDO DA ERRO NO GIT HUB  - - - EXECUTAR = = = git commit -m "mensagem"
//ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.set('view engine','ejs');
app.use(express.static('public'));

//BODYPARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS
app.get("/",(req,res) => {   
    //EQUIVALENTE AO SELECT * ALL FROM PERGUNTAS
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{   
            perguntas: perguntas
        });        
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
        
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    }); 
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //PERGUNTA ENCONTRADA
            res.render('pergunta' ,{
                pergunta: pergunta
            });                
        }else{ //NAO ENCONTRADA
            res.redirect("/");
        }
    });
});

app.listen(8080,()=>{
    console.log("App rodando !");});


