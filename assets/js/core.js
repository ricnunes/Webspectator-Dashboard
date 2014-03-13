$(document).ready(function() {		
	calculateHeight();
	$(".remove-widget").click(function() {		
		$(this).parent().parent().parent().addClass('animated fadeOut');
		$(this).parent().parent().parent().attr('id', 'id_a');

		//$(this).parent().parent().parent().hide();
		 setTimeout( function(){			
			$('#id_a').remove();	
		 },400);	
	return false;
	});
	
	$(".create-folder").click(function() {
		$('.folder-input').show();
		return false;
	});
	
	$(".folder-name").keypress(function (e) {
        if(e.which == 13) {
			 $('.folder-input').hide();
			 $( '<li><a href="#"><div class="status-icon green"></div>'+  $(this).val() +'</a> </li>' ).insertBefore( ".folder-input" );
			 $(this).val('');
		}
    });
	
	$("#menu-collapse").click(function() {	
		if($('.page-sidebar').hasClass('mini')){
			$('.page-sidebar').removeClass('mini');
			$('.page-content').removeClass('condensed-layout');
			$('.footer-widget').show();
		}
		else{
			$('.page-sidebar').addClass('mini');
			$('.page-content').addClass('condensed-layout');
			$('.footer-widget').hide();
			calculateHeight();
		}
	});

	$(".inside").children('input').blur(function(){
		$(this).parent().children('.add-on').removeClass('input-focus');		
	})
	
	$(".inside").children('input').focus(function(){
		$(this).parent().children('.add-on').addClass('input-focus');		
	})	
	
	$(".input-group.transparent").children('input').blur(function(){
		$(this).parent().children('.input-group-addon').removeClass('input-focus');		
	})
	
	$(".input-group.transparent").children('input').focus(function(){
		$(this).parent().children('.input-group-addon').addClass('input-focus');		
	})	
	
	$(".bootstrap-tagsinput input").blur(function(){
		$(this).parent().removeClass('input-focus');
	})
	
	$(".bootstrap-tagsinput input").focus(function(){
		$(this).parent().addClass('input-focus');		
	})	
	
	$('#my-task-list').popover({ 
        html : true, 
        content: function() {
          return $('#notification-list').html();
        }
    });
	
	$('#user-options').click(function(){
		$('#my-task-list').popover('hide')
	})
//*********************************** BEGIN CHAT POPUP*****************************
	 $('.chat-menu-toggle').sidr({
		name:'sidr',
		side: 'right',
		speed: 0,
		onOpen: function(){
			// console.log("ao abrir");
			$('.page-sidebar.mini').css('left', '-165px');
	 		$('.page-sidebar').css('left', '-165px');
	 		$('.ws-header').css('left', '-260px');
	 		$('.header').css('position', 'fixed');
	 		$('.scrollup').css('left', '50px');
		},

		onClose: function(){
			// console.log("ao fechar");
			$('.page-sidebar.mini').removeAttr('style');
	 		$('.page-sidebar').removeAttr('style');
	 		$('.ws-header').removeAttr('style');
	 		$('.scrollup').removeAttr('style');
	 		$('.header').css('position', 'fixed');
	 	}
	});
	$(".simple-chat-popup").click(function(){
		$(this).addClass('hide');
		$('#chat-message-count').addClass('hide');	
	});

	setTimeout( function(){
		$('#chat-message-count').removeClass('hide');	
		$('#chat-message-count').addClass('animated bounceIn');
		$('.simple-chat-popup').removeClass('hide');			
		$('.simple-chat-popup').addClass('animated fadeIn');		
	},5000);	
	setTimeout( function(){
		$('.simple-chat-popup').addClass('hide');			
		$('.simple-chat-popup').removeClass('animated fadeIn');		
		$('.simple-chat-popup').addClass('animated fadeOut');		
	},8000);
	
//*********************************** END CHAT POPUP*****************************	
	
//**********************************BEGIN MAIN MENU********************************
	jQuery('.page-sidebar li > a').on('click', function (e) {
            if ($(this).next().hasClass('sub-menu') == false) {
                return;
	}
     var parent = $(this).parent().parent();


            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('a').children('.arrow').removeClass('active');
            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li').removeClass('open');
          //  parent.children('li').removeClass('active');
			
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("active");
                sub.slideUp(200, function () {
                    handleSidenarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200, function () {
                    handleSidenarAndContentHeight();
                });
            }

            e.preventDefault();
        });
	//Auto close open menus in Condensed menu
		if( $('.page-sidebar').hasClass('mini'))  {			
			var elem = jQuery('.page-sidebar ul');
		    elem.children('li.open').children('a').children('.arrow').removeClass('open');
            elem.children('li.open').children('a').children('.arrow').removeClass('active');
            elem.children('li.open').children('.sub-menu').slideUp(200);
            elem.children('li').removeClass('open');
		}
//**********************************END MAIN MENU********************************
//**** Element Background and height ********************************************

	$('[data-height-adjust="true"]').each(function(){
		var h = $(this).attr('data-elem-height');
		$(this).css("min-height", h);
		$(this).css('background-image', 'url(' + $(this).attr("data-background-image") + ')');
		$(this).css('background-repeat', 'no-repeat');
		if($(this).attr('data-background-image')){		
		
		}	
	})
	function equalHeight(group) {
	   tallest = 0;
	   group.each(function() {
		  thisHeight = $(this).height();
		  if(thisHeight > tallest) {
			 tallest = thisHeight;
		  }
	   });
	   group.height(tallest);
	}

	$('[data-aspect-ratio="true"]').each(function(){
		$(this).height($(this).width());
	})

	$('[data-sync-height="true"]').each(function(){
		equalHeight($(this).children());
	});	

	$( window ).resize(function() {	
		$('[data-aspect-ratio="true"]').each(function(){
			$(this).height($(this).width());
		})
		$('[data-sync-height="true"]').each(function(){
			equalHeight($(this).children());
		});	
	});

//***********************************BEGIN Fixed Menu*****************************
	var eleHeight =window.screen.height;
	eleHeight=eleHeight-(eleHeight*22.5/100);
	if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))  ) {
		$('#main-menu-wrapper').slimScroll({
			color: '#a1b2bd',
			size: '4px',
			height: eleHeight,
			alwaysVisible: false
		});
	}
