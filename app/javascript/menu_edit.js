
function preview(){
	// スライドメニュー関数
	const SlideMenu = () => {
		if($('#menu').hasClass("SlideOut")){
			// スライドメニューが非表示なら表示
			$('#menu').removeClass('SlideOut');
			$('#menu').addClass('SlideIN');
		} 
	}

	// ハンバーガーメニューに表示するカウント関数
	function CartCount (){
		const countNum = $(".menu-editor").children("a").length;
		$(".cartcount").html(countNum);
		if (0 == countNum ){
			$(".cartcount").css("display","none");
		}else if(4 == countNum){
			SlideMenu()
		}else {
			$(".cartcount").show();
		}
	}


		// メニューに表示されている数を表示
		function displayCounts (){
			let displayList = $(".training").children(".training_list").length;
			$('.display_list').text(displayList);
		};















	// 自主トレの追加機能
	$(".addbutton").on("click",function (event){  
		
		// event.stopPropagation();
		const trainingList =  $(this).parent(".training_list")
		const trainingImage = $(trainingList).children("a")
		const trainingTitle = $(trainingList).children(".training_title")
		// 運動方法フィルター情報を取得
		const trainingInfo =$(trainingList).children(".training_info")
		const infoList = $(trainingInfo).children("li")
		const filterVal = $(infoList).children(".invalid_flag:checked").val();
		const dataTid = trainingImage.children().data("tid");

		// 画像をコピー
		let copyImg;
		let emptyEditor = null;
		let editorDataTid;
		const editor = $(".menu-editor")
		for (let i = 0; i < editor.length; i++){
			emptyEditor = null;
			copyImg = editor[i].querySelector(".training_img")
			editorDataTid =$(editor[i]).find(".training_img").data("tid");
			if(dataTid == editorDataTid) { 
				alert("すでに追加されています")
				break;
			}
			if(copyImg == null) { 
				emptyEditor = editor[i];
				break;
			}
		}

		if(emptyEditor != null) { 
			$(trainingImage).clone(true).appendTo(emptyEditor);
		}

		// タイトルをコピーと運動処方頻度設定
			const editorInfo = $(".editer_info")
			for (let i = 0; i < editorInfo.length; i++){
				const copyTitle = $(editorInfo[i]).children(".copy_training_title")
				const menuNumberText =$(editorInfo[i]).children(".menu_number")
				const numberTimesText =$(editorInfo[i]).children(".number_times")
				const numberSelectVal =$(editorInfo[i]).children(".number_select")
				$(trainingTitle).clone(true).appendTo(copyTitle);

				// フィルターによって運動頻度を書き換える処理
				if(filterVal == "stretch" || filterVal == "stability"){
					menuNumberText.text("秒数")
					numberTimesText.text("秒")
					numberSelectVal.val(30)
				}else {
					menuNumberText.text("回数")
					numberTimesText.text("回")
					numberSelectVal.val(10)
				}			
				break;
			};

		CartCount();
	});

			// 削除ボタンを押したときの処理
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
			$(".editer_info").hide()
			CartCount();
		});



	// 印刷プレビュー機能
	$(".menu_btn").on("click",function (){
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
	});
		




	// $('.muscleserch').on('keyup', function () { 
	// 	//  キーボードを入力したタイミングで以下の処理を実行する
	// 	let muscleSerchVal = $('.muscleserch').val();
	// 	console.log(muscleSerchVal)
	// 	if($(muscleSerchVal) == true){
	// 		$('.muscleserch111').prop("disabled", false);
	// 	}
	// });

	// });
	// $(".muscleserch").keypress(function(e) {
	// 	if (e.keyCode == 13) {
	// 		// ここに処理を記述
	// 		title = $('.muscleserch').val();
	// 	console.log(title)
	// 		return false;
	// 	}
	// });





	$(".filter_conditions").on('click', function() {
		// クリック時に背景を追加
		$(this).toggleClass("testaaa");

	});

	

	
	//  サイドメニューでのフィルター機能
	$(".filter_conditions,.muscleserch111").on('click', function(){
		let val; 
		let filterVal;
		let filter2 = {sholderFilter:"",elbowFilter:"",handFilter:"",hipFilter:"",kneeFilter:"",ankleFilter:"",frontTrunkFilter:"",backTrunkFilter:"",compositeFilter:"",supineFilter:"",proneFilter:"",lateralFilter:"",sittingFilter:"",standingFilter:"",foursFilter:"",stretchFilter:"",muscle_trainingFilter:"",stabilityFilter:""};
		title = $('.muscleserch').val();
		filter1 ={mascleSearch:title}



		// クリック時に値を取得
		$(".filter_conditions").each(function(i, elem) {
			if($(elem).hasClass('testaaa')){
				val = "1";
			}else{
				val =""
			}
			filter2[elem.id]=val;
		});

		console.log(filter1)
		console.log(filter2)
		filterVal = Object.assign(filter1, filter2);
		// console.log(filterVal)

	


		$.ajax({
			type: 'GET', // リクエストのタイプ
			url: ('/menu/filter'), // リクエストを送信するURL
			data: (filterVal), // サーバーに送信するデータ
			dataType: 'json' // サーバーから返却される型
		}).done(function (data) {
			// console.log(data)
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
            <a data-remote="true" href="/menu/${training.id}">
            <div class = "training_image" draggable="true" >
              <img data-tid="${training.id}" class="training_img" src="${training.image}">
							<button name="button" type="submit" class="addbutton">➕</button>

            </div>
						</a>
						<div class ="training_information">
              <input type="hidden" name="invalid_flag" id="invalid_flag" value="stretch" disabled="disabled" class="invalid_flag" ${stretch} />
              <input type="hidden" name="invalid_flag" id="invalid_flag" value="muscle_training" disabled="disabled" class="invalid_flag" ${muscleTraining}/>
              <input type="hidden" name="invalid_flag" id="invalid_flag" value="stability" disabled="disabled" class="invalid_flag"${stability} />
            </div> 
						<div class="training_title">
							${training.training_title}
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


