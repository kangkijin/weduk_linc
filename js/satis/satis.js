
/*
 * 만족도 조사 기능 시작
 */
function fnSatisOnOffAjax(satRschType, obj, scaleQusArry, openQusArry, choiceQusArry, choiceAnsQusArry) {


	var basePath = sessionStorage.getItem("contextRootPath");
	var _url = basePath+"/cmm/fms/getSatRschListAjax.do";
	var _val = obj.value;
	var _id = obj.id;
	var _name = obj.name;
	console.log("_name = "+ _name );
	console.log("_id = "+ _id );
	console.log("_val = "+ _val );
	console.log("choiceAnsQusArry = "+ choiceAnsQusArry );
	console.log("scaleQusArry = "+ scaleQusArry );
	chkHtmlTr = $("#"+satRschType+"SatRschTr").html();

	if(_val == 'Y') {
		if(typeof chkHtmlTr != "undefined") {
			return false;
		}
		// 만족도 폼 추가할 위치
		var _obj = $("#"+_id).parent("p").parent("td").parent("tr").parent("tbody");
		// 만족도 폼 ajax
		$.ajax({
			url : _url
			, type : "POST"
			, async : false
			, dataType : "html"
			, data : {
				satRschType   : satRschType
			   ,scaleQus      : scaleQusArry
			   ,openQus       : openQusArry
			   ,choiceQus     : choiceQusArry
			   ,choiceAnsQus     : choiceAnsQusArry
			}
			, success : function(res) {
				_obj.append(res);
			}
		});
		$("#npiSatisRschN").attr('onclick' , 'fnSatisOnOff("std", this);');
		// 만족도 미사용 선택
	} else {
		// 만족도 테이블 삭제되어애함
		if(confirm("미사용으로 하시면 입력하신 문항내용이 모두 지워집니다. 미사용으로 변경하시겠습니까?") ) {
			$("#"+satRschType+"SatRschTr").remove();
			$("#npiSatisRschN").attr('onclick' , 'return(false);');
		}else {
			$("input[name="+_name+"][value=Y]").prop("checked", true);
			$("#npiSatisRschN").attr('onclick' , 'fnSatisOnOff("std", this);');
		}
	}
}


