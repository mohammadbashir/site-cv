$(document).ready(function(){

  // MODAL
  var modalText = {
    lau: {
      title: 'Computer Science Graduate',
      tag: 'LEBANESE AMERICAN UNIVERSITY.',
      detail: 'Studied the computer science major in the Lebanese American University of Beirut. Graduated with the class of 2015.',
      link: 'http://www.lau.edu.lb'
    },
    murex: {
      title: 'Software Developer',
      tag: 'MUREX SYSTEMS.',
      detail: 'Currently working as a software developer in Murex Systems. Main role is developing, updating, and maintaining the MX Customer Relationship Management system.',
      link: 'http://www.murex.com'
    },
    pega: {
      title: 'Certified System Architect',
      tag: 'PEGASYSTEMS.',
      detail: 'Officially aquired the Pega System Architect ceritification as of 2018. Senior System Architect certification is underway and expected in 2019',
      link: 'http://www.pega.com'
    },
    everteam: {
      title: 'iOS Developer',
      tag: 'EVERTEAM.',
      detail: 'iOS developer responsible for developing, updating, and maintaining multiple iOS enterprise applications. Mainly targetting the iPad.',
      link: 'http://www.everteam.com/en/'
    },
    freelance: {
      title: 'Senior iOS Freelancer',
      tag: 'MOBILE DEVELOPMENT.',
      detail: 'Developed the habit of freelancing in my spare time. The result was building and maintaining multiple apps on store and enterprise, with an excellent record of customer satisfaction.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