//***********************************BEGIN Lazyload images*****************************	
 if ($.fn.lazyload){	
	$("img.lazy").lazyload({
		effect : "fadeIn"
	});
}
//***********************************BEGIN Grids*****************************		
		 $('.grid .tools a.remove').on('click', function () {
            var removable = jQuery(this).parents(".grid");
            if (removable.next().hasClass('grid') || removable.prev().hasClass('grid')) {
                jQuery(this).parents(".grid").remove();
            } else {
                jQuery(this).parents(".grid").parent().remove();
            }
        });

        $('.grid .tools a.reload').on('click', function () {
            var el =  jQuery(this).parents(".grid");
            blockUI(el);
			window.setTimeout(function () {
               unblockUI(el);
            }, 1000);
        });
		
		$('.grid .tools .collapse, .grid .tools .expand').on('click', function () {
            var el = jQuery(this).parents(".grid").children(".grid-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                el.slideDown(200);
            }
        });		
		
		$('.user-info .collapse').on('click', function () {
            jQuery(this).parents(".user-info ").slideToggle();
		});   
//***********************************END Grids*****************************				
		var handleSidenarAndContentHeight = function () {
        var content = $('.page-content');
        var sidebar = $('.page-sidebar');

        if (!content.attr("data-height")) {
            content.attr("data-height", content.height());
        }

        if (sidebar.height() > content.height()) {
            content.css("min-height", sidebar.height() + 120);
        } else {
            content.css("min-height", content.attr("data-height"));
        }
    }
	$('.panel-group').on('hidden.bs.collapse', function (e) {
	  $(this).find('.panel-heading').not($(e.target)).addClass('collapsed');
	})
	
	$('.panel-group').on('shown.bs.collapse', function (e) {
	 // $(e.target).prev('.accordion-heading').find('.accordion-toggle').removeClass('collapsed');
	})

