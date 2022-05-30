const express = require('express'); 
const app = express(); 
const morgan = require('morgan');
const usuarios = require('./usuarios'); //importa el array de usuarios 

const port = 3000; 

app.use(morgan('dev'));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views")

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index", { titulo: "inicio EJS" })
})

app.get('/pagina0', (req,res) => {
    res.render("pagina0", { titulo: "esta es la pagina0" }) //renderiza la pagina0, nombre pagina y mensaje
})



app.get('/usuarios', (req, res) => {
    res.send(usuarios);
    //consultar usuarios por id 
    res.send(usuarios.find(usuario => usuario.id === parseInt(req.params.id)));
     

})

//ver usuarios en usuarios.ejs
app.get('/usuariosejs', (req, res) => {
    res.render("user", { titulo: "usuarios", users: usuarios })
    console.log(usuarios);
})

//post para crear usuarios
app.post('/usuarios', (req, res) => {
    const {Name, apellido,Age,cargo} = req.body;
    const usuario = {
        id: usuarios.length + 1,
        Name,
        apellido,
        Age,
        cargo
    }
    usuarios.push(usuario);
    res.send(usuario);
   
})

//get para mostrar usuarios por id
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.id === parseInt(req.params.id));
    if (!usuario) {
        return res.status(404).send('El usuario no existe');
    }
    res.send(usuario);
})

//delete para eliminar usuarios por id
app.delete('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.id === parseInt(req.params.id)); // busca el usuario por id en el array de usuarios 
    if (!usuario) { //si no existe el usuario 
        return res.status(404).send('El usuario no existe');
    }
    const index = usuarios.indexOf(usuario); //busca el indice del usuario, indexof busca el indice del elemento que se le pasa
    usuarios.splice(index, 1); //elimina el elemento del indice que se le pasa
    res.send(usuario); //envia el usuario eliminado 
})

app.use((req,res,next)=>{
    res.status(404).render("404", { titulo: "pagina no encontrada" })
})

app.listen(port, () => {
    console.log('servidor corriendo en el puerto ' + port);
})