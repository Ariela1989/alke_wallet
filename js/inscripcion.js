$(document).ready(function() {
    // Función para registrar un nuevo usuario
    function registerUser(username, rut, email) {
        // Crea un objeto para representar al nuevo usuario
        var newUser = {
            username: username,
            rut: rut,
            email: email
        };

        // Obtiene el historial de usuarios almacenado en localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Agrega el nuevo usuario al historial de usuarios
        users.push(newUser);

        // Almacena el historial de usuarios actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Muestra la información del usuario en la página
        showUsers(users);

        // Limpia el formulario después de registrar un usuario
        $('#username').val('');
        $('#rut').val('');
        $('#email').val('');

        alert('Registro exitoso!');
    }

    // Función para mostrar la información de todos los usuarios en la página
    function showUsers(users) {
        $('#users').empty(); // Vacía la lista de usuarios antes de agregar los nuevos
        users.forEach(function(user, index) {
            var listItem = $('<li><strong>Username:</strong> ' + user.username + ', <strong>Rut:</strong> ' + user.rut + ', <strong>Email:</strong> ' + user.email + '</li>');
            var deleteButton = $('<button class="btn btn-danger btn-sm deleteBtn">Delete</button>');
            deleteButton.click(function() {
                deleteUser(index);
            });
            listItem.append(deleteButton);
            $('#users').append(listItem);
        });
    }

    // Función para eliminar un usuario de la lista
    function deleteUser(index) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1); // Elimina el usuario en la posición 'index'
        localStorage.setItem('users', JSON.stringify(users));
        showUsers(users);
    }

    // Mostrar usuarios previamente registrados al cargar la página
    var users = JSON.parse(localStorage.getItem('users')) || [];
    showUsers(users);

    // Evento click para el botón de registro
    $('#registerBtn').click(function() {
        // Obtiene los valores de los campos del formulario
        var username = $('#username').val();
        var rut = $('#rut').val();
        var email = $('#email').val();

        // Valida que los campos no estén vacíos
        if (!username || !rut || !email) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Registra al nuevo usuario
        registerUser(username, rut, email);
    });
});

