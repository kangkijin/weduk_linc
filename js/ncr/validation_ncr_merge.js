/**
 * 비교과 프로그램 등록, 수정 시 데이터 유효성 확인.
 * 
 * 
 * 
 */





/**
*********************************************************
@ function : 인풋 Null 체크
@ comment  :  
@ history  : 2017-11-07 (최초작성)
**********************************************************
 **/
function fnInputValidation() {
	var chkAbilitySum = "";
	var idName = [ 'ncrAreaTypeCd', 'ncrAreaActCd', 'ncrOperationModeCd',
			'ncrProgramTitle', 'ncrAbilitySum', 'ncrMainAbilityCd'

			, 'ncrRecrStrDate', 'ncrRecrEndDate', 'ncrActStrDate',
			'ncrActEndDate', 'ncrRecrCnt', 'ncrOperDepartNm', 'ncrStaffNm' ];
/** Input Null 체크 **/
	if (!fnChkIsNull(idName)) {
			return false;
		}
		;
/** 역량정보 Input Null 체크 : 필수 프로그램이 아니면 역량점수 입력 **/
	if ($('input[name=ncrNeedYn]:checked').val() == 'N') {
			var abilityInput = [ 'ncrFirstAbility', 'ncrSecondAbility',
					'ncrThirdAbility', 'ncrForthAbility', 'ncrFifthAbility',
					'ncrSixthAbility' ];
			if (!fnChkIsNull(abilityInput)) {
				return false;
			}
			;
		}
/** 참여학과 체크 **/
	$tableTr = $("#partDepartTd");
		var _rowCount = $("#partDepartTd p").length;

		if (_rowCount > 0) {
			for (var idx = 0; idx < _rowCount; idx++) {
				if ($("#ncrPartDepartCd_" + idx).val() == '') {
					alert((parseInt(idx) + 1) + "번째 참여학과를 선택해 주세요.");
					return false;
				}
			}
		}
/** 부서 코드 체크 **/
	if ($('#writeForm input[name=ncrOperDepartCd]').val() == null
				|| $('#writeForm input[name=ncrOperDepartCd]').val() == '') {
			fnGetDeptInfo('ncrOperDepart');
			return false;
		}
/** 담당자 코드 체크 **/
	if ($('#ncrStaffNo').val() == null || $('#ncrStaffNo').val() == '') {
			fnGetStaffInfo();
			return false;
		}
/**학년 제한 체크**/
	if (!$("#writeForm input[name=ncrGradeLimit]").emptyCheckBox())
			return false;
/**예산코드 유효성**/
	if (!chkNullSelectBox('budgetCd')) {
			return false;
		}
/**예산액 유효성**/
	if (!chkNullInput('budgetPrice')) {
			return false;
		}
/**프로그램 내용 null값 체크 및 byte 체크**/
	idName = [ 'ncrCont' ];
		if (!fnChkIsNull(idName)) {
			return false;
		}

		var contData = $('#ncrCont').val();

		//var contData = CKEDITOR.instances.contEditor.getData();
		// 	if(!fnContsByteCheck(contData, "contEditor", 3900)){return false};
/** 신청서 Y 체크했을경우 파일 등록 유무 체크 **/
	if ($('input[name="ncrApplFileYn"]:checked').val() == "Y") {

			if ('${viewType}' == 'INSERT' || '${viewType}' == 'LOAD') {
				if ($('#addFileNm2').val() == "") {
					alert("신청서 파일을 등록해주세요.")
					return false;
				}
				;
			}
			;

		}
/** 첨부파일 체크 **/
	$tableTr = $("#fileDownRow");
		var _rowCount = $("#fileDownRow p").length;

		if (_rowCount > 0) {
			for (var idx = 0; idx < _rowCount; idx++) {
				var idxCount = idx + parseInt(1);
				if ($("#fileHiddenNm" + idxCount).val() == '') {
					alert((parseInt(idxCount)) + "번째 첨부파일을 선택해 주세요.");
					return false;
				}
			}
		}
/** 사전 만족도 Null 체크 **/
	if ($('input[name=ncrStdPreRschYn]:checked').val() == "Y") {
			if (!fnChkSatisNullchk('pre')) {
				return false;
			}
		}
/** 만족도 Null 체크 **/
	if ($('input[name=ncrStdSatRschYn]:checked').val() == "Y") {
			if (!fnChkSatisNullchk('std')) {
				return false;
			}
		}
/** 역량총합, 역량점수 비교 **/
	chkAbilitySum = parseFloat($("input[name=ncrFirstAbility]").val())
					+ parseFloat($("input[name=ncrSecondAbility]").val())
					+ parseFloat($("input[name=ncrThirdAbility]").val())
					+ parseFloat($("input[name=ncrForthAbility]").val())
					+ parseFloat($("input[name=ncrFifthAbility]").val())
					+ parseFloat($("input[name=ncrSixthAbility]").val());

/** 역량총합 최대값은 15점 체크 **/
	if (chkAbilitySum > 15) {
			alert("역량 점수의 총합은 15점을 넘길 수 없습니다.");
			$("input[name=ncrFirstAbility]").focus();
			return false;
		}
/** 핵심역량설정 체크 : 최고값은 하나만 있어야한다 **/
	
/**	var checkArray = [];
	var checkCount = 0;
	
	checkArray.push(parseInt($("input[name=ncrFirstAbility]").val()));
	checkArray.push(parseInt($("input[name=ncrSecondAbility]").val()));
	checkArray.push(parseInt($("input[name=ncrThirdAbility]").val()));
	checkArray.push(parseInt($("input[name=ncrForthAbility]").val()));
	checkArray.push(parseInt($("input[name=ncrFifthAbility]").val()));
	checkArray.push(parseInt($("input[name=ncrSixthAbility]").val()));
	
	/** 배열중 최고값을 구한다 **/
	
/**var max = Math.max.apply(null,checkArray);
	for(var i =0;i<checkArray.length;i++){
		if(max==checkArray[i]){
			checkCount++;
		}
	} **/
	
/** 배열중 최고값과 같은것이 있다면 ( count > 1 ) **/
	
/**if(checkCount>1){
		alert("'핵심 역량 설정'에서\n역량 비율의 최고값은 한 개여야 합니다.");
		$("input[name=ncrFirstAbility]").focus();
		return false;
	} **/
	
/** 날짜 비교 **/
	if (!isCompareData('ncrRecrStrDate', 'ncrRecrEndDate')) {
			return false
		}
		;
/** 모집기간 체크 **/
	if (!isCompareData('ncrActStrDate', 'ncrActEndDate')) {
			return false
		}
		;
/**모집기간 끝과 운영기간 시작 비교 **/
	if (parseInt($('#ncrApplyCnt').val()) > parseInt(0)) {
			// 	if ( parseInt('${ncrVo.ncrApplyCnt}') > parseInt(0) ) {
			alert("사전 만족도조사를 답한 학생이 존재하여 사전만족도 및 만족도조사는 수정이 불가합니다.");
		}
		var alertMsg = "저장 하시겠습니까?";

		if (confirm(alertMsg)) {
			return true;
		} else {
			return false;
		}
	}
