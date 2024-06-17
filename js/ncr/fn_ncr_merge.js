/**
* 비교과 프로그램에 사용되는 기능 정의
*/
var BASE_PATH =  sessionStorage.getItem("contextRootPath");

/**
*********************************************************
@ function : 데이터 피커 불러오기
@ comment  :
@ history  : 2019-02-18 (최초작성)
**********************************************************
**/
$(".dtpicker").each(function() {
	var datepicker = $(this).attr('id');
	datePickerClient(datepicker);
});

/**
*********************************************************
@ function : 만족도 조사/동료평가 평가문항
@ comment  :
@ param    : satRschType = 만족도 조사 / 사전만족도 / 등료평가 구분
@ param    : obj = 오브젝트
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnSatisOnOff(satRschType, obj) {

	// 팀이고 사용 눌렀을때-사전조사

	var scaleQusArry = "";
	/** 5점척도 **/
	var openQusArry = "";
	/** 주관식 **/
	var choiceQusArry = "";
	/** 자유형객관식 **/
	var choiceAnsQusArry = "";
	/** 자유형객관식 답변 **/

	if (satRschType == "std") {

		scaleQusArry = '본 프로그램에 대해 전반적으로 만족하셨습니까?';
		scaleQusArry += ',해당 프로그램이 유익하고 성장에 도움이 되었다고 생각합니까?';
		scaleQusArry += ',해당 프로그램이 계획한대로 진행되었고 소통이 월활하였습니까?';
		scaleQusArry += ',해당 프로그램을 다른 학생에게도 추천하시겠습니까?';
//		scaleQusArry += ',이 프로그램은 참여 목적을 달성하는 데 도움이 되었다';
//		scaleQusArry += '이 프로그램에 전반적으로 만족한다';
//		scaleQusArry += ',이 프로그램의 개설 기간에 만족한다';
//		scaleQusArry += ',이 프로그램의 개설 일시에 만족한다';
//		scaleQusArry += ',이 프로그램의 담당 강사에 만족한다';
//		scaleQusArry += ',이 프로그램의 교육 내용에 만족한다';
//		scaleQusArry += ',본 프로그램을 타 학생들에게 추천할 의향이 있습니까?';
//		scaleQusArry += ',이 프로그램 홍보 및 신청방식은 적절하였다';
//
//		choiceQusArry = "응답자의 신분은 무엇입니까?";
//		choiceQusArry += ',어떤 경로를 통해 해당 프로그램을 알게 되었나요?';
//
//		choiceAnsQusArry += "1^학부생";
//		choiceAnsQusArry += ",1^대학원생";
//		choiceAnsQusArry += ",1^교수";
//		choiceAnsQusArry += ",1^직업";
//		choiceAnsQusArry += ",1^기타";
//		choiceAnsQusArry += "2^학교 포털";
//		choiceAnsQusArry += ",2^캠퍼스 이메일";
//		choiceAnsQusArry += ",2^문자 안내";
//		choiceAnsQusArry += ",2^기타/직접 입력하여 주십시오";
//
//		openQusArry = '본 프로그램 또는 교육운영에 대한 소감이나 건의하고 싶은 말을 작성하여 주십시오(개설 희망하는 프로그램 주제 등).';
//		openQusArry += ',응답자의 소속/전공은 무엇입니까?';
//		openQusArry += ',이 프로그램에서 자신에게 도움이 되었던 내용은 무엇입니까?';

	}
	if (satRschType == "pre") {

	}

	if (satRschType == "peer") {
		openQusArry = "[표현] 의미가 명료하고 맞춤법 띄어쓰기 등 어법에 맞는 문장을 구사하였는가?"
			+",[구성] 글의 각 단락을 논리적으로 전개하였는가?"
			+",[내용] 주제가 분명하며 내용이 인상적이고 깊이가 있는가?";
	}

	fnSatisOnOffAjax(satRschType, obj, scaleQusArry, openQusArry,choiceQusArry, choiceAnsQusArry);
}

/**
*********************************************************
@ function		: 예산 tr 컨트롤
@ comment	:
@ history		:	2017-11-07(최초작성)
						2021-11-02(화면수정)
						2021-11-16(화면수정) 해당 학교는 예산항목만 사용함
**********************************************************
 **/
var trIndex =$("#ncrBudgetTable").find("tbody tr").length - 1;
var subIndex = 1;
/**tr 추가**/
function addBudget() {
	$tableTr = $("#ncrBudgetTable");
	var budgetSum = 0;

	/**예산 합계**/
	$('input[name=nbiBudgetPrice]').each(function(idx) {
			var tmpVal = $(this).val();
			if ($(this).val() == null || $(this).val() == '') {
				tmpVal = 0;
			}
			budgetSum = parseInt(budgetSum) + parseInt(uncomma(tmpVal));
	});

	budgetSum = comma(budgetSum);

	if ($tableTr.find("tbody tr").length > 5) {
		alert("예산은 5개까지 추가가능합니다.");
		return false;
	}

	$tableTr.find("tbody tr:last").remove();
	$tableTr.find("tbody").append(
					'<tr id="budgetTr_'+trIndex+'">'
						+'<td>'
							+'<input type="hidden" name="budgetTrCnt" id="budgetTrCnt_'+trIndex+'" value="1">'
							+'<select class="form-control input-sm wd_p30 mg_r5 dp_inline" name="nbiBudgetCd" id="nbiBudgetCd" title="예산 대분류" data-validation=\'{"required" : true}\' onchange="fnCreateBudgetEtc(this);">'
								+'<option value="">예산구분을 선택해주세요.</option>'
								+'<option value="NCR_BUD_4100">교비</option>'
								+'<option value="NCR_BUD_4200">국고</option>'
								+'<option value="NCR_BUD_9999">기타</option>'
							+'</select>'
							+ '<input type="text" class="form-control wd_p30 input-sm dp_inline" onkeyup="chkByte(this, 1000)" name="nbiBudgetMainEtc" id="nbiBudgetMainEtc" title="대분류 기타사항" value="" readonly>'
						+'</td>'
//						+'<td>'
//							+'<div class="">'
//								+'<select class="form-control input-sm wd_p80 dp_inline" name="nbiBudgetSubCd" id="nbiBudgetSubCd" title="예산 항" onchange="fnBiBudgetCdSelChg(this, \'sub\');" data-validation=\'{"required" : true}\' >'
//									+'<option value="">예산구분을 선택해주세요.</option>'
//								+'</select>'
//							+'</div>'
//						+'</td>'
//						+'<td>'
//							+'<div class="">'
//								+'<select class="form-control input-sm wd_p80 dp_inline" name="nbiBudgetThirdCd" id="nbiBudgetThirdCd" title="예산 목" onchange="fnBiBudgetCdSelChg(this, \'third\');" data-validation=\'{"required" : true}\' >'
//									+'<option value="">예산구분을 선택해주세요.</option>'
//								+'</select>'
//							+'</div>'
//						+'</td>'
//						+'<td>'
//							+'<div class="" id="budgetForthCdDiv_0">'
//								+'<select class="form-control input-sm wd_p80 dp_inline" name="nbiBudgetForthCd" id="nbiBudgetForthCd" title="예산 세목" data-validation=\'{"required" : true}\' >'
//									+'<option value="">예산구분을 선택해주세요.</option>'
//								+'</select>'
//							+'</div>'
//						+'</td>'
						+'<td>'
							+'<div class="" id="budgetPriceDiv_0">'
								+'<input type="text" class="form-control wd_p70 ta_r dp_inline mg_r5" name="nbiBudgetPrice" id="nbiBudgetPrice" maxlength="11" title="예산액" onkeyup="commaKeyUpChkSum(this);" data-validation=\'{"required" : true}\' >'
//								+'<button class="btn btn-sm btn-primary" style="margin-bottom: 3px;" type="button" onclick="addSubBudget(this,\''+trIndex+'\');"><i class="fa fa-plus mg_r5"></i>추가</button>'
							+'</div>'
						+'</td>'
					+'</tr>');
	$tableTr.find("tbody").append(
				'<tr>'
					+ '<th scope="row">' + '예산 합계' + '</th>'
						+ '<td class="ta_c" id="budgetSum">'
						+ budgetSum + ' 원' + '</td>'
				+ '</tr>');

	trIndex++

}
/**sub 예산 금액 추가*/
function addSubBudget(_obj,_trCnt) {

	var _selHtml = $(_obj).parent('div').parent('td').prev().find('select[name=nbiBudgetForthCd]').html();
	var _rowCount = $(_obj).parent('div').parent('td').children("div").length;

	$(_obj).parent('div').parent('td').prev().append(
			'<div class="pd_t5" id="budgetForthCdDiv_'+subIndex+'">'
			+'<select class="form-control input-sm wd_p80 dp_inline" name="nbiBudgetForthCd" id="nbiBudgetForthCd" title="예산 세목">'
				+_selHtml
			+'</select>'
		+'</div>'
	);
	$(_obj).parent('div').parent('td').append(
			'<div class="pd_t5 test" id="budgetPriceDiv_'+subIndex+'">'
				+'<input type="text" class="form-control wd_p70 ta_r dp_inline mg_r5" name="nbiBudgetPrice" id="nbiBudgetPrice" maxlength="11"title="예산액" onkeyup="commaKeyUpChkSum(this);" value="" >'
				+'<button class="btn btn-sm btn-danger btn-danger test" style="margin-bottom: 3px;"  onclick="removeBudget(this, \'sub\', \''+_trCnt+'\');" type="button"><i class="fa fa-minus mg_r5"></i>삭제</button>'
			+'</div>'
	);

	subIndex++;

	var trCnt = parseInt(_rowCount) +1;

	$(_obj).parent('div').parent('td').parent('tr').children('td:eq(0)').children('input[name=budgetTrCnt]').val(trCnt);
	a($(_obj).parent('div').parent('td').parent('tr').children('td:eq(0)').children('input[name=budgetTrCnt]').val());
}

