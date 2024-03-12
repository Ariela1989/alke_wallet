$(document).ready(function() {
    var balance = parseFloat(localStorage.getItem('globalBalance')) || 0;
    function updateBalance() {
      $('#globalBalance').text(balance.toFixed(2));
      localStorage.setItem('globalBalance', balance);
    }

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
        updateBalance();
      }
      else{
        alert("Operacion invalida");
      }
    }
  
    updateBalance();
    
  
    $('#depositBtn').click(function() {
      var amount = parseFloat($('#amount').val());
      if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateTransactions("deposito", amount);
        $('#amount').val('');
        alert('Depósito realizado!');
        $('#amount').val('');
        alert('Depósito realizado!');
      } else {
        alert('Monto inválido. Por favor, ingrese un número positivo.');
      }
    });
  
    $('#withdrawBtn').click(function() {
      var amount = parseFloat($('#amount').val());
      if (!isNaN(amount) && amount > 0 && amount <= balance) {
        balance -= amount;
        updateTransactions("retiro", amount);
        $('#amount').val('');
        alert('Retiro exitoso!');
      } else {
        alert('Cantidad no válida. Ingrese un número válido dentro de su saldo.');
      }
    });
  });
  