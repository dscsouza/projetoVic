const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const topContainer = document.getElementById('alertTopContainer')
console.log('arquivo js do html')

function request_autenticado(rota){
  const accessToken = localStorage.getItem('accessToken');

  fetch(rota, {
    headers: {
      'Authorization': `${accessToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Não foi possível acessar a rota ${rota}`);
    }
    return response.text();
  })
  .then(data => {
    document.write(data);
  })
  .catch(error => {
    console.error(error);
  });

}

form.addEventListener('submit', event => {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  const data = { username, password };

  fetch('/login', {
	method: 'POST',
	headers: {
  	'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
  })
  .then(response => {
	if (!response.ok) {
  	throw new Error(response.statusText);
	}
	return response.json();
  })
  .then(data => {
	localStorage.setItem('accessToken', data.accessToken);
  request_autenticado('/protegido')

  })
  .catch(error => {
	console.error(error);
	message.innerText = 'Usuário ou senha incorretos.';
    topContainer.classList.toggle("d-none")
    })
})