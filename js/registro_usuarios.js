$(document).ready(function() {
    function registerUser(usuario, rut, email, cuenta) {
        var newUser = {
            usuario: usuario,
            rut: rut,
            email: email,
            cuenta: cuenta
        };

        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        showUsers(users);

        $('#usuario').val('');
        $('#rut').val('');
        $('#email').val('');
        $('#cuenta').val('');

        alert('Registro exitoso!');
    }

    function showUsers(users) {
        $('#usersTableBody').empty(); // Vacía la tabla antes de agregar los nuevos usuarios
        users.forEach(function(user, index) {
            var row = $('<tr>');
            row.append('<td>' + user.usuario + '</td>');
            row.append('<td>' + user.rut + '</td>');
            row.append('<td>' + user.email + '</td>');
            row.append('<td>' + user.cuenta + '</td>');
            var deleteButton = $('<button class="btn btn-danger btn-sm deleteBtn">Eliminar</button>');
            deleteButton.click(function() {
                deleteUser(index);
            });
            var actionCell = $('<td>');
            actionCell.append(deleteButton);
            row.append(actionCell);
            $('#usersTableBody').append(row);
        });
    }

    function deleteUser(index) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        showUsers(users);
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];
    showUsers(users);

    $('#registerBtn').click(function() {
        var usuario = $('#usuario').val();
        var rut = $('#rut').val();
        var email = $('#email').val();
        var cuenta = $('#cuenta').val();

        if (!usuario || !rut || !email || !cuenta) {
            alert('Por favor complete todos los campos.');
            return;
        }

        registerUser(usuario, rut, email, cuenta);
    });
});

