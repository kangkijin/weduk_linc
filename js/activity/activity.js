var BASE_PATH =  sessionStorage.getItem("contextRootPath");


/*
 * ***************************************
@ function : 엔터키 눌릴시 검색
@ comment  :
****************************************
 * */
$(document).keypress(function(event) {
	var keycode = event.keyCode || event.which;
    if(event.keyCode == 13) {
    	$('#searchBtn').trigger('click');
    }
});


/*
***************************************
@ function : 엑셀샘플 다운로드
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnDownExcelSample(_menu){
	var _url = BASE_PATH+"/"+_menu+"/r/n/getActivitySampleExcelDown.do";

	if (_menu == 'certiInfo') {
		fn_fileDownload(BASE_PATH,'CERTILANG00000000');
//		location.href = BASE_PATH+"/sample/certi_upload_sample.xlsx";
	}else if(_menu == 'langInfo'){
		fn_fileDownload(BASE_PATH,'CERTILANG00000000');
//		location.href = BASE_PATH+"/sample/lang_upload_sample.xlsx";
	}else if(_menu == 'trainingSTF'){
		location.href = BASE_PATH+"/sample/training_act_req_sample.xlsx";
	}else {
		$("#excelSampleDownForm").attr({"action" : _url, "target" : "excelView"}).submit();
	}

}


function fnExcelUpload(_menu) {

	fn_resetFile(null, "fileExcelUpload");
	$("#excelUploadForm input[name=fileExcelUpload]").trigger("click");
}


$("#excelUploadForm input[name=fileExcelUpload]").on("change", function() {

	var _menu = $("input[name=menu]").val();
	var _subMenu = $("input[name=subMenu]").val();
	var _url = BASE_PATH+"/"+_menu+"/w/n/createActivityUploadExcel.do";

	//자격증/어학 업로드일 경우
	console.log("subMenu = "+_subMenu);
	if (_subMenu == "certiLangInfo") {
		_url = BASE_PATH+"/"+_menu+"/w/n/createCertiLangUploadExcel.do";
	}


	if( $("#excelUploadForm input[name=fileExcelUpload]").val() != "" ) {

		var formData = new FormData();
		formData.append("fileExcel", $("#excelUploadForm input[name=fileExcelUpload]")[0].files[0]);

		$.ajax({
			url: _url
			, async : false
			, cache : false
			, enctype : "multipart/form-data"
			, processData : false
			, contentType : false
			, data : formData
			, type: "post"
			, success : function( res ) {
				var _totalCnt = res.result.uploadTotalCnt;
				var _failCnt = res.result.uploadFailCnt;
				var _successCnt = parseInt(_totalCnt)-parseInt(_failCnt);
				var _failMsg = "";

				if( _totalCnt != 0 && _failCnt == 0 ) {
					alert("추가되었습니다.\n\n"
							+"총 건수 : "+_totalCnt+"건 \n"
							+"성공 : "+_successCnt+"건 \n"
							+"실패 : "+_failCnt+"건 \n");

				} else {

					_failMsg = "항목이 입력되지 않았거나 입력하신 정보가 맞지 않아 실패하였습니다.\n\n"
						+"총 건수 : "+_totalCnt+"건 \n"
						+"성공 : "+_successCnt+"건 \n"
						+"실패 : "+_failCnt+"건";

//					for (var i = 0; i < res.result.errData.length; i++) {
//						if (i = 0) {
//							_failMsg = _failMsg + res.result.errData[i].errCode;
//						}else {
//							_failMsg = _failMsg + ","+res.result.errData[i].errCode;
//						}
//					}

					alert(_failMsg);
				}

				tableObject.destroy();
				callGrid();
			}
		});

	}
});


/*
***************************************
@ function : 반려팝업
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnOpenRejectPopUp(_menu){
	$('#POPUP_OPEN_BTN').trigger('click');
	$.ajaxSetup({
		cache : false
	});

	var popupDivId = "#layerPopup";
	var popupUrl = BASE_PATH+"/"+_menu+"/r/n/getRejectPopUp.do";
	var popupParams = {}

	loadPopup(popupDivId, popupUrl, popupParams);
}

/*
***************************************
@ function : 개별 반려팝업 띄우기
@ param    :_menu = 메뉴구분
@ param    :_oamStdNo = 학번
@ param    :_korNm = 이름
@ param    :_oamKeyId = 자기주도활동 key
@ comment  :
****************************************
 * */
