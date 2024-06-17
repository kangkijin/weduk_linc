
var basePath = sessionStorage.getItem("contextRootPath");

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////팝업 관련////////////////////////////////////////

// contents를 load후 팝업
loadPopup = function(popupDivId, popupUrl, popupParams) {

	if (popupUrl != null) {
		// 해당 영역을 지우고 ajax load를 이용하여 컨텐츠를 로딩한다.
		$(popupDivId).empty();
		$(popupDivId).load(popupUrl, popupParams, function() {
		});
	}
};

// 클라이언트 팝업
clientLoadPopup = function(popupDivId, popupUrl, popupParams) {

	if(popupUrl != null) {
		// 해당 영역을 지우고 ajax load를 이용하여 컨텐츠를 로딩한다.
		$(popupDivId).empty();
		$(popupDivId).load(popupUrl, popupParams, function() {
			$.magnificPopup.open({
				items: {
					src: popupDivId
				}
				, type: "inline"
				, enableEscapeKey : false
			});
		});
	}
};

// 팝업 닫기
closePopup = function() {
	$('#COMMON_POP_UP_CLOSE_BTN').trigger('click');
};
// 푸터 팝업 닫기
fooClosePopup = function(){
	$(".pop_close").trigger("click");
};

/**
 * 반려 팝업
 * @param
 */
function fnOpenRejectPopUp( rjctTitle, rjctContParamId ){
	$('#POPUP_OPEN_BTN').trigger('click');

	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/cmm/fms/getRejectStatePopUp.do";
	var popupParams = {
		rjctTitle : rjctTitle
		, rjctContParamId : rjctContParamId
	}

	loadPopup(popupDivId, popupUrl, popupParams);
}

/**
 * 담당자 조회 공통 팝업
 * @param searchKeyword = 기작성 데이터
 *
 * @param mngType
 * comments : client or admin
 *
 * @param stfTagId = 값이 들어갈 태그의 아이디
 * comments :
 *  담당자 고유 번호 : '${stfTagId}'+"No"
 *  담당자 이름 : '${stfTagId}'+"Nm"
 *
 * @param searchCondition = 검색 구분
 * comments :
 *  이름(addKorNm), 부서(addSustNm)
 *
 *  @param searchFlag = 검색 후 조회 여부
 * comments :
 *  즉시 조회 : Y
 *  검색 후 조회 : N
 */
function fnOpenStaffListPopUp(searchKeyword, mngType, stfTagId, searchFlag) {
	$('#POPUP_OPEN_BTN').trigger('click');

	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/cmm/fms/getStaffListPopUp.do";
	var popupParams = {
		// search params
		searchKeyword : searchKeyword
		, searchCondition : 'addKorNm'
		, searchFlag : searchFlag

		// data division params
		, mngType : mngType
		, stfTagId : stfTagId
	};

	loadPopup (popupDivId, popupUrl, popupParams);
}

/**
 * 학생 조회 공통 팝업
 * @param searchKeyword = 기작성 데이터
 *
 * @param stfTagId = 값이 들어갈 태그의 아이디
 * comments :
 *  학생 고유 번호 : '${stfTagId}'+"No"
 *  학생 이름 : '${stfTagId}'+"Nm"
 *
* @param searchCondition = 검색 구분
 * comments :
 *  이름(addKorNm)_default, 학번(addStdNo)
 *
 *  @param searchFlag = 검색 후 조회 여부
 * comments :
 *  즉시 조회 : Y
 *  검색 후 조회 : N
 *
 *  @param selectFlag = 복수 값 선택 여부
 * comments :
 *  복수 값 선택 : CHECK (예 : 집단 상담의 학생 복수 선택)
 *  단일 선택 : RADIO
 */
function fnOpenStudentListPopUp(searchKeyword, stfTagId, searchFlag, selectFlag) {
	$('#POPUP_OPEN_BTN').trigger('click');

	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/cmm/fms/getStudentListPopUp.do";
	var popupParams = {
		// search params
		searchKeyword : searchKeyword
		, searchCondition : 'addKorNm'
		, searchFlag : searchFlag
		, selectFlag : selectFlag

		// data division params
		, stfTagId : stfTagId
	};

	loadPopup (popupDivId, popupUrl, popupParams);
}

/**
 * 부서 조회 공통 팝업
 * @param searchKeyword = 기작성 데이터
 *
 * @param menuGubun
 * comments : 선택 값이 어느 id 혹은 name 에 담겨야 하는지 지정 (부여 희망시 selectDeptListPop.jsp 에 소스 추가 필수)
 * 	(예, 비교과 운영부서 : ncrDept / 비교과 참여학과 : npiPartiDept )
 *  (미 입력시 'id'가 'deptCd', 'deptNm' 인 태그에 각각 '부서 코드', '부서 명'이 value로 입력됨) **
*
 * @param typeDiv
 * comments :
 * 	SREG : 학생 정보에서 가져온 부서 정보
 *  DEPT : 부서 정보에서 가져온 부서 정보
 *  APPLY_STD : 학생 신청 정보에서 가져온 부서 정보
 *
 * @param deptDiv
 * comments :
 * typeDiv 가 SREG 또는 APPLY_STD일 때,
 *  전공 : M, 학과 : H
 * typeDiv 가 DEPT일 때,
 *  대학 : C, 전공 : M, 학과 : H, 일반 : N, 캠퍼스 : P
 *
 * @param searchFlag = 검색 후 조회 여부
 * comments :
 *  즉시 조회 : Y
 *  검색 후 조회 : N
 *
 * @param 추가 희망하는 param은 /cmm/fms/getDeptPopList.do 의 CommonDefaultVO 참조
 * comments : (예, deptCd, deptUpCd, pageIndex 등)
 */
function fnOpenDeptListPopup(searchKeyword, menuGubun, typeDiv, deptDiv, searchFlag, remarksA){
	$('#POPUP_OPEN_BTN').trigger('click');

	var popupDivId = "#layerPopup";
	var popupUrl = basePath + "/cmm/fms/getDeptPopList.do";
	var popupParams = {
		// search params
		searchKeyword : searchKeyword
		, searchFlag : searchFlag

		// data division params
		, menuGubun : menuGubun
		, typeDiv : typeDiv
		, deptDiv : deptDiv
		, remarksA : remarksA
	};

	loadPopup (popupDivId, popupUrl, popupParams);
}

/**
 * 학생 이력 조회 공통 팝업
 * @param stdNo = 학생 학번
 * @param referKeyId = 참조 키가 있을 시 활용
 */
function fnOpenStdHisListPopUp( stdNo, referKeyId ) {
	var url	= "/cmm/fms/getStdHisPopUp.do?stdNo=" + stdNo;
	if( referKeyId !== undefined && referKeyId != "" ) url += "&referKeyId=" + referKeyId;

	window.open(url, "popForm" ,"toolbar=no, directories=no, scrollbars=yes, resizable=no, status=no, menubar=no, width=1080, height=830, right=10 top=10");
}

/**
***************************************
@ function : 태그 검색 팝업 열기
@ comment  :
@ param    : _searchParam
@ history  : 2021-01-13 (최초작성)
****************************************
**/
function fnOpenSearchTagPopUp(_searchParam) {
	$.ajaxSetup({cache:false});
	var popupDivId = "#layerPopup"; // 팝업이 들어가는 div의 id
	var popupUrl =  basePath+"/cmm/fms/getTagSearchPopup.do"; // 팝업 내용을 호출하는 url
	var popupParams = {
		searchParam : _searchParam
	}; // 팝업 호출시의 파라미터
	clientLoadPopup (popupDivId, popupUrl, popupParams);
}

/**
***************************************
@ function : fnGoLoginPopUp
@ comment  :
@ history  :
****************************************
**/
function fnGoLoginPopUp(url) {

	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/login/a/n/goOpenLoginPopUp.do";
	var popupParams = {targetUrl : url};

	//local 접속시
	if(basePath.indexOf('localhost') != -1 || basePath.indexOf('careerpass') != -1 ){

		$(popupDivId).load(popupUrl, popupParams, function(){
			$.magnificPopup.open({
				items: {
					src: popupDivId
				}
				, type: "inline"
				, enableEscapeKey : false
			});
		});
	}else{
		//상용접속시
		location.href = "https://sso.snu.ac.kr/snu/ssologin.jsp?si_redirect_address=https://mylearn.snu.ac.kr/sso/sso.jsp";
	}
}

/**
***************************************
@ function : 엑셀업로드 실패시 실패사유 팝업
@ comment  :
@ param    : _totalCnt
@ param    : _failCnt
@ param    : _successCnt
@ history  : 2019-12-04 (최초작성)
****************************************
**/
function fnExcelFailPop(_totalCnt ,_failCnt, _successCnt, _infoArray) {
	$.ajaxSetup({ cache : false });
	$("#POPUP_OPEN_BTN").trigger("click");

	console.log(_infoArray);

	setTimeout(function() {}, 4000);

	var popupDivId = "#layerPopup"; // 팝업이 들어가는 div의 id
	var popupUrl = basePath+"/cmm/fms/getUploadFailInfo.do";
	var popupParams = {
			totalCnt : _totalCnt
			,failCnt : _failCnt
			,successCnt : _successCnt
			,infoArray : _infoArray
	}// 팝업 호출시의 파라미터

	loadPopup(popupDivId, popupUrl, popupParams);
}




///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////VALIDATION//////////////////////////////////////

//숫자만 입력 가능
fn_numberOnly = function($obj) {
	$obj.keyup(function(event) {
		if (event.which && (event.which <= 47 || event.which >= 58)
				&& event.which != 8) {
			event.preventDefault();
		}
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
	});
};

// 체크박스 체크
$.fn.emptyCheckBox = function() {
	if (!$(this).is(":checked")) {
		alert($(this).attr("title") + " 값을 체크해 주세요.");
		//상단으로 올리기
		$("html").scrollTop(0);
		$(this).focus();
		return false;
	}
	return true;
};

// 바이트 체크
$.fn.byteCheck = function(maxByte) {
	var codeByte = 0;
	var objLength = $(this).val().length;
	var stsBool = true;

	for (var i = 0; i < objLength; i++) {
		var oneChar = escape($(this).val().charAt(i));
		if (oneChar.length == 1) {
			codeByte++;
		} else if (oneChar.indexOf("%u") != -1) {
			codeByte += 3;
		} else if (oneChar.indexOf("%") != -1) {
			codeByte++;
		}

		if (Number(codeByte) > Number(maxByte)) {
			alert($(this).attr("title") + "의 입력 가능한 바이트수를 초과하였습니다.\n(byte제한: "
					+ maxByte + " byte)");
			// 글자수 삭제
			var objText = $(this).val().substring(0, i);
			$(this).val(objText);
			$(this).focus();
			stsBool = false;
			break;
		}
	}

	return stsBool;
};

//소수점 입력 클래스로
$(document).on("keypress", ".decimalPNum", function(evt) {
	if(event.keyCode != 13){

		var charCode = (evt.which) ? evt.which : event.keyCode;

		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			alert("소수점 숫자로만 입력이 가능합니다.");
	//		this.value = this.value.replace(/[^0-9]/g, "");
			return false;
		}

		// Textbox value
		var _value = event.srcElement.value;


		// 소수점(.)이 두번 이상 나오지 못하게
		var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가

		if (_pattern0.test(_value)) {

			if (charCode == 46) {
				alert("소수점은 하나만 입력이 가능합니다.");
				this.value = _value;
				return false;
			}
		}

		// 소수점 첫째자리까지만 입력가능
			var _pattern2 = /^\d{2}[.]\d{2,3}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가

			if (_pattern2.test(_value)) {

					this.value = _value;
					return false;
			}

		this.value = _value;
	}
});

//한글 입력 방지(keypress와 함께 사용해야 함)
$(document).on("keyup", ".decimalPNum", function() {
	if (event.keyCode != 13) {
		var _patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

		if (_patternKor.test(event.srcElement.value)) {
			alert("소수점 숫자로만 입력 가능합니다.");
			this.value = this.value.replace(/[^0-9.]/g, "");
			return false;
		}
	}
});

// 소수점 입력 클래스로 + 함수
function decimalPNum(){
	$(document).on("keypress", ".decimalPNum", function(evt) {
		if(event.keyCode != 13){

			var charCode = (evt.which) ? evt.which : event.keyCode;

			if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
				alert("소수점 숫자로만 입력이 가능합니다.");
		//		this.value = this.value.replace(/[^0-9]/g, "");
				return false;
			}

			// Textbox value
			var _value = event.srcElement.value;


			// 소수점(.)이 두번 이상 나오지 못하게
			var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가

			if (_pattern0.test(_value)) {

				if (charCode == 46) {
					alert("소수점은 하나만 입력이 가능합니다.");
					this.value = _value;
					return false;
				}
			}

			// 소수점 첫째자리까지만 입력가능
				var _pattern2 = /^\d{2}[.]\d{2,3}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가

				if (_pattern2.test(_value)) {

						this.value = _value;
						return false;
				}

			this.value = _value;
		}
	});

	//한글 입력 방지(keypress와 함께 사용해야 함)
	$(document).on("keyup", ".decimalPNum", function() {
		if (event.keyCode != 13) {
			var _patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

			if (_patternKor.test(event.srcElement.value)) {
				alert("소수점 숫자로만 입력 가능합니다.");
				this.value = this.value.replace(/[^0-9.]/g, "");
				return false;
			}
		}
	});
}

// 소수점 입력 클래스로(성과지표 관리)
$(document).on("keypress", ".indicatorNum", function(evt) {
	if (event.keyCode != 13) {
		var charCode = (evt.which) ? evt.which : event.keyCode;

		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			alert("소수점 숫자로만 입력 가능합니다.");
			return false;
		}

		// Textbox value
		var _value = event.srcElement.value;

		// 소수점(.)이 두번 이상 나오지 못하게
		var _patternDot = /^\d*[.]\d*$/; // 현재 value값에 소수점(.)이 있으면 '.' 입력불가

		if (_patternDot.test(_value)) {
			if (charCode == 46) {
				alert("소수점은 하나만 입력 가능합니다.");
				this.value = _value;
				return false;
			}
		}

		// 소수점 셋째자리까지만 입력가능
		var _patternDeci = /^\d*[.]\d{3}$/; // 현재 value값이 소수점 셋째 짜리 숫자이면 더이상 입력 불가

		if (_patternDeci.test(_value)) {
			alert("소수점은 셋째 짜리까지 만 입력 가능합니다.");
			this.value = _value;
			return false;
		}

		this.value = _value;
	}
});

