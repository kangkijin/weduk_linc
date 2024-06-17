/**
 * Form관련 객체
 */
var DainVaidator = function() {

}
/**
 * 설명 : escape() 함수를 이용해 인코딩하여 그 값의 길이가 6일 경우 한글로 판단하여 2byte로 계산
 *
 * usage : DainVaidator.getTextLength(target) <= number ){}
 ****************sample**************
  var _targetNm = $("#"+targetId).val();
  DainVaidator.getTextLength(_targetNm) <= number ) {}
*************************************
 */
DainVaidator.getTextLength = function(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		if (escape(str.charAt(i)).length == 6) {
			len+=2;
		}
		len++;
	}
	return len;
}


/*
$.validator.prototype.checkForm = function() {
	this.prepareForm();
	for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
		console.log( elements[i] )
		if (this.findByName( elements[i].name ).length != undefined && this.findByName( elements[i].name ).length > 1) {
			for (var cnt = 0; cnt < this.findByName( elements[i].name ).length; cnt++) {
				this.check( this.findByName( elements[i].name )[cnt] );
			}
		} else {
			this.check( elements[i] );
		}
	}
	return this.valid();
};
*/

/*
validattion 타겟
*/
$.validator.prototype.check = function(element) {
	element = this.validationTargetFor( this.clean( element ) );

	var rules = $( element ).rules(),
		rulesCount = $.map( rules, function( n, i ) {
			return i;
		} ).length,
		dependencyMismatch = false,
		val = this.elementValue( element ),
		result, method, rule, normalizer;

	// Prioritize the local normalizer defined for this element over the global one
	// if the former exists, otherwise user the global one in case it exists.
	if ( rules && rules.normalizer && typeof rules.normalizer === "function" ) {
		normalizer = rules.normalizer;
	} else if (	typeof this.settings.normalizer === "function" ) {
		normalizer = this.settings.normalizer;
	}

	// If normalizer is defined, then call it to retreive the changed value instead
	// of using the real one.
	// Note that `this` in the normalizer is `element`.
	if ( normalizer ) {
		val = normalizer.call( element, val );

		// Delete the normalizer from rules to avoid treating it as a pre-defined method.
		delete rules.normalizer;
	}

	for ( method in rules ) {
		rule = { method: method, parameters: rules[ method ] };
		try {
			result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

			// If a method indicates that the field is optional and therefore valid,
			// don't mark it as valid when there are no other rules
			if ( result === "dependency-mismatch" && rulesCount === 1 ) {
				dependencyMismatch = true;
				continue;
			}
			dependencyMismatch = false;

			if ( result === "pending" ) {
				this.toHide = this.toHide.not( this.errorsFor( element ) );
				return;
			}

			if ( !result ) {
				this.formatAndAdd( element, rule );
				return false;
			}
		} catch ( e ) {
			if ( this.settings.debug && window.console ) {
				console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
			}
			if ( e instanceof TypeError ) {
				e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
			}

			throw e;
		}
	}
	if ( dependencyMismatch ) {
		return;
	}
	if ( this.objectLength( rules ) ) {
		this.successList.push( element );
	}
	return true;
};

/*
 * 설명 : 전화번호 형식(010-1234-5678)
 *
 * usage : { "phone" : true }
 ************ sample ********

 ****************************
 */
$.validator.addMethod("phone", function (value, element, param) {

	if( !value ) {
		return true;
	} else {
		 var regEx = /^\d{2,3}-\d{3,4}-\d{4}$/;
		if(!value.match(regEx)) {
			return false;  // Invalid format
		} else {
			return true;
		}

	}
},"전화번호 형식(0xx-1234-5678)으로 입력해주세요." );


/*
 * 설명 : 날짜 형식 (yyyy-mm-dd)확인
 *
 * usage : { "date" : true }
 ************ sample ********

 ****************************
 */
$.validator.addMethod("date", function (value, element, param) {

	if( !value ) {
		return true;
	} else {
		 var regEx = /^\d{4}[\-\.]?\d{2}[\-\.]?\d{2}$/;
		if(!value.match(regEx)) {
			return false;  // Invalid format
		}
		value = value.replace(/\./ig, '-');

		if( value.length == 8 ) {
			var v = value.substring(0, 4) +'-' + value.substring(4, 6)+'-' + value.substring(6, 8)
			value = v;
		}

		var d = new Date(value);
		var dNum = d.getTime();
		if(!dNum && dNum !== 0) {
			return false; // NaN value, Invalid date
		}
		return d.toISOString().slice(0,10) === value;

	}
},"날짜 형식(YYYY-MM-DD)으로 입력해주세요." );


