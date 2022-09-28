$(function () {
  // クリックしたときのモダール処理

  $(".filter_butten").on('click', function(){
    // $(this).addClass("testaaa");
    $(".modalArea").fadeIn();
    


  $('.closeModal').on('click', function(){
      // $(".filter_butten").removeClass("testaaa");
    $('.modalArea').fadeOut();
    });
  });

  // サイドメニューのホバー処理
  $(".filter_butten").hover(
    function() {
        //マウスカーソルが重なった時の処理
        $(this).css('background-color', "#C0C0C0");
    },
    function() {
        //マウスカーソルが離れた時の処理
        $(this).css('background-color', '');
  });
});



