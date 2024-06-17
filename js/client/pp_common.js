/* 클라이언트 ui 스크립트 */
/*var sessionUserId = '';

if(sesseionUserId == ""){
   //로그인 안했을때
	console.log("로그인x");
} else {
   //로그인 했을때
	console.log("로그인o");
}*/

// 헤더 메뉴 반응형
function responsiveStyle() {
	var windowWidth = $(window).outerWidth();
	var didScroll;
	var lastScrollTop = 0;
	var delta = 0; // 동작의 구현이 시작되는 위치

	// header 스크롤시
	// 스크롤시 클래스 추가
	$(window).scroll(function (event) {

		didScroll = true;

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 10);
	});

	// 동작을 구현
	function hasScrolled() {
		// 접근하기 쉽게 현재 스크롤의 위치를 저장한다.
		var st = $(this).scrollTop();

		// 설정한 delta 값보다 더 스크롤되었는지를 확인한다.
		if(Math.abs(lastScrollTop - st) <= delta){
			return;
		}

		// 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지를 확인한다.
		if (st > lastScrollTop){
			// Scroll Down
			$('body').addClass('scrolly');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('body').removeClass('scrolly');
			}
		}

		// lastScrollTop 에 현재 스크롤위치를 지정한다.
		lastScrollTop = st;
	}

	if (windowWidth < 1025) {
		//console.log('모바일,태블릿');

		//PC 이벤트 제거
		$('.btn_menu').off('click');
		$('body').removeClass('on');
		$('.btn_menu').removeClass('on');
		$('.gnb_1depth > li > a').unbind('mouseenter');
		$('.gnb_submenu').removeAttr('style');
		$('.gnb_submenu').unbind('mouseenter');
		$('.gnb_submenu .gnb_2depth').removeAttr('style');
		$('.gnb_submenu .gnb_2depth').hide(); 
		$('.gnb_2depth > li').unbind('mouseenter'); 
		$('.gnb_2depth > li').off();

		// 기본 설정
		$(".btn_admin").prependTo($(".gnb_submenu"));
		$(".btn_log").prependTo($(".gnb_submenu"));

		// gnb
		$('.btn_menu').on('click', function(e){
			e.stopImmediatePropagation();
			$('.gnb_list').removeClass('on');
			$('.gnb_2depth').stop().slideUp(200);
			if( $(this).hasClass('on') ){
				$('body').removeClass('on');
				$(this).removeClass('on');
			} else {
				$('body').addClass('on');
				$(this).addClass('on');
			}
		});

		// 2depth
		$('.gnb_list .gnb_tit').on('click', function(e){
			e.stopImmediatePropagation();
			$('.gnb_list').removeClass('on');
			$('.gnb_2depth').stop().slideUp(200);
			if( $(this).next('ul').is(':visible') ){
				$(this).parent().removeClass('on').children('ul').stop().slideUp(200);
			} else {
				$(this).parent().addClass('on').children('ul').stop().slideDown(200);
			}
		});

		// 3depth gnb
		$('.gnb_2depth > li > a').on('click', function(e){
			e.stopImmediatePropagation();
			var target = $(this).next('.gnb_3depth');

			if ( target.is(':visible') ) {
				$(this).removeClass('on');
				$(this).parent().removeClass('on')
				target.slideUp('fast');
			} else {
				$('.gnb_2depth > li > a').removeClass('on');
				$('.gnb_3depth').slideUp('fast');
				$(this).addClass('on');
				$(this).parent().addClass('on')
				target.slideDown('fast');
			}
		});

		// 3depth 메뉴 표시
		$('.gnb_2depth').children('li').each(function(){
			var target = $(this);
			target.children('a').children('span').hide();
			if ( target.find('.gnb_3depth').length ) {
				$('<span>펼쳐보기</span>').appendTo( target.children('a') );
			} 
		}); 

	} else {
//		console.log("PC");

		//TABLET,MOBILE 이벤트 제거
		$('.btn_menu').off('click');
		$('body').removeClass('on');
		$('.btn_menu').removeClass('on');
		$('.gnb_submenu').removeAttr('style');
		$('.gnb_submenu .gnb_2depth').removeAttr('style'); 
		$('.gnb_3depth').hide();  
		$('.gnb_2depth > li').removeClass('on');

		// 기본 설정
		$(".btn_admin").appendTo($(".header_content > .grid_content"));
		$(".btn_log").appendTo($(".header_content > .grid_content"));

		// 1depth
		// 마우스오버시 하위메뉴 show/hide :
		$('.gnb_1depth > li').on({
			'mouseenter focus':function(){
				$('.gnb_1depth > li > a').removeClass('on');
				$('.gnb_submenu').stop().slideDown(100);
			},
			'mouseleave blur':function(){
				$('.gnb_submenu').stop().slideUp();
				$('.gnb_1depth > li').removeClass('on');

				$('.gnb_submenu').on({
					'mouseenter focus':function(){
						$('.gnb_submenu').stop().slideDown(100);
					},
					'mouseleave blur':function(){
						$('.gnb_submenu').stop().slideUp(100);
					}
				});
			}
		})

		// 2depth
		// 마우스오버시 하위메뉴 show/hide :
		$('.gnb_2depth > li').on({
			'mouseenter focus':function(){
				$('.gnb_2depth > li > a').removeClass('on');
				$(this).addClass('on');
				$(this).find('a').siblings('.gnb_3depth').stop().slideDown(200);
			},
			'mouseleave blur':function(){
				$('.gnb_2depth > li').removeClass('on');
				$(this).find('a').siblings('.gnb_3depth').stop().slideUp(200); 
			}
		})


		// 상위메뉴에 하이라이트 효과주기
		$('.gnb_submenu .gnb_list').on({
			'mouseenter focus':function(){
				var target = $(this).index();
				$('.gnb_1depth').children('li').eq(target).addClass('on');
			},
			'mouseleave blur':function(){
				var target = $(this).index();
				$('.gnb_1depth').children('li').eq(target).removeClass('on');
			}
		});
		
		var scrollChk;
		var _pathLength;
		$(function(){
			$(window).scroll(function(){
				var windowWidth = $(window).outerWidth();
				var svg = $('.move_top svg');
				var top = $(this).scrollTop();
				if($(".move_top").length > 0){
					scrollChk = $(this).scrollTop();

					if(windowWidth < 480 ){
						_pathLength = 145;
						svg.width(50);
						svg.height(50);
						document.getElementById("cir").setAttribute("r", 23);
						document.getElementById("cir").setAttribute("cx", 25);
						document.getElementById("cir").setAttribute("cy", 25);
					}else {
						_pathLength = 214;
						svg.width(70);
						svg.height(70);
						document.getElementById("cir").setAttribute("r", 34);
						document.getElementById("cir").setAttribute("cx", 35);
						document.getElementById("cir").setAttribute("cy", 35);
					}
					
					$(".move_top circle").css("stroke-dasharray", _pathLength + Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * _pathLength));
					$(".move_top .percent").text(Math.floor($(window).scrollTop() / ($(document).height() - $(window).height()) * 100) + "% 스크롤 진행");
				}
			}).scroll();
		});

	}

}

