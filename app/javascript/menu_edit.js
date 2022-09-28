////////////////////////////////////////////
// grobal変数
////////////////////////////////////////////
// カート内保持個数LIMIT
const MAX_COUNT_IN_CART = 4;



////////////////////////////////////////////
// grobal関数
////////////////////////////////////////////
// var uiHelper = function () {

// 	var htmls = {};
	
// 	var getHTML = function (url) {
// 					/// <summary>Returns HTML in a string format</summary>
// 					/// <param name="url" type="string">The url to the file with the HTML</param>
	
// 		if (!htmls[url])
// 		{
// 		var xmlhttp = new XMLHttpRequest();
// 		xmlhttp.open("GET", url, false);
// 		xmlhttp.send();
// 		htmls[url] = xmlhttp.responseText;
// 		 };
// 		 return htmls[url];
// 	};
	
// 	return {
// 		getHTML: getHTML
// 	};
// }();
	
// HTMLElement.prototype.addChilds = function (newChilds) {
// 	/// <summary>Add an array of child elements</summary>
// 	/// <param name="newChilds" type="Array">Array of HTMLElements to add to this HTMLElement</param>
// 	/// <returns type="this" />
// 	for (var i=0; i<newChilds.length; i++) { this.appendChild(newChilds[i]); };
// 	return this;
// };

// String.prototype.toDomElement = function () {
// 	var wrapper = document.createElement('div');
// 	wrapper.innerHTML = this;
// 	var df = document.createDocumentFragment();
// 	return df.addChilds(wrapper.children);
// };

function getDomFromString(html) {
	let wrapper = document.createElement('div');
	wrapper.style.display = 'none';
	wrapper.innerHTML     = html;
	return wrapper.firstChild;
}

function getDomFromStringJQ(html) {
	let wrapper = document.createElement('div');
	wrapper.style.display = 'none';
	wrapper.innerHTML     = html;
	return wrapper.firstChild;
}



////////////////////////////////////////////
// trainingカード管理クラス
////////////////////////////////////////////
class CardManager {

	constructor(prmCart, jsonText) {
		// プロパティ
		this._cart = prmCart;
		this._list = [];

		// text → json
		const jsonData = JSON.parse(jsonText);

		for (let i=0; i<jsonData.length; i++) {
			this._list[i] = new Card(this._cart, jsonData[i]);
		}
	}

	get list() {
		return this._list;
	}

	getDomCards() {
		return $('.training_list');
	}

	setCardEventListener() {
		// ボタン　カート追加 
		const domCardList = this.getDomCards();
		for (let i=0; i<this._list.length; i++) {
			this._list[i].setCardEventListener(domCardList[i]);
		}
	}

}



////////////////////////////////////////////
// trainingカードクラス
////////////////////////////////////////////
class Card {

	constructor(prmCart, dic) {
		this._cart = prmCart;

		this._dom;
		this._btnAddCart;

		/////// DOMから取得しない
		// this._dom          = $('.training_list')[i];
		// this._btnAddCart   = $(this._dom       ).children('.addbutton');
		// this._a            = $(this._dom       ).children('a');
		// this._info         = $(this._dom       ).children('.training_info');
		// this._chkKind      = $(this._info      ).children('li');
		// this._chkKindValue = $(this._chkKind   ).children('.invalid_flag:checked').val();
	
		// this._image        = $(this._a         ).children('img');
		// this._id           = $(this._image     ).data('tid');
		// this._title        = $(this._dom       ).children('.training_title').text();

		// dicから取得
		this._imageUrl     = dic.imageurl;
		this._id           = dic.id;
		this._title        = dic.title;
		this._text         = '';
		this._stretch      = dic.stretch;
		this._muscle       = dic.muscle_training;
		this._stability    = dic.stability;
		this._load         = '';
		this._count        = '';
		this._freq         = '';
		this._time         = '';
		this._part         = [];

		// alert(i + ':' + this._id + ':' + this._title);

	}

	// DOM取得（setDom();実行後に取得）
	get dom() {
		return this._dom;
	}
	// addボタンDOM取得（setDom();実行後に取得）
	get btnAddCart() {
		return this._btnAddCart;
	}
	get id() {
		return this._id;
	}
	get title() {
		return this._title;
	}
	get imageUrl() {
		return this._imageUrl;
	}
	get text() {
		return this._text;
	}
	get stretch() {
		return this._stretch;
	}
	get muscle() {
		return this._muscle;
	}
	get stability() {
		return this._stability;
	}
	get load() {
		return this._load;
	}
	get count() {
		return this._count;
	}
	get freq() {
		return this._freq;
	}
	get time() {
		return this._time;
	}
	get part() {
		return this._part;
	}

