const form = document.getElementById('cadastroClientes');
const divPagination = document.getElementById('divPagination')


// {nm_cliente, cgc, email, telefone}

// ENVIANDO OS DADOS PARA A ROTA /clientes


//função que renderiza o paginador, com base no total de páginas
// e na página atual informada
//inicialmente será sempre a primeira página
function pagination(totalPaginas, pgAtual){
  console.log('na função pagination: ', totalPaginas);
  let navPagination = `<nav aria-label="Page navigation">
  <ul class="pagination">`;

  for (let index = 1; index <= totalPaginas; index++) {
    console.log(navPagination);
    ativa = index == pgAtual?'active':' ' // torna a página atual ativa, alterando seu estilo
    navPagination = navPagination + `<li class="page-item ${ativa}"><a class="page-link" style="cursor:pointer" onclick="atualizarTabelaClientes(${index})">${index}</a></li>`;
  }

  navPagination = navPagination + `</ul>
  </nav>`;

  //retorna uma string com as tags de paginação formatadas
  return navPagination;
}




// faz uma requisição para a rota /clientes
// passando como parâmetro a página que se quer (pgAtual)
//  e a quantidade de registros por página a serem devolvidos pelo servidor
// essa implementação tem como intuito reduzir o consumo do banco de dados
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

// com base na página atual, retorna os registros desta página
function atualizarTabelaClientes(pgAtual) {

  const tbody = document.getElementById('listaClientes');
  tbody.innerHTML = '';

  // quantidade de registros por página fixo
  // mas pode ser passado como parâmetro posteriormente
  // a ideia é incluir depois um seletor onde o usuário escolha
  // 5, 10, ou 15 registros por página
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
// posteriormente incluir mais um parâmetro nessa função
// quantidade de registros por página
//criar um seletor para o usuário escolher 5, 10 ou 15 registros por página
atualizarTabelaClientes(1);



// função chamada quando o usuário usa o campo de pesquisa
// ela faz a requisição ao servidor e atualiza a tabela de clientes exibidos
// não está sujeita à paginação
// implementar posteriormente essa funcionalidade de paginação
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


// input onde o usuário digita o termo a ser pesquisado
searchCliente = document.getElementById("searchClient")

//evento disparado toda vez que o usuário digitar um caracter 
// no input do campo de pesquisa
searchCliente.addEventListener("keyup", searchcliente);


//função que busca o termo a ser pesquisado
// nesse caso de uso o servidor retorna uma lista completa por aproximação
function searchcliente(){
  
  // pega o critério de pesquisa: por nome ou por CPF/CNPJ
  criterioPesquisa = document.getElementById("searchItem")
  criterio = criterioPesquisa.value

  // apesar da variável se chamar nomeCliente
  // ela diz respeito ao input onde o usuário digita o NOME ou o CPF/CNPJ
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



// atualiza a tabela de clientes exibidos na tela após a pesquisa
// usa como base a função searchCliente e trabaha com sua resposta em json
// implementar paginação nessa função
// tornar a função de paginação mais geral para poder ser utilizada por qualquer
// outra função
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