var resizeTimer;
$( window ).on( 'resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeEnd, 1000);
} );

function resizeEnd() {
	responsiveStyle();
}

// lnb 메뉴
// function lnbMenu(){

// 	// 서브 lnb 있을 경우 :
// 	$('.lnb_depth1').each(function(){
// 		var target = $(this);
// 		target.children('a').children('.lnb_more').hide();
// 		if ( target.find('.lnb_2depth').length ) {
// 			$('<span class="lnb_more">펼쳐보기</span>').appendTo( target.children('a') );
// 		}
// 	});

// 	// 마우스오버시 하위메뉴 show/hide :
// 	$('.lnb_depth1').on({
// 		'mouseenter focus':function(){
// 			$(this).children('a').next('.lnb_2depth').stop().slideDown(200);
// 		},
// 		'mouseleave blur':function(){
// 			$(this).children('a').next('.lnb_2depth').stop().slideUp(200);
// 		}
// 	})

// }

// toggle class 'on'
function toggleOn(){
	$('.on_js').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('on');
	});
}


// lnb 메뉴
function lnbMenu(){
	
	// // 서브 lnb 있을 경우 : 
	$(".lnb_list > ul").children('li').each(function(){
		var target = $(this);
		target.children('a').children('span').hide();
		if ( target.find('.lnb_depth2').length ) {
			$('<span>펼쳐보기</span>').appendTo( target.children('a') );
		} 
	});
	
	// // 마우스오버시 하위메뉴 show/hide :
	$(".lnb_list > ul").children('li').on({
		'mouseenter focus':function(){
			$(this).addClass('on');
			$(this).children('a').next().stop().slideDown(300);
		},
		'mouseleave blur':function(){
			$(this).removeClass('on');
			$(this).children('a').next().stop().slideUp(300);
		}
	})
	
}

