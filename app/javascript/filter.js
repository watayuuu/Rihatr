$(function(){
  $(".position_filter").click(function(){
    $(this).next().slideToggle();
  })

  $(".joint_filter").click(function(){
    $(this).next().slideToggle();
  })
})








	// あいまい検索機能
	/*
  $(function () {
		$('.muscleserch').on('keyup', function () { 
			//  キーボードを入力したタイミングで以下の処理を実行する
			let title = $('.muscleserch').val();
		
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
									<input type="hidden" name="invalid_flag" id="invalid_flag" value="stretch" disabled="disabled" class="invalid_flag"  ${stretch}>
									<input type="hidden" name="invalid_flag" id="invalid_flag" value="muscle_training" disabled="disabled" class="invalid_flag" ${muscleTraining}/>
									<input type="hidden" name="invalid_flag" id="invalid_flag" value="stability" disabled="disabled" class="invalid_flag" ${stability} />
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

  */