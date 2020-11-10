$(function() {

  var section = $('article');

function toggleAccordion() {
  $('.sub').hide();
  section.removeClass('active');
  $(this).addClass('active');
  $(this).find('.sub').show();
}

section.on('click', toggleAccordion);



      
  $(".slide").slick({
       breakpoint: 400,
      arrows:false,
      dots: true,
      infinite: true,
      slidesToShow: 3,
      edgeFriction:10,
      slidesToScroll: 1
   
  });
  


});