//페이지 상단 이동
function moveTop() {
	var windowWidth = $(window).outerWidth();
	$('.move_top').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.move_top').fadeIn();
		} else {
			$('.move_top').fadeOut();
		}
	});
	$('.move_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}

// tab : '.tab_js' 안에 '.tab_list_js' 와 '.tab_cnt_js'로 구분지어 사용.
function tab(){
	$('.tab_js').each(function(){
		var tabs = $(this).children('.tab_list_js').children('li');
		var panels = $(this).children('.tab_cnt_js').children('div');
		var lastTab = tabs.filter('.on');
		var lastPanel = $(lastTab.children('a').attr('href'));
		panels.hide();
		lastPanel.show();
		tabs.on('click',function(e){
			e.preventDefault();
			var thisTab = $(this);
			var thisPanel = $(thisTab.children('a').attr('href'));
			lastTab.removeClass('on');
			thisTab.addClass('on');
			lastPanel.hide();
			thisPanel.show();
			lastTab = thisTab;
			lastPanel = thisPanel;
		});
	})
}

// tab 모양만
function tabSwitch(){
	$('.tab_switch_js').each(function(){
		var tab = $(this).children('li');

		tab.on('click',function(e){
			e.preventDefault();
			tab.removeClass('on');
			$(this).addClass('on');
		})
	})
}

// 클릭한 영역으로 이동
function gotoin() {
	$('.goto_js').each(function(){
		var gotoTit = $(this).find('a');

		gotoTit.on('click',function(e){
			e.preventDefault();
			gotoTit.removeClass('on');

			var target = $(this).attr('href');

			if (target.length) {
				$(this).addClass('on');
				$('html,body').animate({
					scrollTop: $(target).offset().top - 220
				}, 'slow');
			}
		})
	})
}

// accordion : '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용.
function accordion(){
	$('.accordion_js').each(function(){
		var tabs = $(this).find('.acd_list_js');

		$(this).find('.acd_cnt_js').hide(); 

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		tabs.filter('.on').next('.acd_cnt_js').show();

		tabs.on('click',function(e){
			e.preventDefault();

			var thisTab = $(this);
			var thisPanel = thisTab.next('.acd_cnt_js');
			var notThisTab = tabs.not(thisTab);
			var notThisPanel = notThisTab.next();

			if(notThisTab){
				notThisTab.removeClass('on');
				notThisPanel.slideUp(300);
			}

			thisTab.toggleClass('on');
			thisPanel.stop().slideToggle(300);
		});
	})
}

//토글 체크박스 검색버튼 (check_col)
/*function checkToggle(){
	$('.search_toggle_row').each(function () {
		// 최초 로드시 선택된 체크박스가 없으면 전체 체크박스 checked
		if($(".searchtoggle_left input:checked").length == 0){
			$(".check_all").prop("checked", true);
			$(".check_all").parent().addClass("on");
		}
		// 체크박스 선택시 스타일 변경 및 전체 체크박스인지 여부 확인
		$(".searchtoggle_left .btn_check_form input[type='checkbox']").change(function() {
			if($(this).is(":checked")){
				if($(this).hasClass("check_all")){
					$(".searchtoggle_left input[type='checkbox']").prop("checked", false);
					$(".searchtoggle_left input[type='checkbox']").parent().removeClass("on");
					$(".check_all").prop("checked",true);
					$(".check_all").parent().addClass("on");
				} else {
					$(".check_all").prop("checked", false);
					$(".check_all").parent().removeClass("on");
					$(this).prop("checked",true);
					$(this).parent().addClass("on");
				}

			} else {
				$(this).parent().removeClass("on");
				if($(".searchtoggle_left input:checked").length == 0){
					$(".check_all").prop("checked",true);
					$(".check_all").parent().addClass("on");
				}
			}
		});

		//찜목록, 추천교과
		$(".searchtoggle_right .btn_check_form input[type='checkbox']").change(function () {
			if ($(this).is(":checked")) {
				$(this).parent("label").addClass("on");
			} else {
				$(this).parent().removeClass("on");
			}
		});
	});
}*/

// selectbox
function selectBox() {
	$('.select_form').each(function(){
		var label = $(this).children('label');
		var target = $(this).children('.select_custom');
		var targetName = target.children('option:selected').text();

		label.text(targetName);
		target.on('change',function(){
			var targetName = $(this).children('option:selected').text();
			label.text(targetName);
		});
	});
}

// selectbox 교수 상담 시간
function selectBoxCounsel(){
	var windowWidth = $(window).outerWidth();
	var target = $('.date_current');
	var optBox = target.find('.date_selectbox').find('a');

	if(windowWidth < 1025) {
		target.on('click',function(){
			$(this).find('.date_selectbox').stop().slideToggle(300);
		});
	}else {
		target.on({
			'mouseenter focus' : function(){
				$(this).find('.date_selectbox').stop().slideDown(300);
			},
			'mouseleave blur' : function(){
				$(this).find('.date_selectbox').stop().slideUp(300);
			}
		});
	}
	optBox.on('click',function(){
		var optSelected = $(this).text();
		$(this).parents('.date_selectbox').prev('strong').text(optSelected);
	});
}

// 체크박스 토글(row) : 검색창 셀렉트박스
function checkToggleRow(){
	// 클릭시 셀렉트 박스 보여졌다 사라지는 동작
	$('.show_checktxt').on('click',function(){
		$('.check_row_wrap').slideToggle(300);
	})

	var checkBox = $('.show_checktxt');
	var check = $('input:checkbox[name=check_row]');
	var checkAll = $('input:checkbox[name=checkall_row]');
	var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
	var checkTotalCnt = $('input:checkbox[name=check_row]').length;
	var checkTxt = $('.check_row_wrap').children('.check_row').children('input:checked').next().text();

	checkBox.text(checkTxt);

	// '전체'외 나머지 선택시
	check.on('change', function(){
		var checkSelected = $('input:checkbox[name=check_row]:checked');
		var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
		var showCheck = checkSelected.next().html();

		checkBox.text(showCheck);

		if(checkSelected.length == checkTotalCnt){
			check.prop('checked',false);
			checkAll.prop('checked',true);
			checkBox.text('전체');
		}else if(checkSelected.length >= 2){
			checkAllSelected.prop('checked',false);
			checkBox.text('다중선택');
		}else if(checkSelected.length >= 1){
			checkAllSelected.prop('checked',false);
			checkBox.text(showCheck);
		}else{
			checkAll.prop('checked',true);
			checkBox.text('전체');
		}
	});

	// '전체' 선택시
	checkAll.on('change', function(){
		checkAll.prop('checked',true);
		checkBox.text('전체');
		check.prop('checked',false);
	});
}

//체크박스 토글(col) : 체크박스 버튼
function checkToggleCol(){

	$('.check_col_wrapper').each(function(){
		var checkAll = $(this).find('input[name="checkall_col"]');
		var check = $(this).find('input[name="check_col"]');
		var checkEtc = $(this).find('input[name="check_etc"]');

		checkAll.on('change',function(){
			check.prop('checked',false);
			checkEtc.prop('checked',false);
			checkAll.prop('checked',true);
		});

		check.on('change',function(){
			var checkSelected = check.filter(':checked').length;
			if( checkSelected == 0 || checkSelected == check.length ){
				check.prop('checked',false);
				checkEtc.prop('checked',false);
				checkAll.prop('checked',true);

			}else if( checkSelected > 0 ){
				checkAll.prop('checked',false);
				checkEtc.prop('checked',false);
			}
		});

		checkEtc.on('click', function(){
			$(this).parent('.check_col').siblings().find('input').prop('checked',false);
		});
	})
}

//라디오 토글
function radioToggle() {
	$(".radio_toggle>input[type='radio']").click(function () {
		var previousRadio = $(this).data('storedRadio');
		if (previousRadio) {
			$(this).prop('checked', !previousRadio);
			$(this).data('storedRadio', !previousRadio);
		} else {
			$(this).data('storedRadio', true);
			$(".radio_toggle>input[type=radio]:not(:checked)").data("storedRadio", false);
		}
		if ($(this).is(":checked")){
			$(".radio_toggle").removeClass("on");
			$(this).parent().addClass("on");
		} else {
			$(this).parent().removeClass("on");
		}
	});
}



// 취업상담 - 방문상담/온라인상담 라디오 버튼
function radioBtn() {
	$(".radio_btn>input[type='radio']").click(function () {
		// 버튼 클릭시 상담사 박스 on/off
		$('.counselor_box').removeClass('on');
		$(this).parent('.radio_btn').parent('div').parent('.counselor_box').addClass('on');
	});
}

// checkbox button - 찜목록 버튼
function checkBtn(){
	$('.check_btn_wrap').each(function(){
		$(this).find('input[type="checkbox"]').change(function(){
			$(this).next().toggleClass('on');
		})
	})
}

// 클릭시 on/off 버튼 : 찜하기 버튼
function toggleBtn(){
	$('.btn_toggle').each(function(){
		$(this).on('click',function(){
			$(this).toggleClass('on');
		});
	});
}
/*
//찜하기 버튼
function btnLike() {
	$('.btn_addlike').on('click', function(){
		$(this).toggleClass('on');
	});
}*/   

// 별점주기
function starlevel(){
	$('.starlevel_js').each(function(){
		var star = $(this).find('.star_level');
		var firstStar = star.eq(0);

		firstStar.on('click', function(){
			if ( $(this).hasClass('on') === false ) {
				/*console.log('별off');*/
				$(this).addClass('on');
			} else {
				if ( $(this).next().hasClass('on') === false ) {
					/*console.log('별on 이전별off');*/
					$(this).removeClass('on');
				} else {
					/*console.log('별on 이전별on');*/
					$(this).addClass('on');
					$(this).nextAll().removeClass('on');
				}
			}
		});

		star.not(firstStar).on('click', function(){
			$(this).addClass('on');
			$(this).prevAll().addClass('on');
			$(this).nextAll().removeClass('on');
		});
	});
}

// 글자수 표기
function letterCount(){
	$('#letter_count').keyup(function(){
		var content = $(this).val();
		$('#letter_counter').html(content.length + '/100');
	});
	$('#letter_count').keyup();
}

// 테이블 스크롤 커스텀
function tableScroll() {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar("destroy");
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: true,
					updateOnContentResize: true
				}
			});
		}
	}
}

