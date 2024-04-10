document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginform');
    const messageDiv = document.getElementById('message');

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const ipAddress = await fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data.ip;
        })
        .catch(error => {
            return '0.0.0.0';
        });

        try {
            if (username != '' & password != '') {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, ipAddress })
                });

                const data = await response.json();

                if (data.message === 'ok') {
                    const url = `./html/principal.html?id_token=${encodeURIComponent(data.id_token)}&id_cliente=${encodeURIComponent(data.id_cliente)}`;
                    // Redirigir a la nueva URL
                    window.location.href = url;
                } else {
                    showMessage(data.message);
                }
            }
        } catch (error) {
            showMessage('Error en el inicio de sesión.');
        }
    });

    // Mostrar mensajes en el div de mensajes
    function showMessage(message) {
        messageDiv.textContent = message;
    }
});