/**tr 삭제**/
function removeBudget(_obj,_subYn,_trIdx) {

	if (_subYn == 'sub') {
		var _budgetTrCnt = $(_obj).parent("div").parent("td").parent("tr").children("td:eq(0)").children('input[name=budgetTrCnt]').val();
		var index= [];
		index = $(_obj).parent("div").attr("id").split("_");

		$(_obj).parent("div").parent("td").prev().children("div #budgetForthCdDiv_"+index[1]).remove();
		$(_obj).parent("div").remove();

		_budgetTrCnt = _budgetTrCnt -1;
		$("#budgetTrCnt_"+_trIdx).val(_budgetTrCnt);

	}else{
		$tableTr = $("#ncrBudgetTable");
		$("#budgetTr_"+($tableTr.find("tbody tr").length-2) ).remove();
	}

	/**예산 합계**/
	var budgetSum = 0;
	$('input[name=nbiBudgetPrice]').each(function(idx) {
			var tmpVal = $(this).val();
			if ($(this).val() == null || $(this).val() == '') {
				tmpVal = 0;
			}
			budgetSum = parseInt(budgetSum) + parseInt(uncomma(tmpVal));
	});

	$('#budgetSum').html(budgetSum + " 원");
};

/**기타 input란 활성화
 2021-11-16 기타 코드값 조건 변경*/
function fnCreateBudgetEtc(_obj, _category) {

	if ($(_obj).val() == 'NCR_BUD_9999') {
		$(_obj).siblings('input[name!=budgetTrCnt]').attr('readonly',false);
		$(_obj).siblings('input[name!=budgetTrCnt]').removeAttr('style');

	}else{
		$(_obj).siblings('input[name!=budgetTrCnt]').val('');
		$(_obj).siblings('input[name!=budgetTrCnt]').attr('readonly',true);
		$(_obj).siblings('input[name!=budgetTrCnt]').attr('style','background-color:#eee;');
	}
}

/**
*********************************************************
@ function : 참여학과 추가 삭제
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
 **/
function addPartDepart(npiPartiDeptCd, npiPartiDeptNm) {

	$tableTr = $("#partDepartTd");
	var _rowCount = $("#partDepartTd p").length;
		//console.log("check : "+_rowCount);
	var departTag = "";

	if (_rowCount > 9) {
		alert("참여학과는 10개까지만 가능 합니다.");
		return false;
	}

	if(isEmpty(npiPartiDeptCd)){ npiPartiDeptCd = "";};
	if(isEmpty(npiPartiDeptNm)){ npiPartiDeptNm = "";};

	departTag = '<div name ="partDepartDiv" id="partDepartDiv_'+_rowCount+'">';
	departTag += '<p class="ad_search_row wd_p40 mg_t10" id="partDepartP_'+_rowCount+'" >';
	departTag += '<input type="text" class="form-control input-sm" name="npiPartiDeptNm" onkeydown="fnEnterActionForDepartTd('+ "'npiPartiDept','"+ _rowCount+"'"+');"'+'id="npiPartiDeptNm_'+_rowCount+'" placeholder="검색어를 입력하세요" title="참여학과" value="'+npiPartiDeptNm+'">';
	departTag += '<button type="button" class="btn btn-primary btn_form btn_search" onclick="fnGetDeptInfo('+ "'npiPartiDept','"+ _rowCount+ "'"+ ');"><i class="fa fa-search"></i>검색</button>';
	departTag += '<input type="hidden" class="ad_formstyle" name="npiPartiDeptCd"  id="npiPartiDeptCd_'+_rowCount+'" value="'+npiPartiDeptCd+'">';
	departTag += '</p>';
	departTag += '</div>';

	$("#partDepartTd").append(departTag);
}
/**삭제**/
function rmvPartDepart(_obj) {
	var _rowCount = $("#partDepartTd p").length;
	var partDepartTd = document.getElementById("partDepartTd");
	var partDepartDivs = document.getElementsByName("partDepartDiv");
	var childCount = typeof partDepartDivs == "undefined" ? 0
			: partDepartDivs.length;
	partDepartTd.removeChild(partDepartDivs[childCount - 1]);
}

/**
*********************************************************
@ function : 영역 활동 코드 가져오기
@ comment  :
@ history  : 2019-05-10 (최초작성)
**********************************************************
**/
function fnChangeAreaActCode (obj) {
	var _areaActCode = $(obj).val();
	var _areaId = obj.id;

	if (_areaId == 'npiAreaCd') {
		fnSetComnCdCombo(_areaActCode, 'npiAreaSubCd', '','선택', true);
	}else if (_areaId == 'npiAreaSubCd') {
		fnSetComnCdCombo(_areaActCode, 'npiAreaThirdCd', '','선택', true);
	}
}

/**
*********************************************************
@ function : 예산액 입력할 때마다 예산액 합계 체크
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
 **/
function commaKeyUpChkSum(obj) {
	var budgetSum = 0;
	$(obj).val(comma(uncomma($(obj).val())));

		$('input[name=nbiBudgetPrice]').each(function() {
			var tempVal = $(this).val();
			if (tempVal == null || tempVal == '') {
				tempVal = 0;
			}

			budgetSum = parseInt(budgetSum) + parseInt(uncomma(tempVal));
		})

		budgetSum = comma(budgetSum);
		$('#budgetSum').html(budgetSum + " 원");

}