//소수점 입력 클래스로(성과지표 관리 - 한글 입력 방지(keypress와 함께 사용해야 함))
$(document).on("keyup", ".indicatorNum", function() {
	if (event.keyCode != 13) {
		var _patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

		if (_patternKor.test(event.srcElement.value)) {
			alert("소수점 숫자로만 입력 가능합니다.");
			this.value = this.value.replace(/[^0-9.]/g, "");
			return false;
		}
	}
});

// 숫자만 입력 클래스로
$(document).on("keyup focusout", ".numberOnly", function(e) {
	this.value = this.value.replace(/[^0-9]/g, "");
});

// 숫자만 입력 클래스로 + 함수
function numberOnly(){
	$(document).on("keyup focusout", ".numberOnly", function(e) {
		this.value = this.value.replace(/[^0-9]/g, "");
	});
}

// 입력 문자 바이트 체크
// obj: 자바스크립트 object
// maxByte: 체크할 byte수 (DB Byte)
function chkByte(obj, maxByte) {
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for (var i = 0; i < str_len; i++) {
		one_char = str.charAt(i);
		if (escape(one_char).length > 4) {
			rbyte += 3; // 한글3Byte
		} else if (str.charCodeAt(i) == 10) {
			rbyte += 2; // 엔터는 2byte
		} else {
			rbyte++; // 영문 등 나머지 1Byte
		}

		if (rbyte <= maxByte) {
			rlen = i + 1; // return할 문자열 갯수
		}
	}

	if (rbyte > maxByte) {
		var max = Math.floor(maxByte / 3);
		alert("한글 " + max + "자 / 영문 " + maxByte + "자를 초과 입력할 수 없습니다.");
		str2 = str.substr(0, rlen - 1); // 문자열 자르기
		obj.value = str2;
		chkByte(obj, maxByte);
	}
}

//콤마 찍기
function comma(str){
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 콤마 풀기
function uncomma(str){
	str = String(str);
	return str.replace(/[^\d]+/g, '');
}

//input 값 입력시 콤마 찍기 키업 이벤트로
function commaKeyUp(obj){
	obj.value = comma(uncomma(obj.value));
}

//html tag 제거
function removeTag(str){
	str = String(str);
	return str.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi," ").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

//가로스크롤
$(document).on("mousewheel", ".rowScrollEvent", function(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
	var wheelDelta = e.originalEvent.wheelDelta;
	if(wheelDelta > 0){
		//console.log("up");
		$(this).scrollLeft(-wheelDelta*5 + $(this).scrollLeft());
	}else{
		//console.log("down");
		$(this).scrollLeft(-wheelDelta*5 + $(this).scrollLeft());
	}
});

//input[type=file] 초기화
fn_clearFileBox = function(id){
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		// ie 일때 input[type=file] init.
		$("#"+id).replaceWith( $("#"+id).clone(true) );
		$("#"+id+"Name").val("");
	} else {
		// other browser 일때 input[type=file] init.
		$("#"+id).val("");
		$("#"+id+"Name").val("");
	}
}