//***********************************BEGIN Layout Readjust *****************************		

	$(window).setBreakpoints({
		distinct: true, 
		breakpoints: [
			320,
			480,
			768,
			1024
		] 
	});   	
	//Break point entry 
	$(window).bind('enterBreakpoint320',function() {	
		
		$('#layout-condensed-toggle').hide();	
		
		$('#header_inbox_bar').hide();	
			   
		$('.page-content').removeClass('condensed');
		
		rebuildSider;

		
	});	
	
	$(window).bind('enterBreakpoint480',function() {
		
		$('#layout-condensed-toggle').hide();	
		
	
		
					
		
		//Incase if condensed layout is applied
			   
		$('.page-content').removeClass('condensed');
		$('.page-content').css('margin-left','0px');

		
	});
	
	$(window).bind('enterBreakpoint768',function() {		
		$('#main-menu-toggle-wrapper').show();
		$('#layout-condensed-toggle').hide();	
		$('#portrait-chat-toggler').show();	
		
		$('#header_inbox_bar').hide();	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {			
			$('#main-menu-big').removeClass('hide');	
			$('.page-content').removeClass('condensed');	
			
		}	
		
	});
	$(window).bind('enterBreakpoint1024',function() {
		// console.log('o sergio e fixe')
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {			
			var elem = jQuery('.page-sidebar ul');
		    elem.children('li.open').children('a').children('.arrow').removeClass('open');
            elem.children('li.open').children('a').children('.arrow').removeClass('active');
            elem.children('li.open').children('.sub-menu').slideUp(200);
            elem.children('li').removeClass('open');
          
       	}

       	else {

       		if($('#menu_orders').hasClass('active') ) {
       			console.log('Menu was already active');
       			$('.header').removeAttr('style');
       			$('.page-content').removeAttr('style');
       			$('body').removeAttr('style');
       			$('.page-content').css('margin-left', '340px');
				$('.header').css('padding', '0 0 0 340px');
       			
			}
			else {
       		$('#menu_orders').addClass('active');
			$('#menu_apps').removeClass('active');
			$('#menu_pins').removeClass('active');
			$('#menu_admin').removeClass('active');
			$('#menu_reports').removeClass('active');
			$('.header-seperation').show();
			$('#mobile_header').hide();
			$('#orders').show();
			$('#apps').hide();
			$('#pins').hide();
			$('#admin').hide();
			$('#reports').hide();
			$('#main_orders').show();
			$('#main_applications').hide();
			$('#main_reports').hide();
			$('#main_pins').hide();
			$('#main_admin').hide();
			$('#menu_title').html('orders');
			$('.page-content').css('margin-left', '340px');
			$('.header').css('padding', '0 0 0 340px');
			
		
			}
       	}
	});

		
	// $(window).bind('exitBreakpoint320',function() {	
	// 	$('#main-menu-toggle-wrapper').hide();
	// 	$('#layout-condensed-toggle').show();	
	// 	$('#portrait-chat-toggler').hide();	
	// 	$('#header_inbox_bar').show();

			
	// });	
	
	// $(window).bind('exitBreakpoint480',function() {
	// 	$('#main-menu-toggle-wrapper').hide();
	// 	$('.header-seperation').hide();
	// 	$('.mobile_header').hide();
	// 	$('#layout-condensed-toggle').show();		
	// 	$('#portrait-chat-toggler').hide();	
	// 	$('#header_inbox_bar').show();			
	
	// });
	
	$(window).bind('exitBreakpoint768',function() {
		$('#main-menu-toggle-wrapper').hide();
		$('#layout-condensed-toggle').show();			
		$('#portrait-chat-toggler').hide();	
		$('#header_inbox_bar').show();			

	});

	$(window).bind('exitBreakpoint1024', function() {
		$('#menu_orders').removeClass('active');
        $('orders').hide();
        $('#main_orders').hide();
        $('.header-seperation').hide();
        $('.page-content').css('margin-left','95px');
        $('.header').css('padding', '0 0 0 95px');

	})
//***********************************END Layout Readjust *****************************	

//***********************************BEGIN Function calls *****************************	
	// function closeAndRestSider(){
	//   if($('#main-menu-small').attr('data-inner-menu')=='1'){
	// 	$('#main-menu-big').addClass("hide");	
	// 	$.sidr('close', 'main-menu-big');
	// 	$.sidr('close', 'sidr');		
	// 	$('#main-menu-big').removeClass("sidr");	
	// 	$('#main-menu-big').removeClass("left");	
	//   }
	//   else{
	// 	$.sidr('close', 'main-menu-big');
	// 	$.sidr('close', 'sidr');		
	// 	$('#main-menu-big').removeClass("sidr");	
	// 	$('#main-menu-big').removeClass("left");
	// }
	
	// }
	// function rebuildSider(){
	// 	$('menu_orders').sidr({		
	// 			name : 'main_orders',
	// 			side: 'left'

	// 	});
	// }
