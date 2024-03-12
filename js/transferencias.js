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
          var row = $('<tr>');
          row.append('<td>' + user.usuario + '</td>');
          row.append('<td>' + user.rut + '</td>');
          row.append('<td>' + user.email + '</td>');
          row.append('<td>' + user.cuenta + '</td>');
          var depositButton = $('<button class="btn btn-success btn-sm depositBtn">Depositar</button>');
          depositButton.click(function() {
              var amount = parseFloat(prompt('Ingrese la cantidad a depositar en la cuenta de ' + user.usuario));
              if (!isNaN(amount) && amount > 0) {
                  var globalBalance = parseFloat(localStorage.getItem('globalBalance')) || 0;
                  if (amount <= globalBalance) {
                      globalBalance -= amount;
                      localStorage.setItem('globalBalance', globalBalance);
                      loadGlobalBalance();
                      updateTransactions("transferencia", amount);
                      alert('Depósito realizado exitosamente de ' + amount.toFixed(2) + ' a la cuenta de ' + user.usuario);
                  } else {
                      alert('Saldo insuficiente');
                  }
              } else {
                  alert('Monto inválido');
              }
          });
          var actionCell = $('<td>');
          actionCell.append(depositButton);
          row.append(actionCell);
          userList.append(row);
      });
  }

  loadRegisteredUsers();

  function updateTransactions(operacion, monto) {
      if (operacion == "deposito" || operacion == "retiro" || operacion == "transferencia") {
          var historial = JSON.parse(localStorage.getItem("historial")) || [];
          var obj = {
              "fecha": new Date().toLocaleString(),
              "operacion": operacion,
              "monto": monto,
          };
          historial.push(obj);
          localStorage.setItem('historial', JSON.stringify(historial));
      } else {
          alert("Operación inválida");
      }
  }
});