/**
*********************************************************
@ function : 비교과 프로그램 저장
@ comment  :
@ history  : 2019-05-10 (최초작성)
**********************************************************
**/
function fnOnClickSave(){
	var abilityDiv = "";
	var abilityCd = "";
	/** 에디터 데이터 담기
	var npiContent = CKEDITOR.instances["npiCont"].getData();
	*/
	var npiContent = $("#npiCont").val();
	$("#npiContHidden").val(npiContent);
	if( $("#npiModifyCont").length > 0 ) {
		/* var npiModifyCont = CKEDITOR.instances["npiModifyCont"].getData(); */
		var npiModifyCont = $("#npiModifyCont").val();
		$("#npiModifyContHidden").val(npiModifyCont);
	}

	var deptCd = "";
	var abilityCnt = $('#abilityCnt').val();

	abilityDiv = "core";
	abilityCd ="A";

	/** 하위역량점수 퍼센트 합 상위역량점수에 셋팅 **/
	var subTotalCnt = 0;
	var checkArray = [];
	var checkCount = 0;

	for (var i = 1; i <= abilityCnt; i++) {
		if (isEmpty( $("#A00"+i+"_score").val()) ){
			tempSubAblityScore = 0;
		}else{
			tempSubAblityScore = parseInt($("#A00"+i+"_score").val());
		}
		checkArray.push(tempSubAblityScore);
	}

	/** 주요역량 값 체크 - 역량점수 중 가장 큰 값 **/
//	console.log("max: "+max);
	var max = Math.max.apply(null,checkArray);
	var maxChk = 0;
	for(var i =0;i<checkArray.length;i++){
		checkCount++;
//		console.log("checkArray["+i+"]: "+checkArray[i]);
		if(max==checkArray[i]){
			$("input[name=npiMainAbilityCd]").val('A00'+checkCount);
			maxChk++;
		}
	}

	/** 배열중 최고값과 같은것이 있다면 ( count > 1 ) **/
	if( maxChk > 1 ){
		alert("역량 비율의 최고값은 한 개여야 합니다.");
		/* 역량 비율 input focus 추가 20.12.28 bws*/
		$("input[name=A001]").focus();
		nullValidation = false;
		return false;
	}

	/** 예산 콤마제어 **/
	$("input[name=nbiBudgetPrice]").each(function() {
		$(this).val(uncomma($(this).val()));
	})

	/** 참여 대학/학과 구분에 따른 처리 **/
	var joinType = $(':radio[name="npiJoinType"]:checked').val();

	if (joinType == 'COLG') {
		$("#partDepartTd_Div").empty();
	} else if (joinType == 'SUST'){
		$("#colgTableDiv").empty();
	} else if (joinType == 'ALL'){
		$("#partDepartTd_Div").empty();
		$("#colgTableDiv").empty();
	}

	// 수정중
	if ($('input[name="npiApplyFileYn"]:checked').val() == "Y") {
		if( $("#pgmKeyId").val() ==  null || $("#pgmKeyId").val() == '' ){
			//프리셋을 저장하지 않은 상태에서 비교과 프로그램을 등록할 경우 이름을 임의로 생성후 프리셋을 저장하고 진행한다.
			if( !directPreSetSave($("#npiSubject").val()+"_신청서") ){
				if( $("#pgmKeyId").val() ==  null || $("#pgmKeyId").val() == '' ){
					alert("신청서를 저장하는데 실패하였습니다. \n잠시후 다시 시도해주세요.");
					return false;
				}
			}
		}
	}

	$tableTr = $("#ncrBudgetTable");
	$("#budgetMainTrCnt").val($tableTr.find("tbody tr").length -1);

	$("#writeForm").submit();
}
/**
*********************************************************
@ function : 등록 전 validation
@ comment  :
@ history  : 2019-05-10 (최초작성)
**********************************************************
**/
function fnInputValidation() {
	var nullValidation = true;
	nullValidation = fnEmptyCheckByClass();
	if(nullValidation){

		/** 역량 퍼센트 합 100 체크 */
		var abilityCd = "";
		var abilityCnt = $('#abilityCnt').val();
		var abilityScoreSum = 0;

		for (var i = 1; i <= abilityCnt; i++) {
			abilityScoreSum = abilityScoreSum + parseInt($('input[name=A00'+i+']').val());
		}

		if (abilityScoreSum != 100) {
			alert("역량의 합은 100% 여야 합니다.");
			return false;
		}

		/** 모집기간 체크 */
		if(! isCompareData('npiReqStrDate','npiReqEndDate')){nullValidation = false; return false;};
		/** 모집기간 날짜비교 */
		if (!isCompareData('npiReqStrDate', 'npiReqEndDate')) {
			return false
		};

		/** 운영기간 체크 */
		if(! isCompareData('npiActStrDate','npiActEndDate')){nullValidation = false; return false;};
		/** 운영기간 날짜비교 */
		if (!isCompareData('npiActStrDate', 'npiActEndDate')) {
			return false
		};

		/** 운영기간과 모집기간 비교**/
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //1월 == 0
		var yyyy = today.getFullYear();

		if(!$("#npiReqStrDate").val() == "" && !$("#npiActStrDate").val() == ""){
			if($("#npiReqStrDate").val() > $("#npiActStrDate").val()){
				alert("운영기간을 모집기간보다 빠르게 설정하실수 없습니다.");
				return false;
			}
		}

		/** 장소 유효성 체크 및 셋팅 */
		/** 장소 상세가 인풋박스*/
		if( $("#npiLoc").val() == 'NCR_LOC_99' ) {
			if( !$("#npiLocDtlEct").emptyCheck() ) return false;
		}

		/** 모집인원 0 이상 입력
		if ($("#npiRecrCnt").val() <= 0) {
			alert("모집인원이 0명 이상이어야 합니다.");
			nullValidation = false;
		}
		**/

		/** 참여대상 대학원일때 체크박스 체크 하였는지 확인 */
		if( $("#writeForm select[name=npiCorsLimitCd]").val() == "DIAG_T001" ) {
			if( !$("#writeForm input[name=npiCorsDtlLimitCd]").emptyCheckBox() ) return false; // 참여대상
		}

		/** 추천대상자 유효성 검사 */
		/** 상대캆이 학부생 일때 */
		if( $("#writeForm select[name=npiRecomTargetCd]").val() == "NCR_RECOM_T01" ) {
			if( !$("#writeForm input[name=npiRecomTarget01]").emptyCheckBox() ) return false; // 추천 대상자 학부생 체크 박스
		/** 상대캆이 대학원생 일때 */
		} else if( $("#writeForm select[name=npiRecomTargetCd]").val() == "NCR_RECOM_T02" ) {
			if( !$("#writeForm input[name=npiRecomTarget02]").emptyCheckBox() ) return false; // 추천 대상자 대학원생 체크 박스
		/** 상대캆이 기타 일때 */
		} else if( $("#writeForm select[name=npiRecomTargetCd]").val() == "NCR_RECOM_T99" ) {
			if( !$("#npiRecomTarget99").emptyCheck() ) return false;
		}

		if( $(':radio[name="npiJoinType"]:checked').val() == 'SUST'){
			/** 참여학과 체크 **/
			$tableTr = $("#partDepartTd");
				var _rowCount = $("#partDepartTd p").length;
				if (_rowCount > 0) {
					for (var idx = 0; idx < _rowCount; idx++) {
						if ($("#npiPartiDeptCd_" + idx).val() == '') {
							alert((parseInt(idx) + 1) + "번째 참여학과를 선택해 주세요.");
							var setHtml = '';
							setHtml +=	'<table class="table table-bordered tbl_row tbl_fixed">';
							setHtml +=		'<colgroup>';
							setHtml +=			'<col style="width:15%">';
							setHtml +=			'<col style="width:85%">';
							setHtml +=		'</colgroup>';
							setHtml +=		'<thead>';
							setHtml +=			'<tr>';
							setHtml +=				'<th scope="col" class="tbl_bgno">대학</th>';
							setHtml +=				'<th scope="col">학과</th>';
							setHtml +=			'</tr>';
							setHtml +=		'</thead>';
							setHtml +=		'<tbody id="colgTableTbody"></tbody>';
							setHtml +=	'</table>';
							$("#colgTableDiv").append(setHtml);
							$("#colgTableDiv").hide();
							nullValidation = false;
							return false;
						}
					}
				}
		}else {
			/** 참여대학 체크 **/
			$tableTr = $("#colgTableTbody");
			var _rowCount = $("#colgTableTbody tr").length;
			if (_rowCount > 0) {
				for (var idx = 0; idx < _rowCount; idx++) {
					if ($("#ncrJoinTypeClogCd_" + (parseInt(idx) + 1)).val() == '') {
						alert((parseInt(idx) + 1) + "번째 대학을 선택해 주세요.");
						nullValidation = false;
						return false;
					}
				}
			}
		}

		/** 담당자 코드 체크 **/
		if ($('#npiStfNo').val() == null || $('#npiStfNo').val() == '') {
			fnGetStaffInfo();
			nullValidation = false;
		}

		/** 신청서 Y 체크했을경우 프리셋  등록 유무 체크 **/
//		if ($('input[name="npiApplyFileYn"]:checked').val() == "Y") {
//			if( $("#pgmKeyId").val() ==  null || $("#pgmKeyId").val() == '' ){
//				alert("프리셋을 등록해주세요.");
//				return false;
//			}
//		}
		// 수정중
//		if ($('input[name="npiApplyFileYn"]:checked').val() == "Y") {
//			if( $("#pgmKeyId").val() ==  null || $("#pgmKeyId").val() == '' ){
//				//프리셋을 저장하지 않은 상태에서 비교과 프로그램을 등록할 경우 이름을 임의로 생성후 프리셋을 저장하고 진행한다.
//				if( !directPreSetSave($("#npiSubject").val()+"_신청서") ){
//					if( $("#pgmKeyId").val() ==  null || $("#pgmKeyId").val() == '' ){
//						alert("신청서를 저장하는데 실패하였습니다. \n잠시후 다시 시도해주세요.");
//						return false;
//					}
//				}
//			}
//		}

		/** 팀 선택 시, 최소, 최대인원 Check **/
		if($("#npiTeamY").is(":checked")){
			if(!$("#npiTeamMinCnt").emptyCheck()) {
				nullValidation = false;
				return false;
			}
			if(!$("#npiTeamMaxCnt").emptyCheck()) {
				nullValidation = false;
				return false;
			}

			/** 팀 선택 시, 사전조사 사용못함 **/
			if ($("#npiPreRschY").is(":checked")) {
				alert("팀 프로그램인 경우 사전조사는 진행할 수 없습니다.");
//				$("#npiPreRschN").trigger('click');
				return false;
			}
		}

		/** 사전 만족도 Null 체크 **/
		if( $('input[name=npiPreRschYn]:checked').val() == "Y"){
			if(! fnChkSatisNullchk('pre')){
				return false;
			}
		}

		/** 만족도조사 Null 체크 **/
		if( $('input[name=npiSatisRschYn]:checked').val() == "Y"){
			if(! fnChkSatisNullchk('std')){
				return false;
			}
		}

	}//nullValidation
	// return false;
	var _msg ="저장하시겠습니까?";
	if (!isEmpty($("input[name=npiKeyId]").val())) {
		_msg += "\n신청자가 있을 경우 사전조사, 만족도조사, 프리셋은 수정되지 않습니다.";
	}

	if (nullValidation) {
		if(confirm(_msg)){
			//로딩바 온
			$("#loading").show();
			return true;
		}else{
			return false;
		}
	//	return confirm("저장하시겠습니까?");
	}else{
		return nullValidation;
	}
}

