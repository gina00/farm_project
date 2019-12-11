$(document).ready(function () {

    // 显示用户登录菜单
    var userUlClickIndex = 0;
    $("#showUserBox").click(function () {
        userUlClickIndex++;
        if (userUlClickIndex % 2 !== 0) {
            $("#user_more_ul").show();
            $(this).addClass("selected");
            $("#cart").removeClass("cart").addClass("carted");
        }
        else{
            $(this).removeClass("selected");
            $("#cart").removeClass("carted").addClass("cart");
            $("#user_more_ul").hide();
        }
    })

    // 控制左侧菜单显隐
    $("#firstpane .menu_body:eq(0)").show();
    $("#firstpane div.menu_head").click(function () {
        $(this).addClass("current").next("ul.menu_body").slideToggle(300).siblings("ul.menu_body").slideUp("slow");
        $(this).siblings().removeClass("current");
    });
    $("#secondpane .menu_body:eq(0)").show();
    $("#secondpane div.menu_head").mouseover(function () {
        $(this).addClass("current").next("ul.menu_body").slideDown(500).siblings("ul.menu_body").slideUp("slow");
        $(this).siblings().removeClass("current");
    });
    var mainNav = $("#main_nav li");
    var mainUlBoxWidth = $("#ul-box").width();
    var liWidth = 0;
    for (var i = 0; i < mainNav.length; i++) {
        //单个li的宽度，需要累加与总ul宽度对比。取出i值
        liWidth += $(mainNav[i]).width();
        if (liWidth > mainUlBoxWidth) {
            $("#link_more").css("display", "block");
            $("#moreBox").css("display", "block");
            $("#more_ul").append(mainNav[i]);

            var clickIndex = 0;
            $("#link_more").click(function () {
                if (clickIndex % 2 == 0) {
                    $("#more_ul").hide();
                    clickIndex++;
                } else {
                    $("#more_ul").show();
                    clickIndex = 0;
                }
            });
        } else {
            $("#link_more").css("display", "none");
        }

    }
    // 面包屑功能
    showNav();
    var breadCrumbLiIndex = 0; //控制面包屑左右按钮变量
    var breadCrumbInit = $("#breadCrumbBox ul li").length; //初始化面包屑数量

    var breadCrumbList = $("#breadCrumbBox ul li"); //已经存在面包屑数组
    var breadObjArr = []; //已经创建的面包屑对象数组
    // 创建面包屑
    var menuList = $("#firstpane .menu_body li"); //左侧列表组
    var breadCrumbBox = $("#breadCrumbBox");
    var breadCrumbUl = $("#breadCrumbBox ul");
    var breadCrumbBoxWidth = $(breadCrumbBox).width(); //面包屑容器宽度
    // 默认展示的面包屑
    for (var i = 0; i < breadCrumbList.length; i++) {
        breadObjArr.push($(breadCrumbList[i]).text().trim());
    }
    for (var i = 0; i < menuList.length; i++) {
        // 点击左侧菜单，新增面包屑
        $(menuList[i]).click(function () {
            var newBreadCrumb = $(
                "<li id='bread-crumb-li-" + breadCrumbInit + "'>" +
                "<a class='breadCrumbText'>" +
                $(this).text() +
                "</a>" +
                "<i class='icon-close'></i>" +
                "</li>"
            );
            // 已经存在的面包屑跳过创建
            for (var i = 0; i < breadObjArr.length; i++) {
                if (breadObjArr[i] == $(this).text()) {
                    return;
                }

            }
            //点击菜单创建面包屑，存放数组
            breadObjArr.push($(this).text());
            $("#breadCrumbBox ul").append(newBreadCrumb); //添加面包屑元素
            breadCrumbInit += 1; //面包屑数量

            removeBreadCrumb();

            var breadCrumbLi = $("#breadCrumbBox ul li"); //面包屑列表组
            var left = parseInt($(breadCrumbUl).css('left')); //ul向左偏移量
            var breadCrumbUlWidth = $(breadCrumbLi).width() * breadCrumbLi.length; //ul宽度

            for (var i = 0; i < breadCrumbLi.length; i++) {
                breadCrumbLi[i].onclick = function () {
                    this.className = "current";
                    $(this).siblings().removeClass("current");
                }
            }

            // 判断ul宽度与外部容器

            left += $(breadCrumbLi).width(); //向左偏移值递增
            $(breadCrumbUl).css("width", breadCrumbUlWidth + "px");

            if (breadCrumbUlWidth > breadCrumbBoxWidth) {
                $("#leftbtn").css("display", "block");
            }
            if (breadCrumbUlWidth + left >= breadCrumbBoxWidth) {
                $("#rightbtn").css("display", "block");
            } else {
                $("#rightbtn").css("display", "none");
            }
        })
        removeBreadCrumb();
    }

    $("#leftbtn").click(function () {
        breadCrumbLiIndex -= 1;
        //面包屑已经是最左测
        if (breadCrumbLiIndex <= 0) {
            breadCrumbLiIndex = 0;
            $("#leftbtn").css("display", "none");
        } else {
            $("#leftbtn").css("display", "block");
        }
        if (breadCrumbLiIndex < breadCrumbInit) {
            $("#rightbtn").css("display", "block");
        }
        showPics(breadCrumbLiIndex);


    });
    $("#rightbtn").click(function () {
        breadCrumbLiIndex += 1;
        //面包屑达到最右侧,自动回退到最左
        if (breadCrumbLiIndex == breadCrumbInit) {
            breadCrumbLiIndex = 0;
            $("#leftbtn").css("display", "none");
            $("#rightbtn").css("display", "block");
        }
        if (breadCrumbLiIndex > 0) {
            $("#leftbtn").css("display", "block");
        }
        showPics(breadCrumbLiIndex);
    });

    // 删除面包屑功能
    function removeBreadCrumb() {
        // 关闭面包屑按钮操作
        var closeBtn = $("#breadCrumbBox ul li .icon-close");
        for (var i = 0; i < closeBtn.length; i++) {
            $(closeBtn[i]).click(function () {
                breadCrumbInit -= 1;
                $(this).parent().remove();
                if (breadCrumbInit < 0) {
                    breadCrumbInit = 0;
                }
            })

        }
    }
    // 选项卡


});
//  面包屑偏移函数
function showPics(breadCrumbLiIndex) {
    var sWidth = $("#breadCrumbBox ul li").width();
    var nowLeft = -breadCrumbLiIndex * sWidth + 20;
    $("#breadCrumbBox ul").animate({
        "left": nowLeft
    }, 300);
    console.log('showPics' + breadCrumbLiIndex);
}
// 左侧菜单显隐
function showNav() {
    $("#hideNavbtn").click(function () {
        $(".menu_logo,.menu_head").css("width", '60px');
        $(".menu_head").css("padding-left", '15px');
        $(".menu_logo span").css("display", 'none');
        $(".menu_head a").css("display", 'none');
        $(".menu_body ").css("display", 'none');
        $("#hideNavbtn").css("display", 'none');
        $("#showNavbtn").css("display", 'block');
        $("#firstpane").parent().removeClass("col-md-2").addClass("col-md-1");
        $("#firstpane").addClass("hideFirstpanel");
        $(".right_content").removeClass("col-md-10").addClass("col-md-11");
        $(".menu_head").css("background", "#008100");
        $(".menu_body").addClass("menu-body-hide");
    })
    $("#showNavbtn").click(function () {
        $("#firstpane .menu_body:eq(0)").show();
        $(".menu_logo,.menu_head,.menu_body").css("width", '226px');
        $(".menu_head").css("padding-left", '23px');
        $(".menu_logo span").css("display", 'inline-block');
        $(".menu_head a").css("display", 'inline-block');
        $(".current .menu_body").css("display", 'block');
        $("#showNavbtn").css("display", 'none');
        $("#hideNavbtn").css("display", 'block');
        $("#firstpane").parent().removeClass("col-md-1").addClass("col-md-2");
        $("#firstpane").removeClass("hideFirstpanel");
        $(".right_content").removeClass("col-md-11").addClass("col-md-10");
        $(".menu_head").css("backgroundColor", "#008100");
        $(".menu_head").css("background-image", "url(./images/icon_3.png)");
        $(".menu_head").css("background-position", "90% 45%");
        $(".menu_head").css("background-repeat", "no-repeat");
        $(".menu_head.current").css("backgroundColor", "#008100");
        $(".menu_head.current").css("background-image", "url(./images/icon_4.png)");
        $(".menu_head.current").css("background-position", "90% 45%");
        $(".menu_head.current").css("background-repeat", "no-repeat");
        $(".menu_body").removeClass("menu-body-hide");
    })
}

// function changeFrameHeight() {
//     var ifm = document.getElementById("iframepage");
//     ifm.height = document.documentElement.clientHeight;

// }
// window.οnresize=function(){  
//     changeFrameHeight();  

// } 