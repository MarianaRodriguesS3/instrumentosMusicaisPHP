const API_URL = "http://localhost:8080/instrumentosMusicais";

async function carregarInstrumentos() {
  const resposta = await fetch(API_URL);
  const instrumentos = await resposta.json();

  const tabela = document.getElementById("tabInstrumentos");
  tabela.innerHTML = "";

  instrumentos.forEach(instr => {
    const linha = `<tr>
      <td>${instr.id}</td>
      <td>${instr.instrumento}</td>
      <td>${instr.quantidade}</td>
      <td>${instr.tipo}</td>
      <td><button class="btn red" onclick="apagarInstrumento(${instr.id})">Excluir</button></td>
    </tr>`;
    tabela.innerHTML += linha;
  });
}

async function incluirInstrumentos() {
  const instrumento = document.querySelector('input[name="instrumento"]:checked')?.value;
  const quantidade = document.querySelector('input[name="quantidade"]:checked')?.value;
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;

  if (!instrumento || !quantidade || !tipo) {
    alert("Preencha todos os campos!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ instrumento, quantidade, tipo })
  });

  carregarInstrumentos();
}

async function apagarInstrumento(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  carregarInstrumentos();
}

document.addEventListener("DOMContentLoaded", carregarInstrumentos);
document.getElementById("btnIncluir").addEventListener("click", incluirInstrumentos);