fn_check_reg_exp_tel = function(formId,tagId){
	var telChk = /^\d{2,3}-\d{3,4}-\d{4}$/;
	var flag = true;
	if(!telChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("전화번호 형식이 올바르지 않습니다.\n - 를 포함한 숫자만 입력하세요.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

fn_check_reg_exp_cel = function(formId, tagId){
	var celChk = /^\d{3}-\d{3,4}-\d{4}$/;
	var flag = true;
	if(!celChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("휴대전화 형식이 올바르지 않습니다.\n - 를 포함한 숫자만 입력하세요.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

fn_check_reg_exp_email = function(formId, tagId){
	var emailChk = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var flag = true;
	if(!emailChk.test($('#'+formId+" "+'#'+tagId).val())){
		alert("이메일 형식이 올바르지 않습니다.");
		$('#'+formId+" "+'#'+tagId).focus();
		flag = false;
	}
	return flag;
};

sessionInvalidate = function() {
	$.ajax({
		url : sessionStorage.getItem("contextRootPath") + "/login/a/n/sessionInvalidateForDevAjax.do"
		, success : function() {
			console.log("session invalidate success!");
		}
	});
};

//휴대폰 번호 자동으로 하이픈 넣기
function fnReplaceHpNumber(hPNumber) {
	var orHpNum = "";
	var regNumber = /^[0-9]*$/;
	var replaceHpNumber = "";
	orHpNum = hPNumber.replace(/\-/g,'');

	if(!regNumber.test(orHpNum)) {
			console.log("휴대폰 양식이 올바르지 않습니다. 확인 부탁 드립니다.");
			return;
	}
	replaceHpNumber = orHpNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")
	return replaceHpNumber;
}

/**
 * Null Object 체크
 * @param el
 * @returns
 */
function isNullObject(el) {
	return (el == null || el == "undefined" || typeof el == "undefined") ? true : false;
}

/**
 * Null 체크
 * @param el
 * @returns
 */
function isEmpty(el) {
	return (el == null || el == "" || typeof el == "undefined") ? true : false;
}

/**
* 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
* @param str				: 체크할 문자열
* @param defaultStr	: 문자열이 비어있을경우 리턴할 기본 문자열
*/
function nvl(str, defaultStr){

	if(typeof str == "undefined" || str == null || str == "")
		str = defaultStr ;

	return str;
}

/**
 * 인풋값 Null체크
 * @param id
 * comment :
 */
function fnChkIsNull(idName){
	var msg = "";

	for(var idx = 0; idx< idName.length; idx++){
		if (document.getElementById(idName[idx]).value == "") {
			var chkType = document.getElementById(idName[idx]).type;
			var chkval = document.getElementById(idName[idx]).value;
			var chkTitle = document.getElementById(idName[idx]).title;
			// console.log("chkType::"+chkType + "\n idName["+idx+"]::::"+idName[idx] +"\n:::\nchkval::"+chkval);

			if(chkType =="select-one"){
				msg = chkTitle+"(을)를 선택해 주세요.";
			}else if(chkType =="hidden"){
				msg = chkTitle+"(을)를 진행해 주세요";
			}else if(chkType =="text"){
				msg = chkTitle+"(을)를 입력해 주세요";
			}else if(chkType =="password"){
				msg = chkTitle+"(을)를 입력해 주세요";
			}else if(chkType =="number"){
				msg = chkTitle+"(을)를 입력해 주세요";
			}else if(chkType =="textarea"){
				msg = chkTitle+"(을)를 작성해 주세요";
			}else {
				alert("정의 되지 않은 체크 타입 입니다. \n chkType::"+chkType+"정의 후 사용해 주시기 바랍니다."  );
				return false;
			}
			alert(msg);
			document.getElementById(idName[idx]).focus();
			return false;
		}
	}
	return true;
}

/**
 * 날짜 비교
 * @param _startDateId	= 시작일 ID
 * @param _endDateId	= 종료일 ID
 * comment :
 */
function isCompareData(_startDateId , _endDateId) {
	var toDayDate = new Date(); // 시작일
	var startDate = new Date($("#"+_startDateId).val()); // 시작일
	var endDate = new Date($("#"+_endDateId).val());     // 종료일
	var startDateTitle =$("#"+_startDateId).attr("title");
	var endDateTitle =$("#"+_endDateId).attr("title");

	/*
		if((toDayDate <= startDate) == false ) {
			alert(startDateTitle+"은 금일 과 같은 날이거나 금일 보다 과거일 수 없습니다.");
			document.getElementById(_startDateId).focus();
			return false;
		}
	*/

	if((startDate <= endDate) == false ) {
		alert(startDateTitle+"은 "+endDateTitle+" 보다 과거일 수 없습니다.");
		document.getElementById(_startDateId).focus();
		return false;
	}
	return true;
}

/**
 * 날짜 비교 - 모집기간 끝과 운영기간 시작 비교
 * @param _startDateId	= 시작일 ID
 * @param _endDateId	= 종료일 ID
 * comment :
 */
function isCompareDataEach(_startDateId , _endDateId) {
	var toDayDate = new Date(); // 시작일
	var startDate = new Date($("#"+_startDateId).val()); // 시작일
	var endDate = new Date($("#"+_endDateId).val());     // 종료일
	var startDateTitle =$("#"+_startDateId).attr("title");
	var endDateTitle =$("#"+_endDateId).attr("title");

	if((startDate <= endDate) == false ) {
		alert(startDateTitle+"은 "+endDateTitle+" 보다 과거여야 합니다.");
		document.getElementById(_startDateId).focus();
		return false;
	}
	return true;
}

function cancleBackSpaceKey(e, type) {
	if(type == true){
		//input textarea 백스페이스 허용 그외의 구간 백스페이스 제한
			if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
					if(e.keyCode === 8){
					return false;
					}
			}
		//readonly 백스페이스  제한
			if(e.target.readOnly){
					if(e.keyCode === 8){
					return false;
					}
			}
	}
}

function chkComma(obj){
	if(obj.value.indexOf(",") != -1){
		obj.value = obj.value.replace(",", " ");
		alert(" , 를 입력할 수 없습니다.");
	}
};

function IsAlphaNumeric(ee) {
	var inputChar = String.fromCharCode(event.keyCode);
	var ret = false;

	if (inputChar == "" && inputChar == null) {
			ret = false;
	} else {
			if (inputChar.search(/[a-z0-9]+$/gi) >= 0) { ret = true; } else { ret = false; }
	}
	// error message
	if (!ret) {
			alert("영어와 숫자만 입력 가능. \n char:" + String.fromCharCode(event.keyCode) + ", keycode: " + event.keyCode);
	}
	return ret;
}

/**
*********************************************************
@ function :  validation empty check by class
@ comment  :
@ history  : 2019-05-17 (최초작성)
**********************************************************
**/
function fnEmptyCheckByClass(){
	var getClassDom = document.getElementsByClassName("emptyChkByClass");
	var flag = true;
	for(var i=0; i<getClassDom.length;i++){
		var domNodeName = getClassDom[i].nodeName;
		var domType = getClassDom[i].type;
		var domName = getClassDom[i].name;
		var domId = getClassDom[i].id;
		var domTitle = getClassDom[i].title;
		var domValue = getClassDom[i].value;

		if(domNodeName =="SELECT"){
			if (!domValue) {
				alert(domTitle+"을(를) 선택해야 합니다.");
				flag = false;
				$("#"+domId).selectedIndex=0;
				$("#"+domId).focus();
				return flag;
			}
		}else if(domNodeName =="INPUT"){
			if(domType == "checkbox"){
				if (!$("input[name="+domName+"]").is(":checked")) {
					alert(domTitle + " 값을 체크해 주세요.");
					flag = false;
					$("html").scrollTop(0);
					$("#"+domId).focus();
					return flag;
				}
			// 비교과 전용 운영기관/학과, 담당자 focus가 안되는 사항 추가 (20.12.28 bws)
			} else if(domType == "hidden") {
				if (!domValue) {
					alert(domTitle+"을(를) 입력해야 합니다.");
					flag = false;
					if(domName == "npiOprtDeptCd") {
						$("#deptNm").focus();
					}
					else if(domName == "npiStfNo") {
						$("#npiStfNm").focus();
					}
					return flag;
				}
			} else{
				if (!domValue) {
					alert(domTitle+"을(를) 입력해야 합니다.");
					flag = false;
					$("#"+domId).focus();
					return flag;
				}
			}

		}else if(domNodeName =="TEXTAREA"){
			/* if (!($.trim(CKEDITOR.instances[domName].getData())))  */
			if ($("textarea[name='"+domName+"']").summernote('isEmpty')) {
				alert(domTitle+"을 입력하세요.");
				$("textarea[name='"+domName+"']").summernote('focus');
				flag = false;
				return flag;
			}
		}
	}

	$("#"+domId).offset();
	return flag;
}


/**
*********************************************************
@ function : 체크박스 체크된 value들 ,로 연결
@ param  : chkNm - 체크박스 name
@ comment  :
@ history  : 2019-05-10 (최초작성)
**********************************************************
 **/
function conComma(chkNm,type){
	var chkVal = "";
	if(type == "checkbox"){
		$("input:checkbox[name="+chkNm+"]:checked").each(function(){
			chkVal = chkVal+ ","+$(this).val();
		});
	}else if(type == "text"){
		$("input[name="+chkNm+"]").each(function () {
			chkVal = chkVal+ ","+$(this).val();
		});
	}
	chkVal = chkVal.substring(1);
	return chkVal;
}





///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////FILE 관련////////////////////////////////////////

/**
*****************************************
@ function :  파일 업로드 구현 class 시작
@ comment  :
 * 1. ie = <input type="file">
 * 2. chrome = DD(Drag & Drop) or	<input type="file">
*****************************************
**/
var FileUploadDL = function() {
	FileUploadDL.indicationCallCnt = 1;
	// 파일 업로드 Ojbect확인해서 event 등록..
	this.init();
}

/**
 * 파일 업로드 Ojbect확인해서 event 등록..
 */
FileUploadDL.prototype.init = function () {
//	console.log( this )
	var dropZones = $("div[id$='dropZone']");
	dropZones.each(function() {
		var dropZone = $('#'+this.id);
		var idPrefix = this.id.replace('dropZone', '');
		var fileElName = idPrefix.substring(0, idPrefix.length-1 ).replace(/id_/ig, '');

		// FileUploadDL이 이미 적용된 경우 다음 대상으로 (중요)
		if ( $("#"+idPrefix+"rendered").val() == 'Y' ) {
			return true;
		}

		// 파일 Drag영역 view 처리.
		FileUploadDL.setViewOfFileList(idPrefix);
		// 총 파일 용량 설정.
		FileUploadDL.setTotalFileSize(idPrefix);

		// upload Progress Bar 숨기기
		$("#"+idPrefix+"progressbar").hide();
		$("#"+idPrefix+"progressbar_pecentage").css('width', '0%');

		// 업로드 가능 파일 유형 조회
		var extType = $('#'+idPrefix+'type').val();

		// 업로드 가능 확장자 형태 setting.
		$("#"+idPrefix+"type_ext").html( FileUploadDL.getValidExtType(extType).join(',') );

		// FileUploadDL 적용여부 설정 (중요)
		$("#"+idPrefix+"rendered").val("Y");

		// IE일 경우 <input type="file">로만 처리..
		$('#'+ idPrefix + 'file_btn').click(function (e) {

			e.preventDefault();

			// 파일 찾기 버튼 클릭시 탐색기 호출할 임시 <input type="file"> element 생성.
			FileUploadDL.createFileObjectForButton(idPrefix, fileElName);

			// 클릭 event등록..
			$('#'+ idPrefix + 'input_file_temp').click();
		});

		// Drag&Drop 가능 할 경우 : IE12이상 or Chrome
		if( canDragDrop() ) {

			var htmlDesc = "<dt>상단의 버튼을 클릭 하거나 또는 파일 Drag로 추가해주세요.</dt>";
			htmlDesc += "<dd>";
			var extArray = FileUploadDL.getValidExtType(extType)

			for(var i = 0; i< extArray.length; i++) {
				htmlDesc += "	<span>"+extArray[i]+"</span>";
			}
			htmlDesc += "</dd>";

			$('#'+ idPrefix + 'fileDragDesc').html(htmlDesc);

			// Drag기능
			dropZone.on('dragenter', function(e) {
				e.stopPropagation();
				e.preventDefault();
				// 드롭다운 영역 css
				dropZone.css('background-color', '#E3F2FC');
			});
			dropZone.on('dragleave', function(e) {
				e.stopPropagation();
				e.preventDefault();
				// 드롭다운 영역 css
				dropZone.css('background-color', '#FFFFFF');
			});
			dropZone.on('dragover', function(e) {
				e.stopPropagation();
				e.preventDefault();
				// 드롭다운 영역 css
				dropZone.css('background-color', '#E3F2FC');
			});
			dropZone.on('drop', function(e) {
				e.preventDefault();
				// 드롭다운 영역 css
				dropZone.css('background-color', '#FFFFFF');

				var files = e.originalEvent.dataTransfer.files;

				if (files != null) {
					if (files.length < 1) {
						console.log("폴더는 업로드 불가능합니다.");
						return;
					}
				}
				var isUploadable = FileUploadDL.checkUploadable(idPrefix, files);

				// upload가능 할 경우..
				if( isUploadable ) {
					for (var i = 0; i < files.length; i++) {

						var fileSno = parseInt(Math.random()*100000).toString();

						var dt = new DataTransfer();
						dt.items.add( files[i] );

						FileUploadDL.addFileToList(idPrefix, fileSno, files[i].name, files[i].size, dt.files, fileElName)
					}

					// 파일 Drag영역 view 처리.
					FileUploadDL.setViewOfFileList(idPrefix)

					// 총 파일용량 설정.
					FileUploadDL.setTotalFileSize(idPrefix)
				}
			});
		}
	});
}

/**
 * 파일 찾기 버튼 클릭시 탐색기 호출할 임시 <input type="file"> element 생성.
 */
FileUploadDL.createFileObjectForButton = function(idPrefix, fileElName) {
	// 임시	<input type="file"> 있을 경우 삭제..
	$("#"+idPrefix+"input_file_temp").remove();

	// 특정 확장자 지정 업로드
	var acceptType = "";
	if( $('#'+idPrefix+'type').val() == 'video' ) {
		acceptType = ".avi, .flv, .mkv, .mov, .mpeg, .mp4, .ogg, .wma, .wmv";
	}else if( $('#'+idPrefix+'type').val() == 'img' ){
		acceptType = ".jpg, .jpeg, .png, .gif";
	}else if( $('#'+idPrefix+'type').val() == 'office' ){
		acceptType = ".hwp, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .png, .pdf, .zip, .mp4, .jpg, .jpeg, .gif";
	}else if( $('#'+idPrefix+'type').val() == 'zip' ){
		acceptType = ".zip";
	}else if( $('#'+idPrefix+'type').val() == 'xls' ){
		acceptType = ".xls, .xlsx";
	}

	// 임시	<input type="file"> 생성..
	html = "<input type='file' name='"+fileElName+"_FILE' id='"+idPrefix+"input_file_temp' class='hidden' ";
	html += "onchange='FileUploadDL.fileFindChange(\""+idPrefix +"\", \""+ fileElName+"\", this.files)' accept='"+acceptType+"' multiple />";

	$('#'+idPrefix+'fileList').append(html);
}

/**
 * [파일찾기] 탐색기에서 파일을 선택 한경우.
 */
FileUploadDL.fileFindChange = function(idPrefix, fileElName, files)	{
	var isUploadable = FileUploadDL.checkUploadable(idPrefix, files);

	// upload가능 할 경우..
	if( isUploadable ) {

		for( var i = 0; i < files.length; i++ ){

			var fileSno = parseInt(Math.random()*100000).toString();

			var dt = new DataTransfer();
			dt.items.add( files[i] );

			FileUploadDL.addFileToList(idPrefix, fileSno, files[i].name, files[i].size, dt.files, fileElName)
		}

		// 파일 Drag영역 view 처리.
		FileUploadDL.setViewOfFileList(idPrefix)

		// 총 파일용량 설정.
		FileUploadDL.setTotalFileSize(idPrefix)
	}

	// 탐색기 호출용 임시 file element 삭제
	$("#"+idPrefix+"input_file_temp").remove();
}

/**
 * 업로드 목록에 파일 Component 생성
 * @param idPrefix : 파일 구분 값.
 * @param fileSno : 파일 순번
 * @param fileName : 물리파일의 명
 * @param fileSize : 물리파일의 크기
 * @param fileSize : 물리파일의 크기
 * @param file : 실제 파일 내용
 * @param fileElName : 파일 object의 name
 */
FileUploadDL.addFileToList = function(idPrefix, fileSno, fileName, fileSize, file, fileElName) {

	var fileItemIdFull = idPrefix + "fileItem_"+fileSno;
	var fileSizeStr = FileUploadDL.getFileSizeStr(fileSize);

	var html = "";

	var imageType = "document";
	if( $('#'+idPrefix+'type').val() == 'video' ) {
		imageType = 'video';
	}else if( $('#'+idPrefix+'type').val() == 'img' ){
		imageType = 'image';
	}

	html += "<p id='"+ fileItemIdFull + "' class='file-added file_added "+imageType+"'>";
	html += "	<input type='file' name='"+fileElName+"_FILE' id='"+idPrefix+"input_file_"+fileSno+"' class='hidden' />";
	// 동영상일 경우
	if( imageType == 'video' ) {
		html += "	<video id='"+idPrefix+"video_"+fileSno+"' class='hidden'></video>"
	}
	html += "		<span title='"+fileName+ " ("	+ fileSizeStr +")' id='"+fileItemIdFull+"_anchor'>";
	html += "			<input type='hidden' id='"+idPrefix+"attf_sno_add_"+fileSno+"' name='"+fileElName+"_ATTF_SNO_ADD' value='"+fileSno+"'/>";
	html += "			"+fileName + "<i>&#40;" + fileSizeStr + "&#41;</i>";
	// 동영상일 경우
	if( imageType == 'video' ) {
		html += "		<i id='"+idPrefix+"fileDurationStr_"+fileSno+"'></i>";
		html += "		<span id='"+idPrefix+"fileDuration_"+fileSno+"' class='hidden'></span>";
	}
	html += "		</span>";
	html += "		<span id='"+idPrefix+"fileSize_"+fileSno+"' class='hidden'>"+fileSize+"</span>";
	html += "		<button type='button' class='btn_del' id='"+idPrefix+"del_btn_"+fileSno+"' ";
	html += "			onclick='FileUploadDL.deleteFile(\""+idPrefix+"\", \"" + fileItemIdFull + "\", \"" + fileSno + "\", \"" + fileElName + "\" ); return false;'>삭제</button>";
	html += "</p>";

	$('#'+idPrefix+'fileList').append(html);

	// 파일 부여 : important!!!
	$("#"+idPrefix+"input_file_"+fileSno).prop("files", file);

	// 동영상일 경우
	if( imageType == 'video' ) {
		FileUploadDL.setVideoDuration(idPrefix, fileSno, $("#"+idPrefix+"input_file_"+fileSno)[0].files[0]); // 동영상 파일 실행 시간 조회.
	}
}

/**
 * 파일 Drag영역 view 처리.
 */
FileUploadDL.setViewOfFileList = function(idPrefix) {

	if ($("p[id^='"+idPrefix + "fileItem']").length>0 ) {
		$("#"+idPrefix+"fileDragDesc").hide();
		$("#"+idPrefix+"fileList").show();
	} else {
		$("#"+idPrefix+"fileDragDesc").show();
		$("#"+idPrefix+"fileList").hide();
	}
}

/**
 * 총 파일 용량 설정.
 */
FileUploadDL.setTotalFileSize = function(idPrefix) {
	var totalFileSize = 0;

	if ($("p[id^='"+ idPrefix + "fileItem_']").length > 0) {
		$("#"+idPrefix+"fileDragDesc").hide();
		$("#"+idPrefix+"fileList").show();
	} else {
		// 모두 삭제된경우 0Byte로..
		$('#'+idPrefix+'totalFileSizeStr').text( "0 Byte");
		$('#'+idPrefix+'totalFileSize').text( "0");

		$("#"+idPrefix+"fileDragDesc").show();
		$("#"+idPrefix+"fileList").hide();
	}

	var storedFileDeleteCount = 0;
	// 파일 size계산 해서 update
	$("span[id^='"+ idPrefix + "fileSize_']").each(function() {
		// console.log( $(this) )
		try{
			// db저장된 파일의 경우	화면에서 삭제되지 않은 경우에만 size계산
			if( $(this).hasClass("file_deleting") == false ) {
				totalFileSize += parseInt($('#'+this.id).html());
				$('#'+idPrefix+'totalFileSizeStr').text( FileUploadDL.getFileSizeStr( totalFileSize ));
				$('#'+idPrefix+'totalFileSize').text( totalFileSize);
			}
			// db저장된 파일의 경우	화면에서 삭제된 경우 삭제된 숫자 구하기.
			else {
				storedFileDeleteCount++;
			}
		} catch(e) {

		}
	});

	// 전체 숫자와 화면에서 삭제된 숫자가 같으면... 파일 size초기화.
	if( $("span[id^='"+ idPrefix + "fileSize_']").length == storedFileDeleteCount ) {
		$('#'+idPrefix+'totalFileSizeStr').text( "0 Byte");
		$('#'+idPrefix+'totalFileSize').text( "0");
	}

	FileUploadDL.setDragZoneHeight(idPrefix);
}

/* 파일 드래그 존 높이 */
FileUploadDL.setDragZoneHeight = function(idPrefix){
	var fileItemCnt =	$("p[id^='"+idPrefix + "fileItem']").length;

	// console.log(fileItemCnt ,	Number($('#'+idPrefix+'max_count').val()))

	if( Number($('#'+idPrefix+'max_count').val()) > 3	) {
		if( fileItemCnt > 2 && fileItemCnt == Number($('#'+idPrefix+'max_count').val()) ) {
			$('#'+idPrefix+'dropZone').height(150 + (fileItemCnt - 3)* 44 );
		} else if( fileItemCnt > 2 ) {
			$('#'+idPrefix+'dropZone').height(150 + (fileItemCnt - 2)* 43 );
		} else {
			$('#'+idPrefix+'dropZone').height(125)
		}
	}
}

/**
 * 파일 삭제 버튼 클릭시 처리.
 */
FileUploadDL.deleteFile = function(idPrefix, fileItemIdFull, fileSno, fileElName) {

	// 새로 추가된 경우
	if( $("#"+fileItemIdFull).hasClass("file-added")) {

		// 업로드 파일 테이블 목록에서 삭제
		$("#"+fileItemIdFull).remove();

	}
	// 기존에 저장되어있는 경우.
	else if( $("#"+fileItemIdFull).hasClass("file-stored") ) {
		// 삭제 css추가
		$("#"+fileItemIdFull).addClass('file_deleting');
		$("#"+fileItemIdFull).removeClass('file-stored');
		$("#"+fileItemIdFull.replace(/fileItem/,'fileSize')).addClass('file_deleting');

		// 첨부파일 id
		var fileId = $("#id_"+fileElName).val();

		var html = "";
		html+="<button value='삭제취소' id='"+idPrefix+"del_btn_cancel_"+fileSno+"'type='button' class='btn_del' onclick='FileUploadDL.deleteFileCancel(\""+idPrefix+ "\", \"" + fileItemIdFull + "\", \"" + fileSno + "\", \"" + fileElName + "\"); return false;' title='삭제 취소'/>"
		html+="<div id='"+idPrefix+"deleted_"+fileSno+"'>";
		// 삭제 값은 첨부파일 순번
		html+="<input type='hidden' name='"+fileElName+"_DELETED' value='"+fileSno+"'/>";
		html+="</div>";

		// [삭제] 버튼 안보이게 처리
		$("#"+idPrefix + "del_btn_"+fileSno).remove();

		$("#"+fileItemIdFull).append( html)
	}

	// 파일 사이즈 다시 계산
	FileUploadDL.setTotalFileSize(idPrefix)
}

var canDragDrop = function() {
	var ua = window.navigator.userAgent

	var msie = ua.indexOf('MSIE ')
	if (msie > 0) {
		// IE 10 or older => return version number
		return false;
	}

	var trident = ua.indexOf('Trident/')
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:')
		return false;
	}

	var edge = ua.indexOf('Edge/')
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return true;
	}

	return true;
}

/**
 * 업로드 타입 별 가능 확장자 조회
 * extType : 업로드 파일 유형.(video(동영상만), img(이미지만), office(문서만), zip(압축파일) )
 */
FileUploadDL.getValidExtType = function (extType) {
	// 업로드 타입 별 가능 확장자 선언
	var extArray = new Array();
	extArray['video'] = [ 'avi', 'flv', 'mkv', 'mov', 'mpeg', 'mp4', 'ogg', 'wma', 'wmv' ];
	extArray['zip'] = ['zip'];
	extArray['img'] = ['jpg', 'jpeg', 'png', 'gif'];
	extArray['office'] = ['hwp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'png', 'pdf', 'zip', 'mp4','jpg', 'jpeg', 'gif' ];
	extArray['xls'] = ['xls', 'xlsx' ];

	return extArray[extType];
}

/**
 * 파일 사이즈 display값 조회.
 */
FileUploadDL.getFileSizeStr = function(fileSize) {

	var fileSizeKb = fileSize / 1024; // 파일 사이즈(단위 :kb)
	var fileSizeMb = fileSizeKb / 1024;	// 파일 사이즈(단위 :Mb)
	var fileSizeGb = fileSizeMb / 1024;	// 파일 사이즈(단위 :Gb)

	var fileSizeStr = "0 Byte";

	if ((1024*1024*1024) <= fileSize) {	// 파일 용량이 1기가 이상인 경우
		//console.log("fileSizeGb="+fileSizeMb.toFixed(2));
		fileSizeStr = fileSizeGb.toFixed(2) + " Gb";
	} else if ((1024*1024) <= fileSize) {	// 파일 용량이 1메가 이상인 경우
		//console.log("fileSizeMb="+fileSizeMb.toFixed(2));
		fileSizeStr = fileSizeMb.toFixed(2) + " Mb";
	} else if ((1024) <= fileSize) {
		//console.log("fileSizeKb="+parseInt(fileSizeKb));
		fileSizeStr = parseInt(fileSizeKb) + " Kb";
	} else {
		//console.log("fileSize="+parseInt(fileSize));
		fileSizeStr = parseInt(fileSize) + " Byte(s)";
	}

	return fileSizeStr;
}

/**
 * 개별 파일 업로드 용량
 * @param idPrefix
 * @returns {Number}
 */
FileUploadDL.getUploadSize = function(idPrefix) {
	return 2*1024;
}

FileUploadDL.getUploadSizeStr = function(idPrefix) {
	return FileUploadDL.getFileSizeStr(FileUploadDL.getUploadSize()*1204*1024);
}

/**
 * 총 파일 업로드 용량
 * @param idPrefix
 * @returns {Number}
 */
FileUploadDL.getMaxUploadSize = function(idPrefix) {
	return 2*1024;
}

FileUploadDL.getMaxUploadSizeStr = function(idPrefix) {
	return FileUploadDL.getFileSizeStr(FileUploadDL.getMaxUploadSize()*1204*1024);
}

/**
 * 파일 업로드를 위한 유효성 검사.
 * 1. 파일 크기검사
 * 2. 파일 size검사
 * 3. 파일 확장자 검사.
 *
 * 유효할 경우 true
 */
FileUploadDL.checkUploadable = function(idPrefix, files) {
	// 등록 가능한 파일 사이즈 MB
	var uploadSize = FileUploadDL.getUploadSize();
	// 등록 가능한 총 파일 사이즈 MB
	var maxUploadSize = FileUploadDL.getMaxUploadSize();

	// 등록할 전체 파일 사이즈
	var totalFileSize = 0;

	// 업로드 가능 파일 유형 조회
	var extType = $('#'+idPrefix+'type').val();

	// 파일 업로드 최대 개수 검사.
	var maxUploadFileCount = parseInt($('#'+idPrefix+"max_count").val());

	var fileCount = 0;
	$("span[id^='"+ idPrefix + "fileSize_']").each(function() {
		if( $(this).hasClass('file_deleting') == false ) {

			fileCount++;
		}
	});

	if( fileCount + files.length>maxUploadFileCount){
		alert("첨부파일은 최대 ["+maxUploadFileCount+"]개 까지만 업로드 가능합니다.");

		return false;
	}

	// 다중파일 등록
	if (files != null) {
		// 파일 Drag영역 view 처리.
		FileUploadDL.setViewOfFileList(idPrefix);


		for (var i = 0; i < files.length; i++) {
			// 파일 이름
			var fileName = files[i].name;
			var fileNameArr = fileName.split("\.");
			// 확장자
			var ext = fileNameArr[fileNameArr.length - 1];

			var fileSize = files[i].size; // 파일 사이즈(단위 :byte)

			if (fileSize <= 0) {
				return;
			}

			// 총 파일 용량 조회.
			var totalFileSize = parseInt($('#'+idPrefix+'totalFileSize').html());

			// 업로드 타입 별 가능 확장자 조회
			var extArray = FileUploadDL.getValidExtType(extType)

			// 업로드 타입 별 가능 확장자 확인.
			if ($.inArray(ext.toLowerCase(), extArray) < 0) {
				// 확장자 체크
				alert("등록이 불가능한 파일 형태 입니다.("+fileName+") \r\n 등록 가능한 확장자는 ["+ extArray.join(",")+"] 입니다.");
				return false;
			} else if (fileSize > uploadSize*1024*1024) {
				// 파일 사이즈 체크
				if( uploadSize > 1024 ) {
					alert("등록이 불가능한 용량입니다.\n업로드 가능한	용량은 [" + (uploadSize/1024) + " Gb]입니다.");
				} else {
					alert("등록이 불가능한 용량입니다.\n업로드 가능한	용량은 [" + uploadSize + " Mb]입니다.");
				}
				return	false;
			} else if ((totalFileSize+fileSize) > (maxUploadSize*1024*1024) ) {
				// 파일 사이즈 체크
				if( maxUploadSize > 1024 ) {
					alert("등록이 불가능한 용량입니다.\n총 업로드 가능한	용량은 [" + (uploadSize/1024) + " Gb]입니다. 이 파일을 추가하면 총용량은 ["+ FileUploadDL.getFileSizeStr(totalFileSize+totalFileSize) +"]입니다.");
				} else {
					alert("등록이 불가능한 용량입니다.\n총 업로드 가능한	용량은 [" + uploadSize + " Mb]입니다. 이 파일을 추가하면 총용량은 ["+ FileUploadDL.getFileSizeStr(totalFileSize+totalFileSize) +"]입니다.");
				}
				return	false;
			}
		}
	}

	return true;
}

/**
 * 동영상 파일 실행 시간 조회.
 */
FileUploadDL.setVideoDuration = function(idPrefix, fileSno, file) {

	var video = $("#"+idPrefix+"video_"+fileSno)[0];
	video.preload = 'metadata';

	video.onloadedmetadata = function() {

		window.URL.revokeObjectURL(video.src);
		if (video.duration < 1) {
			$("#"+idPrefix+"fileDuration_"+fileSno).html(0);
			$("#"+idPrefix+"fileDurationStr_"+fileSno).html("[0]");
		} else {
			$("#"+idPrefix+"fileDuration_"+fileSno).html(Math.floor(video.duration));
			$("#"+idPrefix+"fileDurationStr_"+fileSno).html("["+getTimeStr(video.duration)+"]");
		}

	}
	/**
	 * 초를 분초로 변경.
	 */
	function getTimeStr(second) {
		if( Math.floor(second) < 60 ) {
			return 'Play시간 : ' + Math.floor(second)	+ '초';
		} else {
			return 'Play시간 : ' + Math.floor(second/60) + '분 ' + (Math.floor(second)%60) + '초';
		}
	}
	video.src = URL.createObjectURL(file);
}

/**
 * 이미 저장된 파일에 대해 삭제 후 삭제 취소
 */
FileUploadDL.deleteFileCancel = function(idPrefix, fileItemIdFull, fileSno, name) {
	// 삭제 css제거
	$("#"+fileItemIdFull).removeClass('file_deleting');
	$("#"+fileItemIdFull).addClass('file-stored');
	$("#"+fileItemIdFull.replace(/fileItem/,'fileSize')).removeClass('file_deleting');

	$("#"+idPrefix + "del_btn_cancel_"+fileSno).remove();
	$("#"+idPrefix+"deleted_"+fileSno).remove();

	var html ="<button value='삭제' id='"+idPrefix+"del_btn_"+fileSno+"'type='button' class='btn_del' onclick='FileUploadDL.deleteFile(\""+idPrefix+ "\", \"" + fileItemIdFull + "\", \"" + fileSno + "\", \"" + name + "\"); return false;'	title='삭제'/>"

	// [삭제] 버튼 추가
	$("#"+fileItemIdFull).append( html )

	// 파일 사이즈 다시 계산
	FileUploadDL.setTotalFileSize(idPrefix)
}

/**
 * 컨텐츠 편집에서 파일 삭제시
 * @returns
 */
FileUploadDL.deleteContentsFile = function(idPrefix, fileItemIdFull, attf, fileSno, name) {
	// 새로 추가된 경우
	if( $("#"+fileItemIdFull).hasClass("file-added")) {
		// 업로드 파일 테이블 목록에서 삭제
		$("#"+fileItemIdFull).remove();
	}
	// 기존에 저장되어있는 경우
	else {
		// 삭제 css추가
		$("#"+fileItemIdFull).addClass('file_deleting');
		$("#"+fileItemIdFull).removeClass('file-stored');
		$("#"+fileItemIdFull.replace(/fileItem/,'fileSize')).addClass('file_deleting');

		var html = "";
		html+="<button value='삭제취소' id='"+idPrefix+"del_btn_cancel_"+attf+"_"+fileSno+"'type='button' class='btn_del' onclick='FileUploadDL.deleteContentsFileCancel(\""+idPrefix+ "\", \"" + fileItemIdFull + "\", \"" + attf + "\", \"" + fileSno + "\", \"" + name + "\"); return false;'	title='삭제 취소'/>"
		html+="<div id='"+idPrefix+"deleted_"+attf+"_"+fileSno+"'>";
		// 삭제 값은 첨부파일 순번
		html+="<input type='hidden' name='"+name+"_CONTENTS_DELETED_ATTF_ES' value='"+attf+"'/>";
		html+="<input type='hidden' name='"+name+"_CONTENTS_DELETED_ATTF_SNO_ES' value='"+fileSno+"'/>";
		html+="</div>";

		// [삭제] 버튼 안보이게 처리
		$("#"+idPrefix + "del_btn_"+attf+"_"+fileSno).remove();

		$("#"+fileItemIdFull).append( html )
	}

	// 파일 사이즈 다시 계산
	FileUploadDL.setTotalFileSize(idPrefix)
}

/**
 * 컨텐츠 편집에서 파일 삭제 취소시.
 * @param idPrefix
 * @param fileItemIdFull
 * @param attf
 * @param fileItemId
 */
FileUploadDL.deleteContentsFileCancel = function(idPrefix, fileItemIdFull, attf, fileSno, name) {
	// 삭제 css체거
	$("#"+fileItemIdFull).removeClass('file_deleting');
	$("#"+fileItemIdFull).addClass('file-stored');
	$("#"+fileItemIdFull.replace(/fileItem/,'fileSize')).removeClass('file_deleting');

	// 삭제 취소 버튼 삭제.
	$("#"+idPrefix + "del_btn_cancel_"+attf+"_"+fileSno).remove();
	$("#"+idPrefix + "deleted_"+attf+"_"+fileSno).remove();

	var html ="<button value='삭제' id='"+idPrefix+"del_btn_"+attf+"_"+fileSno+"'type='button' class='btn_del' onclick='FileUploadDL.deleteContentsFile(\""+idPrefix+ "\", \"" + fileItemIdFull + "\", \"" + attf + "\", \"" + fileSno + "\", \"" + name + "\"); return false;'	title='삭제'/>"

	// [삭제] 버튼 추가
	$("#"+fileItemIdFull).append( html )

	// 파일 사이즈 다시 계산
	FileUploadDL.setTotalFileSize(idPrefix)
}

/**
 * 첨부파일 필수 검사를 위한 함수.
 */
FileUploadDL.hasFile = function(objName) {
	var hasFile = false;
	$("p[id^='id_"+ objName + "_fileItem']").each(function() {
		if(hasFile == false && ($(this).hasClass('file-stored') ||	$(this).hasClass('file-added'))) {
			hasFile = true;
		}
	})
	return hasFile;
}

/**
 * 파일 업로드 진행율 표시.
 * @returns
 */
FileUploadDL.xhr = function() {
	var xhr = $.ajaxSettings.xhr();
	xhr.upload.onprogress = function(e) { // progress 이벤트 리스너 추가
		var percent = e.loaded * 100 / e.total;

		$("div[id$='progressbar']").show();

		// Progress Bar 진행율 조회
		$("div[id$='progressbar']").each(function() {
			$("#"+this.id+"_pecentage").css('width', percent+'%');
			/*
			$("#" + this.id).progressbar({
				value : percent
			}); // .append(percent.toFixed(2));
			*/

			// Progress Bar 숨기기
			if( percent >= 100 || percent <=	0 ) {
				$("div[id$='progressbar']").hide();
				$("#"+this.id+"_pecentage").css('width', '0%');

				var extType = $('#'+this.id.replace(/progressbar/g, 'type')).val();

				if( extType =='video' ) {
					FileUploadDL.indicateTransCode();
				}
			}
		});

		// Progress Bar 숨기기
		if( percent >= 100 || percent <= 0 ) {
			$("div[id$='progressbar']").hide();
			$("#"+this.id+"_pecentage").css('width', '0%');

			var extType = $('#'+this.id.replace(/progressbar/g, 'type')).val();

			if( extType =='video' ) {
				FileUploadDL.indicateTransCode();
			}
		}
	};
	return xhr;
}

/**
 * 파일 업로드 후 파일 상태 변경.
 */
FileUploadDL.updateAfterFileUpload = function(res) {
	DainMessage.alert('FileUploadDL.updateAfterFileUpload()에서  fimFileCategory , fimSectionName  추가 필요.');

	// 성공
	if( res.result.success == true ) {
		// Progress Bar 숨기기
		$("div[id$='progressbar']").hide();
		// 삭제 처리된 파일 목록 화면에서 삭제처리
		// TODO 아래의 주석 제거
		// $('.file_deleting').remove();

		var fileResultList = res.fileResultList;
		for( var i=0; i<fileResultList.length; i++) {
			// 파일 객체 명
			var fileElName = fileResultList[i].name;
			// 첨부파일 uid
			var fileAttf = fileResultList[i].attf;

			// 신규 등록일 경우 새로 생성된 첨부파일 id 등록
			if($("#id_"+fileElName).val() == "" ) {
				$("#id_"+fileElName).val(fileAttf)
			}

			// 새로 추가된 상세파일 순번
			var fileAttfSnoList = fileResultList[i].attfSnoList;

			for( var j=0; j<fileAttfSnoList.length; j++) {
				// 파일 저장 css로 변경
				$("#id_"+fileElName+"_fileItem_"+fileAttfSnoList[j]).addClass("file-stored");
				/*
				var html = "<span><a href='/common/file/file/download.do?ATTF="+fileAttf+"&ATTF_SNO="+fileAttfSnoList[j]+"'>다운로드</a></span>";
				$("#id_"+fileElName+"_fileItem_"+fileAttfSnoList[j]).append( html);
				*/
				$("#id_"+fileElName+"_fileItem_"+fileAttfSnoList[j]+"_anchor").attr('href', "/cmm/fms/fileDownload.do?ATTF="+fileAttf+"&ATTF_SNO="+fileAttfSnoList[j]);
				// 파일 추가 css삭제
				$("#id_"+fileElName+"_fileItem_"+fileAttfSnoList[j]).removeClass("file-added");
				// <input type=file> 삭제
				$("#id_"+fileElName+"_input_file_"+fileAttfSnoList[j]).remove()
				// 파일 추가 안내 정보 삭제
				$("#id_"+fileElName+"_attf_sno_add_"+fileAttfSnoList[j]).remove()
			}

			// 삭제된 추가된 상세파일 순번
			var deletedAttfSnoList = fileResultList[i].deletedAttfSnoList;
			// 삭제된 파일 화면에서 지우기
			for( var j=0; j<deletedAttfSnoList.length; j++) {
				// 화면에서 삭제 처리
				$("#id_"+fileElName+"_fileItem_"+deletedAttfSnoList[j]).remove();
			}

			// 첨부파일 정보 초화
			FileUploadDL.setTotalFileSize("id_"+fileElName+"_");

		}

	} else {
		console.log('첨부파일 업로드 오류 입니다.')
	}
}

FileUploadDL.increaseIndationCall = function() {
	FileUploadDL.indicationCallCnt ++;

	console.log( " this.indicationCallCnt : " + FileUploadDL.indicationCallCnt)
}

/**
 * 파일 변환 정보 조회.
 */
FileUploadDL.indicateTransCode = function() {
	FileUploadDL.increaseIndationCall();
	$('#transcode_bar_title').removeClass("hidden");
	var textHtml	= '변환대상 동영상을 확인 중 입니다.';
	for( var i=0;i< FileUploadDL.indicationCallCnt ;i++ ) {
		console.log( " this.indicationCallCnt : i " + i )
		textHtml += ".";
	}
	$('#transcode_title').html(textHtml)

	if( $("div[id^='progressbar'").length ) {
		$('#transcode_title').html('동영상 변환 중입니다.')
	}

	$.ajax({
		url : "/cmm/fms/indicatVideoTranscodeListSession.do"
		, contentType: false
		, processData: false
		, type : "post"
		, data : {}
		, success : function(res) {
			if( res && res.LMS_VIDEO_TRANS_LIST && res.LMS_VIDEO_TRANS_LIST.length > 0 ) {
				$('#transcode_bar_title').removeClass("hidden");
			}
			for( var i=0; res && res.LMS_VIDEO_TRANS_LIST && i<res.LMS_VIDEO_TRANS_LIST.length; i++ ) {
				$('#transcode_title').html('동영상 변환 중입니다.')
				var orgFileNm = res.LMS_VIDEO_TRANS_LIST[i].ATTF_SNO;
				var transRt = res.LMS_VIDEO_TRANS_LIST[i].TRANS_RT||0;
				if( $('#progressbar_'+orgFileNm).length ) {
					$("#p_transcode_pecentage"+orgFileNm).css('width', transRt+'%');
					$("#progress_state_"+orgFileNm).html(transRt+'%');
				} else {
					var html = '<div class="fileconvert_list">'
					html += '<p>'+res.LMS_VIDEO_TRANS_LIST[i].ORG_FILE_NM+'변환 중입니다. &#40; → [h.264/aac]&#41</p>';
					html += '<div id="progressbar_'+orgFileNm+'"	class="ad_test_bar" style="margin-bottom:5px;"><p id="p_transcode_pecentage'+orgFileNm+'"	style="width:'+ transRt +'%; margin-bottom:5px"></p><span class="progress_state" id="progress_state_'+orgFileNm+'">'+ transRt +'%</span></div>';
					html += '</div>'
					$('#transcode_bar').append(html);
				}
			}
		}
	});
}

/**
 * 세션에 변환 정보 삭제
 */
FileUploadDL.clearTransCode = function() {
	$.ajax({
		url : "/cmm/fms/clearVideoTranscodeListSession.do"
		, contentType: false
		, processData: false
		, type : "post"
		, data : {}
		, success : function(res) {
			$('#transcode_bar_title').addClass("hidden");

			console.log( $("span[id^='progress_state_']") )
			$("span[id^='progress_state_']").each(function() {
				console.log( this )
				$(this).html('100%');
			})

			console.log( $("p[id^='p_transcode_pecentage']") )
			$("p[id^='p_transcode_pecentage']").each(function() {
				console.log( this )
				$(this).css('width', '100%');
			});

			$('#transcode_bar').addClass("hidden");
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////

//파일 선택 후 input창에 셋팅
$(document).on("change", ".filebox .hidden", function() {
	// 값이 변경되면
	if (window.FileReader) {
	// modern browser
	var filename = $(this)[0].files[0].name;
	} else {
	// old IE
	var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
	}
	// 추출한 파일명 삽입
	$(this).parent("label").siblings(".upload_name").val(filename);
});

//첨부파일 다운로드
fn_fileDownload = function(basePath, fimFileId, fimSubFileId) {
	if(fileId != null){
	location.href = basePath + "/cmm/fms/fileDownload.do?fimFileId=" + fimFileId + "&fimSubFileId=" + fimSubFileId;
	}
};

//파일 리셋
//파일 x버튼에 onclick에 다음 함수를 걸어준다
//ex) fn_resetFile(this, '파일 태그의 아이디값');
fn_resetFile = function(obj, id) {
	var agent = navigator.userAgent.toLowerCase();
	// browser check
	if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1)
	|| (agent.indexOf("msie") != -1)) {
	// IE
	$("#" + id).replaceWith($("#" + id).clone(true));
	} else {
	// Other browser
	$("#" + id).val("");
	}

	// 리셋버튼 기능
	resetData(obj);
};

function fnOnChangeFileNm(obj, delYn, maxCnt, fileType, staffType) {
	if (obj.value != "") {
		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(parseInt(maxCnt) < (parseInt(pTagRowCnt.length)+parseInt(1))){
			alert("파일첨부는 " +maxCnt+ "개 까지 가능 합니다.");
			obj.value = "" ;
			return false;
		}
		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		++tagIdx;
		var addFileInputHtml ="";
		var fileNm = "";
			fileNm =  obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length)
		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);

		//학생 파일이면
		if (staffType == "CLIENT") {
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parent().append(addFileInputHtml);

			if(obj.id == obj.name){
				appendFileNameHtml += '<div class="file_thumbnail" name="'+obj.name+'_link_file_del" id="'+obj.name+'_link_file_delDiv" >';
			}else{
				appendFileNameHtml += '<div class="file_thumbnail" name="'+obj.name+'_link_file_del" id="'+obj.name+'_'+delTagIdx+'_link_file_delDiv">';
			}

			appendFileNameHtml += '<a href="javascript:void(0);" title="'+fileNm+'"><span>'+fileNm+'</span></a>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="btn btn_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}else{
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="btn btn_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}
			}
			appendFileNameHtml += '</div>';

			$('#'+obj.name+'_label').siblings("div #applyFileDiv").append(appendFileNameHtml);
//			$('#'+obj.name+'_label').parents("li").children("div #applyFileDiv").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);

		//학생 단일이면
		}else if(staffType == "CLIENT_SOL"){
			addFileInputHtml = '<span class="btn_del" id="btn_del" onclick="fnDelAddFileData(this.id,'+"'"+'boardFaqInquiry'+"','"+'CLIENT_SOL'+"'"+');" title="파일삭제"></span>';
			$('#'+obj.name+'_label').parent().parent().children("p").children("a").text(fileNm);
			$('#'+obj.name+'_idx').val(tagIdx);
			$('#'+obj.name+'_label').parent().parent().children("p").children("a").after(addFileInputHtml);

		// 학생 비교과 다중 일때
		}else if( staffType == "CLIENT_MULTI" ) {

			console.log("입장 완료");
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parent("div").append(addFileInputHtml);

			appendFileNameHtml += '<div class="file_thumbnail" name="'+obj.name+'_link_file_del">';
			appendFileNameHtml += '<div class="thumbnail_img">';

			// 이미지 부분
			// appendFileNameHtml += '<img src="${imagePath }/client/sub/img_preview_file.jpg" alt="다른 유형의 파일"/>';
			var BASE_PATH =  sessionStorage.getItem("contextRootPath");
			// appendFileNameHtml += '<img id="'+obj.name+'_img"  href="javascript:void(0);" alt="'+fileNm+'" scr="'+BASE_PATH+'/contents/images/client/main/no_img.png" style="width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; ">';
			appendFileNameHtml += '<img src="'+BASE_PATH+'/contents/images/client/sub/img_preview_file.jpg" alt="다른 유형의 파일"/>';

			appendFileNameHtml += '</div>';

			appendFileNameHtml += '<span class="thumbnail_tit">'+fileNm+'</span>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" class="btn btn_del" id="'+obj.name+'_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')">삭제</button>';

				}else{
					appendFileNameHtml += '<button type="button" class="btn btn_del" id="'+obj.name+'_'+delTagIdx+'_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')">삭제</button>';
				}
			}

			appendFileNameHtml += '</div>';

			$('#'+obj.name+'_label').parent("div").parent("div").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
		// 자기주도 일 때
		}else if(staffType == "CLIENT_PSDL"){
			addFileInputHtml = '<span class="btn_del" id="btn_del" onclick="fnDelAddFileData(this.id,'+"'"+'boardFaqInquiry'+"','"+'CLIENT_SOL'+"'"+');" title="파일삭제"></span>';
			$('#'+obj.name+'_label').parent().parent().children("p").children("a").text(fileNm);
			$('#'+obj.name+'_idx').val(tagIdx);
			$('#'+obj.name+'_label').parent().parent().children("p").children("a").after(addFileInputHtml);
		//관리자
		}else{
			addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'_'+tagIdx+'" class="hidden" onchange="fnOnChangeFileNm(this,'+"'"+delYn+"'"+",'"+maxCnt+"'"+",'"+fileType+"','"+staffType+"'"+')">';
			$('#'+obj.name+'_label').attr('for', obj.name+'_'+tagIdx);
			$('#'+obj.id).parents("p").append(addFileInputHtml);

			appendFileNameHtml += '<p class="link_file_del file_box" name="'+obj.name+'_link_file_del">';
			appendFileNameHtml += '<a href="javascript:void(0);" class="link_file" title="'+fileNm+'">'+fileNm+'</a>';

			if(delYn == 'Y'){
				if(obj.id == obj.name){
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}else{
					appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_'+delTagIdx+'_del" class="link_del" onclick="fnDelAddFileData(this.id,'+"'','"+staffType+"'"+')"><i class="fa fa-close"></i></button>';
				}
			}
			appendFileNameHtml += '</p>';
			$('#'+obj.name+'_label').parents("p").parents("td").append(appendFileNameHtml);
			$('#'+obj.name+'_idx').val(tagIdx);
		}
	}
}

