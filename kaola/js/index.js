window.onload = function() {	
	//如果数字不够两位数，在面补0
	function PrefixInteger(num) {
		return("00" + num).substr(-2);
	}
	//设置倒计时
	function ShowCountDown(year, month, day, hours, minutes, seconds, divname) {
		var now = new Date();
		var endDate = new Date(year, month - 1, day, hours, minutes, seconds);
		var leftTime = endDate.getTime() - now.getTime();
		var leftsecond = parseInt(leftTime / 1000);
		var day1 = Math.floor(leftsecond / (60 * 60 * 24));
		var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
		var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
		var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
		var cc = document.getElementById(divname);
		cc.innerHTML = PrefixInteger(hour) + ":" + PrefixInteger(minute) + ":" + PrefixInteger(second);
	}
	setInterval(function() {
		ShowCountDown(2017, 9, 30, 12, 00, 00, 'countdown');
	}, 1000);
}