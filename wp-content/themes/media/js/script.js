$(function(){

  // 縮小ヘッダー
  var headerH = $(".header").outerHeight(true);//headerの高さを取得

  // 画面をスクロール
  $(window).scroll(function () {
    var $window = $(this).width();
    var bp = 1025;

    if($window > bp){
      FixedAnime(headerH);
    }
  });

  // ページが読み込み
  $(window).on('load', function () {
    var $window = $(this).width();
    var bp = 1279;
    if($window > bp){
      FixedAnime(headerH);
    }
  });

  // アコーディオン
  $('.js-accordion').click(function(){
    $(this).parent().next('.accordion__inner').slideToggle();
    $(this).parent().toggleClass("is-show");
  });

  // ドロップダウンメニュ-
  let isOpened;
  $('.js-dropDown').hover(function(){
    // ホバーイベント
    // $('.header .menu_bg').addClass('active');
    $('.header .global_navi').addClass('is-opened');
  },function(){
    // ホバーが外れた際のイベント
    // $('.header .menu_bg').removeClass('active');
    $('.header .global_navi').removeClass('is-opened');
  });

  // スクロール時の追従
  $(window).on('load resize', function() {
    var windowWidth = window.innerWidth;
    var elements = $('aside .tag_area_contents');
    if (windowWidth >= 1025) {
      Stickyfill.add(elements);
    }else{
      Stickyfill.remove(elements);
    }
  });

  //スムーススクロール
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    var header = $('.fix-header').outerHeight();
    $("html, body").animate({scrollTop:position - header}, speed, "swing");
    return false;
  });

  //スマホメニュー
  $('.menubtn').on('click',function(){
    $('.sp-menu .menubtn').toggleClass('close');
    $('.sp-menu .SPmenu').toggleClass('opened');
  });

});

//pagetopのフェードイン・アウト
$(window).scroll(function(){
  var sc = $(window).scrollTop();
  if(sc >= 400){
    $('.pagetop').addClass('active');
  }else{
    $('.pagetop').removeClass('active');
  }
});

//アニメーション関数
function scroll(e,num){
  var sc = $(window).scrollTop();
  var tag = $(e).offset().top;
  if(sc >= tag + num){
    $(e).addClass('anime');
  }
}


function title_id(cls,num){
  $(window).on('load',function(){

    var n = num;
    if(num > 5){var title6 = cls + ' h6';}
    if(num > 4){var title5 = cls + ' h5';}
    if(num > 3){var title4 = cls + ' h4';}
    if(num > 2){var title3 = cls + ' h3';}
    var title2 = cls + ' h2';

    var i =1;
		$(title2 + ' , ' + title3 + ' , ' + title4 + ' , ' + title5 + ' , ' + title6).each(function() {
	    $(this).attr('id','id' + i);
			i++;
	  });

  });
}

//スクロール途中からヘッダーの高さを変化させるための設定を関数
function FixedAnime(headerH) {
  //ヘッダーの高さを取得
  var scroll = $(window).scrollTop();
  if (scroll >= headerH){
    $('.header').addClass('isMinimized');
  }else{
    $('.header').removeClass('isMinimized');
  }
}