/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 value값 필수 입력 check
 *
 * usage : { "requiredIfNotEmpty" : "#target" }
 ************ sample ********
	<input type="text" name="role" id="role" value="">
	<textarea  name="roleDesc" id="roleDesc" data-validation='{"requiredIfNotEmpty" : "#role" }' >${value}</textarea>
 ****************************
 */
$.validator.addMethod("requiredIfNotEmpty", function (value, element, param) {

	var target = $( param );

	if( target.val() !="" && value == "") {
		return false;
	} else {
		return true;
	}
},"값을 입력해주세요." );

/*
 * 설명 : element에 값이 있을경우 validation대상 elements에 첨부파일 필수 첨부
 *
 * usage : { "requiredFile" : "#target" }
 ************ sample ********
	<tag:itemFile type="office" name="target" require="true"  validation='{"requiredFile" : true}'></tag:itemFile>
 ****************************
 */
$.validator.addMethod("requiredFile", function (value, element) {

	return FileUploadDL.hasFile(element.name.replace(/_file_validator/ig, ''));

},"첨부파일을 입력해주세요." );

/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 첨부파일 필수 첨부
 *
 * usage : { "requiredFileIfChecked" : "#target" }
 ************ sample ********
	<tag:itemYn type="radio" name="targetYn" require="true" validation='{ "required" : true }' ></tag:itemYn>
 	<tag:itemFile type="office" name="target" require="true"  validation='{  "requiredFileIfChecked" : "#targerYnY" }'></tag:itemFile>
 ****************************
 */
$.validator.addMethod("requiredFileIfChecked", function (value, element, param) {

	var target = $( param );


	if( target.is(":checked") == true && value == "") {
		return FileUploadDL.hasFile(element.name.replace(/_file_validator/ig, ''));
	} else {
		return true;
	}
},"첨부파일을 입력해주세요." );

/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 첨부파일 필수 첨부
 *
 * usage : { "requiredFileWhen" : ["#target" : [ "A", "B" ]  ]}
 * usage : { "requiredFileWhen" : ["#target" : "A"  ]}
 ************ sample ********
	<input type="hidden" id="npiApplyFileYn" name="npiApplyFileYn" :value="programInfo.npiApplyFileYn" />
 	<tag:itemFile type="office" name="STD_NCR_APPLY" validation='{ "requiredFileWhen" : ["#npiApplyFileYn", "Y"] }' ></tag:itemFile>
 ****************************
 */
$.validator.addMethod("requiredFileWhen", function (value, element, param) {

	var target = $( param[0] );

	if( $.isArray(param[1]) ) {
		var isEqualVal = false;
		for( var i=0; i< param[1].length; i++) {
			if( target.val() == param[1][i] ) {
				isEqualVal = true;
			}
		}

		if( isEqualVal == true) {
			return FileUploadDL.hasFile(element.name.replace(/_file_validator/ig, ''));;
		} else {
			return true;
		}
	} else {
		if( target.val() == param[1] ) {
			return FileUploadDL.hasFile(element.name.replace(/_file_validator/ig, ''));;
		} else {
			return true;
		}
	}

},"첨부파일을 입력해주세요." );

/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 체크 비교
 *
 * usage : { "checkEqual" : true }
 ************ sample ********
	<tag:itemCode type="checkbox" require="true" name="target" validation='{ "checkEqual" : true }' ></tag:itemCode>
 ****************************
 */
$.validator.addMethod("checkEqual", function (value, element, param ) {
	var els =  this.findByName( element.name );

	var inputedCnt = 0;

	if ( els.length != undefined && els.length > 1) {
		for (var cnt = 0; cnt < els.length; cnt++) {
			if(  $(els[cnt]).is(":checked") == true ) {
				inputedCnt++;
			}
		}
	} else {
		if(  $(els[0]).is(":checked") == true ) {
			inputedCnt = 1
		}
	}

	if( inputedCnt == param ) {
		return true;
	} else {
		return false;
	}
},"{0}개를 선택 해주세요." );

/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 최소 선택 갯수 체크
 *
 * usage : { "checkMin" : number }
 ************ sample ********
	<tag:itemCode type="checkbox" require="true" name="target" validation='{ "checkMin" : 1 }' ></tag:itemCode>
 ****************************
 */

