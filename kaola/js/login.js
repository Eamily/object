$(document).ready(function() {
	//登录页面的选择
	$("#select-login .phone-enter").click(function() {
		$(this).parents(".heightmax").addClass("nosee");
		$("#phonenumber-login").removeClass("nosee");
	})
	$("#select-login .email-enter").click(function() {
		$(this).parents(".heightmax").addClass("nosee");
		$("#email-login").removeClass("nosee");
	})
	$("#select-login .registerkl").click(function() {
		$(this).parents(".heightmax").addClass("nosee");
		$("#phone-register").removeClass("nosee");
	})
	$(".anotherway").click(function() {
		$(this).parents(".enter").addClass("nosee");
		$("#select-login").removeClass("nosee");
	})
	//判断是否'10天免登录'
	$(".ten-day").click(function() {
		$(this).children().toggleClass("nosee");
		if($(this).children().hasClass("nosee")) {
			$(this).siblings("input").attr("checked", false);
		} else {
			$(this).siblings("input").attr("checked", true);
		}
	})
	//密码小眼睛
	$(".eye-mima").click(function() {
		if($(this).find("i").hasClass("urs-eye")) {
			$(this).find("i").removeClass("urs-eye");
			$(this).find("i").addClass("urs-eyes");
			$(this).siblings("input").attr('type','text');
		} else {
			$(this).find("i").removeClass("urs-eyes");
			$(this).find("i").addClass("urs-eye");
			$(this).siblings("input").attr('type','password');
		}
	})
	//手机号登录点击验证码
	$(".number-code").click(function() {
		$(this).siblings(".number-in-check").children("input").val("123456");
	})
})