//가족추가
function familyList() {
	$(".family_list dl").each(function() {
		$(this).find("dt").unbind("click");
		$(this).find("dt").on("click", function() {
			if ($(this).hasClass('on')) {
				$(this).removeClass('on');
				$(this).next('dd').slideUp();
			} else {
				$(this).addClass('on');
				$('.faqlist dt').not($(this)).removeClass('on');
				$(this).next('dd').slideDown();
			}
		});
	});
}

// 어학, 자격증 그래프 보여주기
function viewActivepoint() {
	$(".active_footer .btn_pointview").on("click", function() {
		var showGraphbox = $(this).parent().parent().next(".graph_wrap");
		$(showGraphbox).show('fast');
	});
	$(".active_wrap .graph_wrap .btn_del").on("click", function() {
		var hideGraphbox = $(this).parent(".graph_wrap");
		$(hideGraphbox).hide('fast');
	});
}

// 포트폴리오 분석결과 높이 같게 조절
function equalHeight() {
	var windowWidth = $(window).outerWidth();
	var box = $('.portfolio_wrap').find('.test_outcome').find('.testoutcome_sheet');
	var heightArray = box.map(function(){
		return $(this).height();
	}).get();
	var maxHeight = Math.max.apply( Math, heightArray );

	if ( windowWidth > 768 ) {
		// only pc
		box.height(maxHeight);
	}
}

