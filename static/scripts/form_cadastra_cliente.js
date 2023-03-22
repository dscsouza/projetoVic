const form = document.getElementById('cadastroClientes');
const divPagination = document.getElementById('divPagination')

/////////////////////////////////////////////////////////////////////////
// MENU EXIBIDO AO MOVER O MOUSE SOBRE CADA LINHA DA TABELA DE CLIENTES//
/////////////////////////////////////////////////////////////////////////
//exibe o menu
function show_menu_row(e){
  let x = e.querySelectorAll(".menuRow > .btn-group");
  x[0].classList.remove("invisible")
}

// oculta o menu assim que o mouse passa da linha
function hide_menu_row(e){
  let x = e.querySelectorAll(".menuRow > .btn-group");
  x[0].classList.add("invisible")
}

//evento disparado ao clicar em excluir um registro
function excluirRegistro(e){
  //pega o cpf diretamente da tag data-cgc criada ao renderizar a tabela
  cgc = e.getAttribute('data-cgc')
  console.log('excluir registro de cpf:', cgc)
  
}
//evento disparado ao clicar em editar um registro
function editarRegistro(e){
  //pega o cpf diretamente da tag data-cgc criada ao renderizar a tabela
  cgc = e.getAttribute('data-cgc')
  console.log('editar registro de cpf:', cgc)

}






// ENVIANDO OS DADOS PARA A ROTA /clientes


//função que renderiza o paginador, com base no total de páginas e na página atual informada
//inicialmente será sempre a primeira página
function pagination(totalPaginas, pgAtual){
  console.log('na função pagination: ', totalPaginas);
  let navPagination = `<nav aria-label="Page navigation">
  <ul class="pagination">`;

  for (let index = 1; index <= totalPaginas; index++) {
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
        <td class="CGC">${cliente.CGC}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td class="menuRow">
        <div class="btn-group invisible" role="group" aria-label="Excluir ou Editar">
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="excluirRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="editarRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>

        
        </td>
      `;
      // Ao passar o mouse pelo item da lista(onmouseover), exibe a imagem de excluir
      // ao retirar o mouse (onmouseout), oculta o a imagem de excluir
      tr.setAttribute("onmouseover", "show_menu_row(this)");
      tr.setAttribute("onmouseout", "hide_menu_row(this)");
      
     
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
        <td class="CGC">${cliente.CGC}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td class="menuRow">
        <div class="btn-group invisible" role="group" aria-label="Excluir ou Editar">
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="excluirRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="editarRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>

        
        </td>
      `;
      // Ao passar o mouse pelo item da lista(onmouseover), exibe a imagem de excluir
      // ao retirar o mouse (onmouseout), oculta o a imagem de excluir
      tr.setAttribute("onmouseover", "show_menu_row(this)");
      tr.setAttribute("onmouseout", "hide_menu_row(this)");
      
     
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
        <td class="CGC">${cliente.CGC}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td class="menuRow">
        <div class="btn-group invisible" role="group" aria-label="Excluir ou Editar">
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="excluirRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-outline-secondary" data-cgc="${cliente.CGC}" onclick="editarRegistro(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>

        
        </td>
      `;
      // Ao passar o mouse pelo item da lista(onmouseover), exibe a imagem de excluir
      // ao retirar o mouse (onmouseout), oculta o a imagem de excluir
      tr.setAttribute("onmouseover", "show_menu_row(this)");
      tr.setAttribute("onmouseout", "hide_menu_row(this)");
      
     
      tbody.appendChild(tr);
    });
  });
}