//***********************************END Function calls *****************************	

//***********************************BEGIN Main Menu Toggle *****************************	
	$('#layout-condensed-toggle').click(function(){
        $.sidr('close', 'sidr');
        if($('#main-menu-big').attr('data-inner-menu')=='1'){
            //Do nothing
            console.log("Menu is already condensed");
        }
        else{
            if($('#main-menu-big').hasClass('hide')){
				$('body').removeClass('grey');
                $('#main-menu-big').removeClass('hide');
                $('.page-content').removeClass('condensed');
                $('.scrollup').removeClass('to-edge');
                $('.header-seperation').show();
                //Bug fix - In high resolution screen it leaves a white margin
                $('.header-seperation').css('height','61px');
                $('.footer-widget').show();
            }
            else{
                $('body').addClass('grey');
                $('#main-menu-big').addClass('hide');
                $('.page-content').addClass('condensed');
                $('.scrollup').addClass('to-edge');
                $('.header-seperation').hide();
                $('.footer-widget').hide();
            }
        }
	});

	function breakpoint768(show){
		if($('body').hasClass('breakpoint-768')){
			size = 0;
			
			if(show) {
				// $('.dashboard_link').html('<span class="iconset top-tiles"></span>Dashboard');
				// $('.pull-left').css('width', '45%');
				// $('.pull-left h3').css('font-size', '24px');
				// $('.flex-header p').css('font-size', '13px');
				// $('.ws_huge').css('font-size', '2em');

				// $('body').removeAttr('style');
				// $('html').removeAttr('style');
				// $('#main-menu-small').removeAttr('style');
				// $('.ws-header').removeAttr('style');
				// $('.nav-collapse').removeAttr('style');
				// $('.header').removeAttr('style');
				// $('.page-content').removeAttr('style');

				$('.header').removeAttr('style');
				$('.page-content').removeAttr('style');
				$('body').removeAttr('style');
				

			}
			else {

				// $('.dashboard_link').html('<span class="iconset top-tiles"></span>');
				// $('.pull-left').css('width', '45%');
				// $('.pull-left h3').css('font-size', '1em');
				// $('.flex-header p').css('font-size', '0.6em');
				// $('.ws_huge').css('font-size', '1.8em');

				// $('body').css('position', 'absolute');
				// $('body').css('left', '340px');
				// $('html').css('overflow-x', 'hidden');
				// $('#main-menu-small').css('left', '-340px');
				// $('.ws-header').css('left', '0');
				// $('.nav-collapse').css('left', '-245px');
				// $('.header').css('padding', '0');
				// $('.page-content').css('margin-left', '0');
				$('.header').css('position', 'fixed');
				$('.header').css('left', '340px');
				$('.header').css('padding', '0 0 0 0');
				$('.page-content').css('left', '340px');
				$('.page-content').css('margin-left','0px');
				$('body').css('overflow-x', 'hidden');

			}

				
		}
	}

	$('.primary_menu').click(function(){

		var menuSelection = this.getAttribute('data-menuname');
		var size = "340";


		if($(this).hasClass('active')){
			
			$(this).removeClass('active');
			$('.header-seperation').hide();
			$('#mobile_header').hide();
			$('.nav-collapse').hide();			
			$('.page-content').css('margin-left', '95px');

			$('.header').css('padding', '0 0 0 95px');
			breakpoint768(true);
			

		}
		else{
			
			$('.primary_menu').removeClass('active');
			$(this).addClass('active');
			$('.header-seperation').show();
			$('#mobile_header').hide();
			$('#menu_header').show();
			$('#menu_title').html(menuSelection);
			$('.nav-collapse').hide();
			$('#main_' + menuSelection).show();			
			$('.page-content').css('margin-left', '340px');
			
			$('.header').css('padding', '0 0 0 340px');
			breakpoint768(false);
		}
	
});

	
//***********************************END Main Menu Toggle *****************************	
	
//***********************************BEGIN Slimscroller *****************************		
	$('.scroller').each(function () {
        $(this).slimScroll({
                size: '7px',
                color: '#a1b2bd',
                height: $(this).attr("data-height"),
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
        });
    });
//***********************************END Slimscroller *****************************	