// 페이징버튼 클릭시 페이지 상단부분으로 이동
function up(){
	$('.up_js').each(function(){
		var windowWidth = $(window).outerWidth();

		if(windowWidth < 1025) {
			$('.testlist_move').click(function(e){
				e.preventDefault();
				$('body,html').animate({scrollTop: 150 }, 300);
			});
		}else {
			$('.testlist_move').click(function(e){
				e.preventDefault();
				$('body,html').animate({scrollTop: 200 }, 300);
			});
		}

	});
}

// 콘텐츠 내 별점 셀렉트
function starLevelSelect(){
	var wrapper = $('.starlevel_select');

	wrapper.on('click', function(){
		if ( $(this).children('ul').is(':visible') ) {
			$(this).children('ul').slideUp('fast');
		} else {
			$(this).children('ul').slideDown('fast');
		}
	});
	wrapper.children('ul').children('li').on('click', function(){
		var targetSrc = $(this).children('img').attr('src');
		var targetAlt = $(this).children('img').attr('alt');

		wrapper.children('p').children('img').attr({
			src : targetSrc,
			alt : targetAlt
		});
	});
}

// hashtag
function hashtag(){
	$('.hashtag_clickable a').on('click',function(e){
		e.preventDefault();

		$(this).parent().toggleClass('on');
	});
}

