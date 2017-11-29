$(document).ready(function() {
	var arr = [];
	//统计件数
	var num = 0;
	//全选和复选框
	var $selectAll = $(".cart-allsele");
	var $select;

	//判断是否全选
	function isSelectAll() {
		arr = [];
		$select = $(".cart-solosele");
		$select.each(function() {
			if($(this).hasClass("selected")) {
				arr.push($(this).parent(".cart-goods")); //向数组中添加
			}
		});
		if(arr.length == $(".cart-goods").length) {
			return true;
		} else {
			return false;
		}
	}
	//最后选中的商品有几件
	function NumberAll() {
		num = 0;
		$select = $(".cart-solosele");
		$select.each(function() {
			if($(this).hasClass("selected")) {
				//选中后取得数量
				var numTxt = $(".cart-num .num").text();
				num += parseInt(numTxt);
			}
		});
	}
	//计算合计
	var allprice;
	var shui;

	function PriceAll() {
		allprice = 0;
		shui = 0;
		var m = 0;
		$select = $(".cart-solosele");
		$select.each(function() {
			if($(this).hasClass("selected")) {
				num = 0;
				m++;
				//选中后取得数量
				var numTxt = $(this).siblings(".cart-goods-xq").find(".cart-num .num").text();
				num = parseInt(numTxt);
				var price1 = $(this).siblings(".cart-goods-xq").find(".cart-shui span").text()
				var price2 = $(this).siblings(".cart-goods-xq").find(".cart-price span").text()
				allprice = allprice + parseFloat(price2) * num;
				shui = shui + parseFloat(price1) * num;
				$("#suan").css("background-color", "#E31436");
			}
		});
		if(m == 0) {
			$("#suan").css("background-color", "#c1c1c1");
		}
		$(".allprice .zong-price span").text(allprice.toFixed(2));
		$(".cart-bottom-price .red-txt span").text(allprice.toFixed(2))
		$(".bottom-tax .textright span").text(shui.toFixed(2))
	}
	//没有选中商品,底部计算输出
	function numshui() {
		var fee = $(".cart-shui span").text();
		parseFloat(fee).toFixed(2);
		console.log(parseFloat(fee).toFixed(2));
	}
	numshui()
	//全选 
	function seleAll(name) {
		$select = $(".cart-solosele");
		name.toggleClass("selected");
		if(name.hasClass("selected")) {
			//选中
			$selectAll.find(".circle").addClass("nosee");
			$selectAll.find(".duihao").removeClass("nosee");
			$select.find(".circle").addClass("nosee");
			$select.find(".duihao").removeClass("nosee");
			$select.addClass("selected");
			NumberAll();
			PriceAll();
		} else {
			//没选中
			$selectAll.find(".circle").removeClass("nosee");
			$selectAll.find(".duihao").addClass("nosee");
			$select.find(".circle").removeClass("nosee");
			$select.find(".duihao").addClass("nosee");
			$select.removeClass("selected");
		}
		PriceAll();
	}
	$selectAll.on("click", function() {
		seleAll($(".cart-allsele"));

	})
	//复选
	$(".cart-solosele").click(function() {
		$(this).toggleClass("selected");
		if($(this).hasClass("selected")) {
			//选中
			$(this).find(".circle").addClass("nosee");
			$(this).find(".duihao").removeClass("nosee");
		} else {
			//没选中
			$(this).find(".circle").removeClass("nosee");
			$(this).find(".duihao").addClass("nosee");
		}
		if(isSelectAll()) {
			//圈看不见，对号看得见
			$selectAll.find(".circle").addClass("nosee");
			$selectAll.find(".duihao").removeClass("nosee");
		} else {
			//对号看不见，圈看得见
			$selectAll.find(".circle").removeClass("nosee");
			$selectAll.find(".duihao").addClass("nosee");
		}
		NumberAll();
		PriceAll();
	})
	//数量变化
	var n;
	$(".box-plus").click(function() {
		var $Num = $(this).siblings(".num").text();
		n = parseInt($Num);
		n++;
		$(this).siblings(".num").text(n);
		PriceAll();
	})
	$(".box-jian").click(function() {
		var $Num = $(this).siblings(".num").text();
		n = parseInt($Num);
		if(n > 1) {
			n--;
			$(this).siblings(".num").text(n);
		} else {
			$(this).siblings(".num").text(1);
		}
		PriceAll();
	})
	//删除
	$(".cart-delete").click(function() {
		$(this).parents(".cart-goods").remove();
		var snum = $(".cart-goods").length;
		if(snum == 0) {
			$(".cart-bottom").addClass("nosee");
			$(".zong").addClass("nosee");
			$(".cart-linetitle").addClass("nosee");
			$(".emptycart").removeClass("nosee");
		}
		PriceAll();
	})
	$("#suan").click(function() {
		window.location.href = "addaddress.html";
	})
})