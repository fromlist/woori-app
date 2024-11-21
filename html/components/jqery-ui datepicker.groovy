jqery-ui datepicker


minDate: 0,
            changeMonth: true,
            changeYear: true,
            maxDate: varMaxDate,
            minDate: varMinDate,
            showButtonPanel: true,
            dateFormat: 'yy-mm-dd',
            numberOfMonths: [1,1],
            currentText: '�ㅻ뒛�쇱옄�좏깮',
            closeText: '�뺤씤',
            prevText: '�댁쟾 ��',
            nextText: '�ㅼ쓬 ��',
            autoclose: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dtargetayNames: ['��', '��', '��', '��', '紐�', '湲�', '��'],
            dayNamesShort: ['��', '��', '��', '��', '紐�', '湲�', '��'],
            dayNamesMin: ['��', '��', '��', '��', '紐�', '湲�', '��'],
            showMonthAfterYear: true,
            showButtonPanel: true,
            // showOtherMonths: true,
            // selectOtherMonths: true,
            beforeShowDay: function(day){
                var result;
                // �щ㎎�� ���댁꽑 �ㅼ쓬 李몄“(http://docs.jquery.com/UI/Datepicker/formatDate)
                var holiday = holidaysData[$.datepicker.formatDate("mmdd",day )];
                var thisYear = $.datepicker.formatDate("yy", day);
                //alert(varHoliday);
                // exist holiday?
                if (holiday) {
                    if(thisYear == holiday.year || holiday.year == "") {
                        if(! varHoliday == true){
                            result =  [true, "date-holiday", holiday.title];
                        } else {
                            result =  [false, "date-holiday", holiday.title];
                        }
                    }
                }

                if(!result) {
                    switch (day.getDay()) {
                        case 0:
                            if(! varHoliday == true){
                                result = [true, 'date' + day.getDate() + ' date-sunday'];
                            } else {
                                result = [false, 'date' + day.getDate() + ' date-sunday'];
                            }
                            break;
                        case 6:
                            if(! varHoliday == true){
                                result = [true, 'date' + day.getDate() + ' date-saturday'];
                            } else {
                                result = [false, 'date' + day.getDate() + ' date-saturday'];
                            }
                            break;
                        default:
                            result = [true, 'date' + day.getDate()];
                            break;
                    }
                }

                return result;
            },