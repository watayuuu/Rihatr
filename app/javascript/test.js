if (!isSameTid(tid)) {
  for (let i = 0; i < editor.length; i++){
    img = editor[i].querySelector(".training_image");
    if(!img) { 
      let cloneTitle= $(this).parents(".training_list").children()[0]
      let cloneImg=$(editor[i]).children()[0]
      let trainingInformation =$(this).prev()
      // let cloneImage = $(trainingImage).clone(true).appendTo(editor[i]);
    
    
      $(cloneTitle).clone(true).appendTo(cloneImg);
      $(trainingInformation).clone(true).appendTo(editor[i]);
      $(editor[i]).append(`<button type="button" class="deleteButton" >➖</button>`)
      CartCount();
      // 処方頻度メニューを表示
      let notEditer =	$(editor[i]).prev();

      // 運動方法フィルター情報を取得
      let filterText = $(trainingInformation).children(".invalid_flag:checked").val();
      let menuNumberText =$(notEditer).children(".menu_number")
      let numberTimesText =$(notEditer).children(".number_times")
      let numberSelectVal =$(notEditer).children(".number_select")

        // フィルターによって運動頻度を書き換える処理
      if(filterText == "stretch" || filterText == "stability"){
        menuNumberText.text("秒数")
        numberTimesText.text("秒")
        numberSelectVal.val(30)
      }else {
        menuNumberText.text("回数")
        numberTimesText.text("回")
        numberSelectVal.val(10)
      };
      // notEditer.css("display", "flex")
      notEditer.show()
      // 削除ボタンを押したとき画像を削除する
      $(".deleteButton").on("click",function(){
        let cloneImg=  $(this).prevAll();
        let deleteEditer = $(this).parent().prev();
        $(cloneImg).remove();
        $(this).remove();
        deleteEditer.hide()
        CartCount();
      });

      // 全削除ボタンを押したときの処理
      $(".olldelete").on("click",function(){
        $(".menu-editor").children().remove()
        $(".not_editer").hide()
        CartCount();
      });

      break;
    }
  }
}



	// 処方画面に同じメニューが登録されないようにするためのコード
	function isSameTid(prmTid) {
		let img;
		let dataId;
		for (let i = 0; i < editor.length; i++){
			img = editor[i].querySelector(".training_image");
			// console.log(editor[i])
			if (img != null) { 
				dataId = img.children[0].dataset.tid;
				if (dataId==prmTid) {
					// alert("すでに追加されています");
					return true;
				}
			}
		}
		return false;
	}