$.validator.addMethod("checkMin", function (value, element, param ) {
	var els =  this.findByName( element.name );

	var inputedCnt = 0;

	if ( els.length != undefined && els.length > 1) {
		for (var cnt = 0; cnt < els.length; cnt++) {
			if(  $(els[cnt]).is(":checked") == true ) {
				inputedCnt++;
			}
		}
	} else {
		if(  $(els[0]).is(":checked") == true ) {
			inputedCnt = 1
		}
	}

	if( inputedCnt >= param ) {
		return true;
	} else {
		return false;
	}
},"최소 {0}개이상 선택 해주세요." );


/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 최대 선택 갯수 체크
 *
 * usage : { "checkMax" : number }
 ************ sample ********
	<tag:itemCode type="checkbox" require="true" name="target" validation='{ "checkMax" : 1 }' ></tag:itemCode>
 ****************************
 */
$.validator.addMethod("checkMax", function (value, element, param ) {
	var els =  this.findByName( element.name );

	var inputedCnt = 0;

	if ( els.length != undefined && els.length > 1) {
		for (var cnt = 0; cnt < els.length; cnt++) {
			if(  $(els[cnt]).is(":checked") == true ) {
				inputedCnt++;
			}
		}
	} else {
		if(  $(els[0]).is(":checked") == true ) {
			inputedCnt = 1
		}
	}

	if( inputedCnt <= param ) {
		return true;
	} else {
		return false;
	}
},"최대 {0}개까지만 선택 해주세요." );

/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 지정한 최대 숫자 이하로 체크박스가 체크되었는지 검증
 *
 * usage : { "maxCheck" : number }
 ************ sample ********
	<tag:itemCode type="checkbox" require="true" name="target" validation='{ "maxCheck" : 1 }' ></tag:itemCode>
 ****************************
 */
$.validator.addMethod("maxCheck", function (value, element, param ) {
	var els =  this.findByName( element.name );

	var inputedCnt = 0;

	if ( els.length != undefined && els.length > 1) {
		for (var cnt = 0; cnt < els.length; cnt++) {
			if(  $(els[cnt]).is(":checked") == true ) {
				inputedCnt++;
			}
		}
	} else {
		if(  $(els[0]).is(":checked") == true ) {
			inputedCnt = 1
		}
	}

	if( inputedCnt > param[0] && inputedCnt < param[1] ) {
		return true;
	} else {
		return false;
	}
}," {0}~ {1}까지만 선택 해주세요." );


/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 지정한 target이 체크되면 tager2 이벤트 발생
 *
 * usage : { "requiredIfChecked" : "#target" }
 ************ sample ********
	<input type="checkbox" id="target" value="Y"/>
	<tag:itemDateFromTo type="ymdhm" data-validation='{ "requiredIfChecked": "#target" , "greaterThanEqual" : "#target2" }'></tag:itemDateFromTo>
 ****************************
 */
$.validator.addMethod("requiredIfChecked", function (value, element, param) {

	var target = $( param );


	if( target.is(":checked") != true) {
		return true;
	}

	// checkable한 경우에도 적용 가능
	if ( this.checkable( element ) ) {
		return this.getLength( value, element ) > 0;
	}

	return value !== undefined && value !== null && value.length > 0;

},"값을 입력해주세요." );


/*
 * 설명 : param에 해당하는 element에 값이 있을경우 validation대상 elements에 입력이 되면 param 값이 1이되고 true
 *
 * usage : {"target" : true, "requiredCountIfChecked" : ["#tagerYnY", 1]}
 ************ sample ********
	<input type="text" id="targer" data-validation='{"name" : true, "requiredCountIfChecked" : ["#targetYnY", 1]}'>
 ****************************
 */