function fnOpenRejectIndiPopUp(_menu, _oamStdNo, _korNm, _oamKeyId){
	$('#POPUP_OPEN_BTN').trigger('click');
	$.ajaxSetup({
		cache : false,
		data : {
			oamStdNo : _oamStdNo,
			korNm : _korNm,
			oamKeyId : _oamKeyId
		}
	});

	var popupDivId = "#layerPopup";
	var popupUrl = BASE_PATH+"/"+_menu+"/r/n/getRejectIndiPopUp.do";
	var popupParams = {}

	loadPopup(popupDivId, popupUrl, popupParams);
}

/*
***************************************
@ function : 반려 버튼을 통한 개별 반려처리
@ comment  : REJECT(반려)
@ param    : _menu = 메뉴구분
@ param    : _state = 반려
@ param    : _oamReasonCont = 반려사유
****************************************
 * */
function fnModifyIndiStateAjax(_menu, _oamReasonCont) {

	var selActState = 'OAMSATECD03';
	var resultObj = new Object();

	resultObj.oamKeyId = $('#oamKeyId').val();
	resultObj.oamReasonCont = _oamReasonCont;
	resultObj.oamTypeCd = $('#oamTypeCd').val();
	resultObj.oamState = selActState;

	console.log(resultObj);

	$.ajax({
		type : "POST"
		, url : BASE_PATH+"/"+_menu+"/w/n/modifyActStdIndiState.do"
		, contentType : 'application/json'
		, async : false
		, dataType : 'json'
		, data : JSON.stringify(resultObj)
		, success : function(res){

			if (res.rtnCode == 0) {
				alert("상태변경을 성공하였습니다.");

				if (!isEmpty(_oamReasonCont)) {
					$('#ACT_POP_UP_CLOSE_BTN').trigger('click');
				}
				tableObject.destroy();
				callGrid();

			}else{
				alert("상태변경을 실패하였습니다.");
			}
		}
		, error:function(request,status,error){
			alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
	});
}

/*
***************************************
@ function : 개별 반려 내용 확인 팝업 띄우기
@ param    :_menu = 메뉴구분
@ param    :_oamKeyId = 자기주도활동 key
@ comment  :
****************************************
 * */
function fnOpenRejectInfoPopUp(_menu, _oamKeyId){
	$('#POPUP_OPEN_BTN').trigger('click');
	$.ajaxSetup({
		cache : false,
		data : {
			oamKeyId : _oamKeyId
		}
	});

	var popupDivId = "#layerPopup";
	var popupUrl = BASE_PATH+"/"+_menu+"/r/n/getRejectInfoPopup.do";
	var popupParams = {}

	loadPopup(popupDivId, popupUrl, popupParams);
}



/*
***************************************
@ function : 상태일괄 변경
@ comment  :APPROV(승인)/REJECT(반려)
@ param    :_menu = 메뉴구분
@ param    :_state = 승인/반려
@ param    :_oamReasonCont = 반려사유
****************************************
 * */
function fnModifyStateAjax(_menu,_oamReasonCont) {

	var selData = tableObject.rows({selected:true}).data();// 선택된 row에 대한 값
	var selActState = $('#selActState').val();
	var chkCnt = 0; /**선택된 학생 총카운트*/
	var count = 0; /**수정가능 학생 카운트*/

	//상태변경 update info 목록
	var infoArray = new Array();
	var abilityInfo = new Object();
	var abilityInfoArray = new Array();

	var resultObj = new Object();
	var abilityNum = 1;
	var addMileageVal = 0;
	var abilityScoreVal = 0;
	var oamTypeCd = $('#oamTypeCd').val();
	console.log("====selData=====");
	console.log(selData);
	console.log(oamTypeCd);

	for(var i=0; i < selData.length; i++){
		chkCnt++
		var infoObj = new Object();
		var _stsVal = selData[i].oamState;
		var finMileage = 0;

		if(oamTypeCd =="OAMTYPCD01"){
			switch (selData[i].clcCertiDiv) {
			case 'ECI_DIV001': //국가전문자격증일경우 : 70점
				finMileage = 70;
				break;
			case 'ECI_DIV006': //기타자격증일경우 : 0점
				finMileage = 0;
				break;
			default: //그외 모두 : 50점
				finMileage = 50;
				break;
			}
		}

		if(oamTypeCd =="OAMTYPCD02"){
			switch (selData[i].clcCertiDiv) {
			case 'LANG_DIV01' : case 'LANG_DIV02':case 'LANG_DIV03':case 'LANG_DIV04':case 'LANG_DIV05':case 'LANG_DIV06':
			case 'LANG_DIV07':case 'LANG_DIV08':case 'LANG_DIV09':case 'LANG_DIV10': //영어관련자격증 전부 50점
				finMileage = 50;
				break;
			default: //그외 모두 : 20점
				finMileage = 20;
				break;
			}
		}
		if(oamTypeCd =="OAMTYPCD04"){
			switch (selData[i].clcCertiDiv) {
			case 'ETC_DIV02':
				finMileage = 10;
				break;
			case 'ETC_DIV06':
				finMileage = 30;
				break;
			default: //그외 모두 : 20점
				finMileage = 0;
			break;
			}
		}


		console.log(finMileage);

		var isOkStdState = false;

		infoObj.oamKeyId = selData[i].oamKeyId;


		//변경할 상태값이 = 승인대기일때
		/*1)반려->승인대기 2)승인완료->승인대기 만 가능*/

		/**선택한 상태가 승인대기이면*/
		if(selActState == "OAMSATECD01") {

			/**학생 상태값이 반려,승인완료일때 수정이 가능*/
			if( _stsVal == "OAMSATECD03" || _stsVal == "OAMSATECD02") {
				count++;
				isOkStdState = true;
			}
		}
/*
		*//**선택한 상태가 학과승인 또는 학과반려이면 *//*
		else if(selActState == "OAMSATECD05" || selActState == "OAMSATECD06") {

			*//**학생 상태값이 승인대기일때만 수정가능*//*
			if( _stsVal == "OAMSATECD01") {
				count++;
				isOkStdState = true;
			}
		}*/

		//변경할 상태값이 = 승인완료 or 반려일때
		/*1)승인대기->승인완료  2)승인대기->승인반려 만 가능*/
		/*승인완료->반려 처리는 불가*/
		/*반려 ->승인완료 처리는 불가*/

		/**선택한 상태가 최종승인 또는 관리자반려이면*/
		else if(selActState == "OAMSATECD02" || selActState == "OAMSATECD03") {

			/**학생 상태값이 승인대기일때만 수정가능*/
			if( _stsVal == "OAMSATECD01") {
				count++;
				isOkStdState = true;
			}
		}

		console.log("### 총 카운트: "+chkCnt);
		console.log("### 수정가능 카운트: "+count);

		/**상태변경 가능 학생 있는지 체크*/
		if( count == 0 ) {
			alert("현재 상태에 적용할 수 있는 학생이 없습니다.");
			return;
		}

		//변경가능한 상태인 학생만 체크
		if (isOkStdState == true) {
			infoObj.oamFinMileage = finMileage;
			infoObj.oamInfoKeyId = selData[i].oamKeyId;
			//역량정보
			infoObj.sahReferKeyId = selData[i].oamKeyId;
			infoObj.sahStdNo = selData[i].stdNo;

			infoArray.push(infoObj);

		}//if isOkStdState end

		console.log("### infoArray: "+infoArray);

/*		if (isOkStdState == true) {
			if (_menu.indexOf('outAct') > -1) {
				infoObj.oamFinMileage = finMileage;
				infoObj.oamInfoKeyId = selData[i].oamKeyId;
			}

			*//******봉사활동 경우 (역량점수 계산 = 봉사시간 x 난이도B(30점) x 10)*//*
			else if (_menu.indexOf('service') > -1){

				abilityInfo = new Object();
				var serviceHour = parseFloat(selData[i].oamHour);
				var serviceMin = parseFloat(selData[i].oamMin);
				var totalMileage = 0;

				if (serviceMin < 30) {
					serviceMin = 0.5;
				}else if (serviceMin >= 30) {
					serviceMin = 1;
				}

				abilityInfoArray = new Array();
				totalMileage = totalMileage + (serviceHour+serviceMin) * 30 *10 * 0.3;
				console.log("시간 = "+totalMileage);

				abilityInfo.sahScore = (serviceHour+serviceMin) * 30 *10 * 0.3;
				abilityInfo.sahAbilityCd = "A002";
				abilityInfoArray.push(abilityInfo);

				var abilityInfo = new Object();
				totalMileage = totalMileage + (serviceHour+serviceMin) * 30 *10 * 0.7;
				abilityInfo.sahScore = (serviceHour+serviceMin) * 30 *10 * 0.7;
				abilityInfo.sahAbilityCd = "A003";
				abilityInfoArray.push(abilityInfo);

				infoObj.oamFinMileage = finMileage == 0 ? totalMileage : totalMileage+finMileage;
				infoObj.abilityInfoList = abilityInfoArray;
				infoObj.oamInfoKeyId = selData[i].oamKeyId;
				infoObj.sahStdNo = selData[i].stdNo;

				*//******자격증/어학 경우*//*
			}else {

				//역량점수
				abilityInfoArray = new Array();
				if ($('#abiltyListCnt').val() > 0) {

					for(var k=0; k < $('#abiltyListCnt').val(); k++){
						abilityInfo = new Object();
						abilityNum = k+1;

						if ($("#A00"+abilityNum+"_"+selData[i].oamKeyId).val() == null || $("#A00"+abilityNum+"_"+selData[i].oamKeyId).val() == "") {
							$("#A00"+abilityNum+"_"+selData[i].oamKeyId).val(0)
						}
						abilityInfo.sahScore = $("#A00"+abilityNum+"_"+selData[i].oamKeyId).val();
						abilityInfo.sahAbilityCd = "A00"+abilityNum;
						abilityInfoArray.push(abilityInfo);
					}
				}

				infoObj.totalMileage = selData[i].clcMileage;
				infoObj.oamFinMileage = selData[i].clcMileage;
				infoObj.oamInfoKeyId= selData[i].oamKeyId;

				//역량정보
				infoObj.abilityInfoList = abilityInfoArray;

			}

			//역량정보
			infoObj.sahReferKeyId = selData[i].oamKeyId;
			infoObj.sahStdNo = selData[i].stdNo;
			infoArray.push(infoObj);

		}//if isOkStdState end
*/	}//for end


	resultObj.stateInfoList = infoArray;
	resultObj.oamReasonCont = _oamReasonCont;
	resultObj.oamTypeCd = $('#oamTypeCd').val();
	resultObj.oamState = selActState;
	resultObj.stdState = _stsVal;

	console.log("### resultObj: "+resultObj);

	$.ajax({
		type : "POST"
		, url : BASE_PATH+"/"+_menu+"/w/n/modifyActStdMultiState.do"
		, contentType : 'application/json'
		, async : false
		, dataType : 'json'
		, data : JSON.stringify(resultObj)
		,success : function(res){

			if (res.rtnCode == 0) {
				alert("일괄 상태변경을 성공하였습니다.");

				if (!isEmpty(_oamReasonCont)) {
					$('#ACT_POP_UP_CLOSE_BTN').trigger('click');
				}

				tableObject.destroy();
				callGrid();

			}else{
				alert("일괄 상태변경을 실패하였습니다.");
			}
		}
		, error:function(request,status,error){
			alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
	});
}

/*
***************************************
@ function : 학생 첨부파일 일괄 다운로드
@ comment  :
@ param    :
@ param    :
@ param    :
@ history  : 2019-02-20 (최초작성)
****************************************
 * */
function fnFileAllDownload(_fimReferKeyId,_menu,_stdNo,_korNm) {

	var _url = BASE_PATH+"/"+_menu+"/r/n/getActivityFileAllDown.do";

	$.ajax({
		url : _url
		, type : "POST"
		, dataType : "json"
		, async : false
		, data : {
			fimReferKeyId : _fimReferKeyId
		}
		, success : function(res) {
			var isSuccess = res.isSuccess;
			var path = res.path;
			if(isSuccess == "false") {
				alert("파일이 없습니다.");
			}else if(isSuccess == "true") {
				$("#allDownForm input[name=path]").val(res.path);
				$("#allDownForm input[name=stdNo]").val(_stdNo);
				$("#allDownForm input[name=korNm]").val(_korNm);
				$("#allDownForm").attr("action",BASE_PATH+"/"+_menu+"/r/n/allActFileDownload.do");

				$("#allDownForm").submit();
			}else {
				alert("파일다운에 실패했습니다.");
			}
		}
	});

}




/*
***************************************
@ function : 자격증/어학 정보 등록 팝업
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnCertiLangInfoPopUp(_menu,_keyId,_viewType){

	var popupDivId = "#layerPopup";
	var popupUrl = BASE_PATH+"/"+_menu+"/r/n/getCertiLangPopUp.do";
	var popupParams = {
			viewType : _viewType
			, clcCodeKeyId : _keyId
	}

	loadPopup(popupDivId, popupUrl, popupParams);
}

/*
***************************************
@ function : 자격증/어학 정보 등록/수정
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnCreateCertiLangAjax(_menu,_viewType,_abilityCnt) {
	console.log("역량갯수 : "+_abilityCnt);

	var _url = "";
	var _msg = "";
	var _clcMileage = $('#clcMileage').val();
	var abilityScore = 0;

	if (!fnEmptyCheckByClass()) {
		return false;
	}

//	if ($('#clcMileage').val() == '' || $('#clcMileage').val() == null) {
//		_clcMileage = 0;
//	}
//
//	for (var i = 1; i <= _abilityCnt; i++) {
//
//		if ($('input[name=A00'+i+'_score]').val() == null || $('input[name=A00'+i+'_score]').val() == '') {
//			$('input[name=A00'+i+'_score]').val(0);
//		}
//		abilityScore = parseInt(abilityScore) + parseInt($('input[name=A00'+i+'_score]').val());
//	}

//	if (abilityScore != _clcMileage) {
//		alert("역량점수의 합이 마일리지와 같지 않습니다.");
//		return false;
//	}

	if (_viewType == "MODIFY") {
		_url = BASE_PATH+"/"+_menu+"/w/n/modifyCertiLangInfo.do";
		_msg = "수정";
	}else {
		_url = BASE_PATH+"/"+_menu+"/w/n/createCertiLangInfo.do";
		_msg = "저장";
	}


	if (confirm(_msg+"하시겠습니까?")) {

		$("#insertCLForm").ajaxForm(
				{
					url : _url,
					type : "POST",
					dataType : "json",
					success : function(res) {

						if (res.rtnCode == 0) {
							alert(_msg+"을 성공하였습니다.");
							$('#closePopBtn').trigger('click');
							tableObject.destroy();
							callGrid();

						}else{
							alert(_msg+"을 실패하였습니다.(2)");
						}
					},
					clearForm : false,
					resetForm : false,
					semantic : false,
					error : function(_xmlHttpRequest, _stateMessage, _errorObject) {
						alert(_msg+"에 실패하였습니다.(1)");
					}
				});
		$("#insertCLForm").submit();


	};

}

/*
***************************************
@ function : 자격증/어학 정보 삭제
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnDeleteCertiLangAjax(_menu,_keyId) {

	var _url = BASE_PATH+"/"+_menu+"/w/n/modifyCertiLangInfo.do";


	if (confirm("삭제하시겠습니까?")) {

		$.ajax({
			type : "POST"
			, url : _url
			, dataType : 'json'
			, data : {
				clcDelYn : 'Y'
				,clcCodeKeyId : _keyId
			}
			,success : function(res){

				if (res.rtnCode == 0) {
					alert("삭제를 성공하였습니다.");
					tableObject.destroy();
					callGrid();

				}else{
					alert("삭제를 실패하였습니다.(2)");
				}
			}
			, error:function(request,status,error){
				alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			}
		});

	};

}


/*
***************************************
@ function : 자격증/어학 정보 목록조회 페이지 진입
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnGoCertiLangInfoList(_menu) {

	location.href = BASE_PATH+"/"+_menu+"/r/m/getCertiLangInfoList.do";
}

/*
***************************************
@ function : 일괄삭제
@ param    :_menu = 메뉴구분
@ comment  :
****************************************
 * */
function fnRemoveAct(_menu) {

	var selData = tableObject.rows({selected:true}).data();// 선택된 row에 대한 값
	var infoArray = new Array();

	for(var i=0; i < selData.length; i++){
		var infoObj = new Object();

		infoObj.oamKeyId = selData[i].OAM_KEY_ID;
		infoArray.push(infoObj);
	}

	if (confirm("삭제하시겠습니까?")) {

		$.ajax({
			type : "POST"
			, url : BASE_PATH+"/"+_menu+"/w/n/removeActStdMulti.do"
			, contentType : 'application/json'
			, async : false
			, dataType : 'json'
			, data : JSON.stringify(infoArray)
			,success : function(res){

				if (res.rtnCode == 0) {
					alert("일괄삭제를 성공하였습니다.");
					tableObject.destroy();
					callGrid();

				}else{
					alert("일괄삭제를 실패하였습니다.");
				}
			}
			, error:function(request,status,error){
				alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			}
		});
	}

}


/**
*********************************************************
@ function : 역량점수 추가
@ comment  :
@ param    : _npiKeyId = 프로그램 keyId
@ history  : 2019-07-15 (최초작성)
**********************************************************
 **/
function fnStdAbilityAdd(_referKeyId, _stdNo){

	var abilityCnt = $('#abilityCnt').val();
	var programGubun = $('#menu').val();

	var rstParamObj = new Object();
	var paramsArray = [];


	for (var i = 1; i <= abilityCnt; i++) {
		var infoObj = new Object();

		if ($('#A00'+i+"_"+_referKeyId).val() == null || $('#A00'+i+"_"+_referKeyId).val() == '') {
			$('#A00'+i+"_"+_referKeyId).val(0);
		}

		infoObj.sahAbilityCd = "A00"+i;
		infoObj.sahScore = $('#A00'+i+"_"+_referKeyId).val();

		paramsArray.push(infoObj);
	}
	rstParamObj.stdAbiltyScoreList = paramsArray;
	rstParamObj.sahReferKeyId = _referKeyId;
	rstParamObj.sahStdNo = _stdNo;

	if (confirm("해당 학생에게 역량점수를 부여하시겠습니까?")) {
		var _url = BASE_PATH+"/"+programGubun+"/w/n/modifyStdActAbilityAdd.do";

		$.ajax({
			url : _url
			, type : "post"
			, contentType : 'application/json'
			, cache : false
			, traditional : true
			, async : false
			, dataType : "json"
			, data : JSON.stringify(rstParamObj)
			, success : function(res) {

				if(res.rtnCode == "0") {

					alert("해당 학생에게 역량점수가 부여되었습니다.");

					tableObject.destroy();
					callGrid();

				} else {
					alert("역량점수 부여가 되지 않았습니다.\n 잠시후 다시 시도해 주세요.");
				}

			}
		});
	}
}



