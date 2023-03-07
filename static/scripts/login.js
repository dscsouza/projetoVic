const form = document.getElementById('login-form');
const message = document.getElementById('message');

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
	window.location.href = '/dashboard';
  })
  .catch(error => {
	console.error(error);
	message.innerText = 'Erro ao fazer login';
    })
})