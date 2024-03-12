var obj1 = {
    "fecha":"13",
    "operacion": "giro",
    "monto": 1234,
}    

$(document).ready(function() {
    var historial = localStorage.getItem("historial");
    var historial_obj = JSON.parse(historial);

    if (historial_obj == null || historial_obj.length === 0){
        alert("No se encuentran transacciones");
    }
    else{
        historial_obj.forEach(element => {
            $("#historial_transacciones").append('<tr><td>'+element.fecha+'</td><td>'+element.operacion+'</td><td>'+element.monto+'</td></tr>');
        });
    }
});