/**
*********************************************************
@ function : 등록 후 결과 콜백
@ comment  :
@ param    : response
@ param    : stateMessage
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnShowResult(response, stateMessage) {
	if (response.isSuccess) {
		alert('프로그램 저장에 성공하였습니다.');
		fnGoNcrProgramListAdmin(response.programGubun, response.viewType);
	} else {
		alert('프로그램 저장에 실패하였습니다.(2)');
	}
}
/**
*********************************************************
@ function : 리스트 페이지로 이동/ 수정시 해당 페이지로 리프레쉬
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnGoNcrProgramListAdmin(programGubun, viewType) {
	var basePath = sessionStorage.getItem("contextRootPath");

	//수정일때
	if (viewType == "MODIFY") {
			var _url = basePath+"/"+programGubun+"/r/m/getProgramModifyDetail.do";
			$("#detailForm").attr("action",_url).submit();

	//저장일때
	}else {
		if(programGubun.indexOf('ncr') !== -1){
			location.href = basePath+"/ncrProgramListSTF/r/m/getProgramList.do";
		}else{
			location.href = basePath+"/peerRevwListSTF/r/m/getProgramList.do";
		}
	}
}

/**
*********************************************************
@ function : 신청서 사용 유무에 파일첨부란 제어, 필수제출여부 제어
@ comment  :
@ param    : type = Y/N 구분
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnRegFileTrShow(type) {
	if (type == "Y" || type == "M") {
		$('#npiApplyMustYn').prop('disabled',false);
		$("#id_NCR_APPLY_FILE_file_btn").closest('div .attachment_box').removeClass('disabled'); //공통 태그파일에서 신청서 상위 div만 disabled 클래스 적용되게 작성
	} else {
		$('#npiApplyMustYn').prop('disabled',true);
		$("input:checkbox[id='npiApplyMustYn']").prop("checked",false);// 미사용일때만 필수제출여부 체크박스 해제하기
		$("#id_NCR_APPLY_FILE_file_btn").closest('div .attachment_box').addClass('disabled'); //공통 태그파일에서 신청서 상위 div만 disabled 클래스 적용되게 작성
		fn_resetFile(null, "fileExcelUpload");
	}
}

/**
*********************************************************
@ function : 개인/팀 제어
@ comment  :
@ param    : type = Y/N 구분
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnTeamCntShow(type) {
	if (type == "Y") {
		$('#npiTeamMinCnt').prop('disabled',false);
		$('#npiTeanMaxCnt').prop('disabled',false);
		$('#npiPreRschY').prop('disabled',true);
		$('#npiPreRschN').prop('disabled',true);

		// 사전조사 변경
		if($('input[name="npiPreRschYn"]:checked').val() == 'Y'){
			$("input[name=npiPreRschYn]:radio[value=N]").trigger('click');
			$('#npiPreRschY').prop('disabled',true);
			$('#npiPreRschN').prop('disabled',true);
			$("input[name=npiPreRschYn]:radio[value=N]").prop("checked", true);
		}

	} else {
		$('#npiTeamMinCnt').prop('disabled',true);
		$('#npiTeanMaxCnt').prop('disabled',true);
		$('#npiPreRschY').prop('disabled',false);
		$('#npiPreRschN').prop('disabled',false);
	}
}

/**
*********************************************************
@ function : 프로그램 불러오기
@ comment  : peerRevwRegSTF : 동료평가/ ncrProgramRegSTF : 비교과
@ param    :_programGubun = url 변수명
@ param    :_npiPeerYn = 동료평가 여부
@ history  : 2019-0221 (최초작성)
**********************************************************
**/

