const express = require("express");
const app = express();

app.use(express.json());

// "Banco de dados" em memória
let filmes = [];
let usuarios = [];
let favoritos = [];

// Contadores de ID
let filmeId = 1;
let usuarioId = 1;
let favoritoId = 1;


// GET /filmes
app.get("/filmes", (req, res) => {
res.json(filmes);
});

// POST /filmes
app.post("/filmes", (req, res) => {
const { titulo, genero, ano } = req.body;

const novoFilme = {
    id: filmeId++,
    titulo,
    genero,
    ano,
};

filmes.push(novoFilme);
res.status(201).json(novoFilme);
});

// DELETE /filmes/:id
app.delete("/filmes/:id", (req, res) => {
const id = parseInt(req.params.id);

const index = filmes.findIndex(f => f.id === id);
if (index === -1) {
    return res.status(404).json({ erro: "Filme não encontrado" });
}

filmes.splice(index, 1);
res.json({ mensagem: "Filme removido com sucesso" });
});



// GET /usuarios
app.get("/usuarios", (req, res) => {
res.json(usuarios);
});

// POST /usuarios
app.post("/usuarios", (req, res) => {
const { nome, email, plano } = req.body;

const novoUsuario = {
    id: usuarioId++,
    nome,
    email,
    plano,
};

usuarios.push(novoUsuario);
res.status(201).json(novoUsuario);
});

// PUT /usuarios/:id
app.put("/usuarios/:id", (req, res) => {
const id = parseInt(req.params.id);
const usuario = usuarios.find(u => u.id === id);

if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
}

const { nome, email, plano } = req.body;

if (nome) usuario.nome = nome;
if (email) usuario.email = email;
if (plano) usuario.plano = plano;

res.json(usuario);
});




// POST /favoritos
app.post("/favoritos", (req, res) => {
const { id_usuario, id_filme } = req.body;

const usuario = usuarios.find(u => u.id === id_usuario);
const filme = filmes.find(f => f.id === id_filme);

if (!usuario || !filme) {
    return res.status(404).json({ erro: "Usuário ou Filme não encontrado" });
}

const novoFavorito = {
    id: favoritoId++,
    id_usuario,
    id_filme,
};

favoritos.push(novoFavorito);
res.status(201).json(novoFavorito);
});

// GET /favoritos
app.get("/favoritos", (req, res) => {
res.json(favoritos);
});

// GET /favoritos/usuario/:id_usuario
app.get("/favoritos/usuario/:id_usuario", (req, res) => {
const id_usuario = parseInt(req.params.id_usuario);

const usuario = usuarios.find(u => u.id === id_usuario);
if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
}

const favoritosUsuario = favoritos
    .filter(f => f.id_usuario === id_usuario)
    .map(fav => {
    const filme = filmes.find(f => f.id === fav.id_filme);
    return filme;
    });

res.json(favoritosUsuario);
});




const PORT = 3000;
app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});