// 만족도 기능들
// 질문 추가, 삭제, 순위 변경에 따른 질문 order 순서변경
function qusNumbering(type) {
	if( type == "pre" ) { // 기업 만족도 이면
		$("#preSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	} else if(type == "peer") {// 동료평가 이면
		$("#peerSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	}else{// 만족도 이면
		$("#stdSatisTable tr .qusNum").each(function(index) {
			$(this).text(index+1);
		});
	}
}
/* 만족도 조사 질문 항목 추가*/
function addQus(type) {
	var $tableTr = "";
	//만족도 조사 이면
	if( type == "std" ) {
		$tableTr = $("#stdSatisTable");
		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='form-control input-sm' name='sqmCont1' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
					+"</td>"
				+"<td class='td_input'>"
					+"<select class='form-control input-sm' name='sqmTypCd1' onchange='changeType(this, \"std\");'>"
						+"<option value='SCALE'>5점척도</option>"
						+"<option value='OPEN'>주관식</option>"
						+"<option value='CHOICE'>자유형객관식</option>"
					+"</select>"
					+"<div id='satisInfoDiv' class='satisInfoDiv'>"
						+"<input type='hidden' name='sqmMultiYn1' value='N' />"
						+"<input type='hidden' name='sqmFstScore1' value='1' />"
						+"<input type='hidden' name='sqmPerScore1' value='1' />"
						+"<input type='hidden' name='sqmAnsCnt1' value='5' />"
						+"<input type='hidden' name='sqmFixedYn1' value='N' />"
						+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='매우 아니다' />"
						+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='아니다' />"
						+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='보통이다' />"
						+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='그렇다' />"
						+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='매우 그렇다' />"
					+"<div>"
				+"</td>"
				+"<td class='td_input'>"
					+"<button type='button' class='btn btn-danger btn-danger' onclick='removeQus(this,\"std\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
				+"</td>"
				+"<td class='td_input'>"
					+"<a href='javascript:void(0);' onclick='moveUp(this, \"std\");' class='btn btn_sort' title='위로'><i class='fa fa-caret-up'></i></a>"
					+"<a href='javascript:void(0);' onclick='moveDw(this, \"std\");' class='btn btn_sort' title='아래로'><i class='fa fa-caret-down'></i></a>"
				+"</td>"
			+"</tr>");
	}



	// 기업 만족도 이면
	if( type == "pre" ) {
		$tableTr = $("#preSatisTable");

		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='form-control input-sm' name='sqmCont2' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
				+"</td>"
				+"<td class='td_input'>"
					+"<select class='form-control input-sm' name='sqmTypCd2' onchange='changeType(this, \"pre\");'>"
						+"<option value='SCALE'>5점척도</option>"
						+"<option value='OPEN'>주관식</option>"
						+"<option value='CHOICE'>자유형객관식</option>"
					+"</select>"
					+"<div id='satisInfoDiv' class='satisInfoDiv'>"
						+"<input type='hidden' name='sqmMultiYn2' value='N' />"
						+"<input type='hidden' name='sqmFstScore2' value='1' />"
						+"<input type='hidden' name='sqmPerScore2' value='1' />"
						+"<input type='hidden' name='sqmAnsCnt2' value='5' />"
						+"<input type='hidden' name='sqmFixedYn2' value='N' />"
						+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='매우 아니다' />"
						+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='아니다' />"
						+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='보통이다' />"
						+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='그렇다' />"
						+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='매우 그렇다' />"
					+"<div>"
				+"</td>"
				+"<td class='td_input'>"
					+"<button type='button' class='btn btn-danger btn-danger' onclick='removeQus(this, \"pre\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
				+"</td>"
				+"<td class='td_input'>"
					+"<a href='javascript:void(0);' onclick='moveUp(this, \"pre\");' class='btn btn_sort' title='위로'><i class='fa fa-caret-up'></i></a>"
					+"<a href='javascript:void(0);' onclick='moveDw(this, \"pre\");' class='btn btn_sort' title='아래로'><i class='fa fa-caret-down'></i></a>"
				+"</td>"
			+"</tr>");
	}

	//동료평가 이면
	if( type == "peer" ) {
		$tableTr = $("#peerSatisTable");
		$tableTr.find("tbody").append("<tr>"
				+"<td class='qusNum'></td>"
				+"<td class='td_input'>"
					+"<input type='text' class='form-control input-sm' name='sqmCont3' title='질문 내용'>"
				+"</td>"
				+"<td class='td_input'>"
//				+"<select class='form-control input-sm' name='sqmTypCd3' onchange='changeType(this, \"peer\" );' style='display: none;'>"
//					+"<option value='OPEN'>주관식</option>"
//				+"</select>"
				+"<div id='satisInfoDiv' class='satisInfoDiv'>"
					+"<input type='hidden' name='sqmTypCd3' value='OPEN' />"
					+"<input type='hidden' name='sqmMultiYn3' value='N' />"
					+"<input type='hidden' name='sqmFstScore3' value='1' />"
					+"<input type='hidden' name='sqmPerScore3' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt3' value='1' />"
					+"<input type='hidden' name='sqmFixedYn3' value='N' />"
					+"<input type='hidden' name='samCont3' class='ad_formstyle wd_p15' value='주관식 답변' />"
				+"</div>"
				+"<button type='button' class='btn btn-danger btn-danger' onclick='removeQus(this, \"peer\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
				+"</td>"
				+"<td class='td_input'>"
					+"<a href='javascript:void(0);' onclick='moveUp(this, \"peer\");' class='btn btn_sort' title='위로'><i class='fa fa-caret-up'></i></a>"
					+"<a href='javascript:void(0);' onclick='moveDw(this, \"peer\");' class='btn btn_sort' title='아래로'><i class='fa fa-caret-down'></i></a>"
				+"</td>"
			+"</tr>");
	}

	// 질문 넘버링
	qusNumbering(type);
}

// 질문유형변경_만족도
function changeType(obj, type)

