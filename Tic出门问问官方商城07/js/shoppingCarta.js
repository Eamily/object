$(document).ready(function() {
	//存放商品信息
	var obj = [];
	//存放商品数量值
	var arr = [];
	//复选框和全选 上
	var $selectAll = $(".cart-cont-head .cart-checked-group .checkbox-btn");
	var $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
	//全选下
	var $selectBot = $(".cart-cont-footer .confirm .checkbox-btn")
	//已选商品
	var $Sele = $(".cart-cont-footer .confirm .confirm-submit .quantity");
	var Selenum = 0;
	//数量减
	var $minus = $(".cart-cont-item .control .quantity-selector .icon-minus");
	//数量加
	var $add = $(".cart-cont-item .control .quantity-selector .icon-add");
	//单价
	//	var $Uprice = $("#cart-cont-list .cart-cont-item .unit-price");
	//	var Uprice = parseInt($Uprice.text().slice(1));
	//小计
	var $littleT = $(".cart-cont-item .price");
	//合计
	var $Totle = $(".cart-cont-footer .price");
	var num = 0;
	var $number = $(".cart-cont-item .control input");

	//已选商品数是
	$Sele.text(Selenum);
	$Totle.html("&yen" + num);
	//输出已选商品数和合计价格
	function numSelect() {
		//判断已选商品有几件
		isSelectAll();
		$Sele.text(Selenum);
		//合计
		$Totle.html("&yen" + parseFloat(num.toFixed(1)));
	}

	function numNosele() {
		$Sele.text("0");
		$Totle.html("&yen0");
	}
	//全选 
	function seleAll(name) {
		name.toggleClass("selected");
		if(name.hasClass("selected")) {
			$select.addClass("selected");
			numSelect()
		} else {
			$select.parents(".cart-form-background").css("background-color", "#FFFFFF");
			$select.removeClass("selected");
			numNosele();
		}
	}
	$selectAll.on("click", function() {
		seleAll($(".checkbox-btn"));

	})
	$selectBot.on("click", function() {
		seleAll($(".checkbox-btn"));
	})
	//复选
	$select.on("click", function() {
		$(this).toggleClass("selected");
		if(isSelectAll()) {
			$selectAll.addClass("selected");
			$selectBot.addClass("selected");
		} else {
			$selectAll.removeClass("selected");
			$selectBot.removeClass("selected");
		}
		//		console.log(obj[0]);
		numSelect();
	})

	//判断是否全选
	function isSelectAll() {
		arr = [];
		Selenum = 0;
		num = 0;
		$select.each(function() {
			if($(this).hasClass("selected")) {
				obj.push($(this).parents("li"));
				$(this).parents(".cart-form-background").css("background-color", "#FFFBEA");
				var t = $(this).parents(".checkbox-group").siblings(".control").find("input").val();
				arr.push(parseInt(t)); //向数组中添加商品数量值
				Selenum += parseInt(t); //计算最后所选商品有几件
				var litt = parseFloat($(this).parents(".checkbox-group").siblings(".price").text().slice(1)).toFixed(1);
				num += parseFloat(litt); //计算合计
			} else {
				$(this).parents(".cart-form-background").css("background-color", "#FFFFFF");
			}
		});
		if(arr.length == $select.length) {
			return true;
		} else {
			return false;
		}
	}
	//删除商品
	var $deleself = null;
	$(".cart-cont ul li .delete").on("click", function() {
		$("li .delbox").removeClass("nosee");
		$deleself = $(this);
	})
	//删除弹窗的确定
	$("li .delbox").on("click", function() {
		$deleself.parents("li").remove();
		$deleself = null;
		if($select.length == 0) {
			$(".cart-cont-footer").hide();
			$("#cart-cont-list li").eq(0).show();
			$("#cart-cont-list").addClass("empty");
		} else {
			$("#cart-cont-list li").eq(0).hide();
			$("#cart-cont-list").removeClass("empty");
			if(isSelectAll()) {
				$selectAll.addClass("selected");
				$selectBot.addClass("selected");
			} else {
				$selectAll.removeClass("selected");
				$selectBot.removeClass("selected");
			}
		}
		numSelect();
		$(".back-cover").addClass("nosee");
	})
	//数量减
	function minus () {
		var t = parseInt($(this).siblings("input").val());
		if(t > 1) {
			$(this).siblings("input").val(t - 1);

			//单价
			var up = parseFloat($(this).parents(".control").siblings(".unit-price").text().slice(1));
			//m为小计的计算结果
			var m = up * parseInt($(this).siblings("input").val());
			//小计的值
			$(this).parents(".control").siblings(".price").html("&yen" + m.toFixed(1));
			if($(this).parents(".control").siblings(".checkbox-group").find(".checkbox-btn").hasClass("selected")) {
				Selenum--;
				num -= parseFloat(up.toFixed(1));
				//判断已选商品有几件
				$Sele.text(Selenum);
				//合计
				$Totle.html("&yen" + parseFloat(num.toFixed(1)));
			}
		}
	}
	$minus.on("click", function() {
		minus ();
	})
	//数量加
	$add.on("click", function() {
		var t = parseInt($(this).siblings("input").val());
		$(this).siblings("input").val(t + 1);
		//单价
		var up = parseFloat($(this).parents(".control").siblings(".unit-price").text().slice(1));
		//m为小计的计算结果
		var m = up * parseInt($(this).siblings("input").val());
		//小计的值
//		$(this).parents(".control").siblings(".price").html("&yen" + m.toFixed(1));
		if($(this).parents(".control").siblings(".checkbox-group").find(".checkbox-btn").hasClass("selected")) {
			Selenum++;
			num += parseFloat(up.toFixed(1));
			//判断已选商品有几件
			$Sele.text(Selenum);
			//合计
			$Totle.html("&yen" + parseFloat(num.toFixed(1)));
		}
	})
	//关闭小窗口
	$(".back-cover .retext .reclose").on("click", function() {
		$(".back-cover").addClass("nosee");
	})
	//取消按钮
	$(".back-cover .rebutton .resty-clo").on("click", function() {
		$(".back-cover").addClass("nosee");
	})
})