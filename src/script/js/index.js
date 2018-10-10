//1.导入模块的公用部分
!function ($) {
    $('.header').load('header.html', function () {
        $('.tb-nav .jujia').on('mouseover', function () {
            $('.jujia .icon-jiao').show();
            $('.subnav').show()
        });
        $('.tb-nav .jujia').on('mouseout', function () {
            $('.jujia .icon-jiao').hide();
            $('.subnav').hide()
        });

        function addCookie(key, value, day) {
            var date = new Date();//创建日期对象
            date.setDate(date.getDate() + day);//过期时间：获取当前的日期+天数，设置给date
            document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;//添加cookie，设置过期时间
        }
        function getCookie(key) {
            var str = decodeURI(document.cookie);
            var arr = str.split('; ');
            for (var i = 0; i < arr.length; i++) {
                var arr1 = arr[i].split('=');
                if (arr1[0] == key) {
                    return arr1[1];
                }
            }
        }
        function delCookie(key, value) {
            addCookie(key, value, -1);//添加的函数,将时间设置为过去时间
        }
        if (getCookie('UserName')) {
            $('.login').hide();
            $('.registor').hide();
            $('.loginyes').show();
            $('.admin').show().find('span').html('你好！' + getCookie('UserName') + "，欢迎光临本商城");
        }
        $('.admin a').on('click', function () {
            delCookie('UserName', '', -1);
            $('.admin').hide();
            $('.loginyes').hide();
            $('.login').show();
            $('.registor').show();
        });
    })
    $('.footer').load('footer.html');
}(jQuery);
!function ($) {
    var $btn = $('.item');
    var $content = $('.listbox1');
    $btn.on('click', function () {
        $(this).addClass('active').siblings('.item').removeClass('active');
        $content.eq($(this).index()).show().siblings('.listbox1').hide();
    });
}(jQuery);
!function ($) {
    // 轮播数据
    $.ajax({
        type: 'post',
        url: 'http://10.31.162.113/skz/you163/php/lunbo.php',
        success: function (data) {
            var $piclist = JSON.parse(data);
            console.log($piclist);
            var $str = '';
            $.each($piclist, function (index, value) {
                $str += `<li><a  href="javascript:;"><img src="${value.url}"></a></li>`;
            });
            $('.banner ul').html($str);
            var oBox = document.querySelector('.banner')
            var $oUl = $('.banner ul');
            var uLi = $oUl.children('li')
            var oLi = document.querySelectorAll('.banner ol li');
            var leftBtn = document.querySelector('.leftbtn');
            var rightBtn = document.querySelector('.rightbtn');
            var num = 0;
            var timer = null;
            for (var i = 0; i < uLi.length; i++) {
                oLi[i].index = i;
                oLi[i].onmouseover = function () {
                    num = this.index;
                    tab();
                }
            }
            leftBtn.onclick = function () {
                num--;
                if (num < 0) {
                    num = uLi.length - 1;
                }
                tab();
            }
            rightBtn.onclick = function () {
                num++;
                if (num > uLi.length - 1) {
                    num = 0;
                }
                tab();
            }
            function tab() {
                for (var j = 0; j < uLi.length; j++) {
                    oLi[j].className = '';
                    uLi[j].style.opacity = 0;
                }
                oLi[num].className = 'active';
                uLi[num].style.opacity = 1;
            }
            timer = setInterval(function () {
                rightBtn.onclick();
            }, 2000)
            oBox.onmouseover = function () {
                clearInterval(timer);
            }
            oBox.onmouseout = function () {
                timer = setInterval(function () {
                    rightBtn.onclick();
                }, 2000)
            }
        }
    });

}(jQuery);
// ------------------------------商品拼接----------------------------------
!function ($) {
    $.ajax({
        type: 'post',
        url: 'http://10.31.162.113/skz/you163/php/goodlist.php',
        success: function (data) {
            var $piclist = JSON.parse(data);
            console.log($piclist);
            var $str = '';
            $.each($piclist, function (index, value) {
                var $urlarr = value.url.split(',');
                console.log($urlarr[0]);
                $str += `<div class="m-product slick-slide"><div class="hd"><a href="details.html?${value.id}" class="imgWrap"><div style="width:100%;height:100%"><img class="img" src="${$urlarr[0]}"alt=""></div><div style="width:100%;height:100%"><img class="imgScene" src="${$urlarr[1]}" alt=""> </div><div><div class="colorNum">${value.color}</div></div></a></div><div class="bd"><div class="prdtTags"><span class="itemTag hot">${value.hot}</span><span class="itemTag">${value.tags}</span></div><h4 class="new-name"><a href=""><span>${value.title}</span></a></h4><div class="price"><span class="retailPrice">￥ ${value.price}</span> <span class="counterPrice">￥${value.cutprice}</span></div></div></div>`;
            });
            $('.slick-track').html($str);
            var $adnum = 1;
            $('.slick-right').on('click', function (ev) {
                if ($adnum < 2) {
                    $('.slick-track').animate({
                        "margin-left": $adnum * (-268 * 4)
                    });

                }
            });
            $('.slick-left').on('click', function (ev) {
                if ($adnum < 2) {
                    $('.slick-track').animate({
                        "margin-left": 0
                    });
                }
            })



        }

    })
}(jQuery);
!function ($) {
    $(function () {
        $('#regform').validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2,
                    maxlength: 10,
                    remote: {//将前端的name给后端
                        url: "http://10.31.162.113/skz/you163/php/reg.php",     //后台处理程序
                        type: "post"               //数据发送方式
                    }
                },
                password: {
                    required: true,
                    minlength: 6
                },
                repass: {
                    required: true,
                    equalTo: '#password'
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                username: {
                    required: '用户名不能为空',
                    minlength: '用户名不能小于2',
                    maxlength: '用户名不能大于10',
                    remote: '用户名已存在'
                },
                password: {
                    required: '密码不能为空'
                },
                repass: {
                    required: '密码重复不能为空'
                },
                email: {
                    required: '电子邮箱不能为空',
                    email: '你输入的格式有误'
                }
            }


        });


    });

    $.validator.setDefaults({
        /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
        success: function (label) {
            label.text('√').css('color', 'green').addClass('valid');
        }
    });


}(jQuery);
