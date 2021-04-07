var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");


app.set('view engine', 'ejs');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser(""));

// express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

app.use(flash());

app.get("/", (req, res) =>{

    var erros = req.flash("error");

    erros = !erros || erros.length ==0 ? undefined : erros; 

    res.render("index", {erros,
         email: req.flash("email"),
         nome: req.flash("nome"),
         pontos: req.flash("pontos")});
});

app.post("/form", (req, res) =>{

    var {email, nome, pontos} = req.body;

    var erros = "";

    if(!email){
        erros += "O e-mail não pode ser vazio\n";
    }

    if(!nome){
        erros += "O nome não pode ser vazio\n";
    }

    if(!pontos || pontos < 20){
        erros += "Você não pode ter menos de 20";
    }

    if(erros) {
        req.flash("error", erros);
        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);
        res.redirect("/");
    } else {
        res.send("Sucesso");
    }

    
});


app.listen(4001, (req, res) => {
    console.log("Servidor rodando!");
});