$.validator.addMethod("requiredCountIfChecked", function (value, element, param ) {

	var target = $( param[0] );

	if( target.is(":checked") == true) {
		var els =  this.findByName( element.name );
		var inputedCnt = 0;
		if ( els.length != undefined && els.length > 1) {
			for (var cnt = 0; cnt < els.length; cnt++) {
				if(  $(els[cnt]).val() != '' ) {
					inputedCnt++;
				}
			}
		} else {
			if(  $(els[0]).val() != '' ) {
				inputedCnt = 1
			}
		}

		if( inputedCnt>= param[1] ) {
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
},"값을 최소 {1}개이상 입력해주세요." );

/**
 * 설명 : validation 내 requiredWhen Id값이 true일 경우 validation대상 elements의 이벤트 발생
 *
 * usage : { "requiredWhen" : ["#target" : [ "A", "B" ]  ]}
 * usage : { "requiredWhen" : ["#target" : "A"  ]}
 ************ sample ********
	<tag:itemCode type="select" id="target" cdGrp="targetCd" require="true" " validation='{ "required" : true }'></tag:itemCode>
	<tag:itemText type="text" name="targetNm"  validation='{ "requiredWhen" : "#target"}'></tag:itemText>
 ****************************
  */
$.validator.addMethod( "requiredWhen", function( value, element, param ) {

	var target = $( param[0] );

	if( $.isArray(param[1]) ) {
		for( var i=0; i< param[1].length; i++) {
			if( target.val() == param[1][i] && value == "" ) {
				return false;
			}
		}
		return true;
	} else {
		if( target.val() == param[1] && value == "" ) {
			return false;
		} else {
			return true;
		}
	}

}, "값을 입력해주세요." );

/**
 * 설명 : param에 해당하는 element에 값이 선택 또는 입력된 경우 validation대상 elements에 모든 값 입력 또는 체크
 *
 * usage :{ "requiredAll" : true }
 ************ sample ********
	<tag:itemText type="text" name="target" validation='{ "requiredAll" : true}'></tag:itemText>
 ****************************
  */
$.validator.addMethod("requiredAll", function (value, element ) {

	var form = element.form;

	var els =  this.findByName( element.name );
	var elsLen  = 1;
	var inputedCnt = 0;

	if ( els.length != undefined && els.length > 1) {
		elsLen = els.length;

		for (var cnt = 0; cnt < els.length; cnt++) {
			if(  $(els[cnt]).val() != '' ) {
				inputedCnt++;
			}
		}
	} else {
		elsLen = 1;
		if(  $(els[0]).val() != '' ) {
			inputedCnt++;
		}
	}

	if( elsLen == inputedCnt ) {
		return true;
	} else {
		return false;
	}
},"모든 값을 입력해주세요." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 값이 지정된 숫자의 최소 글자수를 입력
 *
 * usage :{ "minlength_ko" : number }
 ************ sample ********
	<tag:itemText type="text" name="target" validation='{ "minlength_ko" : 300}'></tag:itemText>
 ****************************
  */
$.validator.addMethod( "minlength_ko",  function( value, element, param ) {
	var length = Array.isArray( value ) ? value.length : DainVaidator.getTextLength( value, element );
	return this.optional( element ) || length >= param;
}, $.validator.messages.minlength );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 값이 지정된 숫자의 최대 글자수를 입력
 *
 * usage :{ "maxlength_ko" : number }
 ************ sample ********
	<tag:itemText type="text" name="target" validation='{ "maxlength_ko" : 500}'></tag:itemText>
 ****************************
  */
$.validator.addMethod( "maxlength_ko", function( value, element, param ) {
 	var length = Array.isArray( value ) ? value.length : DainVaidator.getTextLength( value, element );
	return this.optional( element ) || length <= param;
},$.validator.messages.maxlength);

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 입력한 길이의 범위를 지정
 *
 * usage :{ "rangelength_ko" : [number,number] }
 ************ sample ********
	<tag:itemText type="text" name="target" validation='{ "rangelength_ko" : [300,500]}'></tag:itemText>
 ****************************
  */
$.validator.addMethod( "rangelength_ko", function( value, element, param ) {
	var length = Array.isArray( value ) ? value.length : DainVaidator.getTextLength( value, element );
	return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
},	$.validator.messages.rangelength);

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 영문, 숫자만 입력 가능
 *
 * usage :{"alphanumeric" : true} }
 ************ sample ********
	<input type="text" id="target" data-validation='{"alphanumeric" : true}'>
 ****************************
  */
$.validator.addMethod( "alphanumeric", function( value, element ) {
	return this.optional( element ) || /^\w+$/i.test( value );
}, "영문, 숫자, '_'만 입력 가능합니다." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 입력된 값만 입력 가능
 *
 * usage :{ "pattern": "^[a-zA-Z'.\\s]{1,40}$" }
 ************ sample ********
	<input type="text" id="target" data-validation='{ "pattern": "^[a-zA-Z'.\\s]{1,40}$" }'>
 ****************************
  */
$.validator.addMethod( "pattern", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}
	if ( typeof param === "string" ) {
		param = new RegExp( "^(?:" + param + ")$" );
	}
	return param.test( value );
}, "Invalid format." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 비교 값이 불일치
 *
 * usage :{ "notEqual": "#target"}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "notEqual": "#target"}'/>
 ****************************
  */
