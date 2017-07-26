
$(document).ready(function() {
	setupYTAPI();

	$(document).on('click', '.close-video', function(e){
        e.preventDefault();
        player.pauseVideo(2);
        console.log('test');
        $('.popup-wrap').removeClass('active');
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
				animation: "fade",
				slideshowSpeed: 5000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    			animationSpeed: 400, 
				slideshow : false,
				directionNav : false,
				start: function(slider){
					//doCoverImage();
					$('.home-slider').addClass('is-animated');
					$('.home-latest').addClass('is-animated');

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

					var currentSlide = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")");
					var videoUrl = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")").attr('data-html-video');
					var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none" loop>' +
						'<source src="videos/'+videoUrl+'" type="video/mp4">' +
						//'<source src="videos/'+videoUrl+'.webm" type="video/webm">' +
						'</video>';

					console.log(videoUrl);

					if(typeof videoUrl != 'undefined') {
						currentSlide.find('.video-holder').html(videoElem);
						currentSlide.find('.video-holder video')[0].play();
					}
					adjustHeight();

					if($('html').hasClass('mobile') || $('html').hasClass('tablet') ) {
						$('.video-holder').remove();
					}
				},

				after: function(slider) {
				    
				    $(slider).find('li').each(function(){
						
						var imgH = $(this).find('.home-slide-item img:visible').height();
						$(this).find('.table-wrap').css({'height' : imgH});
					});

					$('.video-holder video').each(function(){
						$(this)[0].pause();
					}); 

					var currentSlide = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")");
					var videoUrl = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")").attr('data-html-video');
					var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none" loop>' +
						'<source src="videos/'+videoUrl+'" type="video/mp4">' +
						//'<source src="videos/'+videoUrl+'.webm" type="video/webm">' +
						'</video>';

					if(typeof videoUrl != 'undefined') {
				
						if(currentSlide.find('.video-holder').children('*').size() > 0) {
							currentSlide.find('.video-holder video')[0].play();
						} else {
							currentSlide.find('.video-holder').html(videoElem);
						}
					}

					if($('html').hasClass('mobile') || $('html').hasClass('tablet') ) {
						$('.video-holder').remove();
					}

					adjustHeight();

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

$(window).on("load resize",function(e){
	adjustHeight();
});

function adjustHeight() {
	var wH = window.innerHeight ? window.innerHeight : $(window).height()
	
	var cW = $(".video-holder").width(); //width of container or browser
	var cH = $(".video-holder").height(); //height of container or browser
	var vW = 16; //width of video ratio
	var vH = 9; //height of video ratio
	var cP = cW/cH; //ratio of container or browser
	var vP = vW/vH; //ratio of video

	if ( $("html").hasClass("mobile") || $("html").hasClass("tablet") ) {
		// for mobile or tablets, the controls should be visible
		// so we set the video to the exact size of the container
		$("video").width(cW);
		$("video").height(cH);
		$("video").attr('width', cW);
		$("video").attr('height', cH);
	} else {
		
		if ( vP > cP ) {
			//if video ratio is more than container ratio
			//meaning if video width is more than container width
			vH = cH; //set video height from container height
			vW = cH * vP; //set video width using container height and video ratio
			$("video").css({
				"margin-top": 0,
				"margin-left": (cW-vW)/2
			}); //center the video
		} else {
			//if video ratio is less than container ratio
			//meaning if video height is more than container height
			vW = cW; //set video width from container width
			vH = cW / vP; //set video height from container width and ratio
			$("video").css({
				"margin-top": (cH-vH)/2,
				"margin-left": 0
			}); //center the video
		}
		$("video").width(vW); //set the computed width to video/iframe element
		$("video").height(vH); //set the computed height to the video/iframe element
		$("video").attr('width', cW);
		$("video").attr('height', cH);
		
	}
	
}



function setupYTAPI() {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
        
var player;
var playerVideo = "unloaded";

function onYouTubeIframeAPIReady() {
    playerVideo = "ready";
    //$(".home-slide-thumb li").each(function(index) {
    $(document).on('click', '.play-btn', function(e) {
        e.preventDefault();
        var _thisbtn = $(this);
        var videoId = $(this).attr('data-videoid');

        if ( $(_thisbtn).hasClass("isPlaying") ) {
            
        	if($(_thisbtn).hasClass('pause')) {
                $('.popup-wrap').addClass('active');
        		player.playVideo();
                scrollTo();
                
        	} 
        } else {
        	stopVideo();
        	$('.popup-wrap').addClass('active');
            //$('.gallery-video-list ul li a.isPlaying').removeClass('isPlaying').removeClass('pause');
        	$(_thisbtn).addClass("isPlaying").addClass('pause');
        	$('.video-youtube').addClass('z-index').append("<div id='player'></div>");
            $(_thisbtn).closest('li').addClass('active');
            player = new YT.Player('player', {
                height: $(".video-youtube").height(),
                width: $(".video-youtube").width(),
                playerVars: { 'controls':0, 'showinfo':0, 'cc_load_policy':0, 'rel':0, 'autoplay':1},
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            scrollTo();
        }
    });
	//});
}

function onPlayerReady(event) {
}

function scrollTo() {
    var body = $("html, body");
    var offset = $('.popup-wrap').offset();
    var offsetTop = offset.top;
    body.stop().animate({scrollTop: offsetTop}, 500, 'swing');
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playerVideo = "complete";
        stopVideo();
    }

    if(event.data == YT.PlayerState.PLAYING ) {
    	
    }
}

function stopVideo() {
    if (player) {
		player = null;
		$("#player").attr("src","");
		$("#player").remove();
		$('.popup-wrap').removeClass('active');
		$(".play-video.isPlaying").removeClass("isPlaying").removeClass('pause');
        $('.video-youtube').html('');
    }
}