/**
 * 첨부파일 타입체크 조회
 * @param obj			= 파일 오브젝트
 * @param fileType	= 체크 첨부파일 타입
 * @comment :
 *   img		= 이미지만
 *   office	= 문서파일
 *   video	= 동영상파일
 *   zip		= 압축파일만
 *   공백		= 체크 없음
 * @returns
 */
function fnChkUploadFileType(obj,fileType) {
	if(fileType == "img"){
		if (!/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"이미지 파일 확장자 : gif, jpg, jpeg, png \n"
				+"만 업로드 가능합니다."
				);
			obj.value = "" ;
			return false ;
		}
	}else if(fileType =="office"){
		if (!/(\.doc|\.docx|\.xls|\.xlsx|\.ppt|\.pptx|\.pdf)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
					+"오피스문서 파일 확장자 : doc, docx, xls, xlsx, ppt, pptx, pdf \n"
					+"만 업로드 가능합니다."
					);
				obj.value = "" ;
				return false ;
			}
	}else if(fileType =="video"){
		if (!/(\.mp4)$/i.test(obj.value) ){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"동영상 파일 확장자 : mp4 \n"
				+"만 업로드 가능합니다."
				);
				obj.value = "" ;
				return false ;
		}
	}else if(fileType =="zip"){
		if (!/(\.zip)$/i.test(obj.value)){
			alert("첨부 가능 파일 포멧이 아닙니다. \n"
				+"실행파일 파일 확장자 : zip (실행파일은 압축해서 올려주세요) \n"
				+"만 업로드 가능합니다."
				);
			obj.value = "" ;
			return false ;
		}
	}
