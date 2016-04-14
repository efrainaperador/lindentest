$(document).ready(function(){
	$('#dibujar').on('click', inicializar);

	function inicializar(){
		var numerador = $('#numerador').val();
		var denominador = $('#denominador').val();

		if(!isNaN(numerador) && !isNaN(denominador)){
			if(parseInt(denominador) !== 0){
				var residuo = numerador % denominador;
				var entero = Math.floor(numerador/denominador);
				if(entero > 0){
					$('#entero').text(entero);
					$('#fraccionNumerador').text(residuo);
					$('#fraccionDenominador').text(denominador);
					$('#decimal').text(Math.round(numerador/denominador * 10000) / 10000);
					dibujar(entero, residuo, denominador, false);
				}else{
					$('#entero').text('');
					$('#fraccionNumerador').text(numerador);
					$('#fraccionDenominador').text(denominador);
					$('#decimal').text(Math.round( numerador/denominador * 10000) / 10000);
					$('#decimal').text(numerador/denominador);
				}
			}
		}else{
			alert("El numerador o denominador no es un valor numerico");
		}
	}

	function dibujar(cantidad, residuo, denominador, isZero){
		var wrapper = $('#contenedorGrafico');
		wrapper.html('');
		var canvasList = new Array();
		var infoList = new Array();
		for(var i = 0, l = cantidad + (residuo == 0 ? 0 : 1); i < l; i++){
			var value = (isZero || denominador > 50) ? (200+parseInt(denominador))+"" : "200";
			var canvas = $('<canvas width="' + value + '" height="' + value + '">');
			canvas.css({width: value + "px", "height": value + "px"});
			var ctx = canvas[0].getContext('2d');
			ctx.fillStyle = 'rgba(255, 0, 0, 0)';
			wrapper.append(canvas);
			for(var j = ((i<l-(residuo == 0 ? 0 : 1)) ? denominador : residuo); j >= 1; j--){
				ctx.beginPath();
				ctx.arc(value/2,value/2,value/2 - 25,0,Math.PI*2*j/denominador, false);
				ctx.lineTo(value/2,value/2);
				ctx.closePath();
				ctx.fillStyle = "#F00";
				ctx.strokeStyle = "#FFF";
				ctx.fill();
				ctx.stroke();
			}

			ctx.beginPath();
			ctx.arc(value/2,value/2,value/2 - 25,0,Math.PI*2, false);

			ctx.strokeStyle = "#000";
			ctx.closePath();
			ctx.stroke();
		}
	}
});