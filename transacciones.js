$(document).ready(function() {
    // Función para cargar el balance global
    function loadGlobalBalance() {
      var globalBalance = parseFloat(localStorage.getItem('globalBalance')) || 0;
      $('#globalBalance').text(globalBalance.toFixed(2));
    }

    loadGlobalBalance();

    // Función para cargar los usuarios registrados
    function loadRegisteredUsers() {
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var userList = $('#userList');
      userList.empty();

      users.forEach(function(user) {
        var listItem = $('<li><strong>Username:</strong> ' + user.username + ', <strong>Rut:</strong> ' + user.rut + ', <strong>Email:</strong> ' + user.email + ' <button class="btn btn-success btn-sm depositBtn">Deposit</button></li>');
        listItem.find('.depositBtn').click(function() {
          var amount = parseFloat(prompt('Enter the amount to deposit to ' + user.username));
          if (!isNaN(amount) && amount > 0) {
            var globalBalance = parseFloat(localStorage.getItem('globalBalance')) || 0;
            if (amount <= globalBalance) {
              // Realizar el depósito
              globalBalance -= amount;
              localStorage.setItem('globalBalance', globalBalance);
              loadGlobalBalance();
              updateTransactions("transferencia", amount);
              alert('Successfully deposited ' + amount.toFixed(2) + ' to ' + user.username);
            } else {
              alert('Insufficient global balance');
            }
          } else {
            alert('Invalid amount');
          }
        });
        userList.append(listItem);
      });
    }

    loadRegisteredUsers();

    function updateTransactions(operacion, monto){
      if (operacion == "deposito" || operacion == "retiro" || operacion == "transferencia"){
        var historial = JSON.parse(localStorage.getItem("historial")) || []
        var obj = {
          "fecha": new Date().toLocaleString(),
          "operacion": operacion,
          "monto": monto,
        }
        historial.push(obj)
        localStorage.setItem('historial', JSON.stringify(historial));
      }
      else{
        alert("Operacion invalida");
      }
    }
  });
