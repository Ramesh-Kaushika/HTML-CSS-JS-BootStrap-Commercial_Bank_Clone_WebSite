$(document).ready(function() {


    $('a.default-link').on('click', function(e) {
      e.stopPropagation();
    });

    // tooltip ----------------------------------------------------------------------------
  
    // set position of tooltip based on the window's size
    if($('[data-toggle="tooltip"]').length) {

      var position = 'right';
      if($(window).width() <= 768) {
        position = 'bottom';
      }

      // init bootstrap tooltip
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'click',
        placement: position
      });

      // prevent click event
      $('[data-toggle="tooltip"]').on('click', function(e) {
        e.preventDefault();
      });

      // hide tooltip on click
      $('body').on('click', '.tooltip', function(e) {
        $(this).tooltip('hide');
      });

    }

    // back to top mobile --------------------------------------------------------------------
    $('#totop').on('click', function(e) {
      e.preventDefault();

      $('body,html').animate({scrollTop:0},600);
    });

    // mod_flip ------------------------------------------------------------------------------

    if($('.mod_flip').length && $(window).width() <= 992) {
      $('.mod_flip .row').addClass('owl-carousel').owlCarousel({
        items: 1,
        singleItem: true,
        loop: false,
        nav: false,
        dots: true,
        smartSpeed: 600,
        autoWidth: true,
        center: true,
        stagePadding: 20,
        margin: 5
      });
    }

    // mod_offer -----------------------------------------------------------------------------

    if($('.mod_offer').length) {
      $('.offers a').on('click', function(e) {
        e.preventDefault();

        $('.mod_offer').addClass('show');
        $('body').addClass('overlaypop');
      });

      $('.mod_offer .closecta').on('click', function(e) {
        e.preventDefault();

        $('.mod_offer').removeClass('show');
        $('body').removeClass('overlaypop');
      });

      $(document).on('click', function(e) {
        
        
        if($('body').hasClass('overlaypop') && $(e.target).parents('.mod_offer, .offers').length === 0) {
      e.preventDefault();
          $('.mod_offer').removeClass('show');
          $('body').removeClass('overlaypop');
        }
      });
    }

    // mod_slider ----------------------------------------------------------------------------

    if($('.mod_slider').length) {
      $('.mod_slider').addClass('owl-carousel').owlCarousel({
        items: 1,
        singleItem: true,
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 600,
        autoplay: true,
        autoplayTimeout: 4500
      });
    }

    // header --------------------------------------------------------------------------------
    $(window).scroll(function(){
      if($(window).scrollTop() > 20){
        $('.navbar').addClass('fixed-top');
        $('#topbg, #topnav, #logofbd').addClass('fixed');
      } else {
        $('.navbar').removeClass('fixed-top');
        $('#topbg, #topnav, #logofbd').removeClass('fixed');
      } 
    }); 

    // mod_switch ----------------------------------------------------------------------------

    if($('.mod_switch').length) {
      $('.switcher a').on('click', function(e) {
        e.preventDefault();

        $(this).parent().find('a').removeClass('active');
        $(this).parent().next().find('.wrap').removeClass('active');
        $(this).addClass('active');
        $(this).parent().next().find('.wrap').eq($(this).index()).addClass('active');
      });
    }


    // submenus ------------------------------------------------------------------------------

    // NO TOUCH : DESKTOP
    if($('.no-touchevents').length && $(window).width() > 992) {

      // MOUSEOVER on items first level
      $('.navbar .nav-item').mouseover(function() {
        if($(this).find('.dropdown-menu').length) {
          $('.navbar .nav-item').not($(this)).removeClass('show');
          $(this).addClass('show');
          $('.navbar').addClass('drop');
          $('html,body').addClass('overlay');
        } else {
          $('.navbar .nav-item').removeClass('show');
          $('.navbar').removeClass('drop');
          $('html,body').removeClass('overlay');
        }
      });

      // MOUSEOVER on main footer : hide dropdown
      $('#main, footer').mouseover(function() {
        $('.navbar .nav-item').removeClass('show');
        $('.navbar').removeClass('drop');
        $('html,body').removeClass('overlay');
      });

      // MOUSEOVER on items second level
      $('.level2 a').mouseover(function() {
        var $drop = $(this).parents('.dropdown-menu')[0];
        var i = parseInt($(this).parent().index()) - 2;

        $($drop).find('.level3>div, .level2 a').removeClass('active');
        $($drop).find('.level3>div').eq(i).addClass('active');
        $(this).addClass('active');
      });
    } else {
      // MOBILE & TOUCH DEVICES

      $(document).on('click', function(e) {

        if($('body').hasClass('overlay') && $(e.target).parents('header').length == 0) {
          e.preventDefault();
          $('.navbar-collapse').removeClass('show');
          $('#topnav, .navbar, #searchM').removeClass('collapsed showLinks');
          $('html,body').removeClass('overlay');
          $('.navbar').removeClass('drop');
          $('#logofbdmobile').removeClass('hide');

          $('.level3').removeClass('showSubmenu');
          $('.nav-item').removeClass('showMenu');
        }
      });

      if($(window).width() > 992) {
        $('.navbar .nav-item').on('click', function(e) {
          e.preventDefault();

          if($(this).find('.dropdown-menu').length) {
            $('.navbar').addClass('drop');
            $('html,body').addClass('overlay');
          } else {
            $('.navbar .nav-item').removeClass('showMenu showSubmenu');
            $('.navbar').removeClass('drop');
            $('html,body').removeClass('overlay');
          }
        });

        $('.level2 a').on('click', function(e) {
          e.preventDefault();

          var $drop = $(this).parents('.dropdown-menu')[0];
          var i = parseInt($(this).parent().index()) - 2;

          $($drop).find('.level3>div, .level2 a').removeClass('active');
          $($drop).find('.level3>div').eq(i).addClass('active');
          $(this).addClass('active');
        });
      } else {
        $('.level2 a').on('click', function(e) {
          e.preventDefault();

          if($(this).parent().hasClass('back')) {
            $(this).parents('.nav-item').removeClass('showMenu showSubmenu');
            return false;
          } else if($(this).parent().hasClass('current') || $(this).hasClass("direct-link")) {
            window.location = $(this).attr('href');
            return false;
          } else {
            var $drop = $(this).parents('.dropdown-menu')[0];
            var i = parseInt($(this).parent().index()) - 2;

            $($drop).find('.level3>div, .level2 a').removeClass('active');
            $($drop).find('.level3>div').eq(i).addClass('active');
            $(this).parents('.nav-item').addClass('showSubmenu');
            $($drop).find('.level3').addClass('showSubmenu');
            $($drop).find('.level3 .back a span').text($(this).parent().parent().find('.current').text());
            $($drop).find('.level3 .current').text($(this).text());
          }

          $(this).parents('.nav-item').removeClass('showMenu');
        });
      }

      // toggle nav
      $('.navbar .navbar-toggler').on('click', function(e) {
        e.preventDefault();

        $('#topnav, .navbar, #searchM').addClass('collapsed');
        $('#searchM').addClass('hide');
        $('html,body').addClass('overlay');
        $('#close').addClass('show');
        $('#logofbdmobile').addClass('hide');

        setTimeout(function() {
          $('.navbar').addClass('showLinks');

          // fake scrollbar on mobile
          if ($(window).width() <= 992) {

            $(".dropdown-menu .row > .level2 > .wrap > ul").each(function() {
              var ul = $(this);
              var wrapper1 = ul.closest(".dropdown-menu");
              var wrapper2 = ul.closest(".level2");
              var heightDiff = ul.height() - wrapper1.height();
              // only show when height of the inner element is higher than height of the wrapping element
              if (heightDiff > 0) {
                wrapper2.addClass("with-scrollbar");
                if (wrapper2.find(".scrollbar").length == 0) {
                  wrapper2.append('<div class="scrollbar"><div class="slider"></div></div>');
                }
                var slider = wrapper2.find(".scrollbar .slider");
                var sliding = false;
                var slidingStartY = 0;
                var scrollTopY = 0;
                wrapper2.on("touchstart", function(e) { 
                  if (e.changedTouches && e.changedTouches.length) {
                    slidingStartY = e.changedTouches[0].pageY;
                    scrollTopY = wrapper2.scrollTop();
                    sliding = true; 
                  }
                });
                wrapper2.on("touchend", function() { sliding = false; });
                wrapper2.on("touchmove", function(e) {
                  if (sliding && e.changedTouches && e.changedTouches.length) {
                    var diffY = slidingStartY - e.changedTouches[0].pageY;
                    wrapper2.scrollTop(scrollTopY + diffY);
                    var top = wrapper2.scrollTop() / heightDiff * slider.height();
                    slider.css("top", top);
                    wrapper1.toggleClass("bottom", (heightDiff - wrapper2.scrollTop()) < 10);
                    e.preventDefault();
                  }
                });
              }
            });

            $(".dropdown-menu .row > .level3 > div").each(function() {
              var ul = $(this).find("ul");
              var wrapper1 = ul.closest(".dropdown-menu");
              var wrapper2 = ul.closest(".level3");
              var height = 0;
              ul.each(function() { height += $(this).innerHeight() });
              var heightDiff = height - wrapper1.height();
              // only show when height of the inner element is higher than height of the wrapping element
              if (heightDiff > 0) {
                wrapper2.addClass("with-scrollbar");
                if (wrapper2.find(".scrollbar").length == 0) {
                  wrapper2.append('<div class="scrollbar"><div class="slider"></div></div>');
                }
                var scrollbar = wrapper2.find(".scrollbar");
                var slider = wrapper2.find(".scrollbar .slider");
                var sliding = false;
                var slidingStartY = 0;
                var scrollTopY = 0;
                wrapper2.on("touchstart", function(e) { 
                  if (e.changedTouches && e.changedTouches.length) {
                    slidingStartY = e.changedTouches[0].pageY;
                    scrollTopY = wrapper2.scrollTop();
                    sliding = true; 
                  }
                });
                wrapper2.on("touchend", function() { sliding = false; });
                wrapper2.on("touchmove", function(e) {
                  if (sliding && e.changedTouches && e.changedTouches.length) {
                    var diffY = slidingStartY - e.changedTouches[0].pageY;
                    wrapper2.scrollTop(scrollTopY + diffY);
                    var top = wrapper2.scrollTop() / heightDiff * slider.height();
                    slider.css("top", top);
                    scrollbar.css("top", wrapper2.scrollTop() + 10);
                    wrapper1.toggleClass("bottom", (heightDiff - wrapper2.scrollTop()) < 10);
                    e.preventDefault();
                  }
                });
              }
            });


          }

        }, 100);

      });

      $('#topnav a.active').on('click', function(e) {
        e.preventDefault();

        $('.navbar-collapse').removeClass('show');
        $('#topnav, .navbar, #searchM').removeClass('collapsed showLinks');
        $('html,body').removeClass('overlay');

        $('.level3').removeClass('showSubmenu');
        $('.nav-item').removeClass('showMenu');
        $(this).removeClass('show');
      });

      // show submenu
      $('.nav-item>a').on('click', function(e) {
        if($(this).attr('href') == '#') {
          e.preventDefault();

          $('.nav-item').removeClass('showMenu');
          $(this).parent().addClass('showMenu');

          if($(window).width() <= 992) {
            $('.navbar').removeClass('showLinks');
          }
        } else {
          window.location = $(this).attr('href');
        }
      });

      // CLOSE NAV
      $('#close').on('click', function(e) {
        e.preventDefault();

        $('.navbar-collapse').removeClass('show');
        $('#topnav, .navbar, #searchM').removeClass('collapsed showLinks');
        $('html,body').removeClass('overlay');

        $('.level3').removeClass('showSubmenu');
        $('.nav-item').removeClass('showMenu');
        $(this).removeClass('show');
        $('#logofbdmobile').removeClass('hide');
      });

      // Back to first level
      $('.level2 .back a').on('click', function(e) {
        e.preventDefault();

        $(this).parents('.nav-item').removeClass('showMenu');
        $('.navbar').addClass('showLinks');
      });

      // Back to 2nd level
      $('.level3 .back a').on('click', function(e) {
        e.preventDefault();

        $('.level3').removeClass('showSubmenu');
        $(this).parents('.nav-item').addClass('showMenu');
      });
    }

  });  