// 비교과 카드형/리스트형 변환
function nonsubjectTypeChange(){
	var wrapper = $('.btntab_js').parent();
	wrapper.children('.btntab_js').on('click',function(){
		wrapper.children('.btntab_js').removeClass('on');
		$(this).addClass('on');
	});
}

// 교과목 이수체계도 조회
function departmentList(){
	// 기본 설정
	$('.department_list > li.on').find('.department_sublist').show();
	// 클릭시
	$('.department_list').children('li').children('a').on('click', function(){
		var target = $(this).next('.department_sublist');
		if( target.is(':visible') ){
			$(this).parent().removeClass('on');
			target.slideUp(200);
		} else {
			$(this).parent().addClass('on');
			target.slideDown(200);
		}
	});
}

// 브라우저 알림창
function browserAlert(){
	$(".browseralert_close").on("click", function() {
		$("#browseralert").slideUp();
	});
}

//페이지 상단 이동
function moveTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.move_top').addClass('on');
		} else {
			$('.move_top').removeClass('on');
		}
	});
	$('.move_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}

// 메인 슬라이드 - 메인 비주얼 
function mainSlide() {
	var mainSwiper = new Swiper('.mainbanner_slide', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.mainbanner_slide .swiper-pagination',
			clickable: true,
		},
	});
}

// 메인 슬라이드 - 메인 갤러리 
function gallerySlide1() {
	var mainSwiper = new Swiper('.maingallery_slide1 .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 30,
		speed: 500,
		navigation: {
			nextEl: '.maingallery_slide1 .arrow_next',
			prevEl: '.maingallery_slide1 .arrow_prev',
		}, 
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 10,
			}
		}
	});
}

//function gallerySlide2() {
//	var mainSwiper2 = new Swiper('.maingallery_slide2 .swiper-container', {
//		slidesPerView: 4,
//		spaceBetween: 30,
//		speed: 500,
//		navigation: {
//			nextEl: '.maingallery_slide2 .arrow_next',
//			prevEl: '.maingallery_slide2 .arrow_prev',
//		}, 
//		breakpoints: {
//			1024: {
//				slidesPerView: 3
//			},
//			768: {
//				slidesPerView: 2
//			},
//			480: {
//				slidesPerView: 1
//			}
//		}
//	});
//}

//function gallerySlide3() {
//	var mainSwiper3 = new Swiper('.maingallery_slide3 .swiper-container', {
//		slidesPerView: 4,
//		spaceBetween: 30,
//		speed: 500,
//		navigation: {
//			nextEl: '.maingallery_slide3 .arrow_next',
//			prevEl: '.maingallery_slide3 .arrow_prev',
//		}, 
//		breakpoints: {
//			1024: {
//				slidesPerView: 3
//			},
//			768: {
//				slidesPerView: 2
//			},
//			480: {
//				slidesPerView: 1
//			}
//		}
//	});
//}

// 상세검색창
function searchDetails(){
	var windowWidth = $(window).outerWidth();
	
	if (windowWidth < 768) {
		// console.log('tablet,mobile');
		$('.search_box3 .btn_detail').each(function(){
			var wrapper = $(this).parents('.search_box3');
			$(this).appendTo(wrapper);
		});
		$('.search_box3 .btn_detail').on('click', function(){
			$(this).prev('.search_detail').slideToggle(300);
		});
	}
	
	$('.search_box3 .btn_detail').on('click', function(){
		$(this).toggleClass('on');
		$(this).parent().next('.search_detail').slideToggle(300);
	});
}

// 장비선택
function rentalSelect(){ 
	$('.rent1').find('.rentselect_box > a').removeClass('on');
	$('.rentselect_box a').on('click', function (){
		$('.rent1').find('.rentselect_box > a').removeClass('on');
		$(this).addClass('on');
	}); 
}  

