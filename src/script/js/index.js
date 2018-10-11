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
        dataType: 'json'
    }).done(function (data) {
        var $str = '';
        $.each(data, function (index, value) {
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
    })
}(jQuery);
// ------------------------------商品拼接----------------------------------
!function ($) {
    $.ajax({
        type: 'post',
        url: 'http://10.31.162.113/skz/you163/php/goodlist.php',
        dataType: 'json'
    }).done(function (data) {
        var $str = '';
        $.each(data, function (index, value) {
            var $urlarr = value.url.split(',');
            $str += `<div class="m-product slick-slide"><div class="hd"><a target="_blank" href="details.html?id=${value.id}" class="imgWrap"><div style="width:100%;height:100%"><img class="img" src="${$urlarr[0]}"alt=""></div><div style="width:100%;height:100%"><img class="imgScene" src="${$urlarr[1]}" alt=""> </div><div><div class="colorNum">${value.color}</div></div></a></div><div class="bd"><div class="prdtTags"><span class="itemTag hot">${value.hot}</span><span class="itemTag">${value.tags}</span></div><h4 class="new-name"><a href=""><span>${value.title}</span></a></h4><div class="price"><span class="retailPrice">￥ ${value.price}</span> <span class="counterPrice">￥${value.cutprice}</span></div></div></div>`;
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
    })
    $.ajax({
        type: 'GET',
        url: 'http://10.31.162.113/skz/you163/php/datails.php',
        data: {
            id: location.search.substring(1).split('=')[1]
        },
        dataType: 'json'
    }).done(function (data) {
        var $strM = '';
        var $j = 2;
        var $urlarrM = data.url.split(',');
        $.each(data, function (index, value) {
            if ($j < $urlarrM.length)
                $strM += `<img style="display:none;" class="img" src="${$urlarrM[$j]}" alt="">`;
            $j++;
        });
        var $strS = '';
        var $i = 0;
        var $urlarrS = data.surl.split(',');
        $.each(data, function (index, value) {
            if ($i < $urlarrS.length) {
                $strS += `<li class="MimgList"><a href="javascript:;">
                <img src="${$urlarrS[$i]}" alt="">
            </a></li>`;
                $i++;
            }
        });
        var $titleHD = '';
        $.each(data, function (index, value) {
            $titleHD = `<div class="detailTag">
              <span class="detailTag newTag">${data.hot}</span>
          </div>
          <div class="detailname">
              <span>${data.title}</span>
          </div>
          <div class="desc">${data.btitle}</div>`
        });
        var $PriceDate = '';
        var $TagsData = '';
        var $IntegralData = '';
        $.each(data, function (index, value) {
            $PriceDate = `<span class="rp-num">${data.price}</span>`
            $TagsData = `<div class="activityType">${data.tags}</div>`
            $IntegralData = `<span style="color:red">${data.integral}</span><span> 积分</span> `
        });
        if (data.colortype) {
            var $colorType = '';
            var $m = 0;
            $.each(data, function (index, value) {
                var $colorarr = data.colortype.split(',')
                if ($m < $colorarr.length) {
                    $colorType += `<li class="tab-con">
                <a href="javascript:;" class="tab tab-txt">
                    <span class="txt">${$colorarr[$m]}</span>
                </a>
            </li>`
                    $m++;
                }
            });
            $('.tabs').html($colorType);
        } else {
            $('#color').hide();
        }
        if (data.size) {
            var $sizeType = '';
            var $n = 0;
            $.each(data, function (index, value) {
                var $sizearr = data.size.split(',')
                if ($n < $sizearr.length) {
                    $sizeType += `<li class="tab-con">
                <a href="javascript:;" class="tab tab-txt">
                    <span class="txt">${$sizearr[$n]}</span>
                </a>
            </li>`
                    $n++;
                }
            });
            $('.sizetabs').html($sizeType);
        } else {
            $('#size').hide();
        }

        $('.detailist ul ').html($strS);
        $('.view').html($strM);
        $('.intro').html($titleHD);
        $($PriceDate).appendTo('.rp');
        $($TagsData).prependTo('.saleLine');
        $($IntegralData).appendTo('.pointCt');


        var $imglist = $('.view').children('.img');
        $($imglist[0]).show();
        var $Mimglist = $('.detailist ul').children('.MimgList')
        $($Mimglist).on('mouseover', function (ev) {
            $($Mimglist).eq($(this).index()).addClass('z-active').siblings($($Mimglist)).removeClass('z-active')
            $($imglist).eq($(this).index()).show().siblings($($imglist)).hide();
        })
    });
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


                    required: '密码不能为空',
                    minlength: '密码不能小于6'
                },
                repass: {
                    required: '密码重复不能为空',
                    equalTo: '密码不一致，请重新输入'
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
        success: function (div) {
            div.html('√').css({ 'color': 'green' }).addClass('valid');
        }
    });


}(jQuery);