return true;
}

function fnDelAddFileData(objId, fileSubId, staffType , alertControl) {
	//바로삭제 아닐시 (programTotRepoRegSTF.jsp 참고) 얼럿 1번
	var fileDelBoo = true;
	if(alertControl != null){
		if(alertControl){
			if(!confirm("해당 파일을 삭제하시면 복구하실 수 없습니다 삭제하시겠습니까?")){
				fileDelBoo = false;
			}
		}
	}else{
		if(!confirm("해당 파일을 삭제하시면 복구하실 수 없습니다 삭제하시겠습니까?")){
			fileDelBoo = false;
		}
	}
	if(!fileDelBoo){
		return false;
	}
	if(isEmpty(fileSubId) == false) {
		if(fileSubId == 'boardFaqInquiry'){
			$("#"+fileSubId).val('');
			$("#"+objId).siblings('a').text('');
			$("#"+objId).remove();
		}else{
			var _url = basePath+"/cmm/fms/removeFileData.do";
			jQuery.ajax({
				type: "POST",
				url: _url,
				dataType: "json",
				data : {
					fileSubId   : fileSubId
				},
				success: function(r) {
					if (r.rtnCode == '0') {
						if(staffType == 'CLIENT'){
							var delObjId = objId.replace('_del','');
							$("#"+delObjId+"_link_file_delDiv").remove();
							$("#"+delObjId).remove();
						}else{
							var delObjId = objId.replace('_del','');
							$("#"+objId).parents("p").remove();
							$("#"+objId).parent(".file_thumbnail").remove();
							$("#"+delObjId).remove();
						}
					} else {
					alert("첨부파일 삭제에 실패 하였습니다.");
					return false;
					}
				},error: function(r) {
				}
			}) ;
		}
	}else{
		if(staffType == 'CLIENT'){
			var delObjId = objId.replace('_del','');
			$("#"+delObjId+"_link_file_delDiv").remove();
			$("#"+delObjId).remove();
		}else if(staffType == 'CLIENT_SOL'){
			$("#"+objId).siblings('a').text('');
			$("#"+objId).remove();
		}else{
			var delObjId = objId.replace('_del','');
			$("#"+objId).parents("p").remove();
			$("#"+objId).parent(".file_thumbnail").remove();
			$("#"+delObjId).remove();
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////공통 함수////////////////////////////////////////

//ajax 공통 셋팅 ERROR 메시지
$.ajaxSetup({
	error : function(req, status, error) {
		$("#loading").hide();
		console.log("### code : " + req.status + "\n### error : " + error);
		if(req.status == 500) {
			alert("현재 서비스가 원활하지 않습니다.\n잠시후 다시 이용해 주십시오.");
			console.log("500!");
			location.href = "${basePath}/login/a/n/logOut.do?requestKind=1";
		}
		if(req.status == 10001) {
//			alert("세션이 만료 되어 로그아웃 됩니다.");
			window.location.reload();
		}
	}
	, beforeSend : function(req) {
		req.setRequestHeader("IS_AJAX", "isAjax");
	}
});

/**
*****************************************
@ function :  검색
@ comment  :
@ history  : 2019-05-17 (최초작성)
*****************************************
**/
function searchBtn(){
	tableObject.destroy();
	callGrid();
}

/**
*****************************************
@ function :  엔터시 검색
@ comment  :
@ history  : 2019-05-17 (최초작성)
*****************************************
**/
function fnKeyPressEnter(){
	$(document).keypress(function(event) {
		var keycode = event.keyCode || event.which;
		if(event.keyCode == 13) {
			searchBtn();
		}
	});
}

/**
***************************************
@ function : 관리자 메뉴별 통합검색
@ comment  :
@ param  : 검색할 항목 name값
@ param  : 검색 키워드
@ history  : 2021-01-13 (최초작성)
****************************************
**/
function fnSetSearchValue(_setValName,_keword) {
	$("input[name='"+_setValName+"']").val(_keword);
}

/**
***************************************
@ function : 관리자 메뉴별 통합검색
@ comment  : NAME은 같은 검색 항목이 여러개일경우 사용
@ param  : 검색할 항목 ID값
@ param  : 검색 키워드
@ history  : 2021-01-13 (최초작성)
****************************************
**/
function fnSetSearchValueById(_setValId,_keword) {
	$("#"+_setValId).val(_keword);
}

/**
*****************************************
@ function :  검색폼 초기화
@ comment  : _fromId = 폼아이디
@ history  : 2019-05-17 (최초작성)
*****************************************
**/
function fnFormReset(_fromId) {
	$("#" + _fromId)[0].reset();
	$('.select2').each(function() {
		$(this).val("").trigger('change');
	});
	$('.select_form').each(function() {
		var selectOpts = $(this).find("select").children("option");
		selectOpts.eq(0).prop("selected");
		$(this).find("label").text(selectOpts.eq(0).text());
	});
}

resetData = function(obj) {
	$(obj).siblings("input").val("");
};

$(document).on("click", ".resetBtn", function(e) {
	e.stopImmediatePropagation();
	resetData(this);
});

/**
*****************************************
@ function :  emptyCheck
@ comment  :
*****************************************
**/
$.fn.emptyCheck = function(type) {
	var value = $.trim(this.val() + "");
	if (!value) {
		alert($(this).attr("title") + "을(를) 입력해야 합니다.");
		// 20180621 문성훈 추가 페이지 포커스시 상단 헤드가 고정이어서 그부분에 커서가 포커스 되어서 보임
//		$(window).scrollTop($("input").offset().top - 100)
		$("html").scrollTop(0);

		if (type == 0) {
			$(this).select();
		} else {
			$(this).focus();
		}
		return false;
	}
	return true;
};

/**
*****************************************
@ function :  체크박스 전체 선택 fn
@ comment  :
*****************************************
**/
fn_checkAll = function(obj, byName) {
	if ($(obj).is(":checked")) {
		$("input[name=" + byName + "]").prop("checked", true);
	} else {
		$("input[name=" + byName + "]").prop("checked", false);
	}
};

/**
*****************************************
@ function :  그리드 체크박스 전체 선택
@ comment  :
*****************************************
**/
function fnChkBoxAll() {
	$("#chkAll").click(function(){
		var chkAll = $('input:checkbox[name="chkAll"]').is(":checked") ==  true;

		if(chkAll == true){
			tableObject.rows().select();
		}else{
			tableObject.rows().deselect();
		}
	});
}

/**
*****************************************
@ function :  체크박스 체크 여부에 따라 대표 체크 박스 체크/해제 fn
@ comment  :
*****************************************
**/
fn_checkbox = function(className, targetId) {
	var count = 0;

	$("." + className).each(function(idx) {
		if (!$(this).is(":checked")) count++;
	});

	if (count > 0) {
		$("#" + targetId).prop("checked", false);
	} else {
		$("#" + targetId).prop("checked", true);
	}
};

/**
***************************************
@ function : summernote 적용
@ comment  :
@ param    : _height
@ param    : _minHeight
@ param    : _maxHeight
@ history  : 2021-01-13 (최초작성)
****************************************
**/
function fnSummernote(_height,_minHeight,_maxHeight){
	var height = isEmpty(_height) ? 150 : _height;
	var minHeight = isEmpty(_minHeight) ? null : _minHeight;
	var maxHeight = isEmpty(_maxHeight) ? null : _maxHeight;

	$(".summernote").summernote({
		height: height,					// 에디터 높이
		minHeight: minHeight,			// 최소 높이
		maxHeight: maxHeight,		// 최대 높이
		lang: "ko-KR"				// 한글 설정
	});
}
function sendFile(file, obj) {
	var form_data = new FormData();
	form_data.append('file', file);
	$.ajax({
		data: form_data,
		type: "POST",
		url: sessionStorage.getItem("contextRootPath")+'/common/a/n/summernoteFileUpload.do',
		cache: false,
		contentType: false,
		enctype: 'multipart/form-data',
		processData: false,
		success: function(res) {
			console.log('go');
			console.log(res);
				$(obj).summernote('editor.insertImage', res.filePath);
		}
	});
}

/**
***************************************
@ function : 로딩이미지 숨김
@ comment  :
@ history  : 2021-01-13 (최초작성)
****************************************
**/
function fnCloseLoadingImage() {
	setTimeout(function() {
		$("#loading").hide();
	}, 300);
}

/**
*****************************************
@ function : serializeFormDain
@ comment  :
*****************************************
**/
jQuery.fn.serializeFormDain = function( ) {
	if( this[0].enctype && this[0].enctype == 'multipart/form-data' ) {
		return this.serializeFormFile( );
	} else {
		return this.serializeForm( );
	}
}

/**
 * JQuery  - form Element를 Json형태로 생성( DataTable에서 사용)
 */
jQuery.fn.serializeForm = function( ) {

	var obj = null;

	var param = {};
	try {
		var ymdhmArr = new Array();

		if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
			var arr = this.serializeArray();

			if (arr) {
				obj = {};
				jQuery.each(arr, function() {

					var value = this.value;
					/*if( this.name.endsWith('Ymd') ) {
						value = this.value.replace(/\-/ig, '');
					}*/

					if( this.name.endsWith('Ymdhm') ) {
						ymdhmArr.push(this.name);
					}

					if( !jQuery.isEmptyObject(obj[this.name]) ) {

						var valueArr = new Array()
						if(  $.isArray(obj[this.name]) ) {
							valueArr = obj[this.name];
						} else {
							valueArr.push(obj[this.name]);
						}

						valueArr.push(value);
						obj[this.name] = valueArr;
					} else {
						obj[this.name] = value;
					}
				});

				for( var i=0;i<ymdhmArr.length; i++) {
					if( obj[ymdhmArr[i].replace(/Ymdhm/g, 'Ymd')] ) {
						obj[ymdhmArr[i]] = obj[ymdhmArr[i].replace(/Ymdhm/g, 'Ymd')]+obj[ymdhmArr[i].replace(/Ymdhm/g, 'Hh')]+obj[ymdhmArr[i].replace(/Ymdhm/g, 'Mi')];
					} else {
						obj[ymdhmArr[i]] = '';
					}
				}
			}
		}

	} catch (e) {
		// console.log(e.message);

	} finally {

	}

	return obj;
};

/**
 * JQuery  - form(파일업로드용) Element를 Json형태로 생성( $.ajax() 에서 사용)
 */
jQuery.fn.serializeFormFile = function( ) {
	var formData = new FormData( );

	var jsonData = this.serializeForm(this);
	for( var x in jsonData ) {
		if( $.isArray(jsonData[x]) ) {
			for( var i=0;i< jsonData[x].length; i++ ) {
				if( x.endsWith('Ymd') ) {
					formData.append(x+"[]", jsonData[x][i].replace(/\-/ig, ''));
				} else {
					if( x.endsWith('[]')) {
						formData.append(x, jsonData[x][i]);
					} else {
						formData.append(x+"[]", jsonData[x][i]);
					}
				}
			}
		} else {
			if( x.endsWith('Ymd') ) {
				formData.append(x, jsonData[x].replace(/\-/ig, ''));
			} else {
				formData.append(x, jsonData[x]);
			}
		}
	}

	$("input[type='file']").each(function() {
		formData.append( this.name, $("#"+this.id)[0].files[0] );
	});

	return formData;
};


/**
*****************************************
@ function : checkValidation
@ comment  :
*****************************************
**/
jQuery.fn.checkValidation = function( callback ) {
	var rules = {}

	var formValidator = $('#'+ this[0].id).validate({
		ignore: '',
		ignoreTitle : true,
		errorElement: 'p',
		errorPlacement: function(error, element) {
			var elements = $("[name="+element[0].name+"]");

			for(var i = 0; i < elements.length; i++  ){
//				console.log( elements[i].tagName + " : " + elements[i].name );

				// input text, textarea, tel ...
				if( ( elements[i].tagName == 'INPUT' || elements[i].tagName == 'TEXTAREA' ) && elements[i].type != 'hidden' ) {

					// datePicker
					if( $(elements[i]).hasClass('btDtpicker') || $(elements[i]).hasClass('dtpicker') ) {
						if( $(elements[i]).parent().parent().get(0).tagName == 'TD' ) {
							if( $(elements[i]).parent().parent().children('p.error').length == 0 ) $(elements[i]).parent('.search_day').after( error[0].outerHTML ); // client
						} else if( $(elements[i]).parent().parent().parent().get(0).tagName == 'TD' ) {
							if( $(elements[i]).parent().parent().children('p.error').length == 0 ) $(elements[i]).parent('.input-group.date').after( error[0].outerHTML ); // staff
						}

					// input(text) with button or several input(radio, checkbox)
					} else if( $(elements[i]).parent('.ad_search_row').length == 1 || $(elements[i]).parent('.ad_input_row').length == 1 ) {
						if( $(elements[i]).parent().parent().children('p.error').length == 0 ) $(elements[i]).parent().parent().append( error[0].outerHTML )

					// textarea
					} else if( elements[i].tagName == 'TEXTAREA' ) {
						if( $(elements[i]).parent().children('p.error').length == 0 ) $(elements[i]).parent().append( error[0].outerHTML );

					// default
					} else {
						if( $(elements[i]).parent().children('p.error').length == 0 ) $(elements[i]).parent().append( error[0].outerHTML );
					}

				// select or select2
				} else if( elements[i].tagName == 'SELECT' ) {
					if( $(elements[i]).hasClass('select_custom') ) {
						if( $(elements[i]).parent().parent().children('p.error').length == 0 ) $(elements[i]).parent().parent().append( error[0].outerHTML ); // client
					} else {
						if( $(elements[i]).parent().children('p.error').length == 0 ) $(elements[i]).parent().append( error[0].outerHTML ); // staff
					}

				// file_validator
				} else if( elements[i].tagName == 'INPUT' && elements[i].name.endsWith('file_validator') && elements[i].type == 'hidden' ) {
					$(elements[i]).parent().append( error[0].outerHTML );

				// custom
				} else {

				}
			}
		}

		, invalidHandler : function(form, validator) {
			$('input, textarea, select').on('propertychange change keyup paste input focusout', function() {
				validator.element( $(this) );
			});

			alert('입력값을 확인하세요.');

			try {
				validator.errorList[0].element.scrollIntoView(true);
			} catch(e) {
				console.log(e);
			}
			for(var i=0; i<validator.errorList.length; i++ ) {
				if( validator.errorList[i].element.tagName == "INPUT" || validator.errorList[i].element.tagName == "TEXTAREA" || validator.errorList[i].element.tagName == 'SELECT' ) {
					validator.errorList[i].element.focus(); break;
				}
			}
		}
	});

	var elLoop = {};

	var form = this[0];

	for ( var i = 0, elements = this.find( "input, textarea, select, [contenteditable]" ).not( ":submit, :reset, :image, :disabled, [data-validation-disabled = true]" ); elements[i]; i++ ) {
		var hasValdatro = false;

		if( !elLoop[elements[i].name] && elements[i].name  ) {
			var els = findByName( elements[i].name );

			if ( els.length != undefined && els.length > 1) {

				for (var cnt = 0; cnt < els.length; cnt++) {
					if( els[cnt].dataset && els[cnt].dataset.validation ) {
						$(els[cnt]).rules("remove");
						$(els[cnt]).rules("add",  JSON.parse(els[cnt].dataset.validation));

						hasValdatro = true;
					}
				}

			} else {
				if( elements[i].dataset && elements[i].dataset.validation ) {
					$(elements[i]).rules("remove");
					$(elements[i]).rules("add", JSON.parse(elements[i].dataset.validation));

					hasValdatro = true;
				}
			}
		}

		if( hasValdatro ) {
			elLoop[elements[i].name] = elements[i].name;
		}
	}

	function findByName( name ) {
		return $(form).find( "[name='" + escapeCssMeta( name ) + "'][data-validation-disabled != true]"  );
	}

	function  escapeCssMeta( string ) {
		return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
	}

	if( $('#'+ this[0].id).valid() ) {
		if( callback ) {
			callback();
		}
	}
}


/**
 * 공통코드 조회(콤보박스)
 * @param comnCdPcodeId	= 조회할 부모 코드(upCd)
 * @param viewId					= 콤보박스가 append 될 태그의 부모 태그
 * @param selValue				= 선택될 코드값
 * @param allValue				= 기본 노출값
 * @param useAsync				= true / false
 * @param basePathClient
 * @param cdCol					= 코드 값으로 사용할 컬럼. CamelCase로 입력. (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 * @param selCol					= column use YN (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 * @returns
 */
function fnSetComnCdCombo(comnCdPcodeId, viewId, selValue, allValue, useAsync, basePathClient, cdCol, selCol) {
	if(typeof basePath == "undefined" && basePath(allValue) || basePath == null || basePath == 'null') {
		basePath = basePathClient;
	}
	var _url = basePath+"/cmm/fms/getCodeListAjax.do";

	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#"+viewId);

	if(comnCdPcodeId == ""){
		return false;
	}

	if(typeof targetView == "undefined") {
		return;
	}

	if(typeof allValue != "undefined" && !isEmpty(allValue)) {
		targetView.children().remove().end().append('<option value="">'+allValue+'</option>') ;
	}else {
		targetView.children().remove();
	}

	cdCol = (typeof cdCol !== 'undefined') ? cdCol : "cdId"; // cdCol의 기본값 'cdId'

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			comnCdPcodeId   : comnCdPcodeId
		},
		success: function(r) {
			if (r.beanlist.length > 0) {
				for(var idx=0; idx<r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					if(typeof selValue != "undefined" && selValue == obj[cdCol]) {
						targetView.append("<option value='"+obj[cdCol]+"' selected>"+obj.cdNm+"</option>");
					} else {
						targetView.append("<option value='"+obj[cdCol]+"'>"+obj.cdNm+"</option>");
					}
					if( typeof selCol != "undefined" ){
						if( obj[selCol] == null ){
							targetView.children("option").eq( targetView.children("option").length - 1 ).remove();
						}
					}
				}
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
		}
	}) ;
}