function rentalNext(){ 
	$('.rent_footer .btn_next').on('click', function (event){
		if($('.rentselect_box > a').hasClass('on')){
			$('.rent2 .rent_tit').addClass('on');
			$('.rent2 .rent_cnt_wrap').slideDown(); 

			event.preventDefault();
			$('html,body').animate({scrollTop:$(this).parents('.section_sarea').next().children('.equipment_rent').offset().top - 100}, 500);

		}else { 
			$('.rent2 .rent_cnt_wrap').hide(); 
		};
		if($('.rent2 .check_col input').is(':checked')) { 
			$('.rent3 .rent_tit').addClass('on');
			$('.rent3 .rent_cnt_wrap').slideDown(); 
		}else { 
			$('.rent3 .rent_cnt_wrap').hide(); 
		}
	}); 
	
	$('.rent_footer .btn_prev').click(function(event){
		event.preventDefault();

		$('html,body').animate({scrollTop:$(this).parents('.section_sarea').prev().children('.equipment_rent').offset().top - 200}, 500);
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

	// toggle class 'on' : sitemap
	toggleOn();

	// 페이징버튼 클릭시 페이지 상단부분으로 이동
	up();

	//gnb 메뉴 반응형 동작
	responsiveStyle();

	//페이지 상단으로 이동
	moveTop();

	//lnb 메뉴
	lnbMenu();

	//tab
	/*tabList();*/

	// tab 기본
	tab();

	// tab 모양만
	tabSwitch();

	// 클릭한 영역으로 이동
	gotoin();

	// accordion
	accordion();

	// tab -모양만
	/*showTab();*/

	//토글 체크박스 검색버튼
	/*checkToggle();*/

	//tab 연동
	/*tabgoto();*/

	// selectbox
	selectBox();

	// selectbox 교수 상담 시간
	selectBoxCounsel();

	// 체크박스 토글(row) : 검색창 셀렉트박스
	checkToggleRow();

	//체크박스 토글(col) : 체크박스 버튼
	checkToggleCol();

	//라디오 토글
	radioToggle();

	// 취업상담 - 방문상담/온라인상담 라디오 버튼
	radioBtn();

	// checkbox button - 찜목록
	checkBtn();

	// 클릭시 on/off 버튼 : 찜하기 버튼
	toggleBtn();

	// 별점주기
	starlevel();

	// 글자수 표기
	letterCount();

	//FAQ
	/*faqList();*/

	//가족추가
	familyList();

	// 어학, 자격증 그래프 보여주기
	viewActivepoint();

	// 포트폴리오 분석결과 높이 같게 조절
	equalHeight();

	// 콘텐츠 내 별점 셀렉트
	starLevelSelect();

	// hashtag
	hashtag();

	// 비교과 카드형/리스트형 변환
	nonsubjectTypeChange();

	// 교과목 이수체계도 조회
	departmentList();

	// 브라우저 알림창
	browserAlert();

	// 메인 슬라이드 - 메인 비주얼 
	// mainSlide();

	// 메인 슬라이드 - 메인 갤러리 
	// gallerySlide1();
	//gallerySlide2();
	//gallerySlide3();

	//장비선택
	rentalSelect();
	rentalNext();


	// 상세검색창
	searchDetails();

	// select2 설정
	$(".sel_search_row select").select2({
		formatNoMatches: function() {
			return '결과가 없습니다.';
		}
	});

	// 이미지 라이트박스
	$('.openimg').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		callbacks: {
			resize: changeImgSize,
			imageLoadComplete: changeImgSize,
			change: changeImgSize
		}
	});

	function changeImgSize() {
		var img = this.content.find('img');
		img.css('max-height', '100%');
		img.css('height', 'auto');
		img.css('width', 'auto');
		img.css('max-width', '810px');
	}

});

$(window).on("load", function () {
	tableScroll();
});

// outline 설정 - 키보드로 접근시엔 아웃라인을 보여주고 마우스로 접근할때는 아웃라인을 없애줌
(function (d) {
	var style_element = d.createElement('STYLE'),
		dom_events = 'addEventListener' in d,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				d.addEventListener(type, callback);
			} else {
				d.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	/*add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});*/
	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #193296}::-moz-focus-inner{border:dotted 1px #193296;}');
	});
})(document);


