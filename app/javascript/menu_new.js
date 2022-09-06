document.addEventListener('DOMContentLoaded', function(){
  if ( document.getElementById('training_image')){
  const ImageList = document.getElementById('image-list');

    // 選択した画像を表示する関数
    const createImageHTML = (blob) => {
      // 画像を表示するためのdiv要素を生成
     const imageElement = document.createElement('div');
     imageElement.id = "currentThumb"
     // 表示する画像を生成
     const blobImage = document.createElement('img');
     blobImage.setAttribute('src', blob);
     // 生成したHTMLの要素をブラウザに表示させる
     imageElement.appendChild(blobImage);
     ImageList.appendChild(imageElement);
   };


  document.getElementById('training_image').addEventListener('change', function(e){
    // 画像が表示されている場合のみ、すでに存在している画像を削除する
    const imageContent = document.querySelector('#currentThumb');
  if (imageContent){
  imageContent.remove();
  }
    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

    createImageHTML(blob);

  });
 } 
});


$('.preview-uploader').on('change', function (e) {
  var reader = new FileReader();
  reader.onload = function (e) {
      $("#preview").attr('src', e.target.result);
  }
  reader.readAsDataURL(e.target.files[0]);
}); 