{
	var _val = $(obj).val();
	var $tableTd = $(obj).parent("td");

	if( type == "std" ) {
		// 5점척도 일때
		if(_val == "SCALE") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont1' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
					+"<input type='hidden' name='sqmFstScore1' value='1' />"
					+"<input type='hidden' name='sqmPerScore1' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt1' value='5' />"
					+"<input type='hidden' name='sqmFixedYn1' value='N' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='매우 아니다' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='아니다' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='보통이다' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='그렇다' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='매우 그렇다' />");

		// 주관실 일때
		} else if(_val == "OPEN") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont1' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' onkeyup='fnKeyUpCommaChk(this);'/>"
					+"<input type='hidden' name='sqmFstScore1' value='1' />"
					+"<input type='hidden' name='sqmPerScore1' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt1' value='1' />"
					+"<input type='hidden' name='sqmFixedYn1' value='N' />"
					+"<input type='hidden' name='samCont1' class='ad_formstyle wd_p15' value='주관식 답변' />");

		// 자유형 객관식 일때
		} else if(_val == "CHOICE") {
			// var _row = $("#satisTable tr .qusNum").length;
			var _row = $tableTd.prev().prev().text();

			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont1' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
					+"<div class='ta_l mg_t10'>"
						+"<p class='ad_section_stit'>"
//							+"<span class='stit_bullet'></span>자유형 객관식 답변 작성"
						+"</p>"
						+"<div class='ad_btn_area1 mg_t10'>"
							+"<button type='button' class='btn btn-sm dp_inline btn-primary' onclick='addAns(this, \"std\");'><i class='fa fa-plus'></i>답변추가</button>"
							+"<p class='ad_input_row'>"
								+"<input name='sqmMultiYnChk1' class='check mg_l5' id='sqmStdMultiYnChk"+_row+"' type='checkbox' onclick='sqmMultiYnClick(this, \"std\");'>"
								+"<label class='check_label check_black' for='sqmStdMultiYnChk"+_row+"'>다중 선택 허용</label>"
							+"</p>"
						+"</div>"
						+"<ul>"
							+"<li class='ta_l mg_t5'>"
								+"<input type='text' class='form-control input-sm dp_inline wd_p90 va_m' name='samCont1' title='답변 내용' onkeyup='fnKeyUpCommaChk(this);'>"
								+"<button type='button' class='btn btn-danger btn-danger mg_l5' onclick='removeAns(this, \"std\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
							+"</li>"
						+"</ul>"
					+"</div>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' onkeyup='fnKeyUpCommaChk(this);'/>"
					+"<input type='hidden' name='sqmFstScore1' value='1' />"
					+"<input type='hidden' name='sqmPerScore1' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt1' value='1' />"
					+"<input type='hidden' name='sqmFixedYn1' value='N' />");
		}
	}

	// 기업만족도 일때
	if( type == "pre" ) {
		// 5점척도 일때
		if(_val == "SCALE") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont2' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn2' value='N' />"
					+"<input type='hidden' name='sqmFstScore2' value='1' />"
					+"<input type='hidden' name='sqmPerScore2' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt2' value='5' />"
					+"<input type='hidden' name='sqmFixedYn2' value='N' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='매우 아니다' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='아니다' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='보통이다' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='그렇다' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='매우 그렇다' />");

		// 주관실 일때
		} else if(_val == "OPEN") {
			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont2' title='질문 내용'>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn2' value='N' />"
					+"<input type='hidden' name='sqmFstScore2' value='1' />"
					+"<input type='hidden' name='sqmPerScore2' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt2' value='1' />"
					+"<input type='hidden' name='sqmFixedYn2' value='N' />"
					+"<input type='hidden' name='samCont2' class='ad_formstyle wd_p15' value='주관식 답변' />");

		// 자유형 객관식 일때
		} else if(_val == "CHOICE") {
			// var _row = $("#satisTable tr .qusNum").length;
			var _row = $tableTd.prev().prev().text();

			// 이전요소(질문정보가 들어 있는 td)지우기
			$tableTd.prev().empty();
			// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
			$tableTd.prev().append("<input type='text' class='form-control input-sm' name='sqmCont2' title='질문 내용'>"
					+"<div class='ta_l mg_t10'>"
						+"<p class='ad_section_stit'>"
//							+"<span class='stit_bullet'></span>자유형 객관식 답변 작성"
						+"</p>"
						+"<div class='ad_btn_area1 mg_t10'>"
						+"<button type='button' class='btn btn-sm dp_inline btn-primary' onclick='addAns(this, \"pre\");'><i class='fa fa-plus'></i>답변추가</button>"
							+"<p class='ad_input_row'>"
								+"<input name='sqmMultiYnChk2' class='check mg_l5' id='sqmPreMultiYnChk"+_row+"' type='checkbox' onclick='sqmMultiYnClick(this, \"pre\");'>"
								+"<label class='check_label check_black' for='sqmPreMultiYnChk"+_row+"'>다중 선택 허용</label>"
							+"</p>"
						+"</div>"
						+"<ul>"
							+"<li class='ta_l mg_t5'>"
								+"<input type='text' class='form-control input-sm dp_inline wd_p90 va_m' name='samCont2' title='답변 내용'>"
								+"<button type='button' class='btn btn-danger btn-danger mg_l5' onclick='removeAns(this, \"pre\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
							+"</li>"
						+"</ul>"
					+"</div>");

			// 만족도 정보 지우기
			// $tableTd.find("#satisInfoDiv").empty();
			$tableTd.find(".satisInfoDiv").empty();
			// 만족도 정보 넣기
			// $tableTd.find("#satisInfoDiv").append("<input type='hidden' name='sqmMultiYn1' value='N' />"
			$tableTd.find(".satisInfoDiv").append("<input type='hidden' name='sqmMultiYn2' value='N' />"
					+"<input type='hidden' name='sqmFstScore2' value='1' />"
					+"<input type='hidden' name='sqmPerScore2' value='1' />"
					+"<input type='hidden' name='sqmAnsCnt2' value='1' />"
					+"<input type='hidden' name='sqmFixedYn2' value='N' />");
		}
	}

}

