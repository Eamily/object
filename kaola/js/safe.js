$(document).ready(function() {
	$("nav").scrollspynav({
		offsetTop: "45px"
	})
	//对于顶部导航的操作
	$(".ic").click(function() {
		$(".switch").removeClass("nosee");
		$(".zindex").slideDown(300);
	})
	$(".switch").click(function() {
		$(".zindex").slideUp(300);
		$(this).addClass("nosee");
	})
	$(".switch-list .am-u-sm-3").click(function () {
		$(this).siblings().find("a").removeClass("active");
		$(this).find("a").addClass("active");
	})
})