$.validator.addMethod( "notEqualTo", function( value, element, param ) {
	return this.optional( element ) || !$.validator.methods.equalTo.call( this, value, element, param );
}, "Please enter a different value, values must not be the same." );

/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 공백 허용 불가
 *
 * usage :{ "nowhitespace": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "nowhitespace": true}'/>
 ****************************
  */
$.validator.addMethod( "nowhitespace", function( value, element ) {
	return this.optional( element ) || /^\S+$/i.test( value );
}, "No white space please" );

/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 netmask 형식 유효성 검사
 *
 * usage :{ "netmask": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "netmask": true}'/>
 ****************************
  */
$.validator.addMethod( "netmask", function( value, element ) {
	return this.optional( element ) || /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)/i.test( value );
}, "Please enter a valid netmask." );


/**
 * 설명 : 통화(1000원단위 ','문자) 유효성 검사
 *
 * usage :{ "currency": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "currency": true}'/>
 ****************************
  */
$.validator.addMethod( "currency", function( value, element ) {

	value = value.replace(/ /ig, '');

	var isValidMoney = /^(\d{1,3}(?:,?\d{3})*(?:\.\d{2})?|\.\d{2})?$/.test(value);
		return this.optional(element) || isValidMoney;
}, "','로 구분된 정수(ex. 999,990)형태로 가능합니다." );


/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 integer 형식 유효성 검사
 *
 * usage :{ "integer": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "integer": true}'/>
 ****************************
  */
$.validator.addMethod( "integer", function( value, element ) {
	return this.optional( element ) || /^-?\d+$/.test( value );
}, "정수만 입력 가능합니다." );
// "A positive or negative non-decimal number please" );
/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 ipv4 형식 유효성 검사
 *
 * usage :{ "ipv4": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "ipv4": true}'/>
 ****************************
  */
$.validator.addMethod( "ipv4", function( value, element ) {
	return this.optional( element ) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test( value );
}, "Please enter a valid IP v4 address." );

/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 ipv6 형식 유효성 검사
 *
 * usage :{ "ipv6": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "ipv6": true}'/>
 ****************************
  */
$.validator.addMethod( "ipv6", function( value, element ) {
	return this.optional( element ) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test( value );
}, "Please enter a valid IP v6 address." );

/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 이메일 형식 유효성 검사
 *
 * usage :{ "email": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "email": true}'/>
 ****************************
  */
$.validator.addMethod( "email", function( value, element ) {
	return this.optional( element ) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( value );
}, "e-mail주소를 확인하세요." );

/**
 * 설명 : element에 값이 입력된 경우 validation대상 value에 패스워드 형식 유효성 검사
 *
 * usage :{ "password": true}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "password": true}'/>
 ****************************
  */
$.validator.addMethod( "password", function( value, element ) {
	return this.optional( element ) || /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/i.test( value );
}, "패스워드는 6~20영문대소문자(최소 1개 특수문자포함)하여 설정하세요." );



/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 비교값보다 작은 값인지 check
 *
 * usage :{ "lessThan": "#target"}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "lessThan": "#target"}'/>
 ****************************
  */
$.validator.addMethod( "lessThan", function( value, element, param ) {
	var target = $( param );

	if ( this.settings.onfocusout && target.not( ".validate-lessThan-blur" ).length ) {
		target.addClass( "validate-lessThan-blur" ).on( "blur.validate-lessThan", function() {
			$( element ).valid();
		} );
	}

	return value < target.val();
}, "비교값 보다 작은 값을 입력해주세요." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 비교값보다 작거나 같은 값인지 check
 *
 * usage :{ "lessThanEqual": "#target"}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "lessThanEqual": "#target"}'/>
 ****************************
  */