// 질문 삭제 버튼
function removeQus(obj, type) {
	// 만족도 일때
	if(type == "std") {
		if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
			// 질문삭제
			$(obj).parent("td").parent("tr").remove();
		} else {
			alert("첫 질문은 삭제할 수 없습니다.");
		}
		// 고정 질문이 있으므로 질문은 다 지워져도 된다 << 2020-03-13 고정만족도에 삭제버튼이 추가되었기떄문에 예외를 잡아줘야한다
	}
	if(type == "pre") {
		// 첫 질문이라면 삭제 불가
		// 첫질문이 아니라면
		if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
			// 질문삭제
			$(obj).parent("td").parent("tr").remove();
		} else {
			alert("첫 질문은 삭제할 수 없습니다.");
		}
	}

	if(type == "peer") {
		if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
			// 질문삭제
			$(obj).parent("td").parent("tr").remove();
		} else {
			alert("첫 문항은 삭제할 수 없습니다.");
		}
	}



	// 질문 넘버링
	qusNumbering(type);
}


// 질문 순서번경 올리기 버튼
function moveUp(obj, type) {
	// tr 가져오기
	var $qusTr = $(obj).parent("td").parent("tr");
	//만족도 일때
	if(type == "std" || type == "peer") {
		// 고정 만족도를 제외하고 수정되어야 한다
		// 위에 글이 고정 만족도가 아니면 수정
		if( $qusTr.prev().find("input[name=sqmFixedYn1]").val() == "N" ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	}

	//사전만족도 일때
	if(type == "pre" ) {
		// 첫 질문이라면 순서변경 불가
		// 첫 질문이 아니라면
		if( $qusTr.prev().html() !== undefined ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	}

	//동료평가 일때
	if(type == "peer") {
		// 고정 만족도를 제외하고 수정되어야 한다
		// 위에 글이 고정 만족도가 아니면 수정
		if( $qusTr.prev().find("input[name=sqmFixedYn3]").val() == "N" ) {
			// tr 올리기
			$qusTr.prev().before($qusTr);
			// 질문 넘버링
			qusNumbering(type);
		} else {
			alert("첫 질문이여서 순서를 변경할 수 없습니다.");
		}
	}
}

// 질문 순서변경 내리기 버튼
function moveDw(obj, type) {
	// tr 가져오기
	var $qusTr = $(obj).parent("td").parent("tr");
	// 마지막 질문이면 내릴수 없음
	// 마지막 질문이라면
	if( $qusTr.next().html() !== undefined  ) {
		// tr 내리기
		$qusTr.next().after($qusTr);
		// 질문 넘버링
		qusNumbering(type);
	} else {
		alert("마지막 질문이여서 순서를 변경할 수 없습니다.");
	}

}

// 자유형 객관식 답변 추가
function addAns(obj, type) {
	if(type == "std") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=samCont1]").length  == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}

		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='form-control input-sm dp_inline wd_p90 va_m' name='samCont1' title='답변 내용'>"
				+"<button type='button' class='btn btn-danger btn-danger' onclick='removeAns(this, \"std\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt1]").val( $(obj).parent("div").next().find("li").length );

	}

	if(type == "pre") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=samCont2]").length == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}
		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='form-control input-sm dp_inline wd_p90 va_m' name='samCont2' title='답변 내용'>"
				+"<button type='button' class='btn btn-danger btn-danger' onclick='removeAns(this, \"pre\");' title='질문삭제'><i class='fa fa-minus'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt2]").val( $(obj).parent("div").next().find("li").length );
	}

	if(type == "peer") {
		// 질문이 10개를 초과하게 등록할수 없다
		if( $(obj).parent("div").next().children("li").find("input[name=samCont1]").length  == 10 ) {
			alert("더 이상 추가가 불가합니다.");
			return;
		}

		$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
				+"<input type='text' class='form-control input-sm dp_inline wd_p90 va_m' name='samCont1' title='답변 내용'>"
				+"<button type='button' class='btn btn-danger btn-danger mg_l5' onclick='removeAns(this, \"peer\");' title='질문삭제'><i class='fa fa-minus mg_r0'></i></button>"
			+"</li>");
		// 답변 개수 수정
		$(obj).parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt3]").val( $(obj).parent("div").next().find("li").length );

	}

}

