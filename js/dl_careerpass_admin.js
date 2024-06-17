// JavaScript Document
/* 오른쪽 하단 over 탑 이동버튼 */
$(document).ready(function(){
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$("#back-to-top").fadeIn();
		} else {
			$("#back-to-top").fadeOut();
		}
	});
	// scroll body to 0px on click
	$("#back-to-top").click(function () {
		$("#back-to-top").tooltip("hide");
		$("body,html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$("#back-to-top").tooltip("show");
});

// 파일 input 설정
$(document).ready(function(){
	var fileTarget = $(".filebox .upload-hidden");
	fileTarget.on("change", function(){
		// 값이 변경되면
		if(window.FileReader){
		// modern browser
		var filename = $(this)[0].files[0].name;
		} else {
			// old IE
			var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
		}
		// 추출한 파일명 삽입
		$(this).siblings(".upload-name").val(filename);
	});
});

//멀티모달에서 이전모달 닫기
$(document).ready(function() {
	$(".pp_close_modal").on("click", function() {
		$(this).closest(".modal").modal("hide");
		//$(".pp_pre_modal").modal("hide");
	});
});

// 윈도우 리사이징 처리
$(window).resize(function() {
	if(this.resizeTO) {
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function() {
		$(this).trigger("resizeEnd");
	}, 500);
});
//$(window).on("resizeEnd", function() {
//	decideSizing();
//});//리사이징될때, 한번만 실행되게 함

/**
 * 모바일에서 테이블 변형
 */
//function decideSizing () {
//	var browserWidth = $(window).width();
//	if ((!$("#dataTable").hasClass("mobile")) && browserWidth < 768) {
//		$("#dataTable").addClass("mobile");
//		rwdTable("m");//모바일사이즈이하이고 mobile클래스가 없을때
//	} else if (browserWidth > 767) {
//		$("#dataTable").removeClass("mobile");
//		rwdTable("pc");//모바일사이즈이상일때
//	}
//};
//decideSizing();//페이지를 열었을때, 바로 실행되어서 모바일인지 판별함.

/**
 * 테이블 변경
 *
 * @param device 접속 device
 */
//function rwdTable (device) {
//	if (device == "m") {
//		$("#dataTable thead th").each(function () {
//			var index = $(this).index(); //th의 각각의 index번호
//			var txt = $(this).text(); //각각의th텍스트 저장
//			$("#dataTable tbody tr").each(function () {
//				var insertTag = "<td class='pp_th_title'>" + txt + "</td>";
//				$(this).find("td").eq(index*2).before(insertTag);
//				//기존데이터 앞에 삽입
//			});
//		});
//	} else if (device == "pc") {
//		$("#dataTable tbody tr").each(function () {
//			$(this).children().find("td.pp_th_title").remove();
//		});
//	}
//};

// css의 mediaQuery와 연계되는 js, media의 사이즈가 모바일사이즈(768px)이상이면
// mediaQuery.matches값을  true로 리턴한다.
// 즉, 처음 페이지로딩시 테블릿, PC사이즈에서는 사이드바를 줄인다.
var mediaQuery = window.matchMedia("(min-width: 768px)");
if (mediaQuery.matches) {
	$("body").addClass("sidebar-collapse");
}

// 미디어사이즈 변경에 따른 listener 추가
mediaQuery.addListener(mediaQueryTrans);
/**
 * css의 mediaQuery와 연계되는 js 구문. 아래의 변수 및 listener가 모두 필요하다.
 * 메뉴를 접고 모바일로 변경되면 메뉴에 hover시 겹칩현상이 발견되어 관련 class를 제거
 *
 * @param mediaQuery
 */
function mediaQueryTrans(mediaQuery) {
//	if (mediaQuery.matches) {
//		console.log("768px 커지면서걸림 ");
//	} else {
//		console.log("768px 작아지면서 걸림");
//	}
	if( $("body").hasClass("sidebar-collapse") === true ){
		$("body").removeClass("sidebar-collapse");
	}
}

// dataTable 기본 설정
$.fn.dataTable.ext.legacy.ajax = true;
$.extend(true, $.fn.DataTable.defaults, {
// DOM positioning 옵션
//	- l - Length changing
//	- f - Filtering input
//	- t - The Table!
//	- i - Information
//	- p - Pagination
//	- r - pRocessing
//	- < and > - div elements
//	- <"#id" and > - div with an id
//	- <"class" and > - div with a class
//	- <"#id.class" and > - div with an id and class
	dom: "<'row'<'col-sm-6 col-xs-12'li><'col-sm-6 col-xs-12 text-right'B>><'row'<'col-xs-12'rt>><'row'<'col-xs-12 text-center'p>>",
//	aLengthMenu: [[15, 30, 50, 100, -1], [15, 30, 50, 100, "All"]],
	lengthMenu : [[15, 30, 50, 100, -1], [15, 30, 50, 100, "All"]],
	responsive: true,
	searching: false,
	ordering: true,
	info: false,

	serverSide : true,
//	bPaginate : true,
	paging: true,
	pagingType: "full_numbers",
	lengthChange: true,
	processing: true,
	scrollX: true,
	scrollY : 620,
	scrollCollapse: true,
	iDisplayLength: 15,
	language: {
		sEmptyTable: "검색 결과가 존재하지 않습니다.",
		sInfo: "(총 _TOTAL_건 중 _START_ ~ _END_건)",
		sInfoEmpty: "(총 0건)",
		sInfoThousands: ",",
		sLengthMenu: "_MENU_ 건씩 보기",
		sLoadingRecords: "로딩중...",
		sProcessing: "처리중...",
//		sSearch: "검색:",
		sZeroRecords: "검색 결과가 존재하지 않습니다.",
		oPaginate: {
			sFirst: "처음",
			sLast: "끝",
			sNext: "다음",
			sPrevious: "이전"
		}
	},
	fnDrawCallback :function(oSettings) {
		$(".dataTables_scrollBody").each(function(){

			if ( oSettings.fnRecordsDisplay() < 1 ) {
				$(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
			} else {
				$(oSettings.nTableWrapper).find('.dataTables_paginate').show();
			}

			/*
			if ($('#'+$(this)[0].firstChild.id+' ttr').length < 1) {
				$('#'+$(this)[0].firstChild.id+'_wrapper .dataTables_paginate').hide();
			} else {
				$('#'+$(this)[0].firstChild.id+'_wrapper .dataTables_paginate').show();
			}
			*/

			$("#"+$(this)[0].firstChild.id + "> thead").remove();
		});
	}
});

/**
 * DataTables styling
 * @param id 데이터테이블의 ID명, null이면 최소길이에대한 제한이 없다.
 * @param tblObj 데이터테이블객체
 */
fn_DTStyling = function(id, tblObj){
	// 데이터 테이블의 영역이 그려지는 width가 1000px보다 크면 스크롤을 붙이고 작으면 100%로 표현한다.
	// 해당 테이블이 특정 사이즈 이하로 줄어드는 것을 막는다.
	if($("#"+id).innerWidth() > 1000){
		$("#"+id).wrap("<div class='pp_tblscroll_area'>");
		$("#"+id).css("width","");
	}else{
		$("#"+id).css("width","100%");
	}
}

/**
 * DataTables row선택을 위한 chechBox 추가
 * @param _colIdx	: checkBox가 위치할 컬럼. 해당 칼럼에는 data가 없어야한다!!
 * @param _type		: checkBox 타입 (멀티: multi, 싱글: os)
 * @example
		{
			style :'multi',
			selector: ' selector: 'td:first-child' '
		}
 */
fn_DTCheckBoxAdd = function(_type){
	var _rtnObj = {
			style : _type,
			selector:'td:first-child'
		};
	return _rtnObj;
}

/**
 * DataTables loading시 기본 정렬 칼럼 셋팅
 * @param _colIdx	: 정렬할 칼럼의 index
 * @param _type		: 정렬타입 (오름차순: asc, 내림차순: desc)
 * @example
		[
			[ 4, 'asc' ]
		]
 */
fn_DTOrderCol = function(_colIdx, _type){
	var _rtnObj = new Array();

	if( Array.isArray(_colIdx) ) {
		if( Array.isArray(_type) ) {
			if( _colIdx.length  == _type.length ) {
				for( var i=0; i<_colIdx.length;i++){
					_rtnObj.push([_colIdx[i], _type[i]]);
				}
			} else {
				alert('정렬파라미터 개수가 같지 않습니다.');
			}
		} else {
			for( var i=0; i<_colIdx.length;i++){
				_rtnObj.push([_colIdx[i], _type]);
			}
		}
	} else {
		if( Array.isArray(_type) ) {
			_rtnObj.push([_colIdx, _type[0]]);
		} else {
			_rtnObj.push([_colIdx, _type]);
		}
	}

	return _rtnObj;
}

/**
 * DataTables 칼럼명 셋팅
 * @param _colNmArr	: dataset 칼럼명이 정의된 배열
 * @example
		columns: [
			{data: ""},
			{data: ""},
			{data: ""},
			{data: "CPS_LOGIN_ID"},
			{data: "CPS_USER_ID"},
			{data: "CPS_USER_NM"},
			{data: "CPS_USER_DIV"},
			{data: "CPS_LOGIN_YN"}
		]
 */
fn_DTColSet = function(_colNmArr){
	var _rtnObj = [];
	for(var i = 0; i < _colNmArr.length; i++) {
		var _eleObj = { data : _colNmArr[i] };
		_rtnObj.push(_eleObj);
	}
	return _rtnObj;
}

/**
 * DataTables 전체 칼럼에 대한 정의/렌더링 전체칼럼의 null값과 searchable (datatables의 기본 검색 기능 사용 여부)
 * @param _dftCont	: null 값에 대한 defaultContent
 * @example
		{
			targets: "_all",
			defaultContent: "",
			searchable : false
		}
 */
fn_DTColDefAll = function(_dftCont){
	var _rtnObj = {
			targets: "_all",
			defaultContent: _dftCont,
			searchable : false
		};
	return _rtnObj;
}

fn_DTColDefArr = function(_colArr,_dftCont){
	var _rtnObj = {
			targets: _colArr,
			defaultContent: _dftCont,
			searchable : false
		};
	return _rtnObj;
}

/**
 * DataTables 인자로 전달받은 칼럼 배열 정의/렌더링
 * @param _colArr	: 정의할 칼럼 배열 (필수)
 * @param _classNm	: 사용할 클래스명
 * @param _isOrder	: orderable의 값 (true/false)
 * @param _renderFn	: 렌더링 함수
 * @example
		{
			targets: [0],
			className: 'text-center',
			orderable: false
			_renderFn: ''
		}
 */
fn_DTColDefOne = function(_colArr, _classNm, _isOrder, _renderFn){
	var _rtnObj = {
			targets: _colArr
		};
	if (_classNm != null){
		_rtnObj.className = _classNm;
	}
	if (_isOrder != null){
		_rtnObj.orderable = _isOrder;
	}
	if (_renderFn != null){
		_rtnObj.render = _renderFn;
	}
	return _rtnObj;
}

/**
 * DataTables 인자로 전달받은 칼럼 배열을 날짜형으로 변환 시켜준다.
 * @param _colArr	: 정의할 칼럼 배열 (필수)
 * @param _classNm	: 사용할 클래스명
 * @param _isOrder	: orderable의 값 (true/false)
 * @example
		{
			targets: [2],
			className: 'text-center',
			orderable: false
		}
 */
fn_DTColRenderDate = function(_colArr, _classNm, _isOrder){
	var _rtnObj = {
			targets: _colArr
		};
	if (_classNm != null){
		_rtnObj.className = _classNm;
	}
	if (_isOrder != null){
		_rtnObj.orderable = _isOrder;
	}
	_rtnObj.render = function(data){
		// 날짜 타입을 가져오면 milliseconds로 가져오기때문에 표시할때는 yyyy-mm-dd로 변경한다. >> 추후 날짜를 위한 공용
		return $.datepicker.formatDate("yy-mm-dd", new Date(data));
	};
	return _rtnObj;
}


fn_DTColDefHidden = function(_colArr){
	var _rtnObj = {
			targets: _colArr,
			orderable : true,
			searchable : false,
			className: "center",
			visible: false
		};
	return _rtnObj;
}


/**
 * DataTables 각졸 출력 버튼 생성 함수
 * @param _title				: 출력시 제목
 * @param _colLength			: 컬럼 갯수
 * @param _excludeColIdxArr		: 출력시 제외 할 컬럼의 인덱스 배열 (제외할 컬럼이 없으면 null
 * @param _exportType			: 각 버튼의 구분값 (e:엑셀,f:PDF,c:복사,v:CSV,p:프린트)
 * @example
		$(document).ready( function() {
			$('#dataTableIdNm').dataTable({
				buttons: [
					fn_DTbtnCreate("만족도조사 목록", 7, null, "e"),
					fn_DTbtnCreate("만족도조사 목록", 7, [1,2], "f")
				]
			});
		});
 */
fn_DTbtnCreate = function(_title, _colLength, _excludeColIdxArr, _exportType) {
	var _colArr = [];	// 컬럼 배열
	var _rtnObj = {};	// return 객체

	// 배열을 컬럼 갯수 만큼 증가 시킨다.
	for(var i = 0; i < _colLength; i++) {
		_colArr.push(i);
	}

	// 제외배열을 통해 출력물에서 뺀다.
	if(_excludeColIdxArr != null) {
		for(var i = 0; i < _excludeColIdxArr.length; i++) {
			var index = _colArr.indexOf(_excludeColIdxArr[i]);
			if(index != -1) {
				_colArr.splice(index, 1);
			}
		}
	}

	if(_exportType == "e") {
		_rtnObj = {
			extend: "excelHtml5",
			title: _title,
			text: "<i class='fa fa-file-excel-o'></i>&nbsp;Excel",
			exportOptions: {
				columns : _colArr
			},
			customize: function( xlsx ) {
				var sheet = xlsx.xl.worksheets["sheet1.xml"];
				$("c[r=A1]", sheet).attr( "s", "7" );
			}
		}
	}
	/*else if(_exportType == "f") {
		_rtnObj = {
			extend: 'pdfHtml5',
			charset: 'UTF-8',
			pageSize: 'A4',
			title: _title,
			text: "<i class='fa fa-file-pdf-o'></i>&nbsp;PDF",
			exportOptions: {
				columns : _colArr
			}
		}
	} else if(_exportType == "c") {
		_rtnObj = {
			extend: "copyHtml5",
			title: _title,
			text: "<i class='fa fa-files-o'></i>&nbsp;Copy",
			exportOptions: {
				columns : _colArr
			}
		}
	} else if(_exportType == "v") {
		_rtnObj = {
			extend: "csvHtml5",
			bom: 'UTF-8',
			charset: 'UTF-8',
			title: _title,
			text: "<i class='fa fa-files-o'></i>&nbsp;CSV",
			exportOptions: {
				columns : _colArr
			}
		}
	}else if(_exportType == "p") {
		_rtnObj = {
			extend: "print",
			className: "btn btn-sm btn-default",
			title: _title,
			text: "<i class='fa fa-print'></i>&nbsp;Print",
			exportOptions: {
				columns : _colArr
			}
		}
	}*/
	return _rtnObj;
};

fn_DTbtnAllCreate = function(_title, _colLength, _excludeColIdxArr){
	var _colArr = [];	// 컬럼 배열

	// 배열을 컬럼 갯수 만큼 증가 시킨다.
	for(var i = 0; i < _colLength; i++) {
		_colArr.push(i);
	}

	// 제외배열을 통해 출력물에서 뺀다.
	if(_excludeColIdxArr != null) {
		for(var i = 0; i < _excludeColIdxArr.length; i++) {
			var index = _colArr.indexOf(_excludeColIdxArr[i]);
			if(index != -1) {
				_colArr.splice(index, 1);
			}
		}
	}


var _rtnArr = [
	/*{
		extend: "copyHtml5",
		title: _title,
		text: "<i class='fa fa-files-o'></i>&nbsp;Copy",
		exportOptions: {
			columns : _colArr
		}
	},{
		extend: "csvHtml5",
		bom: 'UTF-8',
		charset: 'UTF-8',
		title: _title,
		text: "<i class='fa fa-files-o'></i>&nbsp;CSV",
		exportOptions: {
			columns : _colArr
		}
	},*/
	{
		extend: "excelHtml5",
		title: _title,
		text: "<i class='fa fa-file-excel-o'></i>&nbsp;Excel",
		exportOptions: {
			columns : _colArr
		},
		customize: function( xlsx ) {
			var sheet = xlsx.xl.worksheets["sheet1.xml"];
			$("c[r=A1]", sheet).attr( "s", "7" );
		}
	}
	/*,{
		extend: "print",
		className: "btn btn-sm btn-default",
		title: _title,
		text: "<i class='fa fa-print'></i>&nbsp;Print",
		exportOptions: {
			columns : _colArr
		}

	}*/
	];
	return _rtnArr;
};


//ajax error 처리
$.ajaxSetup({
	error:function(x,e){
		if(x.status==0){
			alert("네트워크가 종료되었습니다.");
		}else if(x.status==404){
			alert("요청하신 주소를 찾을 수 없습니다.");
		}else if(x.status==500){
			alert("잠시후 다시 시도해 주시기 바랍니다.\n 반복된다면 관리자에게 문의하시기 바랍니다.");
		}else if(e=="parsererror"){
			alert("Error.nParsing JSON Request failed.");
		}else if(e=="timeout"){
			alert("Request Time out.");
		}else {
			alert("Unknow Error/n"+x.responseText);
		}
		window.location.replace("/admin/index.do");
	}
});

// data, time picker 및 checkbox/radio 버튼 색깔
$(function() {
	//Date picker 초기화
	$(".datepicker").datepicker();
})

// 부트스트랩과 체크에디터의 버그 픽스
// 부트스트렙 팝업창에 체크에디터가 들어가면 에디터의 툴팁이 나오다 사라지는 버그가 있다.
// bootstrap-ckeditor-fix.js
// hack to fix ckeditor/bootstrap compatiability bug when ckeditor appears in a bootstrap modal dialog
//
// Include this file AFTER both jQuery and bootstrap are loaded.
$.fn.modal.Constructor.prototype.enforceFocus = function() {
	modal_this = this;
	$(document).on("focusin.modal", function (e) {
		if (modal_this.$element[0] !== e.target
				&& !modal_this.$element.has(e.target).length
				&& !$(e.target.parentNode).hasClass("cke_reset_all")) {
			modal_this.$element.focus();
		}
	})
};

/**
 * 영문, 숫자 와 자릿수 제한 설정
 *
 * @param $obj jquery object
 * @param minCnt 최소 자릿수
 * @param maxCnt 최대 자릿수
 * @returns {Boolean}
 */
function rtnChkEngNum($obj, minCnt, maxCnt){
	var regExp = new RegExp("^[A-Za-z0-9]{"+minCnt+","+maxCnt+"}$");

	if( $obj.val().length < minCnt || !regExp.test($obj.val())) {
		alert("영문과 숫자 "+minCnt+"~"+maxCnt+"자 이내로 입력하세요.");
		$obj.focus();
		return false;
	} else {
		return true;
	}
}

/**
 * email 형식 체크
 *
 * @param $obj jquery object
 * @returns {Boolean}
 */
function rtnChkEmail($obj) {
	var emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

	if (!emailExp.test($obj.val())) {
		alert("이메일 형식을 확인해 주세요.");
		$obj.focus();
		return false;
	} else {
		return true;
	}
}

/**
 * 바이트 문자 입력가능 문자수 체크
 *
 * @param $obj : jquery object
 * @param maxLength : 최대 입력가능 수 (byte)
 * @returns {Boolean}
 */
function rtnChkLength($obj, maxLength){
	// maxLengh값이 없으면 512byte로 제한
	if(maxLength == null) {
		maxLength = $obj.attr("maxLength") != null ? $obj.attr("maxLength") : 512;
	}

	var kByte = 3; //한글의 byte 수
	var rtnByte = chkByte($obj, kByte);

	if(Number(rtnByte) > Number(maxLength)) {
		alert("입력가능한 범위를 초과하였습니다. ("+rtnByte+"/"+maxLength+"Byte)"
				+"\n - 영문, 숫자, 일반 특수문자는 글자당 1Byte 이며,"
				+"\n - 한글, 한자, 기타 특수문자는 글자당 "+kByte+"Byte 입니다");
		$obj.focus();
		return false;
	} else {
		return true;
	}
}

/**
 * 바이트수 반환
 *
 * @param $obj : jquery object
 * @param kByte : 한글 or 한자등의 byte 수
 * @returns {Number}
 */
function chkKByte($obj, kByte){
	// kByte값이 없으면 3byte로 처리
	if(kByte == null) {
		kByte = 3;
	}

	var codeByte = 0;
	for (var idx = 0; idx < $obj.val().length; idx++) {
		var oneChar = escape($obj.val().charAt(idx));
		if ( oneChar.length == 1 ) {
			codeByte ++;
		} else if (oneChar.indexOf("%u") != -1) {
			codeByte += kByte;
		} else if (oneChar.indexOf("%") != -1) {
			codeByte ++;
		}
	}
	return codeByte;
}

/**
 * iCheck.js를 사용하는 체크박스에 대한 체크박스 컨트롤
 *
 * @param $allCheckObj	: 전체 체크용 체크박스 객체 (보통 id selector)
 * @param $checksObj	: 부분 체크용 체크박스들의 객체 (보통 class selector)
 */
function checkboxHandling($allCheckObj, $checksObj) {
	// 체크박스가 바뀌면 전체 체크박스 영역을 바꾸고 업데이트
	$checksObj.on("ifChanged", function(event) {
		if ($checksObj.filter(":checked").length == $checksObj.length) {
			$allCheckObj.prop("checked", true);
		}else{
			$allCheckObj.prop("checked", false);
		}
		$allCheckObj.iCheck("update");
	});

	// 전체 체크에 따라 체크박스의 체크 처리
	$allCheckObj.on("ifChecked ifUnchecked", function(event) {
		if(event.type == "ifChecked") {
			$checksObj.iCheck("check");
		} else {
			$checksObj.iCheck("uncheck");
		}
	});
};

/**
 * datePicker 시작일, 종료일 비교
 * @param $sObj			: 시작일의 객체
 * @param $eObj			: 종료일의 객체
 * @example
		$("#opEndDt").on("change", function() {
			fn_compareTwoDate($("#opStrDt"), $("#opEndDt"));
		});
 */
fn_compareTwoDate = function($sObj, $eObj) {

	var sDt, eDt;

		var sDate = $sObj.val();
		var eDate = $eObj.val();

		if( sDate || eDate ){

				if( sDate && eDate ){

						sDt = new Date(sDate);
						eDt = new Date(eDate);

						if( sDt > eDt) {
								alert("종료 일자를 확인 해 주십시오.");
								$eObj.val("");
								return false;
						}
						return true;
				} else {
						alert("시작일과 종료일을 넣어 주시기 바랍니다.");
						return false;

				}
		} else {
				return true;
		}
};


