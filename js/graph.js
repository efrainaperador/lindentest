$(document).ready(function(){
	var canvas = this.__canvas = new fabric.Canvas('canvas');
	var isEditOrDelete = "edit";

	canvas.on('object:selected', onObjectSelected);
		
	$('.add-selector button').each(function(index, elem){
		$(elem).on('click', function(){
			drawElement($(this).data('shape'));	
		});
	});

	$('.edit-selector button').each(function(index, elem){
		$(elem).on('click', function(){
			isEditOrDelete = $(this).data('action');
			$('.active').removeClass('active');
			$(this).addClass('active');	
		});
	});

	$('#canvas').on('click', function(e){
		var x = e.clientX - this.getBoundingClientRect().left;
		var y = e.clientY - this.getBoundingClientRect().top;
		if(current){

		}else{
			alert("You must select a button on the left first");
		}
	});

	function drawElement(elem){
		var dim = 50;
		var options = {
	      top: 100,
	      left: 100,
	      fill: 'green'
	    };
	    if(elem == "Circle"){
	    	options.radius = dim;
	    }else {
			options.width = dim;
			options.height = dim;
		}
		console.log(elem);
		canvas.add(new fabric[elem](options));
	}

	function onObjectSelected(e){
		var elem = e.target;
		if(isEditOrDelete == "delete"){
			canvas.remove(elem);
			isEditOrDelete = "edit";
			$('.active').removeClass('active');
			$('.edit-button').addClass('active');
		}
	}
});