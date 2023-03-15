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


function atualizaTabelaPesquisa() {
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



searchCliente = document.getElementById("searchClient")
searchCliente.addEventListener("keyup", searchcliente);

function searchcliente(){
  
  criterioPesquisa = document.getElementById("searchItem")


  criterio = criterioPesquisa.value
  nomeCliente = searchCliente.value
  


  //fetch  -   /pesquisaAproximacao
  // critério {atributo, valor}


  const params = new URLSearchParams({
    atributo: criterio,
    valor: nomeCliente
  });
  
  return fetch(`/pesquisaAproximacao?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // retorna a resposta em formato json
    return response.json();
  })
  .then(data =>{
    return data;
  })
  .catch(error => {
    // imprime no console o erro
    console.error(error);
  });

  
  
}


function atualizaTabelaAposPesquisa() {
  const tbody = document.getElementById('listaClientes');
  tbody.innerHTML = '';

  
  searchcliente().then(clientes => {
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