$.validator.addMethod( "lessThanEqual", function( value, element, param ) {
	var target = $( param );

	if ( this.settings.onfocusout && target.not( ".validate-lessThanEqual-blur" ).length ) {
		target.addClass( "validate-lessThanEqual-blur" ).on( "blur.validate-lessThanEqual", function() {
			$( element ).valid();
		} );
	}

	return value <= target.val();
}, "비교값 보다 작거나 같은 값을 입력해주세요." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 비교값보다 큰 값인지 check
 *
 * usage :{ "greaterThan": "#target"}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "greaterThan": "#target"}'/>
 ****************************
  */
$.validator.addMethod( "greaterThan", function( value, element, param ) {
	var target = $( param );

	if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
		target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
			$( element ).valid();
		} );
	}

	return value > target.val();
}, "비교값 보다 큰 값을 입력해주세요." );

/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 비교값보다 크거나 같은 값인지 check
 *
 * usage :{ "greaterThanEqual": "#target"}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "greaterThanEqual": "#target"}'/>
 ****************************
  */
$.validator.addMethod( "greaterThanEqual", function( value, element, param ) {
	var target = $( param );
	var result = false;

	// date
	if( param.endsWith("Ymd") ) {
		if( element.name.endsWith("Hh")) {
			var ymdObj = $('#'+element.id.replace(/Hh/, 'Ymd'));
			if( target.val() == ymdObj.val()) {
				target = $( param.replace(/Ymd/, "Hh") );

				result = value >= target.val();
			} else {
				result = true;
			}
		} else if( element.name.endsWith("Mi") ) {
			var ymdObj = $('#'+element.id.replace(/Mi/, 'Ymd'));
			if( target.val() == ymdObj.val()) {
				target = $( param.replace(/Ymd/, "Mi") );

				result = value >= target.val();
			} else {
				result = true;
			}
		} else {
			if( value ) {
				result = value >= target.val();
			} else {
				result = true;
			}
		}

	// comma
	} else if( target.val().includes(",") || value.includes(",") ) {

		var tmpTrgt = target.val().replaceAll(",", "");
		var tmpVal = value.replaceAll(",", "");

		if( parseInt(tmpTrgt) > parseInt(tmpVal) ){
			result = false;
		} else {
			result = true;
		}

	// etc
	} else {
		if( value ) {
			result =  value >= target.val();
		} else {
			result = true;
		}
	}

	if ( this.settings.onfocusout && target.not( ".validate-greaterThanEqual-blur" ).length ) {
		target.addClass( "validate-greaterThanEqual-blur" ).on( "blur.validate-greaterThanEqual", function() {
			$( element ).valid();
		} );
	}

	return result;
}, "비교값 보다 크거나 같은 값을 입력해주세요." );


// Limit the number of files in a FileList.
/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 지정된 숫자의 최대 파일 수 첨부
 *
 * usage :{ "maxfiles": number}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "maxfiles": number}'/>
 ****************************
  */
$.validator.addMethod( "maxfiles", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}

	if ( $( element ).attr( "type" ) === "file" ) {
		if ( element.files && element.files.length > param ) {
			return false;
		}
	}

	return true;
}, $.validator.format( "Please select no more than {0} files." ) );


// Limit the size of each individual file in a FileList.
/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 지정된 숫자의 최대 파일 사이즈
 *
 * usage :{ "maxsize": number}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "maxsize": number}'/>
 ****************************
  */
$.validator.addMethod( "maxsize", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}

	if ( $( element ).attr( "type" ) === "file" ) {
		if ( element.files && element.files.length ) {
			for ( var i = 0; i < element.files.length; i++ ) {
				if ( element.files[ i ].size > param ) {
					return false;
				}
			}
		}
	}

	return true;
}, $.validator.format( "File size must not exceed {0} bytes each." ) );



// Limit the size of all files in a FileList.
/**
 * 설명 : param에 해당하는 element에 값이 입력된 경우 validation대상 elements에 value값이 지정된 숫자의 최대 파일 사이즈의 total
 *
 * usage :{ "maxsizetotal": number}
 ************ sample ********
	<input type="text" id="target" data-validation='{ "maxsizetotal": number}'/>
 ****************************
  */
$.validator.addMethod( "maxsizetotal", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}

	if ( $( element ).attr( "type" ) === "file" ) {
		if ( element.files && element.files.length ) {
			var totalSize = 0;

			for ( var i = 0; i < element.files.length; i++ ) {
				totalSize += element.files[ i ].size;
				if ( totalSize > param ) {
					return false;
				}
			}
		}
	}

	return true;
}, $.validator.format( "Total size of all files must not exceed {0} bytes." ) );