//***********************************BEGIN dropdow menu *****************************		
	$('.dropdown-toggle').click(function () {
		$("img").trigger("unveil");
	});
//***********************************END dropdow menu *****************************	

//***********************************BEGIN Global sparkline chart  *****************************	   
	if ($.fn.sparkline) {
		$('.sparklines').sparkline('html', { enableTagOptions: true });
	}
//***********************************END Global sparkline chart  *****************************	

//***********************************BEGIN Function calls *****************************	
	 $('table th .checkall').on('click', function () {
			if($(this).is(':checked')){
				$(this).closest('table').find(':checkbox').attr('checked', true);
				$(this).closest('table').find('tr').addClass('row_selected');
				//$(this).parent().parent().parent().toggleClass('row_selected');	
			}
			else{
				$(this).closest('table').find(':checkbox').attr('checked', false);
				$(this).closest('table').find('tr').removeClass('row_selected');
			}
    });
//***********************************BEGIN Function calls *****************************	

//***********************************BEGIN Function calls *****************************	
	$('.animate-number').each(function(){
		 $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration")));	
	})
	$('.animate-progress-bar').each(function(){
		 $(this).css('width', $(this).attr("data-percentage"));
		
	})
//***********************************BEGIN Function calls *****************************	

//***********************************BEGIN Tiles Controller Options *****************************		
	

	$('.widget-item > .controller .reload').click(function () { 
		var el =$(this).parent().parent();
		blockUI(el);
		  window.setTimeout(function () {
               unblockUI(el);
            }, 1000);
	});
	$('.widget-item > .controller .remove').click(function () {
		$(this).parent().parent().parent().addClass('animated fadeOut');
		$(this).parent().parent().parent().attr('id', 'id_remove_temp_id');
		 setTimeout( function(){			
			$('#id_remove_temp_id').remove();	
		 },400);
	});
	
	$('.tiles .controller .reload').click(function () { 
		var el =$(this).parent().parent().parent();
		blockUI(el);
		  window.setTimeout(function () {
               unblockUI(el);
            }, 1000);
	});
	$('.tiles .controller .remove').click(function () {
		$(this).parent().parent().parent().parent().addClass('animated fadeOut');
		$(this).parent().parent().parent().parent().attr('id', 'id_remove_temp_id');
		 setTimeout( function(){			
			$('#id_remove_temp_id').remove();	
		 },400);
	});
        if (!jQuery().sortable) {
            return;
        }
        $(".sortable").sortable({
            connectWith: '.sortable',
            iframeFix: false,
            items: 'div.grid',
            opacity: 0.8,
            helper: 'original',
            revert: true,
            forceHelperSize: true,
            placeholder: 'sortable-box-placeholder round-all',
            forcePlaceholderSize: true,
            tolerance: 'pointer'
        });
//***********************************BEGIN Function calls *****************************	

//***********************************BEGIN Function calls *****************************	
    function blockUI(el) {		
            $(el).block({
                message: '<div class="loading-animator"></div>',
                css: {
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.3,
                    cursor: 'wait'
                }
            });
     }
	 
     // wrapper function to  un-block element(finish loading)
     function unblockUI(el) {
            $(el).unblock();
    }
	
	$(window).resize(function() {
			calculateHeight();
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 90) {
			$('.top-heading').addClass('scroll-top');
		} else {
			$('.top-heading').removeClass('scroll-top');
		}
		
	});

	// 	$(window).scroll(function() {
	// 	if ($(this).scrollTop() > 3) {
	// 		$('.page-sidebar.mini').css('position', 'fixed');
	// 		$('.page-sidebar').css('position', 'fixed');
	// 		$('.ws-header').css('position', 'fixed');
	// 	} else {
	// 		$('.page-sidebar.mini').css('position', 'absolute');
	// 		$('.page-sidebar').css('position', 'absolute');
	// 		$('.ws-header').css('position', 'absolute');
	// 	}
		
	// });
	
	$(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
//***********************************BEGIN Function calls *****************************		
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 700);
		return false;
    });	
	 $("img").unveil();
	});
	$( window ).resize(function() {
		  $.sidr('close', 'sidr');
	});
	function calculateHeight(){
			var contentHeight=parseInt($('.page-content').height());
			if(911 > contentHeight){	
				console.log("Small");
			}	
	}	