$(document).ready(function() {

	//点击新增收货地址按钮
	//存放新增加的地址
	var addressinfo = {};
	$("#address-addBtn").on("click", function() {
		$("#addressbox").removeClass("nosee");
		addressinfo = {};
		$(".demoform").Validform({
			btnSubmit: "#adresubmit",
			tiptype: 1,
			ajaxPost: true,
			callback: function(data) {
				if(data.status) {
					$.Hidemsg()

				} else {
					$.Showmsg(data.message);
				}
			},
			beforeSubmit: function(curform) {
				//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
				//这里明确return false的话表单将不会提交;	
				addressinfo.cont = $("#addressbox .person-shou").find("input").val();
				addressinfo.phone = $("#addressbox .connection").find("input").val();
				addressinfo.province = $("#addressbox select[name=province]").find("option:selected").html();
				addressinfo.shi = $("select[name=shi]").find("option:selected").html();
				addressinfo.are = $("select[name=area]").find("option:selected").html();
				addressinfo.relive = $("#addressbox .relive").find("input").val();
				addressinfo.posetal = $("#addressbox .posetal").find("input").val();
				console.log(addressinfo)
				//输出
				$(".newadre .name").text(addressinfo.cont);
				$(".newadre .phone").text(addressinfo.phone);
				$(".newadre .province").text(addressinfo.province);
				$(".newadre .city").text(addressinfo.shi);
				$(".newadre .area").text(addressinfo.are);
				$(".newadre .street").text(addressinfo.relive);
				$("#adreul").removeClass("nosee");
				$(".newadd").removeClass("nosee");
				$("#addressbox").addClass("nosee");
				//点击设置默认地址
				if($("#default-address").is(":checked")) {
					$(".moren").text("默认地址");
				}
				return false;
			},
		});
	})
	//选择省份之后
	$("select[name=province]").on("click", function() {
		if($("select[name=province] option:selected").val() != "") {
			$("select[name=shi]").removeClass("nosee");
			$("select[name=shi]").on("click", function() {
				if($("select[name=shi] option:selected").val() != "") {
					$("select[name=area]").removeClass("nosee")
				}
			})
		}
	})
	//设为默认地址
	$(".moren").on("click", function() {
		$(".moren").text("默认地址");
	})
	//编辑
	$(".bianji").on("click", function() {
		$("#addressbox").removeClass("nosee");
	})
	//删除
	$(".delete").on("click", function() {
		$("#adreul").addClass("nosee");
	})
	//在订单提交页面：地址前的选中，删除操作
	$("#adreul .adre-select").on("click", function() {
		$(this).children(".radio-btn").toggleClass("selected");
	})
	//在新增地址页面 ：设置为 默认地址 的点击事件
	$(".adre-la").on("click", function() {
		$(this).children(".checkbox-btn").toggleClass("selected");
	})

	//关闭小窗口
	$(".back-cover .retext .reclose").on("click", function() {
		$(".back-cover").addClass("nosee");
	})
	//取消按钮
	$(".back-cover .rebutton .resty-clo").on("click", function() {
		$(".back-cover").addClass("nosee");
	})
	//得到或失去文本框的焦点
	$(".txt-chang").on("click", function() {
		if($(this).find(".info-input").blur()) {
			$(this).find("input").focus();
		}
	})
	$(".info-input").focus(function() {
		$(this).siblings(".little-txt").stop().animate({
			"font-size": "12px",
			"top": "-3px"
		}, 200);
		$(this).siblings(".little-txt").addClass("little-txt:before");
	})
	$(".info-input").blur(function() {
		if($(this).val() == "") {
			$(this).siblings(".little-txt").stop().animate({
				"font-size": "16px",
				"top": "13px"
			}, 200);
			$(this).siblings(".little-txt").removeClass("little-txt:before");
		}
	})
	//点击使用优惠券
	$("#use-coupon").on("click", function() {
		$("#fabox").removeClass("nosee");
	})
	//优惠券小窗的tab
	var $oTitleF = $("#fabox .fa-tab .fa-tab-title li");
	var $oContentF = $("#fabox .fa-tab .fa-tab-content li");
	$oTitleF.on("click", function() {
		var index = $(this).index();
		console.log(index);
		$oTitleF.removeClass("fa-active");
		$oTitleF.eq(index).addClass("fa-active");
		if(index == 0) {
			$(".fa-tab-content").addClass("empty");
		} else {
			$(".fa-tab-content").removeClass("empty");
		}
		$oContentF.addClass("nosee");
		$oContentF.eq(index).removeClass("nosee");
	})
	//优惠券确定
	$("#fabox").find(".resty-sub").on("click", function() {
		$("#fabox").addClass("nosee");
	})
	//点击使用推荐码
	$("#use-recommend").on("click", function() {
		$("#rebox").removeClass("nosee");
	})
	//推荐码确定
	$("#rebox").find(".resty-sub").on("click", function() {
		$("#rebox").addClass("nosee");
	})
	//商品总金额
	var $oGoods = $(".order-shopping").find(".order-goods .order-goods-paying");
	var paynum = 0;
	$oGoods.each(function() {
		var payn = parseFloat($(this).text().slice(1)).toFixed(1);
		paynum += parseFloat(payn);
	})
	$("#order-submitall").find(".order-amount span").text("￥" + paynum);
	//应付总额
	var $oOne = $("#order-submitall").find(".order-amount span");
	var $oTwo = $("#order-submitall").find(".promote span");
	var $oThree = $("#order-submitall").find(".coupon span");
	var $oFour = $("#order-submitall").find(".ship span");
	var one = parseFloat($oOne.text().slice(1)).toFixed(1);
	var two = parseFloat($oTwo.text().slice(2)).toFixed(1);
	var three = parseFloat($oThree.text().slice(2)).toFixed(1);
	var four = parseFloat($oFour.text().slice(1)).toFixed(1);
	var payall = 0;
	payall = parseFloat(one) - parseFloat(two) - parseFloat(three) + parseFloat(four);
	$("#order-submitall").find("order-totle span").text("￥" + payall);
})