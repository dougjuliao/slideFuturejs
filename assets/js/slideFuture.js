(function( $ ) {
  $.fn.slideFuture = function(conf,callback) {
    	/*
		@Autor  : Douglas Julião
		@github : https://github.com/dougjuliao
    	*/
    	const _THIS = this;

        /*
            Effects animate css
            bounce     | bounceIn       | fadeIn         | fadeOutDown     | flipOutX          | rotateOutDownLeft  | zoomInLeft   | slideInRight
            flash      | bounceInDown   | fadeInDown     | fadeOutDownBig  | flipOutY          | rotateOutDownRight | zoomInRight  | slideInUp
            pulse      | bounceInLeft   | fadeInDownBig  | fadeOutLeft     | lightSpeedIn      | rotateOutUpLeft    | zoomInUp     | slideOutDown
            rubberBand | bounceInRight  | fadeInLeft     | fadeOutLeftBig  | lightSpeedOut     | rotateOutUpRight   | zoomOut      | slideOutLeft
            shake      | bounceInUp     | fadeInLeftBig  | fadeOutRight    | rotateIn          | hinge              | zoomOutDown  | slideOutRight
            headShake  | bounceOut      | fadeInRight    | fadeOutRightBig | rotateInDownLeft  | jackInTheBox       | zoomOutLeft  | slideOutUp
            swing      | bounceOutDown  | fadeInRightBig | fadeOutUp       | rotateInDownRight | rollIn             | zoomOutRight |
            tada       | bounceOutLeft  | fadeInUp       | fadeOutUpBig    | rotateInUpLeft    | rollOut            | zoomOutUp    |
            wobble     | bounceOutRight | fadeInUpBig    | flipInX         | rotateInUpRight   | zoomIn             | slideInDown  |
            jello      | bounceOutUp    | fadeOut        | flipInY         | rotateOut         | zoomInDown         | slideInLeft  |
        */
        const effectIn  = 'fadeInDown';
        const effectOut = 'fadeOutDown';

    	const ElementsToHTML = {  // ADICIONAR ELEMENTOS AO HTML
    		addFutureClass: () => {
    			_THIS.addClass('future-class');
    		},
    		addImages: (slides) => {
    			let html = '',
                    nav = '',
                    prevNext = '';

	    		for(let i = 0; i < slides.length; i++){
	    			html += `
	    				<div class="future-container-img">
	    					<img class="future-img animated ${i == 0 ? 'future-active '+effectIn : ''}" data-img="image-${i}" data-id="${i}" src="${slides[i].image}" alt="future image ${i}">
	    				</div>
	    				`;

                    nav += `<li data-img="image-${i}" data-id="${i}" class="future-nav-li ${i == 0 ? 'future-active' : ''}"><span></span></li>`;
	    		}
                prevNext = `
                    <div class="future-prev">➾</div>
                    <div class="future-next">➾</div>
                `;
	    		_THIS.html(`${html}
                    <nav>
                        <ul class="future-navigation future-nav-top">
                            ${nav}
                        </ul>
                    </nav>
                    ${prevNext}
                    `);
    		}
    	};
        let imagesIni = $('.future-container-img .future-img');
        let prevSlide    =  imagesIni[imagesIni.length];
            currentSlide =  imagesIni[0];
            nextSlide    =  imagesIni[1];

        const SlideFuture = {
            recursiveAnimate: (images,count) => { // GERA ANIMACAO DEFAULT RECURSIVA
                $('.future-navigation li, .future-container-img img').removeClass('future-active '+effectIn+' '+effectOut);
                $('[data-img="image-'+count+'"]').addClass('future-active '+effectIn);

                prevSlide    =  images[(count > 0 ? count - 1 : images.length - 1)];
                currentSlide =  images[count];
                nextSlide    =  images[(count == images.length-1 ? 0 : count + 1)];

                const recallCount = () =>{
                    count = count < images.length - 1 ? count + 1 : 0;
                    SlideFuture.recursiveAnimate(images,count);
                };
                $(images[count])/*.css({ opacity: 1 })*/.animate({ opacity: 1 },{ duration: 3000, easing: "linear", complete:function(){
                    $('.future-navigation li, .future-container-img img').removeClass('future-active '+effectIn+' '+effectOut);
                    $('[data-img="image-'+count+'"]').addClass(effectOut);
                }})
                .delay(800)
                .animate({ opacity: 0 },{ duration: 100, easing: "linear", complete: function(){
                    recallCount();
                }});

            },
            eventClickNav: (event,images,id) => {
                event.preventDefault();
                images.finish().clearQueue();
                SlideFuture.recursiveAnimate(images,Number(id));
            },
            eventNavigation: (images,navLis) => {
                $.each(navLis,function(i,el){
                    $(el).on('click',function(e){
                        SlideFuture.eventClickNav(e,images,$(this).attr('data-id'));
                    });
                });
            },
            prevNext: (images,prev,next) => {
                prev.on('click',function(e){
                    SlideFuture.eventClickNav(e,images,$(prevSlide).attr('data-id'));
                });
                next.on('click',function(e){
                    SlideFuture.eventClickNav(e,images,$(nextSlide).attr('data-id'));
                });
            }
        };

        //ADD ELEMENTS TO HTML
    	ElementsToHTML.addFutureClass();
    	ElementsToHTML.addImages(conf.slides);

        //VAR ELEMENTS
        const images = $('.future-container-img .future-img');
        const navLis = $('.future-navigation li');
        const prev = $('.future-prev');
        const next = $('.future-next');

        //SLIDEFUTURE OPTIONS
        SlideFuture.recursiveAnimate(images,0);
        SlideFuture.eventNavigation(images,navLis);
        SlideFuture.prevNext(images,prev,next);
  };
})( jQuery );