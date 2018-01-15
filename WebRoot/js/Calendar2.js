	CalendarToString = function(cal)
	{   
	var str = cal.getStyle();
	str += '<div Author="alin" class="calendar" style="display:none;" onselectstart="return false" oncontextmenu="return false" id="Calendar">\n';
	str += '<div Author="alin" class="cdrWatermark" id="cdrWatermark"></div><div id="cdrBody" style="position:absolute;left:0px;top:0px;z-index:2;width:140px;">';
	str += cal.getHeader();
	str += cal.getBody();   
	str += '</div><div Author="alin" id="cdrMenu" style="position:absolute;left:0px;top:0px;z-index:3;display:none;"  onmouseover="' + cal.Obj + '.showMenu(null);" onmouseout="' + cal.Obj + '.hideMenu();"></div></div>';
	return str;
	};
	
	
	CalendarGetStyle = function(cal)
	{
	var str = '<style type="text/css">\n';
	str += '.calendar{position:absolute;width:140px!important;width /**/:142px;height:184px!important;height /**/:174px;background-color:'+cal.style.bodyBackColor+';border:1px solid ' + cal.style.borderColor + ';left:0px;top:0px;z-index:9999;}\n';
	str += '.cdrHeader{background-color:'+ cal.style.headerBackColor +';width:140px;height:22px;font-size:12px;color:'+cal.style.headerFontColor+';}\n';
	str += '.cdrWatermark{position:absolute;left:0px;top:55px;width:140px;font-family: 黑体;font-size:70px;color:'+cal.style.watermarkColor+';z-index:1;text-align:center;}\n';
	str += '.cdrBodyBar{background-color:' + cal.style.bodyBarBackColor + ';font-size:12px;color:' + cal.style.bodyBarFontColor + ';width:140px;height:20px;}\n';
	str += '.cdrBody{width:140px;height:122px!important; height /**/:110px;font-size:12px;cursor:pointer;color:' + cal.style.bodyFontColor + ';}\n';
	str += '.dayOver{height:16px;padding:0px;border:1px solid black;background-color:#f4f4f4;}\n';
	str += '.dayOut{padding:1px;border:none;height:16px;}\n';
	str += '.menuOver{background-color:'+cal.style.headerBackColor+';color:'+cal.style.headerFontColor+';font-size:12px;}\n';
	str += '.headerOver{border:1px solid black;background-color:#f4f4f4;color:black;cursor:default;}\n';
	str += '.cdrMenu{font-size:12px;border:1px solid #000000;background-color:#ffffff;cursor:default;width:100%}\n';
	str += 'html>body #Calendar{width:142px;174px;}';
	str += '</style>\n';	
	return str;
	};
	
	
	CalendarPrototypeGetHeader = function(cal)
	{
	var str = '<table Author="alin" class="cdrHeader" cellSpacing="2" cellPadding="0"><tr Author="alin" align="center">\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" onmouseout="cal.className=\'\'" id="previousYear" title="上一年份" style="cursor:pointer;width:10px;" onclick="'+cal.Obj+'.onChangeYear(false);"><<</td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" onmouseout="cal.className=\'\'" id="previousMonth" title="上一月份" style="cursor:pointer;width:10px;" onclick="'+cal.Obj+'.onChangeMonth(false);"><</td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" id="currentYear" style="width:50px;" onclick="' + cal.Obj + '.showMenu(true);" onmouseout="' + cal.Obj + '.hideMenu();cal.className=\'\';">0</td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" id="currentMonth" onclick="' + cal.Obj + '.showMenu(false);" onmouseout="' + cal.Obj + '.hideMenu();cal.className=\'\';">0</td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" onmouseout="cal.className=\'\'" id="nextMonth" title="下一月份" style="cursor:pointer;width:10px;" onclick="'+cal.Obj+'.onChangeMonth(true);">></td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'headerOver\'" onmouseout="cal.className=\'\'" id="nextYear" title="下一年份" style="cursor:pointer;width:10px;" onclick="'+cal.Obj+'.onChangeYear(true);">>></td></tr>\n';
	str += '</table>\n';
	return str;
	};
	

	CalendarPrototypeGetBody = function(cal)
	{
	var n = 0;
	var str = cal.getBodyBar();
	str += '<table Author="alin" class="cdrBody" cellSpacing="2" cellPadding="0">\n';   
	var i = 0;
	for(i = 0; i < 7; i++)
	{	  
	
    if(i<6){
    	str += '<tr Author="alin" align="center">';
    }
	str = str + '<td Author="alin" class="dayOut" id="cdrDay'+(n)+'" width="13%"></td>\n';
	n=n+1;
	
	str = str + '</tr>';
	}
	str = str + '</table>\n';
	str = str + '<table Author="alin" class="cdrBodyBar" cellSpacing="2" cellPadding="0"><tr align="center" Author="alin"><td Author="alin" style="cursor:pointer;" onclick="'+cal.Obj+'.getToday();">今天：'+new Date().toFormatString("yyyy年mm月dd日")+'</td></tr></table>\n';
	return str;
	};
	
	
	CalendarPrototypeGetBodyBar = function(cal)
	{
	var str = '<table Author="alin_bar" id="cdrBodyBar" class="cdrBodyBar" style="cursor:move;" cellSpacing="2" cellPadding="0"><tr Author="alin_bar" align="center">\n';
	var day = new Array('日','一','二','三','四','五','六');
	var i = 0;	
	for(i = 0; i < 7; i++)
	{
	str += '<td Author="alin_bar">' + day[i] + '</td>\n';     
	}
	str += '</tr></table>';
	return str;  
	}
	
	CalendarPrototypeGetYearMenu = function(cal,year)
	{
	var str = '<table Author="alin" cellSpacing="0" class="cdrMenu" cellPadding="0">\n';
	var i = 0;	
	var _date;
	var _year;
	for(i = 0; i < 10; i++)
	{	  
	_year = year + i;
	_date = new Date(_year,cal.date.getMonth(),cal.date.getDate());
	str += '<tr Author="alin" align="center"><td Author="alin" width="13%" height="16" ';
	if(cal.date.getFullYear() != _year)
	{
	str += 'onmouseover="cal.className=\'menuOver\'" onmouseout="cal.className=\'\'" ';
	}
	else
	{
	str += 'class="menuOver"';
	}
	str += 'onclick="' + cal.Obj + '.bindDate(\'' + _date.toFormatString("-") + '\')">' + _year + '年</td>\n';		
	str += '</tr>';
	}
	str += '<tr Author="alin" align="center"><td Author="alin"><table Author="alin" style="font-size:12px;width:100%;" cellSpacing="0" cellPadding="0">\n';
	str += '<tr Author="alin" align="center"><td Author="alin" onmouseover="cal.className=\'menuOver\'" onmouseout="cal.className=\'\'" onclick="'+cal.Obj+'.getYearMenu('+ (year - 10) + ')"><<</td>\n';
	str += '<td Author="alin" onmouseover="cal.className=\'menuOver\'" onmouseout="cal.className=\'\'" onclick="'+cal.Obj+'.getYearMenu('+ (year + 10) +')">>></td><tr>\n';
	str += '</table></td></tr>\n';
	str += '</table>';
	var _menu = getObjById("cdrMenu");
	_menu.innerHTML = str;
	};
	
	
	
	CalendarPrototypeGetMonthMenu = function(cal)
	{
	var str = '<table Author="alin" cellSpacing="0" class="cdrMenu" cellPadding="0">\n';
	var i = 1;	
	var _date;
	for(i = 1; i <= 12; i++)
	{   
	_date = new Date(cal.date.getFullYear(),i-1,cal.date.getDate());		
	str += '</tr><tr Author="alin" align="center"><td Author="alin" height="16" ';
	if(cal.date.getMonth() + 1 != i)
	{
	str += 'onmouseover="cal.className=\'menuOver\'" onmouseout="cal.className=\'\'" ';
	}
	else
	{
	str += 'class="menuOver"';
	}
	str += 'onclick="' + cal.Obj + '.bindDate(\'' + _date.toFormatString("-") + '\')">'+i+'月</td></tr>\n';
	}
	str += '</table>';
	var _menu = getObjById("cdrMenu");
	_menu.innerHTML = str;   
	};
	
	
	
