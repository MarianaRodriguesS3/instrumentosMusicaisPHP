const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const contrInstrumento = require("./controllers/instrumento.js")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'instrumentosMusicais',
})

const app = express()

app.use(cors())
app.use(express.json())

app.get("/instrumentosMusicais", (req,res)=>{ contrInstrumento.getInstrumento(req,res) })
app.post("/instrumentosMusicais", (req,res)=>{ contrInstrumento.incluiInstrumento(req,res) })
app.put("/instrumentosMusicais/:id", (req,res)=>{ contrInstrumento.alteraInstrumento(req,res) })
app.delete("/instrumentosMusicais/:id", (req,res)=>{ contrInstrumento.apagaInstrumento(req,res) })

app.listen(8080, ()=> console.log("Servidor Node rodando na porta 8080"))