function fnGetNcrProgramPop(_programGubun,_npiPeerYn){
	$('#POPUP_OPEN_BTN').trigger('click');
	$.ajaxSetup({
		cache : false
	});
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupDivId = "#layerPopup"; // 팝업이 들어가는 div의 id
	var popupUrl = basePath+"/"+_programGubun+"/r/n/getProgramListPopUp.do"; // 팝업 내용을 호출하는 url
	var popupParams = {
			npiPeerYn : _npiPeerYn
	} // 팝업 호출시의 파라미터
	loadPopup(popupDivId, popupUrl, popupParams);
}

/***************************************
@ function : 프로그램 상태일괄 변경
@ comment  :APPROV(승인)/REJECT(반려)
@ param    :_state = 승인/반려
@ param    :_npiEtcCont = 반려사유
@ param    :_npiKeyId = 비교과 keyId
@ param    :_programGubun = url 변수명
****************************************
**/
function fnProgramModifyStateAjax(_state,_npiEtcCont,_npiKeyId) {

	//상태변경 update info 목록
	var infoArray = new Array();
	var resultObj = new Object();

//	var succesCnt = 0;
//	var unSuccesCnt = 0;
//	var infoObjArray = new Array();

	//단일상태변경
	if (_npiKeyId != null && _npiKeyId != "") {

		var infoObj = new Object();
		infoObj.npiKeyId = _npiKeyId;
		infoArray.push(infoObj);
	//일괄상태변경
	}else{
		var selData = tableObject.rows({selected:true}).data();// 선택된 row에 대한 값

		for(var i=0; i < selData.length; i++){

			// 취소 상태값 변경이면 가능한 상태 인지 체크 해야함
//			if( _state == 'CANCEL_AF' ) {
//				// 선택한 프로그램이 상태값이  접수대기(NCR_T05_P01), 모집중(NCR_T05_P02), 모집마감(NCR_T05_P03)
//				if( selData[i].NPI_STAT_DB_CD == 'NCR_T05_P01' || selData[i].NPI_STAT_DB_CD == 'NCR_T05_P02' || selData[i].NPI_STAT_DB_CD == 'NCR_T05_P03' ) {
//					infoObj.npiKeyId = selData[i].NPI_KEY_ID;
//					infoArray.push(infoObj);
//				}
//			// 취소 상태값이 아니면 진행
//			} else {
				var infoObj = new Object();
				infoObj.npiKeyId = selData[i].npiKeyId;
				infoArray.push(infoObj);
			//}

		}
	}

	//console.log('infoArray.length: '+infoArray.length);

	if( infoArray.length != selData.length ) {
		alert("운영중, 운영마감인 상태의 프로그램은 취소할 수 없습니다.");
		return;
	}

	resultObj.jsonInfo = infoArray;
	resultObj.npiEtcCont = _npiEtcCont;
	resultObj.npiStateCd = _state;

	$.ajax({
		type : "POST"
		, url : BASE_PATH+"/ncrProgramApprovSTF/w/n/modifyProgramState.do"
		, contentType : 'application/json'
		, cache : false
		, traditional : true
		, async : false
		, dataType : 'json'
		, data : JSON.stringify(resultObj)
		, success : function(res){

			if(res.success){
			alert("상태변경 처리가 완료 되었습니다.");

				//상세보기에서 승인할 경우
				if (_state.indexOf("DETAIL") != -1) {
					var _url = "";
					_url = BASE_PATH+"/ncrProgramListSTF/r/m/getProgramList.do";
					$("#detailForm").attr("action",_url).submit();

				//리스트에서 상태변경 할 경우
				}else {

					//반려일때 팝업 닫기
					if (_state == "NCR_T05_P08") {
						$('#PROGRAM_POP_UP_CLOSE_BTN').trigger('click');
					}
					tableObject.destroy();
					callGrid();
				}

			}else{
				alert("일괄변경 처리에 실패 하였습니다.\n잠시후 다시 시도해주세요.");
			}
		}
		, error:function(request,status,error){
			alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
	});
}


/**
***************************************
@ function : 반려팝업
@ comment  :
@ param : _programGubun = url 변수명
@ param : _keyId = 프로그램 키아이디
****************************************
**/
function fnProgramRejectPopUp(_npiKeyId){

	var popupDivId = "#layerPopup";
	var popupUrl = BASE_PATH+"/ncrProgramApprovSTF/r/n/getProgramRejectPopUp.do";
	var popupParams = {
			npiKeyId :_npiKeyId
	}

	loadPopup(popupDivId, popupUrl, popupParams);
}

/**
***************************************
@ function : 상세보기, 수정창
@ comment  :
@ param    :_programGubun = url 변수명
@ param    :_keyId = 프로그램 키아이디
@ param    :_viewType = MODIFY(수정)/DETAIL(상세)
****************************************
 **/
function fnGoModiDetailInfo(_programGubun,_keyId,_viewType){

	$('#detailForm #npiKeyId').val(_keyId);
	$('#detailForm #viewType').val(_viewType);

	var _url = BASE_PATH+"/"+_programGubun+"/r/m/getProgramModifyDetail.do";

	$('#detailForm').attr("action",_url).submit();
}

/**
***************************************
@ function : 신청자 페이지 이동
@ comment  :
@ param    : _programGubun = 프로그램 구분
@ param    : _keyId = 비교과 프로그램 키값
@ history  : 2019-05-20 (최초작성)
****************************************
**/
function fnGoRecrList(_programGubun,_keyId) {

	$('#detailForm #npiKeyId').val(_keyId);

	var _url = BASE_PATH+"/"+_programGubun+"/r/m/getProgramRecrList.do";
	$('#detailForm').attr("action",_url).submit();
}

/**
 ***************************************
@ function : 신청자 페이지 이동(
@ comment  :프로그램 운영현황
@ param    : _keyId = 비교과 프로그램 키값
@ history  : 2021-10-20 (최초작성)
 ****************************************
 **/
function fnGoRecruitList(_keyId) {
	$('#detailForm #npiKeyId').val(_keyId);

	var _url = BASE_PATH+"/ncrProgramListSTF/r/m/getProgramRecruitList.do";
	$('#detailForm').attr("action",_url).submit();
}

/**
*********************************************************
@ function : fnSetStdStateCd
@ comment  : 학생상태 선택
@ param    : programTermVal : 전공 구분값
@ history  : 2019-05-10 (최초작성)
**********************************************************
**/
function fnSetStdStateCd(programTermVal) {

var loginUserId = sessionStorage.getItem("sessionUserId");
	if(loginUserId == ''){
		if (confirm("비교과 신청내역 확인 서비스는 로그인이 필요한 기능 입니다. \n"
				   +"로그인 하시겠습니까?"
		)) {
			fnGoLoginPopUp('/'+_programGubun+'/a/m/goProgramApplList.do');
		}
	}else{
		var chked_val = "";
		if(programTermVal == "ALL"){
			chked_val = "ALL"
		}else{
		  $(":checkbox[name='program_term']:checked").each(function(pi,po){
			  if(po.value != 'ALL'){
			    chked_val += ","+"'"+po.value+"'";
			  }
		  });
		  if(chked_val!="")chked_val = chked_val.substring(1);
		}
		if(chked_val == ''){
			chked_val = 'ALL';
		}
		$("#stdStateCd").val(chked_val);
		searchMyProgramList();
	}
}

/**
***************************************
@ function : 직원 리스트 조회 (팝업)
@ comment  :
@ history  : 2017-11-07 (최초작성)
****************************************
 **/
function fnGoStaffListPopUp(stfNmTagId) {
	var searchStaffNm = $("#"+stfNmTagId).val();
	var nmTagId = stfNmTagId.substring(0,stfNmTagId.length-2);

	fnOpenStaffListPopUp(searchStaffNm,'',nmTagId);
}

/**
*********************************************************
@ function : 직원 리스트 조회 결과 리턴
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
 **/
function fnReceiveChkStaffInfo(staffNo, staffNm, stfTagId) {

	$("#"+stfTagId+"No").val(staffNo);
	$("#"+stfTagId+"Nm").val(staffNm);
}

/**
 *********************************************************
@ function : 참여시간 및 난이도 선택시 역량 환산점수 계산
@ comment  :
@ param    : _value = 반영여부
@ history  : 2017-11-07 (최초작성)
 **********************************************************
 **/
function fnCalAbilityScore(obj) {

//	var npiPartyTime = $('input[name=npiPartyTime]').val();
//	var npiLevel = $('select[name=npiLevel]').val();
//	var sum = "0";
//
//	if (isEmpty(npiPartyTime)) {
//		npiPartyTime = 0;
//	}
//	if (isEmpty(npiLevel)) {
//		npiLevel = 0;
//	}
//
//	sum = (parseInt(npiPartyTime) * parseInt(npiLevel)) * 10;
//
//	$('.abilitySumVal').text(sum+" 점");
//	$('input[name=npiAbilitySum]').val(sum);
	var tempAblityScore = obj.value;
	var tempAblityName = obj.name;
	var abilityCnt = $('#abilityCnt').val();
	var abilityCntlength = 0;
	var abilitySumCntlength = 0;
	var tempSubAblityScore = 0;
	var sumAblityScore = 0;

	for (var i = 1; i <= abilityCnt; i++) {
		if (isEmpty($("#A00" + i + "_score").val())) {
			tempSubAblityScore = 0;
		} else {
			if(i < 10){
				tempSubAblityScore = parseInt($("#A00"+i+"_score").val());
			}if(i == 10){
				tempSubAblityScore = parseInt($("#A0"+i+"_score").val());
			}
		}
		sumAblityScore += tempSubAblityScore;
	}

	if (parseInt(sumAblityScore) > 100) {
		alert("합산 역량이 100%를 초과 합니다. 다시 설정해 주세요.");
		$("#" + tempAblityName + "_score").val('');
		return false;
	} else if (parseInt(sumAblityScore) == 100) {
		for (var i = 1; i <= abilityCnt; i++) {
			if (isEmpty($("#A00" + i + "_score").val())) {
				$("#A00" + i + "_score").val("0");
			}
		}
	}

}

/**
 *********************************************************
@ function : 대표이미지 미리보기
@ comment  :
@ history  : 2019-08-19 (최초작성)
 **********************************************************
 **/
//function fnOnChangeFileNmImg(obj, fileType) {
	function fnOnChangeFileNmImg(obj, fileType, delYn) {
//	if (obj.value != "") {
//		var fileObjs = document.getElementsByName(obj.name);
//
//		if(!fnChkUploadFileType(obj,fileType)){
//			return false;
//		}
//
//		if(obj.files){
//			var reader = new FileReader();
//			reader.onload = function (e) {
//				console.log(e.target.result);
//				$("#"+obj.name+'_idx').attr('src', e.target.result);
//			}
//			reader.readAsDataURL(obj.files[0]);
//			console.log("obj.files[0] : "+obj.files[0]);
//		}
//	}


	if (obj.value != "") {
//		console.log("obj.value : "+obj.value);
//		console.log("obj.name : "+obj.name);

		var fileObjs = document.getElementsByName(obj.name);
		var pTagRowCnt = document.getElementsByName(obj.name+'_link_file_del');
		if(!fnChkUploadFileType(obj,fileType)){
			return false;
		}

		var tagIdx = $('#'+obj.name+'_idx').val();
		var addFileInputHtml ="";
		var fileNm =obj.value.substring(obj.value.lastIndexOf("\\") + 1,  obj.value.length);
		var appendFileNameHtml = '';
		var delTagIdx = (tagIdx-1);

		appendFileNameHtml += '<p class="link_file_del file_box" name="'+obj.name+'_link_file_del" style="width:310px; height:180px;">';
		appendFileNameHtml += '<img id="'+obj.name+'_img"  href="javascript:void(0);" alt="'+fileNm+'" scr="'+BASE_PATH+'/contents/images/client/main/no_img.png" style="width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; ">';

		if(delYn == 'Y'){
				appendFileNameHtml += '<button type="button" title="삭제" id="'+obj.name+'_del" class="link_del" onclick="fnDelAddImgFileData(this.id,'+"'','"+"ADMIN"+"'"+')"><i class="fa fa-close"></i></button>';
		}
		appendFileNameHtml += '</p>';
		if ($('#'+obj.name+'_label').parents("p").parents("td").children("p").length > 2) {
			if (!isEmpty($('#npiKeyId').val())) {
				$('#'+obj.name+'_label').parents("p").parents("td").children("p:last").children('button').click();
//				addFileInputHtml += '<input type="file" name="'+obj.name+'" id="'+obj.name+'" class="hidden" onchange="fnOnChangeFileNmImg(this,'+"'"+fileType+"','"+delYn+"'"+')">';
//				$('#'+obj.name+'_idx').parents("p").append(addFileInputHtml);

			}else{
				$('#'+obj.name+'_label').parents("p").parents("td").children("p:last").remove();
			}
		}
		$('#'+obj.name+'_label').parents("p").parents("td").append(appendFileNameHtml);

		if(obj.files){
			var reader = new FileReader();
			reader.onload = function (e) {
//				console.log(e.target.result);
				$("#"+obj.name+'_img').attr('src', e.target.result);
			}
			reader.readAsDataURL(obj.files[0]);
//			console.log("obj.files[0] : "+obj.files[0]);
		}

	}
}

	function fnDelAddImgFileData(objId, fileSubId, staffType) {


		if(isEmpty(fileSubId) == false) {
			var _url = BASE_PATH+"/cmm/fms/removeFileData.do";
			jQuery.ajax({
				type: "POST",
				url: _url,
				dataType: "json",
				data : {
					fileSubId   : fileSubId
				},
				success: function(r) {
					if (r.rtnCode == '0') {
						var delObjId = objId.replace('_del','');
						$("#"+objId).parents("p").remove();
					} else {
					 alert("첨부파일 삭제에 실패 하였습니다.");
					 return false;
					}
				},error: function(r) {
				}
			}) ;

		}else{
				var delObjId = objId.replace('_del','');
				$("#"+objId).parents("p").remove();
		}
	}

/**
*********************************************************
@ function : 참여대학/학과 인풋변경
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnChangeJoinType(typeVlaue) {
	$("#colgPartDepartTr").hide();
	$("#partDepartTr").hide();
	if (typeVlaue == 'COLG') {
		$("#colgPartDepartTr").show();
	} else if (typeVlaue == 'SUST'){
		$("#partDepartTr").show();
	}
}

/**
*********************************************************
@ function : 참여대학 삭제
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function removeColgPartDepart() {
	var _rowCount = parseInt($("#colgTableTbodyList tr").length)+(parseInt($("#colgTableTbody tr").length));
	$("#COLG_TR_"+_rowCount).remove();
	if (_rowCount == 0 || _rowCount == 1) {
		$("#colgTableDiv").hide();
	}
}

/**
*********************************************************
@ function : 참여학과 체크박스 셋팅
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
 **/

function fnSetSustChkBoxForClogTd(colgCd , rowIndex) {
	var viewId = 'COLG_TD_'+rowIndex;

	fnSetClogForSustCdCheckBox(colgCd, viewId, '', '참여학과', 'npiPartiDeptCd' , true);
}

/**
*********************************************************
@ function : 참여학과 체크박스 조회
@ comment  :
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
function fnSetClogForSustCdCheckBox(clogCd, viewId, chkdValue, titleValue, valueName, useAsync)  {
	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath+"/ncrProgramRegSTF/r/n/getColgSustCdList.do";
	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#td_"+viewId);

	if(typeof targetView == "undefined") {
		return;
	}

	if(targetView.html() != ''){
		targetView.empty();
	}

	jQuery.ajax({
		async: async,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			clogCd   : clogCd
		},
		success: function(r) {
			if (r.beanlist.length > 0) {
				for(var idx=0; idx<r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					var checked ='';
						if(chkdValue == ""){
							checked = 'checked';
						}else{
							checked = chkdValue.indexOf(obj.DEPT_CD) != -1 ? 'checked' : '';
						}
					targetView.append(
							'<p class="ad_input_row">'
							+'<input name="'+valueName+'" class="check '+viewId+'Check '+viewId+'All" id="'+viewId+idx+'" type="checkbox" value="'+obj.DEPT_CD+'" title="'+titleValue+'" '+checked+' onchange="partiDeptCdChkChg(this, \''+obj.DEPT_KOR_NM+'\')">'
							+'<label class="check_label check_black" for="'+viewId+idx+'">'+obj.DEPT_KOR_NM+'</label>'
							+'</p>'
							+'<input type="hidden" name="npiPartiDeptNm" value="'+obj.DEPT_KOR_NM+'">'
					);
				}
			}
		},
		error: function(r) {
			console.log("학과코드 오류가 발생하였습니다.()");
		}
	}) ;
}

/**
*********************************************************
@ function : 예산 분류 코드값 변경
@ comment  :
@ history  : 2020-01-04 (최초작성)
**********************************************************
**/
function fnBiBudgetCdSelChg(obj, level) {

	var basePath = sessionStorage.getItem("contextRootPath");
	var _selResetTxt = "<option value=''>예산구분을 선택해주세요.</option>";
	var _cdId = $(obj).val();
	var _selTarget = $(obj);
	var _url = basePath+"/cmm/fms/getCodeListAjax.do";


	var chgTarget = "";

	// 대분류 변경시
	if( level == 'main' ) {
		// 값 리셋
		// 예산 서목 리셋
		_selTarget.parent("td").next().next().next().find("select[name=nbiBudgetForthCd]").empty();
		_selTarget.parent("td").next().next().next().find("select[name=nbiBudgetForthCd]").append(_selResetTxt);
		// 예산 목 리셋
		_selTarget.parent("td").next().next().find("select[name=nbiBudgetThirdCd]").empty();
		_selTarget.parent("td").next().next().find("select[name=nbiBudgetThirdCd]").append(_selResetTxt);
		// 예산 항 셋팅
		chgTarget = _selTarget.parent("td").next().find("select[name=nbiBudgetSubCd]");
		chgTarget.empty();
		chgTarget.append(_selResetTxt);
	// 예산 항 변경시
	} else if( level == 'sub' ) {
		// 값 리셋
		// 예산 세목 리셋
		_selTarget.parent("div").parent("td").next().next().find("select[name=nbiBudgetForthCd]").empty();
		_selTarget.parent("div").parent("td").next().next().find("select[name=nbiBudgetForthCd]").append(_selResetTxt);
		// 예산 목 셋팅

		chgTarget = _selTarget.parent("div").parent("td").next().find("select[name=nbiBudgetThirdCd]");
		chgTarget.empty();
		chgTarget.append(_selResetTxt);
	// 예산 목 변경시
	} else {
		// 값 리셋
		// 예산 세목 셋팅
		chgTarget = _selTarget.parent("div").parent("td").next().find("select[name=nbiBudgetForthCd]");
		chgTarget.empty();
		chgTarget.append(_selResetTxt);
	}

	if(_cdId == '') return;

	// 조회
	jQuery.ajax({
		async: true,
		type: "POST",
		url: _url,
		dataType: "json",
		data : {
			comnCdPcodeId   : _cdId
		},
		success: function(r) {
			if (r.beanlist.length > 0) {

				for(var idx=0; idx<r.beanlist.length; idx++) {
					var row = r.beanlist[idx];
					chgTarget.append("<option value='"+row.cdId+"'>"+row.cdNm+"</option>");
				}
			} else {
				alert("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
			}
		},
		error: function(r) {
			console.log("공통코드 조회중 오류가 발생하였습니다.("+comnCdPcodeId+")");
		}
	});

}
/**
 *  참여 대학/학과 구분에서 대학별 학과 체크박스 클릭할때 히든 nm값 삭제 추가
 */
function partiDeptCdChkChg(_obj, _deptNm) {

	if( $(_obj).is(":checked") ) {
		$(_obj).parent("p").after('<input type="hidden" name="npiPartiDeptNm" value="'+_deptNm+'">');
	} else {
		$(_obj).parent("p").next('input').remove();
	}
}

/**
 * ********************************************************
 * @ function : 구분별 입력칸 DISPLAY 관리
 * @ history : 2019-0221 (최초작성)
 * *********************************************************
 */
function fnShowMngDiv(val, typeNm) {
	if (typeNm == 'npiCounselYn') {
		$("#npiCounselY_Tr").hide();
		$("#npiCounselN_Tr").hide();
		if (val == 'Y') {
			$("#npiCounselY_Tr").show();
			$("#npiPartyTime").val('');
			$("#npiLevel").val('');
			$("#npiPartyTime").removeClass('emptyChkByClass');
			$("#npiLevel").removeClass('emptyChkByClass');

			$("#npiStanMileScore").addClass('emptyChkByClass');
			$("#npiMaxAckCnt").addClass('emptyChkByClass');

			$("#npiApplyMustYn").attr("disabled", true);
			$("#npiApplyFileY").attr("disabled", true);
			$("#npiHomeWorkY").attr("disabled", true);
			$("#npiApplCertiY").attr("disabled", true);
			$("#npiPreRschY").attr("disabled", true);
			$("#npiSatisRschY").attr("disabled", true);

		} else {
			$("#npiCounselN_Tr").show();
			$("#npiStanMileScore").val('');
			$("#npiMaxAckCnt").val('');
			$("#npiStanMileScore").removeClass('emptyChkByClass');
			$("#npiMaxAckCnt").removeClass('emptyChkByClass');

			$("#npiPartyTime").addClass('emptyChkByClass');
			$("#npiLevel").addClass('emptyChkByClass');

			$("#npiApplyMustYn").attr("disabled", false);
			$("#npiApplyFileY").attr("disabled", false);
			$("#npiHomeWorkY").attr("disabled", false);
			$("#npiApplCertiY").attr("disabled", false);
			$("#npiPreRschY").attr("disabled", false);
			$("#npiSatisRschY").attr("disabled", false);

		}

	} else if (typeNm == 'npiCodeType') {
		$(".npiTitle_NEW_SubDiv").hide();
		$(".npiTitle_CON_SubDiv").hide();

		if (val == 'NEW') {
			$(".npiTitle_NEW_SubDiv").show();
			$("#npiProgramTitleSelCon option:eq(0)").prop("selected", true);
			$("select#npiProgramTitleSelCon option").remove();
			$("#npiProgramTitleSelCon").removeClass('emptyChkByClass');
			$("#npiTitleNew").addClass('emptyChkByClass');
			$("input[name=npiOperatCntTypeCON]").prop("disabled", true);
			$("input[name=npiOperatCntTypeNEW]").prop("disabled", false);

		} else {
			$(".npiTitle_CON_SubDiv").show();
			$("#npiTitleNew").val("");
			$("#npiTitleNew").removeClass('emptyChkByClass');
			$("input[name=npiOperatCntTypeCON]").prop("disabled", false);
			$("input[name=npiOperatCntTypeNEW]").prop("disabled", true);
			$("#npiProgramTitleSelCon").addClass('emptyChkByClass');
			fnSetNcrProgramTitle();
		}

	} else if (typeNm == 'npiType') {
		$("#npiTypeSubDiv").hide();

		if (val == 'NCR_T02_C02') { //팀
			$("#npiTypeSubDiv").show();
			$("#npiPreRschY").prop("disabled", true); //사전설문조사 버튼 값 제어

			/* 팀선택일 경우 사전설문조사 값 비워주기*/
			if($("#npiTeamYn option:selected").val() == 'NCR_T02_C02'){
				/** 팀 선택 시, 사전조사 사용못함 **/
				if ($("#npiPreRschY").is(":checked")) { // 사전조사 사용중으로 체크되어 있을 때
					if( confirm("팀 프로그램은 사전 조사를 실시할 수 없으므로, 사전 조사는 미사용 처리되고 입력하신 사전 조사 문항내용이 모두 지워집니다. 계속하시겠습니까?") ) {
						// 사전조사 테이블 삭제되어야 함
						$("#preSatRschTr").remove();
						$("#npiSatisRschN").attr('onclick' , 'return(false);');
						$("#npiPreRschN").prop("checked", true);
					} else {
						$("input:radio[id=npiPreRschYn]:checkbox[value='Y']").prop("checked", true);
						$("#npiSatisRschN").attr('onclick' , 'fnSatisOnOff("pre", this);');
					}
				}
			}
		} else {
			$("#npiTypeSubDiv").hide();
			$("#npiTeamMinCnt").val('');
			$("#npiTeamMaxCnt").val('');
			$("#npiPreRschY").prop("disabled", false); //사전설문조사 버튼 값 제어
		}
	}
}

function fnSetNcrProgramTitle(programCd, selValue) {
	if (isEmpty(selValue)) {
		$("select#npiProgramTitleSelCon option").remove();
	}
	var progracmCnt = fnGetNcrProgramTitle(programCd, "npiProgramTitleSelCon",
			selValue, '프로그램명을 선택해주세요', false);
}

/**
 * ********************************************************
 * @ function : fnGetNcrProgramTitle
 * @ comment : 프로그램 명
 * @ history : 2019-05-10 (최초작성)
 * *********************************************************
 */
function fnGetNcrProgramTitle(comnCdPcodeId, viewId, selValue, allValue,
		useAsync) {
	var basePath = sessionStorage.getItem("contextRootPath");

	if (typeof basePath == "undefined" && basePath(allValue)
			|| basePath == null || basePath == 'null') {
		basePath = basePathClient;
	}
	var _url = basePath + "/ncrProgramRegSTF/r/n/getNcrProgramTitleSel.do";
	var async = isNullObject(useAsync) ? true : useAsync;
	var targetView = $("#" + viewId);

	// if(comnCdPcodeId == ""){return false;}

	if (typeof targetView == "undefined") {
		return;
	}

	if (typeof allValue != "undefined" && !isEmpty(allValue)) {
		targetView.children().remove().end().append(
				'<option value="">' + allValue + '</option>');
	}

	jQuery.ajax({
		async : async,
		type : "POST",
		url : _url,
		dataType : "json",
		data : {
		// programCd : comnCdPcodeId
		},
		success : function(r) {
			if (r.beanlist.length > 0) {
				for (var idx = 0; idx < r.beanlist.length; idx++) {
					var obj = r.beanlist[idx];
					if (typeof selValue != "undefined"
							&& selValue == obj.NPI_KEY_ID) {
						targetView.append("<option value='" + obj.NPI_KEY_ID
								+ "' selected>" + obj.NPI_SUBJECT + "</option>");
					} else {
						targetView.append("<option value='" + obj.NPI_KEY_ID
								+ "'>" + obj.NPI_SUBJECT + "</option>");
					}
				}
			}
		},
		error : function(r) {
			console.log("프로그램 조회중 오류가 발생하였습니다.(" + comnCdPcodeId + ")");
		}
	});
	return;
}


function mileagePopup(){
	alert("서비스 준비중입니다.");
}

/**
*********************************************************
@ function : 운영부서 검색
@ comment  : 조회 결과가 없는 경우, 조회 결과가 2개 이상인 경우 팝업 조회. 조회 결과가 1인 경우는 값 입력.
@ history  : 2019-04-01 (최초작성)
**********************************************************
 **/
 function fnGetDeptInfo(searchType, idx){
	var _url = BASE_PATH+"/cmm/fms/getDeptList.do";


	var _ncrDeptVal = "";
	var _ncrDeptNm = "";
	var _ncrDeptCd = "";
	var _ncrDeptDiv = "";

	if (searchType == "npiPartiDept") {
		_ncrDeptNm = "npiPartiDeptNm_"+idx;
		_ncrDeptCd = "npiPartiDeptCd_"+idx;
		_ncrDeptDiv = "H";
		_ncrDeptVal = $("#"+_ncrDeptNm).val();
	}else{
		if ($('input[name=npiOprtHostType]:checked').val() == 'DEPART') {
			_ncrDeptDiv = "N";
		}else{
			_ncrDeptDiv = "H";
		}

		_ncrDeptNm = "deptNm";
		_ncrDeptCd = "npiOprtDeptCd";
		_ncrDeptVal =  $("#deptNm").val();
	}


	$.ajax({
			url : _url
			, type : "POST"
			, cache : false
			, async : false
			, dataType : "json"
			, data : {
				  deptKorNm : _ncrDeptVal
				  ,deptNm : _ncrDeptVal
			}
			, success : function(res) {
				if(res.deptInfoList.length>1){
//					alert("여러개의 검색결과가 존재 합니다. 한개의 부서/학과를 선택해 주세요.");
					fnOpenDeptListPopup("", searchType, _ncrDeptDiv, "H", "Y", idx);

				}else if(res.deptInfoList.length == 0){
					alert("검색 결과가 없습니다. \n해당 부서를 검색해 주세요.");
					fnOpenDeptListPopup("", searchType, _ncrDeptDiv, "H", "Y", idx);

				}else if(res.deptInfoList.length == 1){

					if(searchType == "npiPartiDept"){
						alert("참여학과가 입력되었습니다.")
					}else{
						alert("운영부서가 입력되었습니다.");
					}

					$("#"+_ncrDeptCd).val(res.deptInfoList[0].deptCd);
					$("#"+_ncrDeptNm).val(res.deptInfoList[0].deptKorNm);

				}
			}
		});
 }

//부서 조회 팝업
function fnGoOpenSuDeptListPopup(menuGubun, deptDiv, idx){
	var typeDiv = "DEPT";
	var deptNm = "";
	var searchKeyword ="";
	var searchFlag ='Y';

	if(menuGubun == "npiPartiDept"){
		deptNm = $("#npiPartiDeptNm_" + idx).val();
	}else{
		deptNm = $("#deptNm").val();
	}
	fnOpenSuDeptListPopup(searchKeyword, menuGubun, typeDiv, deptDiv, searchFlag, idx);
}

