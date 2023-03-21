const form = document.getElementById('cadastroClientes');
const divPagination = document.getElementById('divPagination')


// {nm_cliente, cgc, email, telefone}

console.log('js do html clientes')
// ENVIANDO OS DADOS PARA A ROTA /clientes

function pagination(totalPaginas, pgAtual){
  console.log('na função pagination: ', totalPaginas);
  let navPagination = `<nav aria-label="Page navigation">
  <ul class="pagination">`;

  for (let index = 1; index <= totalPaginas; index++) {
    console.log(navPagination);
    ativa = index == pgAtual?'active':' '
    navPagination = navPagination + `<li class="page-item ${ativa}"><a class="page-link" style="cursor:pointer" onclick="atualizarTabelaClientes(${index})">${index}</a></li>`;
  }

  navPagination = navPagination + `</ul>
  </nav>`;

  console.log(navPagination);

  return navPagination;
}





function buscarClientes(pgAtual, qtdPorPagina) {

  const params = new URLSearchParams({
    pg: pgAtual,
    qtd: qtdPorPagina
  });


  return fetch(`/clientes?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}


function atualizarTabelaClientes(pgAtual) {
  
  

  const tbody = document.getElementById('listaClientes');
  tbody.innerHTML = '';

  // quantidade de registros por página
  quantidadePorPagina = 6

  buscarClientes(pgAtual, quantidadePorPagina).then(clientes => {

    //retorna o menu de paginação
    console.log('Total de páginas: ', clientes.totalPages)
    divPagination.innerHTML = pagination(clientes.totalPages, pgAtual)

    clientes.dados.forEach(cliente => {
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

//inicia sempre na primeira página
atualizarTabelaClientes(1);


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
