

$(function (){
  $("#tes").one("click",function(){
    const size = $('.individual').length;
    if( ( size % 2 ) === 0 ){
      $(".pagebreak:odd").removeClass();
    }else{
      $(".pagebreak:even").removeClass();
    }
  });
});