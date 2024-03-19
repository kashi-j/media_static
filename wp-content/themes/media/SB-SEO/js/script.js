$(function(){

  $('.setting_area input[type="text"]').on('keyup',function(){
    var text = $(this).val();
    var len = text.length;
    var desc = $(this).parent().find('.desc span');
    desc.empty().text(len);
  });
  
  $('.setting_area textarea').on('keyup',function(){
    var text = $(this).val();
    var len = text.length;
    var desc = $(this).parent().find('.desc span');
    desc.empty().text(len);
  });

  $('.tab_select li').on('click',function(){
    if($(this).hasClass('current')){}
    else{
      $('.tab_select li, .page_setting .setting_area').removeClass('current');
      $(this).addClass('current');
      var eq = $(this).index();
      $('.page_setting .setting_area').eq(eq).addClass('current');
    }
  });

});