	// getDom() {
	// 	return this._dom;
	// }
	setDom(domCard) {
		this._dom         = domCard;
		this._btnAddCart  = $(this._dom).find('.addbutton');
	}

	// addボタンイベントリスナー設定（ajax後、動的に設定）
	setCardEventListener(domCard) {
		this.setDom(domCard);
		this._btnAddCart.on("click", 
			function(event) {
				event.stopPropagation();
				this._cart.add(this);
			}.bind(this)
		);
	}

}



////////////////////////////////////////////
// カートクラス
////////////////////////////////////////////
class Cart {

	constructor() {
		this._dom          = $('#menu'            );
		this._btnOpen      = $('#menu_btn'        );
		this._domCount     = $('.cartcount'       );
		this._domBox       = $('.menu-edit'       );
		this._domItems     = $('.number_frequency');
		this._btnRemove    = $('.deleteButton'    ); // ?
		this._btnRemoveAll = $('.olldelete'       );
		
		this._card         = [];                  // カート内カード
		this._maxCount     = MAX_COUNT_IN_CART;   // カード個数限度

		this.setEventListener();
	}

	// getter
	get domBox() {
		return this._domBox;
	}
	get domItems() {
		return this._domItems;
	}
	get card() {
		return this._card;
	}
	// カート内trカード数
	get count() {
		return this._card.length;
	}


	// methods
	// イベントリスナー
	setEventListener() {
		// カートopenボタン
		this._btnOpen.on('click', 
			function(event) {
				event.stopPropagation();
				this.open();
			}.bind(this)
		);

		// 全削除ボタン
		this._btnRemoveAll.on("click", 
			function(event) {
				event.stopPropagation();
				this.removeAll();
			}.bind(this)
		);

		// 削除ボタン？
		this._btnRemove.on("click", 
			function(event) {
				event.stopPropagation();
				this.remove(card);
			}.bind(this)
		);
	}
	
	// カートclose判定
	isClosed() {
		return this._dom.hasClass("SlideOut");
	}

	// カート表示＋スライドin
	show() {
		this._dom.removeClass('SlideOut');
		this._dom.addClass('SlideIN');
	}

	// カート非表示＋スライドout
	hide() {
		this._dom.removeClass('SlideIN');
		this._dom.addClass('SlideOut');
	}

	// カート表示
	open() {
		if (this.isClosed()) {
			this.show();
		} else {
			this.hide();
		}
	}

	// カート追加可否判定
	isAddable(prmCardId) {
		// check個数over
		if (this.count >= this._maxCount) { return false; }

		// check同類
		for (let i=0; i<this.count; i++) {
			if (this._card[i].id == prmCardId) { return false; }
		}

		return true;
	}

	// カードにDOM追加
	addDomCard(prmCard) {
		if (this.count > 0) {
			let domItem = $(this.getCartItemHTML(prmCard));

			// カートから削除イベントリスナー
			domItem.on("click", 
				function(event) {
					event.stopPropagation();
					this.remove(prmCard.id, domItem);
				}.bind(this)
			);

			$('.menu-edit').append(domItem);
		}
	}

	// カートcount表示
	showCount() {
		if (this.count == 0) {
			this._domCount.hide();
			return false;
		}
		this._domCount.html(this.count);
		this._domCount.show();
	}

	// 追加後のカート表示制御
	viewAfterModified() {
		// 個数によってカート表示制御
		if (this.count == this._maxCount) {
			this.open();
		}
		this.showCount();
	}

