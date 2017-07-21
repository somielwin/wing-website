//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
	var ClassName = get_biggest($('.classname'));
	$('.classname').css({minHeight: ClassName});


}


function initCustomForm() {
    $('select.custom-select').each(function() {
        $(this).wrap('<div class="custom-select-wrapper" />');
        $(this).before('<div class="custom-select-display" />');
        $(this).change(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).keyup(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).change();
    });
}

$(window).resize(function() {
	resize();
	//doCoverImage();
});

$(document).ready(function() {
	initCustomForm();

	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	// Subnav
	var timer;

	// Hamburger
	$('.header-hamburger a, .hv-close').click(function(e){
		e.preventDefault();
		$(this).parent('.header-hamburger').toggleClass('active');
		$('header').toggleClass('is-blue');
		$('.hamburger-nav').toggleClass('revealed');

		$('#menu-main-menuen li').each(function(index){
	        var _this = $(this);
	        setTimeout(function(){
	            _this.addClass('is-open');
	        }, 100 + (index * 100));

	    });
	});

	// Select Language

	$('.switch-language .js-mobile-custom-dropdown li a').click(function(){
		var sitem = $(this).text(),
            $this = $(this),
            $targetDiv = $($(this).attr('href'));

        $('.switch-language .js-mobile-custom-dropdown ul li').removeClass('selected');
	    $(this).parent().addClass('selected');
	    $(this).closest('ul').siblings('span.selected').html(sitem);
	    $(this).closest('ul').slideUp(150);
	    $(this).children('ul').stop(true, false).slideToggle(150);

    });

    $('.switch-language .js-mobile-custom-dropdown').click(function() {
        $(this).children('ul').stop(true, false).slideToggle(150);
    });

    // Select Language

	$('.sec-other-options .js-mobile-custom-dropdown li a').click(function(){
		var sitem = $(this).text(),
            $this = $(this),
            $targetDiv = $($(this).attr('href'));

        $('.switch-language .js-mobile-custom-dropdown ul li').removeClass('selected');
	    $(this).parent().addClass('selected');
	    $(this).closest('ul').siblings('span.selected').html(sitem);
	    $(this).closest('ul').slideUp(150);
	    $(this).children('ul').stop(true, false).slideToggle(150);
	    return true;
    });

	// MouseLeave Custom Dropdown
    $(document).on({
	    mouseenter: function(){
	    	clearTimeout(timer);
	        $('.js-custom-dropdown-menu', this).slideDown(150);

	    },
	    mouseleave: function(){
	        timer = setTimeout(function(){
	        	$('.js-custom-dropdown-menu').slideUp(150);
	        }, 1500);
	    }
	}, '.js-custom-dropdown-menu');

    $('.sec-other-options .js-mobile-custom-dropdown').click(function() {
        $(this).children('ul').stop(true, false).slideToggle(150);
    });

	$('.main-menu nav > ul > li.has-sub > a').hover(function(e){
		e.preventDefault();
		$('.main-menu nav > ul > li').removeClass('active');
		$(this).parent('li').addClass('active')
		clearTimeout(timer);
		$('.subnav-wrapper').addClass('is-open');

	});

	$('.cross-close').click(function(e){
		e.preventDefault();
		$('.main-menu nav > ul > li').removeClass('active');
		clearTimeout(timer);
		$('.subnav-wrapper').removeClass('is-open');

	});

	$(document).on({
	    mouseenter: function(){
	        $('.subnav-wrapper').addClass('is-open');
			clearTimeout(timer);
			console.log('test');
	    },
	    mouseleave: function(){
	        timer = setTimeout(function(){
	        	$('.main-menu nav > ul > li').removeClass('active');
	            $('.subnav-wrapper').removeClass('is-open');
	        }, 200);
	    }
	}, '.subnav-wrapper, .main-menu nav > ul > li.active');

	// Footer Menu Mobile
	$('.fm-title').click(function(){

		if($(window).width() < 768) {
			$(this).toggleClass('active');
			$(this).siblings('ul').slideToggle(300);
		}
	});


	$('.hv-wrap-mobile ul').each(function() {
		var parentMenu = $(this);
		$('> li.has-sub > a', this).removeAttr('href');

		$('> li.has-sub > a', this).click(function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('> li.has-sub ul', parentMenu).slideUp();
			} else {
				$('> li.has-sub ul', parentMenu).slideUp();
				$('> li.has-sub > a', parentMenu).removeClass('active');
				$(this).addClass('active');
				$(this).next().slideDown();
			}
		});
	});

	$('.faq-click').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.faq-content').slideToggle(300);
	});

	$('.wf-item h5').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.textwidget').slideToggle(300);

	});

});

