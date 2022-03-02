
function preview(){
	const editor =document.querySelectorAll(".menu-editor");

	// メニューに表示されている数を表示
	function displayCounts (){
		let displayList = $(".training").children(".training_list").length;
		$('.display_list').text(displayList);
	};

	// 処方画面に同じメニューが登録されないようにするためのコード
	function isSameTid(prmTid) {
		let img;
		let data;
		for (let i = 0; i < editor.length; i++){
			img = editor[i].querySelector(".training_image");
			if(img != null) { 
				data =img.children[0].dataset.tid;
				if (data==prmTid) {
					// alert("すでに追加されています");
					return true;
				}
			}
		}
		return false;
	}


	editAdd();

	// 自主トレの追加機能
	function editAdd(){
		$(".addbutton").on("click",function (){  
			let trainingImage=  $(this).parents()[1];
			let tid = trainingImage.children[0].dataset.tid;	
			let img;
		  let data;
			if (!isSameTid(tid)) {
				for (let i = 0; i < editor.length; i++){
					img = editor[i].querySelector(".training_image");
					if(!img) { 
						data =editor[i].dataset.tid;
						$(trainingImage).clone(true).appendTo(editor[i]);
						let addButton = editor[i].querySelector(".addbutton");
						$(addButton).text("削除");
						$(addButton).removeClass();
						$(addButton).addClass("deleteButton");
						// 運動方法フィルター情報を取得
						let trainingId = $(addButton).parents()[0];
						let filterText = $(trainingId).children(".invalid_flag:checked").val();
						let numberFrequency  =$(addButton).parents()[3];
						let notEditer = $(numberFrequency).children()[0]
						let menuNumberText =$(notEditer).children(".menu_number")
						let numberTimesText =$(notEditer).children(".number_times")
						let numberSelectVal =$(notEditer).children(".number_select")

					 if(filterText == "stretch" || filterText == "stability"){
						menuNumberText.text("秒数")
						numberTimesText.text("秒")
						numberSelectVal.val(30)
					 }else {
						menuNumberText.text("回数")
						numberTimesText.text("回")
						numberSelectVal.val(10)
					 };

						// 削除ボタンを押したとき画像を削除する
						$(".deleteButton").on("click",function(){
							let cloneImg=  $(this).parents()[1];
							$(cloneImg).remove();
						});
						break;
					}
				}
			}
		});
	}







	// 印刷プレビュー機能
 document.querySelector(".btn").onclick = function() {
		//  div情報を取得
		let posts = document.querySelectorAll('.menu-editor');
		let post;
		let data;
		let tid =[];

	
		// プレビュー時のID取得
		for (var i = 0; i < posts.length; i++) {
			// 子要素とカスタムデータの情報を取得
			post = posts[i].children[0];
			if (post){
			 data =post.children[0].dataset.tid;
			 tid.push(data);
			}	
		}
		document.getElementById("tid").value = tid[0]
		document.getElementById("tid1").value = tid[1]
		document.getElementById("tid2").value = tid[2]
		document.getElementById("tid3").value = tid[3]
	};
		
	// あいまい検索機能
	$(function () {
		$('.testserch').on('keyup', function () { 
			//  キーボードを入力したタイミングで以下の処理を実行する
			let title = $('.testserch').val();
		
			$.ajax({
				type: 'GET', // リクエストのタイプ
				url: '/menu/search', // リクエストを送信するURL
				data: {mascle_search:title}, // サーバーに送信するデータ
				dataType: 'json' // サーバーから返却される型
			}).done(function (data) {
		
				if(data.length){
					$('.training_list').remove();
					$(data).each(function(i,training) {
						let stretch;
					let muscleTraining; 
					let stability;
					if(training.stretch == true){
					stretch = "checked="
					}
					if(training.muscle_training == true){
						muscleTraining = "checked="
					}
					if(training.stability == true){
						stability = "checked="
					}
					$('.training').append(
						`<div class = "training_list">
							<div class = "training_image" draggable="true">
								<img draggable="false" data-tid="${training.id}" src="${training.image}">
								<p class ="training_id">
									<a class="training_title"  href="/menu/${training.id}">${training.training_title}</a>
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="stretch" disabled="disabled" class="invalid_flag"  ${stretch}>ストレッチ
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="muscle_training" disabled="disabled" class="invalid_flag" ${muscleTraining}/>筋トレ
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="stability" disabled="disabled" class="invalid_flag" ${stability} />スタビリティ
									<button name="button" type="submit" class="addbutton">追加</button>
								</p> 
							</div>
						</div>`
					);
				});
					displayCounts();
				}else{
					$('.training_list').remove();
					$(".training").append(
						`<div class = "training_list">該当データがありません</div>`
					)};
				editAdd();
			});
		});
	});

	
	
	//  モーダルの内のフィルター機能
	$(".musle_filter_list").on('click', function(){
		let val; 
		let filterVal;
		let filterCon;
		// クリック時に背景を追加
		$(this).toggleClass("testaaa");
		

		if($(".musle_filter_list").hasClass('testaaa') == true){
			filterCon ='/menu/filter'
			filterVal = {sholderFilter:"",elbowFilter:"",handFilter:"",hipFilter:"",kneeFilter:"",ankleFilter:"",frontTrunkFilter:"",backTrunkFilter:"",compositeFilter:"",supineFilter:"",proneFilter:"",lateralFilter:"",sittingFilter:"",standingFilter:"",foursFilter:"",stretchFilter:"",muscle_trainingFilter:"",stabilityFilter:""};
		}else{
			filterCon ='/menu/search'
			filterVal = {mascle_search:""}
		};



		// クリック時に値を取得
		$(".musle_filter_list").each(function(i, elem) {
			if($(elem).hasClass('testaaa')){
				val = "1";
			}else{
				val =""
			}
			filterVal[elem.id]=val;
		});
   

		$.ajax({
			type: 'GET', // リクエストのタイプ
			url: (filterCon), // リクエストを送信するURL
			data: (filterVal), // サーバーに送信するデータ
			dataType: 'json' // サーバーから返却される型
		}).done(function (data) {
			console.log(data)
			if(data.length){
				$('.training_list').remove();
				$(data).each(function(i,training) {
					let stretch;
					let muscleTraining; 
					let stability;
					if(training.stretch == true){
					stretch = "checked="
					}
					if(training.muscle_training == true){
						muscleTraining = "checked="
					}
					if(training.stability == true){
						stability = "checked="
					}
					$('.training').append(
						`<div class = "training_list">
							<div class = "training_image" draggable="true">
								<img draggable="false" data-tid="${training.id}" src="${training.image}">
								<p class ="training_id">
									<a class="training_title"  data-remote="true" href="/menu/${training.id}">${training.training_title}</a>
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="stretch" disabled="disabled" class="invalid_flag"  ${stretch}>ストレッチ
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="muscle_training" disabled="disabled" class="invalid_flag" ${muscleTraining}/>筋トレ
									<input type="checkbox" name="invalid_flag" id="invalid_flag" value="stability" disabled="disabled" class="invalid_flag" ${stability} />スタビリティ
									<button name="button" type="submit" class="addbutton">追加</button>
								</p> 
							</div>
						</div>`
					);
				});
				displayCounts();
			} else{
				$('.display_list').text("0");
				$('.training_list').remove();
				$(".training").append(
					`<div class = "training_list">該当データがありません</div>`
				)};
			editAdd();
		});
  });
};
window.addEventListener("load", preview);