// 자유형 객관식 답변 삭제
function removeAns(obj, type) {

	// 만족도 이면
	if(type == "std" || type == "peer") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt1]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	}

	//사전만족도 이면
	if(type == "pre") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt2]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	}

	//동료평가 이면
	if(type == "peer") {
		var _ansCnt = $(obj).parent("li").siblings().length;
		// 질문 개수가 1개이면 삭제하지 않는다.
		if( _ansCnt >= 1 ) {
			// 답변 개수 수정
			$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmAnsCnt3]").val(_ansCnt);
			// 답변 삭제
			$(obj).parent("li").remove();
		} else {
			alert("적어도 하나 이상의 답변이 필요합니다.");
		}
	}

}

// 자유형 객관식에서 다중선택 여부 체크했을때
function sqmMultiYnClick(obj, type) {

	// 다중선택이 체크 되었을때
	if( $(obj).prop("checked") ) {
		// 만족도 일때
		if(type == 'std') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn1]").val("Y");
		}
		// 사전 만족도 이면
		if(type == 'pre') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn2]").val("Y");
		}
		// 동료평가 이면
		if(type == 'peer') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn3]").val("Y");
		}

	// 체크되지 않았을때
	} else {
		// 만족도 이면
		if(type == 'std') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn1]").val("N");
		}
		// 사전 만족도 이면
		if(type == 'pre') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn2]").val("N");
		}

		// 동료평가 이면
		if(type == 'pree') {
			$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".satisInfoDiv input[name=sqmMultiYn3]").val("N");
		}

	}

}

/* 만족도 통계 팝업 */
satisByProgramPopup = function(_satisGrpSeq, _programTotalCnt, _programRequestStdCnt, _rschType, _chartYn){
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/cmm/fms/satisfactionByProgramListPop.do";
	var popupParams = {
		 satisGrpSeq : _satisGrpSeq
		,programTotalCnt : _programTotalCnt
		,programRequestStdCnt : _programRequestStdCnt
		,rschType : _rschType
		,chartYn : _chartYn
	};

	loadPopup (popupDivId, popupUrl, popupParams);
}

/* 만족도 조사응답 팝업 */
goSatisRequstStdPop = function(_satisGrpSeq, _programCode, _requestUserSeq, _remarksA, _type){
	var basePath = sessionStorage.getItem("contextRootPath");
	var popupDivId = "#layerPopup";
	var popupUrl = basePath+"/cmm/fms/getSatisRschRequstStdListPopUp.do";
	var popupParams = {
			        satisGrpSeq : _satisGrpSeq
		           ,programCode : _programCode
		           ,requestUserSeq : _requestUserSeq
		           ,remarksA : _remarksA
		           ,type : _type
	};
	loadPopup (popupDivId, popupUrl, popupParams);
}

/* 만족도 조사 통계그래프 */
function drawGraph(chartDataArry,chartTitleArry, divNm){


	var options = {
			chart: {
	            height: 300,
	            type: 'bar',
	            background: 'transparent'
	        },
	        plotOptions: {
	            bar: {
	                horizontal: false,
	                columnWidth: '40%',
	                distributed: true
	            },
	        },
	        dataLabels: {
	            enabled: false
	        },
	        stroke: {
	            show: true,
	            width: 2,
	            colors: ['transparent']
	        },
	        colors: ['#d93655','#9dcd57','#0487d9','#f2b84c','#855ea8'],
			series : [
			            {
							name : ['인원 수'],
							data : chartDataArry
						},
			],
	        xaxis: {
	            categories: chartTitleArry,
	        },
	        fill: {
	            opacity: 1

	        },
	        legend: {
				position: 'bottom',
				horizontalAlign: 'right',
				floating: true,
				offsetY: 0-25,
				offsetX: 0-5
			},
		};

	var chart = new ApexCharts(document.querySelector("#" + divNm), options);
	chart.render();

}


