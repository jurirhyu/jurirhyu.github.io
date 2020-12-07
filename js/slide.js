function slide() {

  var section = $('article');
  var page = localStorage.page;
  section.eq(page).addClass('active');

  
  function toggleAccordion() {
    $('.sub').hide();
    section.removeClass('active');
    $(this).addClass('active');
    $(this).find('.sub').show();
  }
  section.on('click', toggleAccordion);

     
 


};
export default slide;          