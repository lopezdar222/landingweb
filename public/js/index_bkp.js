document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginform');
    const messageDiv = document.getElementById('message');
    let iniciando_sesion = 0;

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const id_plataforma = 1;
        const ipAddress = await fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data.ip;
        })
        .catch(error => {
            return '0.0.0.0';
        });

        try {
            if (iniciando_sesion == 1) {
                alert('Por Favor Aguardar. Se está Procesando la Solicitud.');
                return;
            }
            iniciando_sesion = 1;
            if (username != '' & password != '') {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, ipAddress, id_plataforma })
                });

                const data = await response.json();

                if (data.message === 'ok') {
                    const url = `./html/principal.html?id_token=${encodeURIComponent(data.id_token)}&id_cliente=${encodeURIComponent(data.id_cliente)}`;
                    // Redirigir a la nueva URL
                    iniciando_sesion = 0;
                    window.location.href = url;
                } else {
                    showMessage(data.message);
                }
            }
            iniciando_sesion = 0;
        } catch (error) {
            showMessage('Error en el inicio de sesión.');
            iniciando_sesion = 0;
        }
    });

    // Mostrar mensajes en el div de mensajes
    function showMessage(message) {
        messageDiv.textContent = message;
    }
});