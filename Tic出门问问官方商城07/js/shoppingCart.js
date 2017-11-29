$(document).ready(function() {
    //存放商品数量值
    var arr = [];
    //复选框和全选 上
    var $selectAll = $(".cart-cont-head .cart-checked-group .checkbox-btn");
    var $select;
    //全选下
    var $selectBot = $(".cart-cont-footer .confirm .checkbox-btn")
    //已选商品
    var $Sele = $(".cart-cont-footer .confirm .confirm-submit .quantity");
    var Selenum = 0;
    //数量减
    var $minus = $(".cart-cont-item .control .quantity-selector .icon-minus");
    //数量加
    var $add = $(".cart-cont-item .control .quantity-selector .icon-add");
    //小计
    var $littleT = $(".cart-cont-item .price");
    //合计
    var $Totle = $(".cart-cont-footer .price");
    var num = 0;
    var $number = $(".cart-cont-item .control input");

    //输出已选商品数和合计价格
    function numSelect() {
        //已选商品有几件
        $Sele.text(Selenum);
        //合计
        $Totle.html("&yen" + parseFloat(num.toFixed(1)));
    }
    //没有选中商品,底部计算输出
    function numNosele() {
        $Sele.text("0");
        $Totle.html("&yen0");
    }
    numNosele();
    //全选 
    function seleAll(name) {
        $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
        name.toggleClass("selected");
        if (name.hasClass("selected")) {
            $select.addClass("selected");
            isSelectAll();
            NumberAll();
            PriceAll();
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
    $(".cart-cont-item .checkbox-group .checkbox-btn").on("click", function() {
        $(this).toggleClass("selected");
        if (isSelectAll()) {
            $selectAll.addClass("selected");
            $selectBot.addClass("selected");
        } else {
            $selectAll.removeClass("selected");
            $selectBot.removeClass("selected");
        }
        NumberAll();
        PriceAll();
        numSelect();
    })
    //计算最后所选商品有几件
    function NumberAll() {
        Selenum = 0;
        $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
        $select.each(function() {
            if ($(this).hasClass("selected")) {
                var t = $(this).parents(".checkbox-group").siblings(".control").find("input").val();
                Selenum += parseInt(t);
            }
        });
        return Selenum;
    }
    //计算合计
    function PriceAll() {
        num = 0;
        $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
        $select.each(function() {
            if ($(this).hasClass("selected")) {
                var litt = parseFloat($(this).parents(".checkbox-group").siblings(".price").text().slice(1)).toFixed(1);
                num += parseFloat(litt);
            }
        })
        return num;
    }
    //判断是否全选
    function isSelectAll() {
        arr = [];
        $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
        $select.each(function() {
            if ($(this).hasClass("selected")) {
                $(this).parents(".cart-form-background").css("background-color", "#FFFBEA");
                arr.push($(this).parents(".cart-form-background")); //向数组中添加
            } else {
                $(this).parents(".cart-form-background").css("background-color", "#FFFFFF");
            }
        });
        if (arr.length == $("#cart-cont-list li").length - 1) {
            return true;
        } else {
            return false;
        }
        console.log(arr);
    }
    //删除商品
    var $deleself;
    $(".cart-cont ul li .delete").on("click", function() {
        $("#delbox").removeClass("nosee");
        $deleself = $(this);
    })
    //判断购物车是否清空
    function isEmpty() {
        if ($("#cart-cont-list li").length - 1 == 0) {
            $(".cart-cont-footer").hide();
            $("#cart-cont-list li").eq(0).show();
            $("#cart-cont-list").addClass("empty");
            $selectAll.removeClass("selected");
            $selectBot.removeClass("selected");
        } else {
            $("#cart-cont-list li").eq(0).hide();
            $("#cart-cont-list").removeClass("empty");
            if (isSelectAll()) {
                $selectAll.addClass("selected");
                $selectBot.addClass("selected");
            } else {
                $selectAll.removeClass("selected");
                $selectBot.removeClass("selected");
            }
        }
    }
    //删除弹窗的确定
    $("#delbox .resty-sub").on("click", function() {
        $deleself.parents("li").remove();
        isEmpty();
        NumberAll();
        PriceAll();
        numSelect();
        $(".back-cover").addClass("nosee");
        console.log($("#cart-cont-list li"))
    })
    //删除选中商品
    $("#yhsd-cart-delete").on("click", function() {
        $select = $(".cart-cont-item .checkbox-group .checkbox-btn");
        $select.each(function() {
            if ($(this).hasClass("selected")) {
                $(this).parents("li").remove();
            }
        });
        isEmpty();
        NumberAll();
        PriceAll();
        numSelect();
    })
    //数量减
    $minus.on("click", function() {
        var t = parseInt($(this).siblings("input").val());
        if (t > 1) {
            $(this).siblings("input").val(t - 1);
            //单价
            var up = parseFloat($(this).parents(".control").siblings(".unit-price").text().slice(1));
            //m为小计的计算结果
            var m = up * parseInt($(this).siblings("input").val());
            //小计的值
            $(this).parents(".control").siblings(".price").html("&yen" + m.toFixed(1));
        }
        NumberAll();
        PriceAll();
        numSelect();
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
        $(this).parents(".control").siblings(".price").html("&yen" + m.toFixed(1));
        NumberAll();
        PriceAll();
        numSelect();
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