/**
 * 공통코드 조회(부서정보 select박스)
 * @param typeDiv				= SREG : 학생정보테이블에서 가져온 학과코드/ DEPT : 부서정보테이블에서 가져온 부서코드/APPLY_STD : 학생시점테이블에서 가져온 학과코드
 * @param deptDiv 			= 대학 : C, 학과 : H, 전공 : M, 학과/전공 : MH
 * @param viewId				= 콤보박스가 append 될 태그의 부모 태그
 * @param selValue			= 선택될 코드값
 * @param allValue				= 기본 노출값
 * @param useAsync			= true / false
 * @param basePathClient
 * @returns
 */
function fnSetDeptCdCombo(typeDiv, deptDiv, viewId, selValue, allValue, useAsync, basePathClient) {
	if(typeof basePath == "undefined" && basePath(allValue) || basePath == null || basePath == 'null') {
		basePath = basePathClient;
	}
	var _url = basePath+"/cmm/fms/getSelectDeptCodeAjax.do";

	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#"+viewId);

	if(typeDiv == "" || typeof targetView == "undefined"){
		return false;
	}

	if(typeof allValue != "undefined" && !isEmpty(allValue)) {
		targetView.children().remove().end().append('<option value="">'+allValue+'</option>') ;
	}else {
		targetView.children().remove();
	}

	cdCol = (typeof cdCol !== 'undefined') ? cdCol : "deptCd"; // cdCol의 기본값 'cdId'

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			typeDiv   : typeDiv
			, deptDiv : deptDiv
		},
		success: function(r) {
			if (r.sustMdCdList.length > 0) {
				for(var idx=0; idx<r.sustMdCdList.length; idx++) {
					var obj = r.sustMdCdList[idx];
					if(typeof selValue != "undefined" && selValue == obj[cdCol]) {
						targetView.append("<option value='"+obj[cdCol]+"' selected>"+obj.deptKorNm+"</option>");
					} else {
						targetView.append("<option value='"+obj[cdCol]+"'>"+obj.deptKorNm+"</option>");
					}
				}
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+typeDiv+","+deptDiv+")");
		}
	}) ;
}

