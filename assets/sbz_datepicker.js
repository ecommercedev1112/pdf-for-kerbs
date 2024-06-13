!function(t,e,s){var i,a,n,h,r,o,c,d;h="datepicker",r=!1,o={classes:"",inline:!1,language:"ru",startDate:new Date,firstDay:"",weekends:[6,0],dateFormat:"",altField:"",altFieldDateFormat:"@",toggleSelected:!0,keyboardNav:!0,position:"bottom left",offset:12,view:"days",minView:"days",showOtherMonths:!0,selectOtherMonths:!0,moveToOtherMonthsOnSelect:!0,showOtherYears:!0,selectOtherYears:!0,moveToOtherYearsOnSelect:!0,minDate:"",maxDate:"",disableNavWhenOutOfRange:!0,multipleDates:!1,multipleDatesSeparator:",",range:!1,todayButton:!1,clearButton:!1,showEvent:"focus",autoClose:!1,monthsField:"monthsShort",prevHtml:'<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',nextHtml:'<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',prevText:"Prev",nextText:"Next",navTitles:{days:"MM, <i>yyyy</i>",months:"yyyy",years:"yyyy1 - yyyy2"},timepicker:!1,onlyTimepicker:!1,dateTimeSeparator:" ",timeFormat:"",minHours:0,maxHours:24,minMinutes:0,maxMinutes:59,hoursStep:1,minutesStep:1,onSelect:"",onShow:"",onHide:"",onChangeMonth:"",onChangeYear:"",onChangeDecade:"",onChangeView:"",onRenderCell:""},c={ctrlRight:[17,39],ctrlUp:[17,38],ctrlLeft:[17,37],ctrlDown:[17,40],shiftRight:[16,39],shiftUp:[16,38],shiftLeft:[16,37],shiftDown:[16,40],altUp:[18,38],altRight:[18,39],altLeft:[18,37],altDown:[18,40],ctrlShiftUp:[16,17,38]},(n=d=function(t,a){this.el=t,this.csJqel=e(t),this.opts=e.extend(!0,{},o,a,this.csJqel.data()),i==s&&(i=e("body")),this.opts.startDate||(this.opts.startDate=new Date),"INPUT"==this.el.nodeName&&(this.elIsInput=!0),this.opts.altField&&(this.csJqaltField="string"==typeof this.opts.altField?e(this.opts.altField):this.opts.altField),this.inited=!1,this.visible=!1,this.silent=!1,this.currentDate=this.opts.startDate,this.currentView=this.opts.view,this._createShortCuts(),this.selectedDates=[],this.views={},this.keys=[],this.minRange="",this.maxRange="",this._prevOnSelectValue="",this.init()}).prototype={VERSION:"2.2.3",viewIndexes:["days","months","years"],init:function(){r||this.opts.inline||!this.elIsInput||this._buildDatepickersContainer(),this._buildBaseHtml(),this._defineLocale(this.opts.language),this._syncWithMinMaxDates(),this.elIsInput&&(this.opts.inline||(this._setPositionClasses(this.opts.position),this._bindEvents()),this.opts.keyboardNav&&!this.opts.onlyTimepicker&&this._bindKeyboardEvents(),this.csJqdatepicker.on("mousedown",this._onMouseDownDatepicker.bind(this)),this.csJqdatepicker.on("mouseup",this._onMouseUpDatepicker.bind(this))),this.opts.classes&&this.csJqdatepicker.addClass(this.opts.classes),this.opts.timepicker&&(this.timepicker=new e.fn.datepicker.Timepicker(this,this.opts),this._bindTimepickerEvents()),this.opts.onlyTimepicker&&this.csJqdatepicker.addClass("-only-timepicker-"),this.views[this.currentView]=new e.fn.datepicker.Body(this,this.currentView,this.opts),this.views[this.currentView].show(),this.nav=new e.fn.datepicker.Navigation(this,this.opts),this.view=this.currentView,this.csJqel.on("clickCell.adp",this._onClickCell.bind(this)),this.csJqdatepicker.on("mouseenter",".datepicker--cell",this._onMouseEnterCell.bind(this)),this.csJqdatepicker.on("mouseleave",".datepicker--cell",this._onMouseLeaveCell.bind(this)),this.inited=!0},_createShortCuts:function(){this.minDate=this.opts.minDate?this.opts.minDate:new Date(-86399999136e5),this.maxDate=this.opts.maxDate?this.opts.maxDate:new Date(86399999136e5)},_bindEvents:function(){this.csJqel.on(this.opts.showEvent+".adp",this._onShowEvent.bind(this)),this.csJqel.on("mouseup.adp",this._onMouseUpEl.bind(this)),this.csJqel.on("blur.adp",this._onBlur.bind(this)),this.csJqel.on("keyup.adp",this._onKeyUpGeneral.bind(this)),e(t).on("resize.adp",this._onResize.bind(this)),e("body").on("mouseup.adp",this._onMouseUpBody.bind(this))},_bindKeyboardEvents:function(){this.csJqel.on("keydown.adp",this._onKeyDown.bind(this)),this.csJqel.on("keyup.adp",this._onKeyUp.bind(this)),this.csJqel.on("hotKey.adp",this._onHotKey.bind(this))},_bindTimepickerEvents:function(){this.csJqel.on("timeChange.adp",this._onTimeChange.bind(this))},isWeekend:function(t){return-1!==this.opts.weekends.indexOf(t)},_defineLocale:function(t){"string"==typeof t?(this.loc=e.fn.datepicker.language[t],this.loc||(console.warn("Can't find language \""+t+'" in Datepicker.language, will use "ru" instead'),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru)),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,e.fn.datepicker.language[t])):this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,t),this.opts.dateFormat&&(this.loc.dateFormat=this.opts.dateFormat),this.opts.timeFormat&&(this.loc.timeFormat=this.opts.timeFormat),""!==this.opts.firstDay&&(this.loc.firstDay=this.opts.firstDay),this.opts.timepicker&&(this.loc.dateFormat=[this.loc.dateFormat,this.loc.timeFormat].join(this.opts.dateTimeSeparator)),this.opts.onlyTimepicker&&(this.loc.dateFormat=this.loc.timeFormat);var s=this._getWordBoundaryRegExp;(this.loc.timeFormat.match(s("aa"))||this.loc.timeFormat.match(s("AA")))&&(this.ampm=!0)},_buildDatepickersContainer:function(){r=!0,i.append('<div class="datepickers-container" id="datepickers-container"></div>'),a=e("#datepickers-container")},_buildBaseHtml:function(){var t,s=e('<div class="datepicker-inline">');t="INPUT"==this.el.nodeName?this.opts.inline?s.insertAfter(this.csJqel):a:s.appendTo(this.csJqel),this.csJqdatepicker=e('<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>').appendTo(t),this.csJqcontent=e(".datepicker--content",this.csJqdatepicker),this.csJqnav=e(".datepicker--nav",this.csJqdatepicker)},_triggerOnChange:function(){if(!this.selectedDates.length){if(""===this._prevOnSelectValue)return;return this._prevOnSelectValue="",this.opts.onSelect("","",this)}var t,e=this.selectedDates,s=n.getParsedDate(e[0]),i=this,a=new Date(s.year,s.month,s.date,s.hours,s.minutes);t=e.map((function(t){return i.formatDate(i.loc.dateFormat,t)})).join(this.opts.multipleDatesSeparator),(this.opts.multipleDates||this.opts.range)&&(a=e.map((function(t){var e=n.getParsedDate(t);return new Date(e.year,e.month,e.date,e.hours,e.minutes)}))),this._prevOnSelectValue=t,this.opts.onSelect(t,a,this)},next:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month+1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year+1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year+10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},prev:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month-1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year-1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year-10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},formatDate:function(t,e){e=e||this.date;var s,i=t,a=this._getWordBoundaryRegExp,h=this.loc,r=n.getLeadingZeroNum,o=n.getDecade(e),c=n.getParsedDate(e),d=c.fullHours,l=c.hours,u=t.match(a("aa"))||t.match(a("AA")),m="am",p=this._replacer;switch(this.opts.timepicker&&this.timepicker&&u&&(d=r((s=this.timepicker._getValidHoursFromDate(e,u)).hours),l=s.hours,m=s.dayPeriod),!0){case/@/.test(i):i=i.replace(/@/,e.getTime());case/aa/.test(i):i=p(i,a("aa"),m);case/AA/.test(i):i=p(i,a("AA"),m.toUpperCase());case/dd/.test(i):i=p(i,a("dd"),c.fullDate);case/d/.test(i):i=p(i,a("d"),c.date);case/DD/.test(i):i=p(i,a("DD"),h.days[c.day]);case/D/.test(i):i=p(i,a("D"),h.daysShort[c.day]);case/mm/.test(i):i=p(i,a("mm"),c.fullMonth);case/m/.test(i):i=p(i,a("m"),c.month+1);case/MM/.test(i):i=p(i,a("MM"),this.loc.months[c.month]);case/M/.test(i):i=p(i,a("M"),h.monthsShort[c.month]);case/ii/.test(i):i=p(i,a("ii"),c.fullMinutes);case/i/.test(i):i=p(i,a("i"),c.minutes);case/hh/.test(i):i=p(i,a("hh"),d);case/h/.test(i):i=p(i,a("h"),l);case/yyyy/.test(i):i=p(i,a("yyyy"),c.year);case/yyyy1/.test(i):i=p(i,a("yyyy1"),o[0]);case/yyyy2/.test(i):i=p(i,a("yyyy2"),o[1]);case/yy/.test(i):i=p(i,a("yy"),c.year.toString().slice(-2))}return i},_replacer:function(t,e,s){return t.replace(e,(function(t,e,i,a){return e+s+a}))},_getWordBoundaryRegExp:function(t){var e="\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|"+e+")("+t+")($|<|"+e+")","g")},selectDate:function(t){var e=this,s=e.opts,i=e.parsedDate,a=e.selectedDates.length,h="";if(Array.isArray(t))t.forEach((function(t){e.selectDate(t)}));else if(t instanceof Date){if(this.lastSelectedDate=t,this.timepicker&&this.timepicker._setTime(t),e._trigger("selectDate",t),this.timepicker&&(t.setHours(this.timepicker.hours),t.setMinutes(this.timepicker.minutes)),"days"==e.view&&t.getMonth()!=i.month&&s.moveToOtherMonthsOnSelect&&(h=new Date(t.getFullYear(),t.getMonth(),1)),"years"==e.view&&t.getFullYear()!=i.year&&s.moveToOtherYearsOnSelect&&(h=new Date(t.getFullYear(),0,1)),h&&(e.silent=!0,e.date=h,e.silent=!1,e.nav._render()),s.multipleDates&&!s.range){if(a===s.multipleDates)return;e._isSelected(t)||e.selectedDates.push(t)}else s.range?2==a?(e.selectedDates=[t],e.minRange=t,e.maxRange=""):1==a?(e.selectedDates.push(t),e.maxRange?e.minRange=t:e.maxRange=t,n.bigger(e.maxRange,e.minRange)&&(e.maxRange=e.minRange,e.minRange=t),e.selectedDates=[e.minRange,e.maxRange]):(e.selectedDates=[t],e.minRange=t):e.selectedDates=[t];e._setInputValue(),s.onSelect&&e._triggerOnChange(),s.autoClose&&!this.timepickerIsActive&&(s.multipleDates||s.range?s.range&&2==e.selectedDates.length&&e.hide():e.hide()),e.views[this.currentView]._render()}},removeDate:function(t){var e=this.selectedDates,s=this;if(t instanceof Date)return e.some((function(i,a){if(n.isSame(i,t))return e.splice(a,1),s.selectedDates.length?s.lastSelectedDate=s.selectedDates[s.selectedDates.length-1]:(s.minRange="",s.maxRange="",s.lastSelectedDate=""),s.views[s.currentView]._render(),s._setInputValue(),s.opts.onSelect&&s._triggerOnChange(),!0}))},today:function(){this.silent=!0,this.view=this.opts.minView,this.silent=!1,this.date=new Date,this.opts.todayButton instanceof Date&&this.selectDate(this.opts.todayButton)},clear:function(){this.selectedDates=[],this.minRange="",this.maxRange="",this.views[this.currentView]._render(),this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()},update:function(t,s){var i=arguments.length,a=this.lastSelectedDate;return 2==i?this.opts[t]=s:1==i&&"object"==typeof t&&(this.opts=e.extend(!0,this.opts,t)),this._createShortCuts(),this._syncWithMinMaxDates(),this._defineLocale(this.opts.language),this.nav._addButtonsIfNeed(),this.opts.onlyTimepicker||this.nav._render(),this.views[this.currentView]._render(),this.elIsInput&&!this.opts.inline&&(this._setPositionClasses(this.opts.position),this.visible&&this.setPosition(this.opts.position)),this.opts.classes&&this.csJqdatepicker.addClass(this.opts.classes),this.opts.onlyTimepicker&&this.csJqdatepicker.addClass("-only-timepicker-"),this.opts.timepicker&&(a&&this.timepicker._handleDate(a),this.timepicker._updateRanges(),this.timepicker._updateCurrentTime(),a&&(a.setHours(this.timepicker.hours),a.setMinutes(this.timepicker.minutes))),this._setInputValue(),this},_syncWithMinMaxDates:function(){var t=this.date.getTime();this.silent=!0,this.minTime>t&&(this.date=this.minDate),this.maxTime<t&&(this.date=this.maxDate),this.silent=!1},_isSelected:function(t,e){var s=!1;return this.selectedDates.some((function(i){if(n.isSame(i,t,e))return s=i,!0})),s},_setInputValue:function(){var t,e=this,s=e.opts,i=e.loc.dateFormat,a=s.altFieldDateFormat,n=e.selectedDates.map((function(t){return e.formatDate(i,t)}));s.altField&&e.csJqaltField.length&&(t=(t=this.selectedDates.map((function(t){return e.formatDate(a,t)}))).join(this.opts.multipleDatesSeparator),this.csJqaltField.val(t)),n=n.join(this.opts.multipleDatesSeparator),this.csJqel.val(n)},_isInRange:function(t,e){var s=t.getTime(),i=n.getParsedDate(t),a=n.getParsedDate(this.minDate),h=n.getParsedDate(this.maxDate),r=new Date(i.year,i.month,a.date).getTime(),o=new Date(i.year,i.month,h.date).getTime(),c={day:s>=this.minTime&&s<=this.maxTime,month:r>=this.minTime&&o<=this.maxTime,year:i.year>=a.year&&i.year<=h.year};return e?c[e]:c.day},_getDimensions:function(t){var e=t.offset();return{width:t.outerWidth(),height:t.outerHeight(),left:e.left,top:e.top}},_getDateFromCell:function(t){var e=this.parsedDate,i=t.data("year")||e.year,a=t.data("month")==s?e.month:t.data("month"),n=t.data("date")||1;return new Date(i,a,n)},_setPositionClasses:function(t){var e=(t=t.split(" "))[0],s="datepicker -"+e+"-"+t[1]+"- -from-"+e+"-";this.visible&&(s+=" active"),this.csJqdatepicker.removeAttr("class").addClass(s)},setPosition:function(t){t=t||this.opts.position;var e,s,i=this._getDimensions(this.csJqel),a=this._getDimensions(this.csJqdatepicker),n=t.split(" "),h=this.opts.offset,r=n[0],o=n[1];switch(r){case"top":e=i.top-a.height-h;break;case"right":s=i.left+i.width+h;break;case"bottom":e=i.top+i.height+h;break;case"left":s=i.left-a.width-h}switch(o){case"top":e=i.top;break;case"right":s=i.left+i.width-a.width;break;case"bottom":e=i.top+i.height-a.height;break;case"left":s=i.left;break;case"center":/left|right/.test(r)?e=i.top+i.height/2-a.height/2:s=i.left+i.width/2-a.width/2}this.csJqdatepicker.css({left:s,top:e})},show:function(){var t=this.opts.onShow;this.setPosition(this.opts.position),this.csJqdatepicker.addClass("active"),this.visible=!0,t&&this._bindVisionEvents(t)},hide:function(){var t=this.opts.onHide;this.csJqdatepicker.removeClass("active").css({left:"-100000px"}),this.focused="",this.keys=[],this.inFocus=!1,this.visible=!1,this.csJqel.blur(),t&&this._bindVisionEvents(t)},down:function(t){this._changeView(t,"down")},up:function(t){this._changeView(t,"up")},_bindVisionEvents:function(t){this.csJqdatepicker.off("transitionend.dp"),t(this,!1),this.csJqdatepicker.one("transitionend.dp",t.bind(this,this,!0))},_changeView:function(t,e){t=t||this.focused||this.date;var s="up"==e?this.viewIndex+1:this.viewIndex-1;s>2&&(s=2),s<0&&(s=0),this.silent=!0,this.date=new Date(t.getFullYear(),t.getMonth(),1),this.silent=!1,this.view=this.viewIndexes[s]},_handleHotKey:function(t){var e,s,i,a=n.getParsedDate(this._getFocusedDate()),h=this.opts,r=!1,o=!1,c=!1,d=a.year,l=a.month,u=a.date;switch(t){case"ctrlRight":case"ctrlUp":l+=1,r=!0;break;case"ctrlLeft":case"ctrlDown":l-=1,r=!0;break;case"shiftRight":case"shiftUp":o=!0,d+=1;break;case"shiftLeft":case"shiftDown":o=!0,d-=1;break;case"altRight":case"altUp":c=!0,d+=10;break;case"altLeft":case"altDown":c=!0,d-=10;break;case"ctrlShiftUp":this.up()}i=n.getDaysCount(new Date(d,l)),s=new Date(d,l,u),i<u&&(u=i),s.getTime()<this.minTime?s=this.minDate:s.getTime()>this.maxTime&&(s=this.maxDate),this.focused=s,e=n.getParsedDate(s),r&&h.onChangeMonth&&h.onChangeMonth(e.month,e.year),o&&h.onChangeYear&&h.onChangeYear(e.year),c&&h.onChangeDecade&&h.onChangeDecade(this.curDecade)},_registerKey:function(t){this.keys.some((function(e){return e==t}))||this.keys.push(t)},_unRegisterKey:function(t){var e=this.keys.indexOf(t);this.keys.splice(e,1)},_isHotKeyPressed:function(){var t,e=!1,s=this.keys.sort();for(var i in c)t=c[i],s.length==t.length&&t.every((function(t,e){return t==s[e]}))&&(this._trigger("hotKey",i),e=!0);return e},_trigger:function(t,e){this.csJqel.trigger(t,e)},_focusNextCell:function(t,e){e=e||this.cellType;var s=n.getParsedDate(this._getFocusedDate()),i=s.year,a=s.month,h=s.date;if(!this._isHotKeyPressed()){switch(t){case 37:"day"==e&&(h-=1),"month"==e&&(a-=1),"year"==e&&(i-=1);break;case 38:"day"==e&&(h-=7),"month"==e&&(a-=3),"year"==e&&(i-=4);break;case 39:"day"==e&&(h+=1),"month"==e&&(a+=1),"year"==e&&(i+=1);break;case 40:"day"==e&&(h+=7),"month"==e&&(a+=3),"year"==e&&(i+=4)}var r=new Date(i,a,h);r.getTime()<this.minTime?r=this.minDate:r.getTime()>this.maxTime&&(r=this.maxDate),this.focused=r}},_getFocusedDate:function(){var t=this.focused||this.selectedDates[this.selectedDates.length-1],e=this.parsedDate;if(!t)switch(this.view){case"days":t=new Date(e.year,e.month,(new Date).getDate());break;case"months":t=new Date(e.year,e.month,1);break;case"years":t=new Date(e.year,0,1)}return t},_getCell:function(t,s){s=s||this.cellType;var i,a=n.getParsedDate(t),h='.datepicker--cell[data-year="'+a.year+'"]';switch(s){case"month":h='[data-month="'+a.month+'"]';break;case"day":h+='[data-month="'+a.month+'"][data-date="'+a.date+'"]'}return(i=this.views[this.currentView].csJqel.find(h)).length?i:e("")},destroy:function(){var t=this;t.csJqel.off(".adp").data("datepicker",""),t.selectedDates=[],t.focused="",t.views={},t.keys=[],t.minRange="",t.maxRange="",t.opts.inline||!t.elIsInput?t.csJqdatepicker.closest(".datepicker-inline").remove():t.csJqdatepicker.remove()},_handleAlreadySelectedDates:function(t,e){this.opts.range?this.opts.toggleSelected?this.removeDate(e):2!=this.selectedDates.length&&this._trigger("clickCell",e):this.opts.toggleSelected&&this.removeDate(e),this.opts.toggleSelected||(this.lastSelectedDate=t,this.opts.timepicker&&(this.timepicker._setTime(t),this.timepicker.update()))},_onShowEvent:function(t){this.visible||this.show()},_onBlur:function(){!this.inFocus&&this.visible&&this.hide()},_onMouseDownDatepicker:function(t){this.inFocus=!0},_onMouseUpDatepicker:function(t){this.inFocus=!1,t.originalEvent.inFocus=!0,t.originalEvent.timepickerFocus||this.csJqel.focus()},_onKeyUpGeneral:function(t){this.csJqel.val()||this.clear()},_onResize:function(){this.visible&&this.setPosition()},_onMouseUpBody:function(t){t.originalEvent.inFocus||this.visible&&!this.inFocus&&this.hide()},_onMouseUpEl:function(t){t.originalEvent.inFocus=!0,setTimeout(this._onKeyUpGeneral.bind(this),4)},_onKeyDown:function(t){var e=t.which;if(this._registerKey(e),e>=37&&e<=40&&(t.preventDefault(),this._focusNextCell(e)),13==e&&this.focused){if(this._getCell(this.focused).hasClass("-disabled-"))return;if(this.view!=this.opts.minView)this.down();else{var s=this._isSelected(this.focused,this.cellType);if(!s)return this.timepicker&&(this.focused.setHours(this.timepicker.hours),this.focused.setMinutes(this.timepicker.minutes)),void this.selectDate(this.focused);this._handleAlreadySelectedDates(s,this.focused)}}27==e&&this.hide()},_onKeyUp:function(t){var e=t.which;this._unRegisterKey(e)},_onHotKey:function(t,e){this._handleHotKey(e)},_onMouseEnterCell:function(t){var s=e(t.target).closest(".datepicker--cell"),i=this._getDateFromCell(s);this.silent=!0,this.focused&&(this.focused=""),s.addClass("-focus-"),this.focused=i,this.silent=!1,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this.focused)&&(this.maxRange=this.minRange,this.minRange=""),this.views[this.currentView]._update())},_onMouseLeaveCell:function(t){e(t.target).closest(".datepicker--cell").removeClass("-focus-"),this.silent=!0,this.focused="",this.silent=!1},_onTimeChange:function(t,e,s){var i=new Date,a=!1;this.selectedDates.length&&(a=!0,i=this.lastSelectedDate),i.setHours(e),i.setMinutes(s),a||this._getCell(i).hasClass("-disabled-")?(this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()):this.selectDate(i)},_onClickCell:function(t,e){this.timepicker&&(e.setHours(this.timepicker.hours),e.setMinutes(this.timepicker.minutes)),this.selectDate(e)},set focused(t){if(!t&&this.focused){var e=this._getCell(this.focused);e.length&&e.removeClass("-focus-")}this._focused=t,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this._focused)&&(this.maxRange=this.minRange,this.minRange="")),this.silent||(this.date=t)},get focused(){return this._focused},get parsedDate(){return n.getParsedDate(this.date)},set date(t){if(t instanceof Date)return this.currentDate=t,this.inited&&!this.silent&&(this.views[this.view]._render(),this.nav._render(),this.visible&&this.elIsInput&&this.setPosition()),t},get date(){return this.currentDate},set view(t){if(this.viewIndex=this.viewIndexes.indexOf(t),!(this.viewIndex<0))return this.prevView=this.currentView,this.currentView=t,this.inited&&(this.views[t]?this.views[t]._render():this.views[t]=new e.fn.datepicker.Body(this,t,this.opts),this.views[this.prevView].hide(),this.views[t].show(),this.nav._render(),this.opts.onChangeView&&this.opts.onChangeView(t),this.elIsInput&&this.visible&&this.setPosition()),t},get view(){return this.currentView},get cellType(){return this.view.substring(0,this.view.length-1)},get minTime(){var t=n.getParsedDate(this.minDate);return new Date(t.year,t.month,t.date).getTime()},get maxTime(){var t=n.getParsedDate(this.maxDate);return new Date(t.year,t.month,t.date).getTime()},get curDecade(){return n.getDecade(this.date)}},n.getDaysCount=function(t){return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},n.getParsedDate=function(t){return{year:t.getFullYear(),month:t.getMonth(),fullMonth:t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,date:t.getDate(),fullDate:t.getDate()<10?"0"+t.getDate():t.getDate(),day:t.getDay(),hours:t.getHours(),fullHours:t.getHours()<10?"0"+t.getHours():t.getHours(),minutes:t.getMinutes(),fullMinutes:t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes()}},n.getDecade=function(t){var e=10*Math.floor(t.getFullYear()/10);return[e,e+9]},n.template=function(t,e){return t.replace(/#\{([\w]+)\}/g,(function(t,s){if(e[s]||0===e[s])return e[s]}))},n.isSame=function(t,e,s){if(!t||!e)return!1;var i=n.getParsedDate(t),a=n.getParsedDate(e),h=s||"day";return{day:i.date==a.date&&i.month==a.month&&i.year==a.year,month:i.month==a.month&&i.year==a.year,year:i.year==a.year}[h]},n.less=function(t,e,s){return!(!t||!e)&&e.getTime()<t.getTime()},n.bigger=function(t,e,s){return!(!t||!e)&&e.getTime()>t.getTime()},n.getLeadingZeroNum=function(t){return parseInt(t)<10?"0"+t:t},n.resetTime=function(t){if("object"==typeof t)return t=n.getParsedDate(t),new Date(t.year,t.month,t.date)},e.fn.datepicker=function(t){return this.each((function(){if(e.data(this,h)){var s=e.data(this,h);s.opts=e.extend(!0,s.opts,t),s.update()}else e.data(this,h,new d(this,t))}))},e.fn.datepicker.Constructor=d,e.fn.datepicker.language={ru:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.mm.yyyy",timeFormat:"hh:ii",firstDay:1}},e((function(){e(".datepicker-here").datepicker()})),function(){var t={days:'<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',months:'<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',years:'<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'},i=e.fn.datepicker,a=i.Constructor;i.Body=function(t,s,i){this.d=t,this.type=s,this.opts=i,this.csJqel=e(""),this.opts.onlyTimepicker||this.init()},i.Body.prototype={init:function(){this._buildBaseHtml(),this._render(),this._bindEvents()},_bindEvents:function(){this.csJqel.on("click",".datepicker--cell",e.proxy(this._onClickCell,this))},_buildBaseHtml:function(){this.csJqel=e(t[this.type]).appendTo(this.d.csJqcontent),this.csJqnames=e(".datepicker--days-names",this.csJqel),this.csJqcells=e(".datepicker--cells",this.csJqel)},_getDayNamesHtml:function(t,e,i,a){return i=i||"",(a=a!=s?a:0)>7?i:7==(e=e!=s?e:t)?this._getDayNamesHtml(t,0,i,++a):(i+='<div class="datepicker--day-name'+(this.d.isWeekend(e)?" -weekend-":"")+'">'+this.d.loc.daysMin[e]+"</div>",this._getDayNamesHtml(t,++e,i,++a))},_getCellContents:function(t,e){var s="datepicker--cell datepicker--cell-"+e,i=new Date,n=this.d,h=a.resetTime(n.minRange),r=a.resetTime(n.maxRange),o=n.opts,c=a.getParsedDate(t),d={},l=c.date;switch(e){case"day":n.isWeekend(c.day)&&(s+=" -weekend-"),c.month!=this.d.parsedDate.month&&(s+=" -other-month-",o.selectOtherMonths||(s+=" -disabled-"),o.showOtherMonths||(l=""));break;case"month":l=n.loc[n.opts.monthsField][c.month];break;case"year":var u=n.curDecade;l=c.year,(c.year<u[0]||c.year>u[1])&&(s+=" -other-decade-",o.selectOtherYears||(s+=" -disabled-"),o.showOtherYears||(l=""))}return o.onRenderCell&&(l=(d=o.onRenderCell(t,e)||{}).html?d.html:l,s+=d.classes?" "+d.classes:""),o.range&&(a.isSame(h,t,e)&&(s+=" -range-from-"),a.isSame(r,t,e)&&(s+=" -range-to-"),1==n.selectedDates.length&&n.focused?((a.bigger(h,t)&&a.less(n.focused,t)||a.less(r,t)&&a.bigger(n.focused,t))&&(s+=" -in-range-"),a.less(r,t)&&a.isSame(n.focused,t)&&(s+=" -range-from-"),a.bigger(h,t)&&a.isSame(n.focused,t)&&(s+=" -range-to-")):2==n.selectedDates.length&&a.bigger(h,t)&&a.less(r,t)&&(s+=" -in-range-")),a.isSame(i,t,e)&&(s+=" -current-"),n.focused&&a.isSame(t,n.focused,e)&&(s+=" -focus-"),n._isSelected(t,e)&&(s+=" -selected-"),n._isInRange(t,e)&&!d.disabled||(s+=" -disabled-"),{html:l,classes:s}},_getDaysHtml:function(t){for(var e,s,i=a.getDaysCount(t),n=new Date(t.getFullYear(),t.getMonth(),1).getDay(),h=new Date(t.getFullYear(),t.getMonth(),i).getDay(),r=n-this.d.loc.firstDay,o=6-h+this.d.loc.firstDay,c="",d=1-(r=r<0?r+7:r),l=i+(o=o>6?o-7:o);d<=l;d++)s=t.getFullYear(),e=t.getMonth(),c+=this._getDayHtml(new Date(s,e,d));return c},_getDayHtml:function(t){var e=this._getCellContents(t,"day");return'<div class="'+e.classes+'" data-date="'+t.getDate()+'" data-month="'+t.getMonth()+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_getMonthsHtml:function(t){for(var e="",s=a.getParsedDate(t),i=0;i<12;)e+=this._getMonthHtml(new Date(s.year,i)),i++;return e},_getMonthHtml:function(t){var e=this._getCellContents(t,"month");return'<div class="'+e.classes+'" data-month="'+t.getMonth()+'">'+e.html+"</div>"},_getYearsHtml:function(t){a.getParsedDate(t);for(var e=a.getDecade(t),s="",i=e[0]-1;i<=e[1]+1;i++)s+=this._getYearHtml(new Date(i,0));return s},_getYearHtml:function(t){var e=this._getCellContents(t,"year");return'<div class="'+e.classes+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_renderTypes:{days:function(){var t=this._getDayNamesHtml(this.d.loc.firstDay),e=this._getDaysHtml(this.d.currentDate);this.csJqcells.html(e),this.csJqnames.html(t)},months:function(){var t=this._getMonthsHtml(this.d.currentDate);this.csJqcells.html(t)},years:function(){var t=this._getYearsHtml(this.d.currentDate);this.csJqcells.html(t)}},_render:function(){this.opts.onlyTimepicker||this._renderTypes[this.type].bind(this)()},_update:function(){var t,s,i,a=e(".datepicker--cell",this.csJqcells),n=this;a.each((function(a,h){s=e(this),i=n.d._getDateFromCell(e(this)),t=n._getCellContents(i,n.d.cellType),s.attr("class",t.classes)}))},show:function(){this.opts.onlyTimepicker||(this.csJqel.addClass("active"),this.acitve=!0)},hide:function(){this.csJqel.removeClass("active"),this.active=!1},_handleClick:function(t){var e=t.data("date")||1,s=t.data("month")||0,i=t.data("year")||this.d.parsedDate.year,a=this.d;if(a.view==this.opts.minView){var n=new Date(i,s,e),h=this.d._isSelected(n,this.d.cellType);h?a._handleAlreadySelectedDates.bind(a,h,n)():a._trigger("clickCell",n)}else a.down(new Date(i,s,e))},_onClickCell:function(t){var s=e(t.target).closest(".datepicker--cell");s.hasClass("-disabled-")||this._handleClick.bind(this)(s)}}}(),function(){var t=e.fn.datepicker,s=t.Constructor;t.Navigation=function(t,e){this.d=t,this.opts=e,this.csJqbuttonsContainer="",this.init()},t.Navigation.prototype={init:function(){this._buildBaseHtml(),this._bindEvents()},_bindEvents:function(){this.d.csJqnav.on("click",".datepicker--nav-action",e.proxy(this._onClickNavButton,this)),this.d.csJqnav.on("click",".datepicker--nav-title",e.proxy(this._onClickNavTitle,this)),this.d.csJqdatepicker.on("click",".datepicker--button",e.proxy(this._onClickNavButton,this))},_buildBaseHtml:function(){this.opts.onlyTimepicker||this._render(),this._addButtonsIfNeed()},_addButtonsIfNeed:function(){this.opts.todayButton&&this._addButton("today"),this.opts.clearButton&&this._addButton("clear")},_render:function(){var t=this._getTitle(this.d.currentDate),i=s.template('<div class="datepicker--nav-action" data-action="prev" title="#{prevText}">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next" title="#{nextText}">#{nextHtml}</div>',e.extend({title:t},this.opts));this.d.csJqnav.html(i),"years"==this.d.view&&e(".datepicker--nav-title",this.d.csJqnav).addClass("-disabled-"),this.setNavStatus()},_getTitle:function(t){return this.d.formatDate(this.opts.navTitles[this.d.view],t)},_addButton:function(t){this.csJqbuttonsContainer.length||this._addButtonsContainer();var i={action:t,label:this.d.loc[t]},a=s.template('<span class="datepicker--button" data-action="#{action}">#{label}</span>',i);e("[data-action="+t+"]",this.csJqbuttonsContainer).length||this.csJqbuttonsContainer.append(a)},_addButtonsContainer:function(){this.d.csJqdatepicker.append('<div class="datepicker--buttons"></div>'),this.csJqbuttonsContainer=e(".datepicker--buttons",this.d.csJqdatepicker)},setNavStatus:function(){if((this.opts.minDate||this.opts.maxDate)&&this.opts.disableNavWhenOutOfRange){var t=this.d.parsedDate,e=t.month,i=t.year,a=t.date;switch(this.d.view){case"days":this.d._isInRange(new Date(i,e-1,1),"month")||this._disableNav("prev"),this.d._isInRange(new Date(i,e+1,1),"month")||this._disableNav("next");break;case"months":this.d._isInRange(new Date(i-1,e,a),"year")||this._disableNav("prev"),this.d._isInRange(new Date(i+1,e,a),"year")||this._disableNav("next");break;case"years":var n=s.getDecade(this.d.date);this.d._isInRange(new Date(n[0]-1,0,1),"year")||this._disableNav("prev"),this.d._isInRange(new Date(n[1]+1,0,1),"year")||this._disableNav("next")}}},_disableNav:function(t){e('[data-action="'+t+'"]',this.d.csJqnav).addClass("-disabled-")},_activateNav:function(t){e('[data-action="'+t+'"]',this.d.csJqnav).removeClass("-disabled-")},_onClickNavButton:function(t){var s=e(t.target).closest("[data-action]").data("action");this.d[s]()},_onClickNavTitle:function(t){if(!e(t.target).hasClass("-disabled-"))return"days"==this.d.view?this.d.view="months":void(this.d.view="years")}}}(),function(){var t=e.fn.datepicker,s=t.Constructor;t.Timepicker=function(t,e){this.d=t,this.opts=e,this.init()},t.Timepicker.prototype={init:function(){var t="input";this._setTime(this.d.date),this._buildHTML(),navigator.userAgent.match(/trident/gi)&&(t="change"),this.d.csJqel.on("selectDate",this._onSelectDate.bind(this)),this.csJqranges.on(t,this._onChangeRange.bind(this)),this.csJqranges.on("mouseup",this._onMouseUpRange.bind(this)),this.csJqranges.on("mousemove focus ",this._onMouseEnterRange.bind(this)),this.csJqranges.on("mouseout blur",this._onMouseOutRange.bind(this))},_setTime:function(t){var e=s.getParsedDate(t);this._handleDate(t),this.hours=e.hours<this.minHours?this.minHours:e.hours,this.minutes=e.minutes<this.minMinutes?this.minMinutes:e.minutes},_setMinTimeFromDate:function(t){this.minHours=t.getHours(),this.minMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()>t.getHours()&&(this.minMinutes=this.opts.minMinutes)},_setMaxTimeFromDate:function(t){this.maxHours=t.getHours(),this.maxMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()<t.getHours()&&(this.maxMinutes=this.opts.maxMinutes)},_setDefaultMinMaxTime:function(){var t=this.opts;this.minHours=t.minHours<0||t.minHours>23?0:t.minHours,this.minMinutes=t.minMinutes<0||t.minMinutes>59?0:t.minMinutes,this.maxHours=t.maxHours<0||t.maxHours>23?23:t.maxHours,this.maxMinutes=t.maxMinutes<0||t.maxMinutes>59?59:t.maxMinutes},_validateHoursMinutes:function(t){this.hours<this.minHours?this.hours=this.minHours:this.hours>this.maxHours&&(this.hours=this.maxHours),this.minutes<this.minMinutes?this.minutes=this.minMinutes:this.minutes>this.maxMinutes&&(this.minutes=this.maxMinutes)},_buildHTML:function(){var t=s.getLeadingZeroNum,i={hourMin:this.minHours,hourMax:t(this.maxHours),hourStep:this.opts.hoursStep,hourValue:this.hours,hourVisible:t(this.displayHours),minMin:this.minMinutes,minMax:t(this.maxMinutes),minStep:this.opts.minutesStep,minValue:t(this.minutes)},a=s.template('<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',i);this.csJqtimepicker=e(a).appendTo(this.d.csJqdatepicker),this.csJqranges=e('[type="range"]',this.csJqtimepicker),this.csJqhours=e('[name="hours"]',this.csJqtimepicker),this.csJqminutes=e('[name="minutes"]',this.csJqtimepicker),this.csJqhoursText=e(".datepicker--time-current-hours",this.csJqtimepicker),this.csJqminutesText=e(".datepicker--time-current-minutes",this.csJqtimepicker),this.d.ampm&&(this.csJqampm=e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current",this.csJqtimepicker)).html(this.dayPeriod),this.csJqtimepicker.addClass("-am-pm-"))},_updateCurrentTime:function(){var t=s.getLeadingZeroNum(this.displayHours),e=s.getLeadingZeroNum(this.minutes);this.csJqhoursText.html(t),this.csJqminutesText.html(e),this.d.ampm&&this.csJqampm.html(this.dayPeriod)},_updateRanges:function(){this.csJqhours.attr({min:this.minHours,max:this.maxHours}).val(this.hours),this.csJqminutes.attr({min:this.minMinutes,max:this.maxMinutes}).val(this.minutes)},_handleDate:function(t){this._setDefaultMinMaxTime(),t&&(s.isSame(t,this.d.opts.minDate)?this._setMinTimeFromDate(this.d.opts.minDate):s.isSame(t,this.d.opts.maxDate)&&this._setMaxTimeFromDate(this.d.opts.maxDate)),this._validateHoursMinutes(t)},update:function(){this._updateRanges(),this._updateCurrentTime()},_getValidHoursFromDate:function(t,e){var i=t;t instanceof Date&&(i=s.getParsedDate(t).hours);var a="am";if(e||this.d.ampm)switch(!0){case 0==i:i=12;break;case 12==i:a="pm";break;case i>11:i-=12,a="pm"}return{hours:i,dayPeriod:a}},set hours(t){this._hours=t;var e=this._getValidHoursFromDate(t);this.displayHours=e.hours,this.dayPeriod=e.dayPeriod},get hours(){return this._hours},_onChangeRange:function(t){var s=e(t.target),i=s.attr("name");this.d.timepickerIsActive=!0,this[i]=s.val(),this._updateCurrentTime(),this.d._trigger("timeChange",[this.hours,this.minutes]),this._handleDate(this.d.lastSelectedDate),this.update()},_onSelectDate:function(t,e){this._handleDate(e),this.update()},_onMouseEnterRange:function(t){var s=e(t.target).attr("name");e(".datepicker--time-current-"+s,this.csJqtimepicker).addClass("-focus-")},_onMouseOutRange:function(t){var s=e(t.target).attr("name");this.d.inFocus||e(".datepicker--time-current-"+s,this.csJqtimepicker).removeClass("-focus-")},_onMouseUpRange:function(t){this.d.timepickerIsActive=!1}}}()}(window,csJq);