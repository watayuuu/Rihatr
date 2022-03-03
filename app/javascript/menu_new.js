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


document.addEventListener('DOMContentLoaded', function(){
  if ( document.getElementById('training_image1')){
  const ImageList = document.getElementById('image-list1');

    // 選択した画像を表示する関数
    const createImageHTML = (blob) => {
      // 画像を表示するためのdiv要素を生成
     const imageElement = document.createElement('div');
     imageElement.id = "currentThumb1"
     // 表示する画像を生成
     const blobImage = document.createElement('img');
     blobImage.setAttribute('src', blob);
     // 生成したHTMLの要素をブラウザに表示させる
     imageElement.appendChild(blobImage);
     ImageList.appendChild(imageElement);
   };


  document.getElementById('training_image1').addEventListener('change', function(e){
    // 画像が表示されている場合のみ、すでに存在している画像を削除する
    const imageContent = document.querySelector('#currentThumb1');
  if (imageContent){
  imageContent.remove();
  }
    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

    createImageHTML(blob);

  });
 } 
});

document.addEventListener('DOMContentLoaded', function(){
  if ( document.getElementById('training_image2')){
  const ImageList = document.getElementById('image-list2');

    // 選択した画像を表示する関数
    const createImageHTML = (blob) => {
      // 画像を表示するためのdiv要素を生成
     const imageElement = document.createElement('div');
     imageElement.id = "currentThumb2"
     // 表示する画像を生成
     const blobImage = document.createElement('img');
     blobImage.setAttribute('src', blob);
     // 生成したHTMLの要素をブラウザに表示させる
     imageElement.appendChild(blobImage);
     ImageList.appendChild(imageElement);
   };


  document.getElementById('training_image2').addEventListener('change', function(e){
    // 画像が表示されている場合のみ、すでに存在している画像を削除する
    const imageContent = document.querySelector('#currentThumb2');
  if (imageContent){
  imageContent.remove();
  }
    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

    createImageHTML(blob);

  });
 } 
});

document.addEventListener('DOMContentLoaded', function(){
  if ( document.getElementById('training_image3')){
  const ImageList = document.getElementById('image-list3');

    // 選択した画像を表示する関数
    const createImageHTML = (blob) => {
      // 画像を表示するためのdiv要素を生成
     const imageElement = document.createElement('div');
     imageElement.id = "currentThumb3"
     // 表示する画像を生成
     const blobImage = document.createElement('img');
     blobImage.setAttribute('src', blob);
     // 生成したHTMLの要素をブラウザに表示させる
     imageElement.appendChild(blobImage);
     ImageList.appendChild(imageElement);
   };


  document.getElementById('training_image3').addEventListener('change', function(e){
    // 画像が表示されている場合のみ、すでに存在している画像を削除する
    const imageContent = document.querySelector('#currentThumb3');
  if (imageContent){
  imageContent.remove();
  }
    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

    createImageHTML(blob);

  });
 } 
});

document.addEventListener('DOMContentLoaded', function(){
  if ( document.getElementById('training_image4')){
  const ImageList = document.getElementById('image-list4');

    // 選択した画像を表示する関数
    const createImageHTML = (blob) => {
      // 画像を表示するためのdiv要素を生成
     const imageElement = document.createElement('div');
     imageElement.id = "currentThumb4"
     // 表示する画像を生成
     const blobImage = document.createElement('img');
     blobImage.setAttribute('src', blob);
     // 生成したHTMLの要素をブラウザに表示させる
     imageElement.appendChild(blobImage);
     ImageList.appendChild(imageElement);
   };


  document.getElementById('training_image4').addEventListener('change', function(e){
    // 画像が表示されている場合のみ、すでに存在している画像を削除する
    const imageContent = document.querySelector('#currentThumb4');
  if (imageContent){
  imageContent.remove();
  }
    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

    createImageHTML(blob);

  });
 } 
});