const form = document.getElementById('cadastroClientes');


// {nm_cliente, cgc, email, telefone}

console.log('js do html clientes')
// ENVIANDO OS DADOS PARA A ROTA /clientes


function buscarClientes() {
  return fetch('/clientes')
    .then(response => response.json())
    .catch(error => console.error(error));
}


function atualizarTabelaClientes() {
  const tbody = document.getElementById('listaClientes');
  tbody.innerHTML = '';

  buscarClientes().then(clientes => {
    clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cliente.nm_cliente}</td>
        <td>${cliente.CGC}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}

atualizarTabelaClientes();



nomeCliente = document.getElementById("searchClient")
nomeCliente.addEventListener("keyup", searchcliente);

function searchcliente(){
  
  criterioPesquisa = document.getElementById("searchItem")
  
  // testando a captura dos valores
  console.log(criterioPesquisa.value, nomeCliente.value)

  //fetch




}
