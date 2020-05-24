import device from "current-device";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import 'lazysizes';
lazySizes.cfg.init=false;

$(document).ready(function(){
  hoverEvents();
  lazy();
  popups();
  nav();
  checkboxes.init();
})


//lazyload
function lazy() {
  lazySizes.cfg.lazyClass = 'lazy';
  lazySizes.cfg.loadedClass = 'loaded';
  //add lazy backgrounds
  document.addEventListener('lazybeforeunveil', function(e){
    let el = e.target.tagName,
        bg = e.target.getAttribute('data-src');
    if(el!=='IMG') {
      let bg = e.target.getAttribute('data-src');
      e.target.style.backgroundImage = 'url(' + bg + ')';
    }
  });
  //init lazysizes
  lazySizes.init();
}

//hover/touch custom events
function hoverEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a, button, .js-hover-element', function(event) {
    if((event.type=='touchstart' && !device.desktop()) || (event.type=='mouseenter' && device.desktop())) {
      $(this).addClass('hover');
    } else if(event.type=='mousedown' && device.desktop()) {
      $(this).addClass('mousedown');
    } else if(event.type=='mouseup' && device.desktop()) {
      $(this).removeClass('mousedown');
    } else {
      $(this).removeClass('hover');
      $(this).removeClass('mousedown');
    }
  })
}

//popups
function popups() {
  let $open = $('.js-popup-open'),
      $close = $('.js-popup-close');

  $open.on('click', function(event) {
    event.preventDefault();
    disablePageScroll();
    let href = $(this).attr('href'),
        $popup = $(href);
    if($popup.length>0) {
      $popup.addClass('active');
    }
  })
  $(document).on('click touchstart', function(event) {
    if(event.type=='click') {
      event.preventDefault();
    }
    if(
        ($(event.target).closest($close).length>0 && event.type=='click' ) || 
        ($(event.target).is('.popup') && $(event.target).closest('.popup-block').length==0)
    ) {
      let $popup = $(event.target).closest('.popup');
      enablePageScroll();
      $popup.removeClass('active');
    }
  })
  
}

function nav() {
  let $nav = $('.header-nav'),
      $toggle = $('.nav-toggle'),
      $overlay = $('.overlay'),
      state = false;

  $toggle.on('click', function() {
    if(!state) {
      open();
    } else {
      close();
    }
  })

  function open() {
    state = true;
    $nav.addClass('active');
    $nav.slideDown(250);
    $toggle.addClass('active');
  }
  function close() {
    state = false;
    $nav.removeClass('active');
    $nav.slideUp(250);
    $toggle.removeClass('active');
  }

  $(window).on('resize', function() {
    if($(this).width()>1044 && state) {
      close();
    }
  })
}