/**
 * 공통코드 조회(체크박스)
 * @param comnCdPcodeId	= 조회할 부모 코드(upCd)
 * @param viewId					= 체크박스가 append 될 태그의 부모 태그
 * @param chkdValue				= 선택될 코드값
 * @param valueName			= name 값
 * @param userGubun			= admin / client
 * @param useAsync				= ture / false
 * @param validation				= validation 값
 * @param cdCol					= 코드 값으로 사용할 컬럼. CamelCase로 입력. (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 * @param selCol					= column use YN (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 */
function fnSetComnCdCheckBox(comnCdPcodeId, viewId, chkdValue, valueName, userGubun, useAsync, validation, cdCol, selCol) {
	var _url = basePath+"/cmm/fms/getCodeListAjax.do";

	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#"+viewId);

	if(comnCdPcodeId == ""){
		return false;
	}

	if(typeof targetView == "undefined") {
		return;
	}

	cdCol = (typeof cdCol !== 'undefined') ? cdCol : "cdId"; // cdCol의 기본값 'cdId'

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			comnCdPcodeId : comnCdPcodeId
		},
		success: function(r) {
			if (r.beanlist.length > 0) {
				for(var idx=0; idx<r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					var checked = chkdValue.indexOf(obj[cdCol]) != -1 ? 'checked' : '';
					if (userGubun == "client") {
						targetView.append(
							'<p class="check_row">'
							+'<input name="'+valueName+'" class="check '+viewId+'Check'+viewId+'All" id="'+viewId+idx+'" type="checkbox" value="'+obj[cdCol]+'" title="'+obj.cdNm+'" '+checked+' hidden>'
							+'<label for="'+viewId+idx+'" style="width : 80px;">'+obj.cdNm+'</label>'
							+'</p>'
						);
					}else{
						targetView.append(
							'<p class="ad_input_row">'
							+'<input name="'+valueName+'" class="check '+viewId+'Check '+viewId+'All" id="'+viewId+idx+'" type="checkbox" value="'+obj[cdCol]+'" title="'+obj.cdNm+'"onclick="fnCreateEtcInputBox('+"'"+obj[cdCol]+"'"+')" onchange="fn_checkbox('+"'"+viewId+'All'+"'"+", '"+viewId+'All'+"'"+');" '+checked+' data-validation=\''+validation+'\'>'
							+'<label for="'+viewId+idx+'" class="check_label">'+obj.cdNm+'</label>'
							+'</p>'
						);
					}
					if( typeof selCol != "undefined" ){
						if( obj[selCol] == null ){
							targetView.children("p").eq( targetView.children("p").length - 1 ).remove();
						}
					}
				}
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
		}
	}) ;
}

/**
 * 공통코드 조회(라디오)
 * @param comnCdPcodeId	= 조회할 부모 코드(upCd)
 * @param viewId					= 라디오가 append 될 태그의 부모 태그
 * @param chkdValue				= 선택될 코드값
 * @param valueName			= name 값
 * @param userGubun			= admin / client
 * @param useAsync				= ture / false
 * @param validation				= validation 값
 * @param cdCol					= 코드 값으로 사용할 컬럼. CamelCase로 입력. (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 * @param selCol					= column use YN (cps_code_mng 테이블 usedef1,usedef2,usedef3.. 활용)
 */
function fnSetComnCdRadio(comnCdPcodeId, viewId, chkdValue, valueName, userGubun, useAsync, validation, events, cdCol, selCol) {
	var _url = basePath+"/cmm/fms/getCodeListAjax.do";

	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#"+viewId);

	if(comnCdPcodeId == ""){
		return false;
	}

	if(typeof targetView == "undefined") {
		return;
	}

	targetView.children("p").remove();

	cdCol = (typeof cdCol !== 'undefined') ? cdCol : "cdId"; // cdCol의 기본값 'cdId'

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			comnCdPcodeId   : comnCdPcodeId
		},
		success: function(r) {
			if (r.beanlist.length > 0) {
				for(var idx=0; idx<r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					var checked = chkdValue.indexOf(obj[cdCol]) != -1 ? 'checked' : '';
					if( chkdValue == "" ) {
						if( idx == 0 ) checked = 'checked';
					}
					if (userGubun == "client") {
						targetView.append(
							'<p class="radio_row">'
							+'<input name="'+valueName+'" id="'+viewId+idx+'" type="radio" value="'+obj[cdCol]+'" title="'+obj.cdNm+'" data-validation=\''+validation+'\' '+events+' '+checked+' hidden>'
							+'<label for="'+viewId+idx+'">'+obj.cdNm+'</label>'
							+'</p>'
						);
					}else {
						targetView.append(
							'<p class="ad_input_row">'
							+'<input name="'+valueName+'" class="radio" id="'+viewId+idx+'" type="radio" value="'+obj[cdCol]+'" title="'+obj.cdNm+'" data-validation=\''+validation+'\' '+events+' '+checked+'>'
							+'<label for="'+viewId+idx+'" class="radio_label">'+obj.cdNm+'</label>'
							+'</p>'
						);
					}
					if( typeof selCol != "undefined" ){
						if( obj[selCol] == null ){
							targetView.children("p").eq( targetView.children("p").length - 1 ).remove();
						}
					}
				}
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
		}
	}) ;
}

/**
*********************************************************
@ function : 체크박스 체크된 value들 ,로 연결
@ param  : chkNm - 체크박스 name
@ comment  :
	_sendType = 'sms'                        //발송구분 (sms/vms/mms)
	_userId = 'dainls'                       //발송자 아이디
	_subject = '테스트입니다.'               //제목
	_address = '박두현^01073705046|';        //수신자명^수신자번호|
	_content = '문자발송 테스트입니다.'      //SMS내용
	_callbackNo = '025142060'                //회신번호
	_scheduleType = '0'                      //0:즉시발송 , 1: 예약발송
	_scheduleStime = 'null'                  //예약발송시 발송년월일시분(20191020304)
	_categoryNm = 'CEP_프로그램'             //발송업무구분
@ history  : 2019-05-10 (최초작성)
**********************************************************
 **/
function fnSendSmsMessage(_sendType, _userId, _subject, _address, _content, _callbackNo ,_scheduleType, _scheduleStime , _categoryNm){
	/*
		alert(" _sendType = " + _sendType
		+"\n _userId = " + _userId
		+"\n _subject = " + _subject
		+"\n _address = " + _address
		+"\n _content = " + _content
		+"\n _callbackNo = " + _callbackNo
		+"\n _scheduleType = " + _scheduleType
		+"\n _scheduleStime = " + _scheduleStime
		+"\n _categoryNm = " + _categoryNm
	);
	*/
	$.ajax({
		type : "POST"
		, url : basePath+"/cmm/fms/sendSmsMessage.do"
		, dataType : 'json'
		, data : {
				sendType : _sendType
				,userId : _userId
				,subject : _subject
				,address : _address
				,content : _content
				,callbackNo : _callbackNo
				,scheduleType : _scheduleType
				,scheduleStime : _scheduleStime
				,categoryNm : _categoryNm
			}
		,success : function(res){
			if (res.isSuccess == false) {
				alert("문자 전송에 실패 하였습니다.")
			}

		}
		, error:function(request,status,error){
			alert("문자 전송에 실패 하였습니다."); // 실패 시 처리
		}
	});
}

/**
*****************************************
@ function : datepicker
@ comment  :
*****************************************
**/
function fnDtpicker() {
	$(".dtpicker").each(function(){
		var datepicker = $(this).attr('id');
		datePickerSearch(datepicker);
	});
}
function datePicker(id) {
	var dates = $("#" + id)
	.datepicker(
	{
	dateFormat : 'yy-mm-dd',
	showOn : "both",
	buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
	closeText : '닫기',
	prevText : '이전달',
	nexttext : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	changeMonth: true,
	changeYear: true,
});

function getStrMonth(Month) {
	Month = Month + "";
	if (Month.length == 1) {
		Month = "0" + Month;
	}
	return Month;
}

function getStrDay(Day) {
	Day = Day + "";
	if (Day.length == 1) {
		Day = "0" + Day;
	}
	return Day;
	}
}

//JqGrid search용
function datePickerSearch(id) {
	var dates = $("#" + id)
	.datepicker(
	{
	dateFormat : 'yy-mm-dd',
	showOn : "both",
	buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
	closeText : '닫기',
	prevText : '이전달',
	nexttext : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	changeMonth: true,
	changeYear: true,
	beforeShow: function() {
	setTimeout(function(){
	$('.ui-datepicker').css('z-index', 99999999999999);
	}, 0);
	}
});

function getStrMonth(Month) {
	Month = Month + "";
	if (Month.length == 1) {
		Month = "0" + Month;
	}
	return Month;
}

function getStrDay(Day) {
	Day = Day + "";
	if (Day.length == 1) {
		Day = "0" + Day;
	}
	return Day;
	}
}