	// trカード追加
	add(prmCard) {
		if (this.isAddable(prmCard.id)) {
			this._card[this.count] = prmCard;
			this.addDomCard(prmCard);
		}
		this.viewAfterModified();
		// alert(this.count);


		//////////// 以下未着手
		// const trainingList  = $(this).parent(".training_list");
		// const trainingImage = $(trainingList).children("a");
		// const trainingTitle = $(trainingList).children(".training_title");

		// // 運動方法フィルター情報を取得
		// const trainingInfo  = $(trainingList).children(".training_info");
		// const infoList      = $(trainingInfo).children("li");
		// const filterVal     = $(infoList).children(".invalid_flag:checked").val();
		// const dataTid       = trainingImage.children().data("tid");

		// // タイトルコピー・運動処方頻度設定
		// 	const editorInfo = $(".editer_info");
		// 	for (let i=0; i<editorInfo.length; i++) {
		// 		const copyTitle       = $(editorInfo[i]).children(".copy_training_title");
		// 		const menuNumberText  = $(editorInfo[i]).children(".menu_number");
		// 		const numberTimesText = $(editorInfo[i]).children(".number_times");
		// 		const numberSelectVal = $(editorInfo[i]).children(".number_select");
		// 		$(trainingTitle).clone(true).appendTo(copyTitle);

		// 		// フィルターによって運動頻度を書き換える処理
		// 		if (filterVal=="stretch" || filterVal=="stability") {
		// 			menuNumberText.text("秒数");
		// 			numberTimesText.text("秒");
		// 			numberSelectVal.val(30);
		// 		} else {
		// 			menuNumberText.text("回数");
		// 			numberTimesText.text("回");
		// 			numberSelectVal.val(10);
		// 		}			
		// 		break;
		// 	};

	}

	// trカード削除
	remove(prmId, prmDomCard) {
		for (let i=0; i<this._card.length; i++) {
			if (this._card[i].id == prmId) {
				this._card.splice(i, 1);
				$(prmDomCard).remove();
			}
		}
		this.viewAfterModified();
	}

	// trカード全削除
	removeAll() {
		this._card = [];
		$(".menu-edit").children().remove();
		this.viewAfterModified();
	}

	getCartItemHTML(prmCard) {
		const html = 
`
<div class="number_frequency">
<div class="menu-editor">
<img src="${ prmCard.imageUrl }" class="training_img" data-tid="${ prmCard.id }" />
</div>
<div class="editer_info">
<div class="copy_training_title">${ prmCard.title }</div>
<div class="menu_number">回数</div>
<input class="number_select" value="10" type="number" min="1" name="number" id="number" value="${ prmCard.count }" />
<div class="number_times">回</div>
<div class="menu_frequency">頻度</div>
<input id="frequency_select" class="frequency_select" value="3" type="number" min="1" name="frequency_select"  value="${ prmCard.freq }" />
<div class="set_count">セット</div>
</div>
</div>
`;
		return html;
	}
}



////////////////////////////////////////////
// 基本ページ管理クラス
////////////////////////////////////////////
class WebPageManager {

	constructor() {
		// this._auth;
		// this._session;
		// this._loginUserId = '';
	}

}



////////////////////////////////////////////
// マイページ管理クラス
////////////////////////////////////////////
class MyPageManager extends WebPageManager {

	constructor() {
		super();

		this._domDesk   = $('.training');
		this._btnSearch = $('.filter_conditions,.muscleserch111');

		this._cart = new Cart();
		this._cardManager;

		this.setPageEventListener();
		this.loadCards();
	}

	setPageEventListener() {
		//  サイドメニューでのフィルター機能（検索）
		this._btnSearch.on('click', 
			function(event) {
				event.stopPropagation();
				this.loadCards();
			}.bind(this)
		);

		// 印刷プレビュー機能？
		$(".menu_btn").on("click", 
			function(event) {
				event.stopPropagation();
				alert('印刷');
			}.bind(this)
		);
	}
	
	// trカードデータ取得＋HTML描画
	loadCards() {
		const setting = this.getSearchJSON();
		// alert(JSON.stringify(setting));
		// const trJson = this.getTrData();  // テスト

		// テスト用にajaxは殺している
		$.ajax(setting).done(
			function(trJson) {
				alert(trJson);
				if(trJson != ""){
					this._cardManager = new CardManager(this._cart, trJson);
					this.showCards();
					this.showCardsCount();
					this._cardManager.setCardEventListener();
					$(this._cart.domItems).remove();   // htmlの方のカート内を削除しておいて
				}
			}.bind(this)
		);
	}

	getSearchJSON() {
		const searchJSON = this.getSearchCondition();
		return {
				type     : 'GET'
			,	url      : '/menu/filter'
			,	data     : searchJSON
			,	dataType : 'json'
		};
	}