/**
*********************************************************
@ function : 같은 이름의 select OR input 값 있을 경우의  null 값 체크
@ comment  : 
@ param    : type = Y/N 구분
@ history  : 2017-11-07 (최초작성)
**********************************************************
**/
	
/**select 박스**/
	function chkNullSelectBox(_id) {
		var flag = true;

		$('select[name=' + _id + '] option:selected').each(function() {
			if ($(this).val() == "" || $(this).val() == null) {
				alert($(this).parent().attr('title') + '을(를) 선택해야 합니다.');
				$(this).focus();

				flag = false;
				return flag;
			}
		});
		return flag;
	}
/**input 박스**/
	function chkNullInput(_id) {
		$('input[name=' + _id + ']').each(function() {
			flag = true;
			if ($(this).val() == "" || $(this).val() == null) {
				alert($(this).attr('title') + '을(를) 입력해야 합니다.');
				$(this).focus();

				flag = false;
				return flag;
			}
		});
		return flag;
	}
/**input 전체 값 없는 경우 null 셋팅 (예산에서 사업명 전부 null 경우 체크위함) **/
	function chkNullInputAll(_id) {
		flag = false;
		$('input[name=' + _id + ']').each(function() {
			if ($(this).val() != "" && $(this).val() != null) {
				flag = true;
				return flag;
			}
		});
		return flag;
}
