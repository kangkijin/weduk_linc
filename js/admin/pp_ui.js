// JavaScript Document

// top 버튼
function moveTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function () {
		$('#back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$('#back-to-top').tooltip('show');
}

//Date picker
function dataPicker() {
	$('.btDtpicker').datepicker({
		changeMonth: true,
		changeYear: true,
		autoclose: true,
		format: "yyyy-mm-dd",
		language: 'kr'
	});
}

function selectboxChange() {
	$("#getCode").each(function(){
		var str = "";
		$(this).children( "option:selected" ).each(function() {
			str += $( this ).text() + " ";
		});
		$(this).siblings('span').children('strong').text( str );
	});
}

function popupModal() {
	/*var url = $(this).attr('data-url');*/
	$('.btn_modal').on('click', function(e){
		$('.modal').modal({
			remote : url
		});
	});
}

//C.A.T 진단 그래프 T 점수 갖고오기
function graphWidth () {
	// 기존 넓이 클래스를 제거
	var classNames;
	$(".ad_graphbar_wrap p[class*='wd_p']").each(function(_, ele) {
		var currentClass = $(ele).attr('class');
		var classNames = currentClass.split(" ").filter(function(c) {
			return c.indexOf("wd_p");
		}).join(' ');
		$(this).attr("class",classNames);
	});
	// 새로운 넓이 클래스 추가
	$(".t_grade").each(function (){
		var widthText = $(this).text();
		$(this).siblings("td").find(".graph_bar").addClass("wd_p"+widthText);
	});
}

// 버튼 클릭시 클래스 on 제어 
function on_js(){
	$('.on_js').on('click', function(){
		$(this).toggleClass('on');
	});
}

// 해시태그
function hashtag(){
	$('.hashtag_clickable a').on('click',function(e){
		e.preventDefault();

		$(this).parent().toggleClass('on');
	});
}

// 검색박스
function searchBoxToggle(){
	$('.searchbox_wrap .btn_searchdetail').on('click',function(){
		var target = $(this).parent('.search_toparea').next('.search_bottomarea');
		if( target.is(':visible') ){
			$(this).removeClass('on');
			target.slideUp(300);
		} else {
			$(this).addClass('on');
			target.slideDown(300);
		}
	});
}

// IE 버전 체크 (UserAgent)
var ua = navigator.userAgent.toLowerCase();
// IE7엔 브라우저 엔진명인 Trident가 없고 IE11엔 MSIE란 문자열이 없으므로 두 가지 경우를 모두 체크.
if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
	var version = 11;
	ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
	if( ua )
	{
		version = parseInt( ua[ 1 ] );
	}
	var classNames = '';
	// 기존 방식에 is-ie 라는 클래스 추가
	classNames += ' is-ie';
	// 기존 방식에 현재 버전 클래스 추가
	classNames += ' ie' + version;
	for( var i = version + 1; i <= 11; i++ ) {
		classNames +=  ' lt-ie' + i;
	}
	// html 태그에 클래스 추가
	document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
}

$(document).ready(function () {
	moveTop();
	dataPicker();
	graphWidth();
	on_js();
	hashtag();
	searchBoxToggle();
	
	// 브라우저 알림창 닫기
	$(".browser_alert_close").on("click", function() {
		$("#browser_alert").slideUp();
	});
	
	//tab
	$('.ad_showtab').each(function () {
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
		$active.addClass('on');

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on('click', 'a', function (e) {
			$active.removeClass('on');
			$content.hide();

			$active = $(this);
			$content = $(this.hash);

			$active.addClass('on');
			$content.show();

			e.preventDefault();
		});
	});

	// select2
	$(".select2").select2({
		formatNoMatches: function() {
			return '결과가 없습니다.';
		}
	});	

	
});

$(window).on('load', function () {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".tbl_scroll_sm, .tbl_scroll_md, .tbl_scroll_lg, .tbl_scroll_xl").off(mCustomScrollbar);
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".tbl_scroll_lg, .tbl_scroll_xl").mCustomScrollbar({
				axis: "x",
				theme: "dark-thin",
				advanced: {
					autoExpandHorizontalScroll: true
				}
			});
			$(".tbl_scroll_xs, .tbl_scroll_sm, .tbl_scroll_md").mCustomScrollbar({
				axis: "x",
				theme: "dark-thin",
				advanced: {
					autoExpandHorizontalScroll: false
				}
			});
			$(".main-sidebar").mCustomScrollbar({
				axis: "y",
				theme: "dark-thin",
				advanced: {
					autoExpandHorizontalScroll: false
				}
			});
		}
	}
});

