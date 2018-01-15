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
