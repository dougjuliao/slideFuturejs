$(document).ready(function(){
	/*

		type: String, 	  	// Nome do tipo de slide
		effect: String,  	// Nome do efeito de transicao
		direction: String,	// horizontal | vertical
		revert: false,		// true ou false
		time: Number, 		// Tempo de transicao
		width: Number, 	// Number ou String - default 100%
		width: Number, 	// Number ou String - default 100%
		slides: [
			{
				image: String,  		// URL Imagem
				caption: String, 		// HTML | TEXTO | DEFAULT(NÃO PRECISA DEFINIR)
				onIn: function(in){  }, 	// EVENTO ENTRADA
				onOut: function(in){  } 	// EVENTO SAIDA
			}
		],
		prevNext: Boolean | String, 	// true | false | 'top' | 'middle' | 'bottom'
		navigation: [               	// true | false | Array
			label: String,		  	// HTML | TEXTO | DEFAULT
			style: String,    		// DEFAULT | 'circle' | 'bar' | 'thumb'
			position: String 		// 'top | right | bottom | left | middle'
		],
		progress: Boolean,		// Mostrar progresso de transicao
		pattern: String 		// DEFAULT | HTML | TEXTO - Caso precise adicionar um overlay o pattern sobre as imagens
	*/
	$('#slideFuture').slideFuture({
		slides: [
			{ image: 'assets/images/1.jpg', caption: '<h3>1</h3>' },
			{ image: 'assets/images/2.jpg', caption: '<h3>2</h3>' },
			{ image: 'assets/images/3.jpg', caption: '<h3>3</h3>' },
			{ image: 'assets/images/4.jpg', caption: '<h3>4</h3>' },
			{ image: 'assets/images/5.jpg', caption: '<h3>5</h3>' }
		]
	},function(callback){
		console.log(callback); // TOUCH | CLICK | INIT
	});
});