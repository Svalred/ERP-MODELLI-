document.writeln("<script type='text/javascript' src='Script1.js'></script>"); 
 
function Calendar(objName){		
	this.style = {
	borderColor       		: "#909eff", //边框颜色
	headerBackColor    		: "#97d645", //表头背景颜色909EFF
	headerFontColor    		: "#ffffff", //表头字体颜色
	bodyBarBackColor  		: "#f4f4f4", //日历标题背景色
	bodyBarFontColor  		: "#000000", //日历标题字体色
	bodyBackColor     		: "#ffffff", //日历背景色
	bodyFontColor           : "#000000", //日历字体色 
	bodyHolidayFontColor    : "#ff0000", //假日字体色
	watermarkColor 		    : "#888888", //背景水印色
	moreDayColor            : "#cccccc" 
	};
	
	this.showMoreDay = true; //是否显示上月和下月的日期
	this.Obj = objName;		
	this.date = null;
	this.mouseOffset = null;
	this.dateInput = null;
	this.timer = null;	
	
	};
	
	//Calendar.prototype.toString = function()
	//{   
	//var str = this.getStyle();
	//str += '<div Author="alin" class="calendar" style="display:none;" onselectstart="return false" oncontextmenu="return false" id="Calendar">\n';
	//str += '<div Author="alin" class="cdrWatermark" id="cdrWatermark"></div><div id="cdrBody" style="position:absolute;left:0px;top:0px;z-index:2;width:140px;">';
	//str += this.getHeader();
	//str += this.getBody();   
	//str += '</div><div Author="alin" id="cdrMenu" style="position:absolute;left:0px;top:0px;z-index:3;display:none;"  onmouseover="' + this.Obj + '.showMenu(null);" onmouseout="' + this.Obj + '.hideMenu();"></div></div>';
	//return str;
	//};
	
	//var imported=document.createElement('script');
	//imported.src='Calendar2.js';

	CalendarToString(this);
	
	
	CalendarGetStyle(this);
	
	
	CalendarPrototypeGetHeader(this);
	
	
	CalendarPrototypeGetBody(this);
	
	
	CalendarPrototypeGetBodyBar(this);
	
	
	
	CalendarPrototypeGetYearMenu(this,year);
	
	
	
	
	CalendarPrototypeGetMonthMenu(this);
	
	
	
	
	Calendar.prototype.show = function()
	{
	if (arguments.length >  3  || arguments.length == 0)
	{
	alert("对不起！传入参数不对！" );
	return;
	}   
	var _date = null;
	var _evObj = null;
	var _initValue = null; 
	var i = 0; 
	for(i = 0; i < arguments.length; i++)
	{
		nome1(i);
	}
		
	
		
	
	
	function nome1(i){
		if(typeof(arguments[i]) == "object" && arguments[i].type == "text")
		{_date = arguments[i];}
		else if(typeof(arguments[i]) == "object")
		{_evObj = arguments[i];}
		else if(typeof(arguments[i]) == "string")
		{_initValue = arguments[i];} 
	}
	
	_evObj = _evObj || _date;
	var inputObj = _date;
	var targetObj = _evObj;
	
	if(!_date){
		alert("传入参数错误!"); 
		return;
	}
	
	this.dateInput = _date;
	_date = _date.value;
	if(_date == "" && _initValue){
		_date = _initValue;   
	}
	this.bindDate(_date);        
	var _target = getPosition(_evObj);   
	var _obj = getObjById("Calendar");
	_obj.style.display = ""; 
	_obj.style.left = _target.x + 'px';
	if((document.body.clientHeight - (_target.y + _evObj.clientHeight)) >= _obj.clientHeight)
	{        
	_obj.style.top = (_target.y + _evObj.clientHeight) + 'px';
	}
	else
	{	  
	_obj.style.top = (_target.y - _obj.clientHeight) + 'px';
	}
	};
	Calendar.prototype.hide = function()
	{
	var obj = getObjById("Calendar");
	obj.style.display = "none";   
	};
	Calendar.prototype.bindDate = function(date)
	{
	var _monthDays = new Array(31,30,31,30,31,30,31,31,30,31,30,31);	
	var _arr = date.split('-');		
	var _date = new Date(_arr[0],_arr[1]-1,_arr[2]);	
	if(isNaN(_date)) _date = new Date();	
	this.date = _date;
	this.bindHeader();	
	var _year = _date.getFullYear(); var _month = _date.getMonth(); var _day = 1;	
	var _startDay = new Date(_year,_month,1).getDay();
	
	var _previYear;
	var _previMonth;
	
	
		if(_month==0){
		_previYear=_year-1
		_previMonth=11
		
		}else{
			_previMonth=_month-1;
			
			_previYear=_year;
		}
	
	var _previDay = _monthDays[_previMonth];
	
	//if (_previMonth == 1)_previDay =((_previYear%4==0)&&(_previYear%100!=0)||(_previYear%400==0))?29:28;	
	//_previDay -= _startDay - 1;
	
	
		if((((_previMonth == 1)&&(_previYear%4==0)&&(_previYear%100!=0))||(_previYear%400==0))){
			_previDay =29;
		}
		else{
		_previDay =28;
		}
		
	_previDay -= _startDay - 1;
	
	var _nextDay = 1;
	
	if((_year%4==0)&&(_year%100!=0)||(_year%400==0)){
		_monthDays[1]=29;
	}else{
		_monthDays[1]=28;
	}
	
	var _previDate, _nextDate, _curDate, _day, i=0, temp=new Date(_year,_month,1).getDay() && _day <= _monthDays[_month];
	for(i = 0; i < 40; i++)
	{	
	var _dayElement = getObjById("cdrDay" + i);
	_dayElement.onmouseover = Function(this.Obj + ".onMouseOver(this)");
	_dayElement.onmouseout = Function(this.Obj + ".onMouseOut(this)");
	_dayElement.onclick = Function(this.Obj + ".onClick(this)");
	this.onMouseOut(_dayElement);	 		
	_dayElement.style.color = "";
	if(i < _startDay)
	{
	//获取上一个月的日期
	if(this.showMoreDay)
	{
	_previDate = new Date(_year,_month - 1,_previDay);
	_dayElement.innerHTML = _previDay;
	_dayElement.title = _previDate.toFormatString("yyyy年mm月dd日");
	_dayElement.value = _previDate.toFormatString("-");	
	_dayElement.style.color = this.style.moreDayColor;	
	_previDay++;
	}else
	{
	_dayElement.innerHTML = "";
	_dayElement.title = "";
	}
	}
	else if(_day > _monthDays[_month])
	{
	//获取下个月的日期
	if(this.showMoreDay)
	{
	_nextDate = new Date(_year,_month + 1,_nextDay);
	_dayElement.innerHTML = _nextDay;
	_dayElement.title = _nextDate.toFormatString("yyyy年mm月dd日");
	_dayElement.value = _nextDate.toFormatString("-");
	_dayElement.style.color = this.style.moreDayColor;	
	_nextDay++;			   
	}else
	{
	_dayElement.innerHTML = "";
	_dayElement.title = "";
	}
	}
	else if(i >= temp)
	{
	//获取本月日期
	_dayElement.innerHTML = _day;
	if(_day == _date.getDate())
	{
	this.onMouseOver(_dayElement);
	_dayElement.onmouseover = Function("");   
	_dayElement.onmouseout = Function(""); 					  			    
	}
	if(this.isHoliday(_year,_month,_day))
	{
	_dayElement.style.color = this.style.bodyHolidayFontColor;			  
	}
	_curDate = new Date(_year, _month, _day);
	_dayElement.title =  _curDate.toFormatString("yyyy年mm月dd日");
	_dayElement.value = _curDate.toFormatString("-");
	_day++;
	}
	else
	{
	_dayElement.innerHTML = "";
	_dayElement.title = "";
	}	
	}
	var _menu = getObjById("cdrMenu");
	_menu.style.display = "none";	
	};
	Calendar.prototype.bindHeader = function()
	{
	var _curYear = getObjById("currentYear");
	var _curMonth = getObjById("currentMonth");
	var _watermark = getObjById("cdrWatermark");
	_curYear.innerHTML = this.date.toFormatString("yyyy年");
	_curMonth.innerHTML =  this.date.toFormatString("mm月");
	_watermark.innerHTML = this.date.getFullYear();     
	};	
	Calendar.prototype.getToday = function()
	{
	var _date = new Date();
	this.bindDate(_date.toFormatString("-"));
	};	
	Calendar.prototype.isHoliday = function(year,month,date)
	{
	var _date = new Date(year,month,date);
	return (_date.getDay() == 6 || _date.getDay() == 0);
	};
	Calendar.prototype.onMouseOver = function(obj)
	{
	obj.className = "dayOver";
	};
	Calendar.prototype.onMouseOut = function(obj)
	{
	obj.className = "dayOut";
	};	
	Calendar.prototype.onClick = function(obj)
	{  
	if(obj.innerHTML != "")  this.dateInput.value = obj.value;
	this.hide();
		//自定义真值隐藏元素组件赋值
		//当前组件为targetObj
		//获取真值隐藏元素组件
		var realValueObject = targetObj.nextSibling.nextSibling;
		//将显示结果obj.value格式化为long值
		var dates = obj.value.split("-");
		var tempDate = new Date(dates[0],dates[1]-1,dates[2]);
		//将值放入隐藏组件
		realValueObject.value = tempDate.getTime();
	
	};
	Calendar.prototype.onChangeYear = function(isnext)
	{
	var _year = this.date.getFullYear();
	var _month = this.date.getMonth() + 1;
	var _date = this.date.getDate();
	if(_year > 999 && _year <10000)
	{
	if(isnext){_year= _year + 1;}else{ _year = _year - 1;}
	}
	else
	{
	alert("年份超出范围（1000-9999）!");
	}
	this.bindDate(_year + '-' + _month + '-' + _date);
	};
	Calendar.prototype.onChangeMonth = function(isnext)
	{
	var _year = this.date.getFullYear();
	var _month = this.date.getMonth() + 1;
	var _date = this.date.getDate();
	if(isnext){ _month= _month + 1;} else {_month= _month - 1;}
	if(_year > 999 && _year <10000)
	{ 
	if(_month < 1) {_month = 12; _year= _year -1;}
	if(_month > 12) {_month = 1; _year= year + 1;}
	}
	else
	{
	alert("年份超出范围（1000-9999）!");
	}  
	this.bindDate(_year + '-' + _month + '-' + _date);
	};
	Calendar.prototype.showMenu = function(isyear)
	{
	
	var _menu = getObjById("cdrMenu");
	
	if(isyear != null)
	{    
	var _obj;
	if(isyear){
		_obj=getObjById("currentYear");
	}
	else{
		_obj=getObjById("currentMonth");
	}
	
	
	if(isyear)
	{
	this.getYearMenu(this.date.getFullYear() - 5);	   
	}
	else
	{
	this.getMonthMenu();	   
	}
	_menu.style.top = (_obj.offsetTop + _obj.offsetHeight) + 'px';
	_menu.style.left = _obj.offsetLeft + 'px';	
	_menu.style.width = _obj.offsetWidth + 'px';
	}
	if (this.timer != null) clearTimeout(this.timer);
	_menu.style.display="";
	}
	Calendar.prototype.hideMenu = function()
	{
	var _obj = getObjById("cdrMenu");
	this.timer = window.setTimeout(function(){_obj.style.display='none';},500);	
	}
	Number.prototype.NaN0 = function()
	{
	
	//	return isNaN(this) ? 0 : this;
		if(isNaN(this)){
			return 0;
		}else{
			return this;
		}
	
	}
	Date.prototype.toFormatString = function(fs)
	{
	if(fs.length == 1)
	{ 
	return this.getFullYear() + fs + (this.getMonth() + 1) + fs + this.getDate(); 
	}
	fs = fs.replace("yyyy",this.getFullYear());
	fs = fs.replace("mm",(this.getMonth() + 1));
	fs = fs.replace("dd",this.getDate());
	return fs;
	}
	/************公用方法及变量**************/
	var inputObj = null; 
	var targetObj = null;	
	var dragObj = null; 
	var mouseOffset = null; 
	function getObjById(obj)
	{
	if(document.getElementById)
	{
	return document.getElementById(obj);
	}
	else
	{
	alert("浏览器不支持!");
	}
	}
	function mouseCoords(ev)
	{
	if(ev.pageX || ev.pageY){
	return {x:ev.pageX, y:ev.pageY};
	}
	return {
	x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
	y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
	}
	function getPosition(e)
	{
	var left = 0;
	var top  = 0;
	
	/*while (e.offsetParent){
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	e     = e.offsetParent;
	}
	*/
	
	while(e.offsetParent){
		if(e.currentStyle){
			left+=e.offsetLeft+parseInt(e.currentStyle.borderLeftWidth).NaN0();
		}else{
			left+=e.offsetLeft;
		}
		
		if(e.currentStyle){
			top+=e.offsetTop+parseInt(e.currentStyle.borderTopWidth).NaN0();
		}else{
			top+=e.offsetTop;
		}
	}
	
	
	/*
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	*/
	
	if(e.currentStyle){
		left+=e.offsetLeft+parseInt(e.currentStyle.borderLeftWidth).NaN0();
	}else{
		left+=e.offsetLeft;
	}
	
	if(e.currentStyle){
		top  += e.offsetTop+parseInt(e.currentStyle.borderTopWidth).NaN0();
	}else{
		top  += e.offsetTop;
	}
	
	
	return {x:left, y:top};
	}
	function getMouseOffset(target, ev)
	{
	ev = ev || window.event;
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}
	function closeCalendar(evt){
	evt = evt || window.event; 
	var _target= evt.target || evt.srcElement; 
	if(!_target.getAttribute("Author") &&  _target != inputObj && _target != targetObj)
	{
	getObjById("Calendar").style.display = "none"; 	  
	}  
	}
	function dragStart(evt){
	evt = evt || window.event;	
	var _target= evt.target || evt.srcElement;
	if(_target.getAttribute("Author") == "alin_bar") 
	{	   
	dragObj = getObjById("Calendar");	   
	mouseOffset = getMouseOffset(dragObj, evt);	 
	}   
	}
	function drag(evt)
	{
	evt =  evt || window.event;	
	if(dragObj)
	{		  
	var mousePos = mouseCoords(evt); 
	dragObj.style.left = (mousePos.x - mouseOffset.x) + 'px';
	dragObj.style.top  = (mousePos.y - mouseOffset.y) + 'px';	  
	}
	}
	//拖动结束
	function dragEnd(evt)
	{
	dragObj = null;    
	}
	/***********End 公用方法*********/
	document.onclick = closeCalendar;
	document.onmousedown = dragStart;
	document.onmousemove = drag;
	document.onmouseup = dragEnd;
	/*********结束**********/
	var c = new Calendar("c");
	document.write(c);