	getSearchCondition() {
		let val; 
		let filterVal;
		let filter1 = {};
		let filter2 = {};

		const title = $('.muscleserch').val();

		filter1 = { mascleSearch : title }
		filter2 = {
				sholderFilter         : ""
			,	elbowFilter           : ""
			,	handFilter            : ""
			,	hipFilter             : ""
			,	kneeFilter            : ""
			,	ankleFilter           : ""
			,	frontTrunkFilter      : ""
			,	backTrunkFilter       : ""
			,	compositeFilter       : ""
			,	supineFilter          : ""
			,	proneFilter           : ""
			,	lateralFilter         : ""
			,	sittingFilter         : ""
			,	standingFilter        : ""
			,	foursFilter           : ""
			,	stretchFilter         : ""
			,	muscle_trainingFilter : ""
			,	stabilityFilter       : ""
		};

		// クリック時に値を取得
		$(".filter_conditions").each(function(i, elem) {
			if ($(elem).hasClass('testaaa')) {
				val = "1";
			} else {
				val = "";
			}
			filter2[elem.id] = val;
		});

		console.log(filter1);
		console.log(filter2);

		filterVal = Object.assign(filter1, filter2);
		// console.log(filterVal);

		return filterVal;
	}

	showCards() {
		let   html  = '';
		const cards = this._cardManager.list;
		// alert(card.length);

		// deskクリア
		$(this._domDesk).children().remove();

		// HTML作成
		if (cards.length <= 0) {
			html = '<div class="training_list">該当データがありません</div>';
		} else {
			for (let i=0; i<cards.length; i++) {
				html += this.getCardsHTML(cards[i]);
			}
		};

		// deskにカード描画
		$(this._domDesk).append(html);
	}

	getCardsHTML(prmCard) {
		let chkStretch   = '';
		let chkMuscle    = ''; 
		let chkStability = '';

		if (prmCard.stretch) {
			chkStretch   = 'checked="checked"';
		}
		if (prmCard.muscle) {
			chkMuscle    = 'checked="checked"';
		}
		if (prmCard.stability) {
			chkStability = 'checked="checked"';
		}

		const html =
`
<div class="training_list">
<a data-remote="true" href="/menu/${ prmCard.id }">
<img data-tid="${ prmCard.id }" class="training_img" src="${ prmCard.imageUrl }" />
</a>
<div class="training_title">${ prmCard.title }</div>
<div class ="training_info">
<li><input type="checkbox" name="invalid_flag" class="invalid_flag" value="stretch"         disabled="disabled" ${ chkStretch   } />ストレッチ</li>
<li><input type="checkbox" name="invalid_flag" class="invalid_flag" value="muscle_training" disabled="disabled" ${ chkMuscle    } />筋トレ</li>
<li><input type="checkbox" name="invalid_flag" class="invalid_flag" value="stability"       disabled="disabled" ${ chkStability } />スタビリティ</li>
</div> 
<button name="button" type="submit" class="addbutton">➕</button>
</div>
`;
		return html;
	}

	// メニューに表示されている数を表示
	showCardsCount() {
		let count = this._cardManager.list.length;
		$('.display_list' ).text(count);
		$('.display_count').text(count);
	};
	
	// ajaxで取得するデータ（テスト用）
	getTrData() {
		const data = [
			{
					id              : 3
				,	title           : "プランク"
				,	imageurl        : "image/A-1.JPG"
				,	stretch         : false
				,   muscle_training : false
				,	stability       : true
			} ,
			{
					id              : 4
				,	title           : "腓腹筋ストレッチ"
				,	imageurl        : "image/A-2.JPG"
				,	stretch         : false
				,   muscle_training : true
				,	stability       : false
			} ,
			{
					id              : 5
				,	title           : "大殿筋ストレッチ"
				,	imageurl        : "image/A-3.JPG"
				,	stretch         : true
				,   muscle_training : false
				,	stability       : false
			} ,
			{
					id              : 7
				,	title           : "三角筋トレーニング"
				,	imageurl        : "image/A-4.JPG"
				,	stretch         : false
				,   muscle_training : true
				,	stability       : false
			} ,
			{
					id              : 8
				,	title           : "大腿直筋トレーニング"
				,	imageurl        : "image/A-5.JPG"
				,	stretch         : false
				,   muscle_training : true
				,	stability       : false
			} 
		];

		return JSON.stringify(data);
	}
	
}    // end of class MyPage



// 初期化
let MYPAGE;
window.addEventListener("load", function() { MYPAGE = new MyPageManager(); });




