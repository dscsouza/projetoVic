const form = document.getElementById('cadastroClientes');
const message = document.getElementById('message');
const topContainer = document.getElementById('alertTopContainer')
const accessToken = localStorage.getItem('accessToken');

// {nm_cliente, cgc, contato}

console.log('js do html clientes')
// ENVIANDO OS DADOS PARA A ROTA /clientes

form.addEventListener('submit', function(event) {
  event.preventDefault(); // interrompe o comportamento padrão do formulário

  const dadosFormulario = new FormData(formulario);
  console.log("enviando formulário...")

  fetch('/cliente', {
    method: 'POST',
    body: dadosFormulario
  })
  .then(response => {
    if (response.status === 200) {
      console.log('Cadastro realizado!');
      return response.text();
    } else if (response.status === 401) {
      console.log('Cadastro não realizado!');
      return response.text();
    } else {
      throw new Error('Houve um erro ao enviar o formulário!');
    }
  })
  .then(function(text) {
    message.innerText = text;
    topContainer.classList.toggle("d-none")
  })
  .catch(erro => {
    console.log('erro no js do ejs', erro);
  });
});