$(window).load(function() {
	resize();

	// preloader once done
	Pace.on('done', function() {
		// totally hide the preloader especially for IE
		setTimeout(function() {
			$('.pace-inactive').hide();
			$('header').addClass('is-animated');
			$('.flexslider').flexslider({
				animation: "slide",
				slideshowSpeed: 5000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    			animationSpeed: 400,
				slideshow : true,
				directionNav : false,
				start: function(slider){
					//doCoverImage();
					$('.home-slider').addClass('is-animated');
					$('.home-latest').addClass('is-animated');


					var test = $(slider).find('.flex-active-slide').find('.home-slide-item img').height();

					$(slider).find('li').each(function(){

						var imgH = $(this).find('.home-slide-item img:visible').height();
						$(this).find('.table-wrap').css({'height' : imgH});
					});

					setTimeout(function(){
						$('.home-slide-item').addClass('is-animated');

						$(slider).find("img[data-src]").each(function () {
				          var src = $(this).attr("data-src");
				          $(this).attr("src", src).removeAttr("data-src");
				       });
					}, 300);
				},

				after: function(slider) {
				    /* auto-restart player if paused after action */
				    if (!slider.playing) {
				      slider.play();
				    }

				    $(slider).find('li').each(function(){

						var imgH = $(this).find('.home-slide-item img:visible').height();
						$(this).find('.table-wrap').css({'height' : imgH});
					});

				}
			});

		}, 500);
	});

	setTimeout(function(){
		$('body').css({'background' : '#ffffff'});
		$('.sec-pad').addClass('is-animated');
		$('.sec-menu-wrap').addClass('is-animated');
		$('#main-wrapper .login-wrap').addClass('is-animated');
	}, 2000);
});

function doCoverImage() {

	$('.coverimage img').each(function() {
		coverImage( $(this) );
	});
}


function coverImage( image ) {

	var imgObj = image;
	var iW = imgObj.attr('width');//width(); //width of image ratio
	var iH = imgObj.attr('height');//.height(); //height of image ratio

	imgObj.width(0).height(0);

	var imgContainer = image.parent();
	var cW = imgContainer.width(); //width of container or browser
	var cH = imgContainer.height(); //height of container or browser

	//console.log(iW,iH,cW,cH);

	if ( cH > 1 ) {
		var cP = cW/cH; //ratio of container or browser
		var iP = iW/iH; //ratio of image

		if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
			iH = cH; //set image height from container height
			iW = cH * iP; //set image width using container height and image ratio
			imgObj.css({
				'margin-top': 0,
				'margin-left': Math.ceil((cW-iW)/2),
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		} else { //if image ratio is less than container ratio (if image height is more than container height)
			iW = cW; //set image width from container width
			iH = cW / iP; //set image height from container width and ratio
			imgObj.css({
				'margin-top': Math.ceil((cH-iH)/2),
				'margin-left': 0,
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		}
	} else {
		imgObj.css({
			'margin-top': 0,
			'margin-left': 0,
			'width': 'auto',
			'height': 'auto'
		});
	}
}

// SMOOTH SCROLL
function smoothScroll() {
    var scrollTime = 0.7;
    var scrollDistance = 150;

    $(window).on("mousewheel DOMMouseScroll", function(event) {
        event.preventDefault();
        if (isScrollingAllowed) {

            // var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var delta = ( Math.abs(event.originalEvent.wheelDelta) < 120 ? event.originalEvent.wheelDelta / 6 : event.originalEvent.wheelDelta / 120 ) || -event.originalEvent.detail;
            var scrollTop = win.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to(win, scrollTime, {
                scrollTo: { y: finalScroll, autoKill: true },
                ease: Power1.easeOut,
                autoKill: true,
                overwrite: 5
            });
        }
    });

}

//Video
function showPlay() {
		var video = document.getElementById("video");
		event.preventDefault();
		video.setAttribute("controls","controls");
		video.play();
		$(".box-video .play").hide();
}

//Facebook Page Like Plugin
$(document).ready(function()
{
  $('.show-hide').click(function() {
    if($(this).css("margin-left") == "256px")
    {
        $('.fb-frame').animate({"margin-left": '-=256'});
        $('.show-hide').animate({"margin-left": '-=256'});
    }
    else
    {
        $('.fb-frame').animate({"margin-left": '+=256'});
        $('.show-hide').animate({"margin-left": '+=256'});
    }
  });
 });