//datepicker client 설정
function datePickerClient(id) {
	var dates = $("#" + id)
	.datepicker(
	{
	dateFormat : 'yy-mm-dd',
	showOn : "both",
	buttonText : "<a href='javascript:void(0);' class='calendar_open'>달력열기</a>",
	closeText : '닫기',
	prevText : '이전달',
	nexttext : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	changeMonth: true,
	changeYear: true,
});

function getStrMonth(Month) {
	Month = Month + "";
	if (Month.length == 1) {
		Month = "0" + Month;
	}
	return Month;
}

function getStrDay(Day) {
	Day = Day + "";
	if (Day.length == 1) {
		Day = "0" + Day;
	}
	return Day;
	}
}

//datepicker client 설정
function datePickerCns(id) {
	var dates = $("#" + id)
	.datepicker(
	{
	dateFormat : 'yy-mm-dd',
	showOn : "both",
	buttonText : "<a href='javascript:void(0);' class='cs_calendar_img'>달력열기</a>",
	closeText : '닫기',
	prevText : '이전달',
	nexttext : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	changeMonth: true,
	changeYear: true,
});

function getStrMonth(Month) {
	Month = Month + "";
	if (Month.length == 1) {
		Month = "0" + Month;
	}
	return Month;
}

function getStrDay(Day) {
	Day = Day + "";
	if (Day.length == 1) {
		Day = "0" + Day;
	}
	return Day;
	}
}

//datePicker 특허전용
function datePickerPat(id) {
	var dates = $("#" + id)
	.datepicker(
	{
	dateFormat : 'yymmdd',
	showOn : "both",
	buttonText : "<a href='javascript:void(0);' class='ad_calendar_img'>달력열기</a>",
	closeText : '닫기',
	prevText : '이전달',
	nexttext : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월',
	'7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	changeMonth: true,
	changeYear: true,
	});

	function getStrMonth(Month) {
		Month = Month + "";
		if (Month.length == 1) {
			Month = "0" + Month;
		}
		return Month;
	}

	function getStrDay(Day) {
		Day = Day + "";
		if (Day.length == 1) {
			Day = "0" + Day;
		}
		return Day;
	}
}

/**
***************************************
@ function : String 안에 특정 문자 갯수 찾기
@ comment  :
@ param    : _str : 대상 문자열, _word : 찾고 싶은 문자
@ history  : 2021-01-12 (최초작성)
****************************************
**/
function matchWordCnt(_str, _word) {
	_word = new RegExp(_word, 'g');
	var results = _str.match(_word);
	var length = 0;
	if(results != null) {
		length = results.length;
	}
	console.log(length);
	return length;
}

/**
***************************************
@ function : 해시태그 추가하기 기능
@ comment  :
@ param    : button 객체
@ history  : 2021-01-12 (최초작성)
****************************************
**/
function tagAddBtn(obj) {
	var _tagVal = $(obj).prev("input").val().trim();
	var _hashTagCnt = $("#hashContent").find("li").length;
	var _tagArr = new Array();
	if( _tagVal == '' ) {
		alert("태그 입력해주세요");
		return;
	}

	var _tempArr = _tagVal.split(' ');
	for(var i=0; i < _tempArr.length; i++) {
		if((matchWordCnt(_tempArr[i], '#') == 1) && (_tempArr[i] != ('#'))) {
			_tagArr.push(_tempArr[i]);
		} else if((matchWordCnt(_tempArr[i], '#') >= 2) ) {
			alert("한 해시태그에 #은 두개 이상 쓸 수 없습니다.");
			return false;
		} else {
			alert("태그 추가시 해시태그가 포함되어야하며 공백은 포함 할 수 없습니다.")
			return false;
		}
	}

	/* 10개 이상 추가 못하도록 */
	if((_hashTagCnt + _tagArr.length) > 10) {
		alert("한 게시물에 해시태그는 10개까지만 작성 가능합니다.");
		return false;
	}

	for(var i=0; i < _tagArr.length; i++) {
		var _tagStr = '';
		_tagStr += 	'<li>'+ _tagArr[i] + '<span onclick="delTag(this);" class="btn_del" title="태그삭제"></span>';
		_tagStr += 	'<input type="hidden" name="hashTagCont" value="'+_tagArr[i]+'"/>';
		_tagStr += 	'</li>';
		$("#hashContent").append(_tagStr);
		$(obj).prev("input").val("");
	}

}

/**
***************************************
@ function : 해시태그 삭제 기능
@ comment  :
@ param    : 삭제 대상 객체
@ history  : 2021-01-12 (최초작성)
****************************************
**/
function delTag(obj) {
	$(obj).parent('li').remove();
}

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////특정 메뉴에서만 쓰이는 함수////////////////////////////////

/**
***************************************
@ function : 프로그램 별점 평균 가져오기
@ comment  :
@ param    : _starKeyId
@ history  : 2021-01-09 (최초작성)
****************************************
**/
function fnGetProgramStarAvgAjax(_npiKeyId, programGubun) {
	var _url = basePath+"/"+ programGubun +"/a/n/getProgramStarAvgAjax.do";
	$.ajax({
		url : _url
		, type : "POST"
		, data : {
			npiKeyId : _npiKeyId
		}
		, success : function(res) {
			$("#starAvgDiv").empty();
			$("#starAvgDiv").html(res);
		}
		, error : function(request, status, error) {
		}
	});
}

/**
***************************************
@ function : 프로그램 (학년, 성별)별점 평균 가져오기
@ comment  :
@ param    : _starKeyId
@ history  : 2021-01-09 (최초작성)
****************************************
**/
function fnGetProgramStarGraphAjax(_csmReferKeyId, programGubun) {
	var _url = basePath+"/"+ programGubun +"/a/n/getProgramStarGraphAjax.do";
	$.ajax({
		url : _url
		, type : "POST"
		, data : {
			csmReferKeyId : _csmReferKeyId
		}
		, success : function(res) {
			var maleData = [];
			var femaleData = [];
			if(res.programStdStarAvg[0] == null) {
				maleData.push(0);
				maleData.push(0);
				maleData.push(0);
				maleData.push(0);

				femaleData.push(0);
				femaleData.push(0);
				femaleData.push(0);
				femaleData.push(0);
			} else {
				maleData.push(res.programStdStarAvg[0].START_POINT_1_M);
				maleData.push(res.programStdStarAvg[0].START_POINT_2_M);
				maleData.push(res.programStdStarAvg[0].START_POINT_3_M);
				maleData.push(res.programStdStarAvg[0].START_POINT_4_M);

				femaleData.push(res.programStdStarAvg[0].START_POINT_1_F*-1);
				femaleData.push(res.programStdStarAvg[0].START_POINT_2_F*-1);
				femaleData.push(res.programStdStarAvg[0].START_POINT_3_F*-1);
				femaleData.push(res.programStdStarAvg[0].START_POINT_4_F*-1);
			}
			drawAblitColuChartGraph('programStarAjax','평점', maleData, femaleData);
		}
		, error : function(request, status, error) {
		}
	});
}

/**
***************************************
@ function : 댓글 리스트 가져오기
@ comment  :
@ param    : _npiKeyId (비교과 key), programGubun (url)
			, _applyYn (작성 권한) ,_pageIndex (페이징 넘버)
@ history  : 2021-01-09 (최초작성)
****************************************
**/
function replyListAjax(_npiKeyId, programGubun, _applyYn ,_pageIndex) {
	var _url = basePath+"/" + programGubun +"/a/n/getReplyListAjax.do";
	var order_latest = $("#order_latest").val();
	if(order_latest != 'Y' ) order_latest = '';
	if(_pageIndex == null || _pageIndex == '' || _pageIndex == undefined) _pageIndex = 1;

	$.ajax({
		url : _url
		, type : "post"
		, dataType : "html"
		, data : {
			pageIndex : _pageIndex
			, npiKeyId : _npiKeyId
			, applyYn : _applyYn
			, orderLatest : order_latest
			, programGubun : programGubun
		}
		, success : function(res) {
			$("#replyListAjax").empty();
			$("#replyListAjax").html(res);
		}
	});
}



function create_chart_radar(chartData) {
	chart = new AmCharts.AmRadarChart();
	chart.dataProvider = chartData;
	chart.categoryField = "title";
	chart.fontFamily = "NanumGothic";

	chart.panEventsEnabled = false;

	AmCharts.checkEmptyData = function (chart) {
			if ( 0 == chart.dataProvider.length ) {

					// add dummy data point
					var dataPoint = {
							dummyValue: 0
					};
					dataPoint[chart.categoryField] = '';
					chart.dataProvider = [dataPoint];

					// add label
					chart.addLabel(0, '50%', '차트 데이터가 없습니다.', 'center');

					// set opacity of the chart div
					chart.chartDiv.style.opacity = 0.5;

					// redraw it
					chart.validateNow();
			}
	}

	return chart;
}

function get_valueAxis_radar(max) {
	// VALUE AXIS
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.gridType = "polygons";
	valueAxis.axisAlpha = 0.15;
	valueAxis.minimum = 0;
	valueAxis.maximum = max;
	valueAxis.autoGridCount = false;
	valueAxis.gridCount = 5;

	return valueAxis;
}

function get_graph_radar1(valueField) {
	var graph = new AmCharts.AmGraph();
	if (valueField !== undefined) graph.valueField = valueField;

	return graph;
}

function create_chart_bar(chartData) {
	var chart = new AmCharts.AmSerialChart();
	if(chartData !== undefined) chart.dataProvider = chartData;
		chart.categoryField = "title";
		chart.fontFamily = "NanumGothic";

		AmCharts.checkEmptyData = function (chart) {
			if ( 0 == chart.dataProvider.length ) {

					// add dummy data point
					var dataPoint = {
							dummyValue: 0
					};
					dataPoint[chart.categoryField] = '';
					chart.dataProvider = [dataPoint];

					// add label
					//chart.addLabel(0, '50%', '차트 데이터가 없습니다.', 'center');

					// set opacity of the chart div
					chart.chartDiv.style.opacity = 0.5;

					// redraw it
					chart.validateNow();
			}
	};

	return chart;
}

function get_graph_bar1(valueField) {
	var graph = new AmCharts.AmGraph();
	if(valueField !== undefined) graph.valueField = valueField;
	graph.type = "column";
	graph.lineAlpha = 0;
	graph.fillAlphas = 0.8;

	return graph;
}

function get_valueAxis_bar() {
	// VALUE AXIS
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.minimum = 0;
	valueAxis.maximum = 100;
	valueAxis.autoGridCount = false;
	valueAxis.gridCount = 5;
	valueAxis.autoWrap = true;

	return valueAxis;
}

// 비교과 다중 첨부파일 수정하였을때 값넣기
$(document).on("change", ".attachFileTag", function() {

	var fileNameTag = "";

	var tagId = "";

	var tagIdNo = "";

	// 값이 변경되면
	if (window.FileReader) {
		// modern browser
		var filename = $(this)[0].files[0].name;
	} else {
		// old IE
		var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
	}
	// 추출한 파일명 삽입
	// $(this).parent("label").siblings(".upload_name").val(filename);

	tagId = $(this).attr("id");
	tagIdNo = tagId.substring(13);

	console.log("tagId: "+tagId);
	console.log("tagIdNo: "+tagIdNo);

	if(tagIdNo == '1') {
		fileNameTag = "<div class='filedown_row mg_t5'>"
	} else {
		fileNameTag = "<div class='filedown_row'>"
	}

	fileNameTag += "<a href='javascript:void(0);' class='ad_filelink'><i class='fa fa-file-o'></i>"+filename+"</a>"
			+"<button type='button' class='btn_reset' title='파일삭제'><i class='fa fa-times-circle'></i></button>"
		+"</div>"

	$(this).parent("td").append(fileNameTag);
});

function fnChkFavoriteData(falMenuId, falType, btnId, targetUrl) {
	var sessionUserId =  {

	};
	if (sessionUserId == '') {
		if (confirm("찜하기는 로그인이 필요한 기능 입니다.\n" + "로그인 하시겠습니까?")) {
			//fnGoLoginPopUp(basePath + targetUrl);
			location.href = basePath + "/client/index.do";
		}
		if (falType == 'NCR_PROGRAM') {
			event.preventDefault();
		}
	} else {
		fnInsertFavoriteData(falMenuId, falType, btnId);
	}
}

function fnInsertFavoriteData(falMenuId, falType, btnId) {
	var faluseYn = '';
	if ($("#" + btnId).hasClass('on')|| !$("#" + btnId).is(":checked")){
		faluseYn = 'N';
	} else {
		faluseYn = 'Y';
	}

	var _url = basePath + "/cmm/fms/createFavoriteData.do";

	jQuery.ajax({
		type: "POST"
		, url: _url
		, dataType: "json"
		, data : {
			falMenuId : falMenuId
			, falType : falType
			, faluseYn : faluseYn
		}
		, success: function(r) {
			if (r.rtnCode == '-1') {
				alert("찜하기에 실패하였습니다.");
				$("#" + btnId).removeClass("on");
			}
		},
		error: function(r) {
			console.log("찜하기에 실패 하였습니다.");
			$("#" + btnId).removeClass("on");
		}
	});
}

var rval = "";
var timer = null;
checker = function(obj, count, textlimitName) {
	if (rval != obj.value) {
		if (textlimitName && document.getElementById(textlimitName)) {
			document.getElementById(textlimitName).innerHTML = obj.value
					.bytes();
		}
		rval = obj.value;
	}
	if (obj.value.bytes() > count) {
		alert("최대 " + count + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
		obj.value = obj.value.cut(count, '');
		stopchecker();
	}
	if (textlimitName) {
		timer = setTimeout(function() {
			checker(obj, count, textlimitName);
		}, 10);
	} else {
		timer = setTimeout(function() {
			checker(obj, count);
		}, 10);
	}
};

stopchecker = function() {
	clearTimeout(timer);
};

String.prototype.bytes = function() {
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++)
		l += (str.charCodeAt(i) > 128) ? 2 : 1;

	return l;
};

String.prototype.cut = function(len, tail) {
	if (tail == null) {
		tail = '...';
	}
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len)
			return str.substring(0, i) + tail;
	}
	return str;
};