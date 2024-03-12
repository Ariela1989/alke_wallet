
$("#login").submit((event)=>{
    event.preventDefault();
    obtenerYvalidar();
})



function obtenerYvalidar() {
    var email = $('#exampleInputEmail1').val();
    var password = $('#exampleInputPassword1').val();
    var emailValidacion ="usuario@example.com";
    var passwordValidacion = "contraseña"
    // Realizar validación y proceso de inicio de sesión

    if(email === "usuario@example.com" && password === "contraseña") {
      // Redireccionar al menú principal o realizar más acciones
      window.location.href = "menu.html";
    } else {
      // Mostrar mensaje de error o manejar credenciales inválidas
      alert("Dirección de correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
  }