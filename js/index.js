/**
 * Created by a9842 on 2016/11/5.
 */
//导航栏
(function () {
    function dhl(id, cName) {
        $$(id).on('click', toggle);
        function toggle() {
            $$(id).removeClass(cName);
            $$(this).addClass(cName);
        }
    }

    new dhl('#m-nav li a', 'active');
    new dhl("#b-nav li a", 'active');
})();
//小轮播图
(function () {
    var i = 0;
    var j = 1;
    var a = -656 + 'px';
    var b = -11 + 'px';
    var c = 634 + 'px';
    var flag = true;
    $$("#die_banner .a-lt").on('click', lbt);
    $$("#die_banner .a-rt").on('click', rbt);
    function lbt(e) {
        $$.preventDefault(e);
        if (flag) {
            flag = false;
            $$('#die_banner .banners ul').eq(j).css('left', a);
            $$('#die_banner .banners ul').eq(i).animate({left: c}, 1000, 'linear');
            $$('#die_banner .banners ul').eq(j).animate({left: b}, 1000, 'linear', tf);
            kzq('+');
        }
    }

    function rbt(e) {
        $$.preventDefault(e);
        if (flag) {
            flag = false;
            $$('#die_banner .banners ul').eq(j).css('left', c);
            $$('#die_banner .banners ul').eq(i).animate({left: a}, 1000, 'linear');
            $$('#die_banner .banners ul').eq(j).animate({left: b}, 1000, 'linear', tf);
            kzq('-');
        }
    }

    function tf() {
        flag = true;
    }

    function kzq(fh) {
        if (fh == '-') {
            i--;
            j--;
            if (j < 0) {
                j = 1;
            }
            if (i < 0) {
                i = 1;
            }
        } else if (fh == '+') {
            i++;
            j++;
            if (j > 1) {
                j = 0;
            }
            if (i > 1) {
                i = 0;
            }
        }
    }
})();

//主页大轮播图
(function () {
    var dimg = ["img/banner/bg_01.jpg", "img/banner/bg_02.jpg", "img/banner/bg_03.jpg", "img/banner/bg_04.jpg", "img/banner/bg_05.jpg", "img/banner/bg_06.jpg", "img/banner/bg_07.jpg", "img/banner/bg_08.jpg"];
    var iimg = ["img/banner/banner_01.jpg", "img/banner/banner_02.jpg", "img/banner/banner_03.jpg", "img/banner/banner_04.jpg", "img/banner/banner_05.jpg", "img/banner/banner_06.jpg", "img/banner/banner_07.jpg", "img/banner/banner_08.jpg"];
    var i = 0;
    var flag = true;
    var tt = "";
    bd();
    //初始化绑定
    function bd() {
        xd(i);
        setSit();
        //自动轮播控制
        $$('#m_banner').on('mouseout', setSit);
        $$('#m_banner').on('mouseover', clearSit);
        //左右方向控制
        $$('#m_banner .b-l').on('click', bl);
        $$('#m_banner .b-r').on('click', br);
        //小点控制
        $$('#m_banner .b-tods a').on('click', xiaoD);
    }

    //控制小点样式
    function xd(i) {
        $$('#m_banner .b-tods a').removeClass('active');
        $$('#m_banner .b-tods a').eq(i).addClass('active');
    }

    //向左
    function bl() {
        kzq('-');
        change();
    }

    //向右
    function br() {
        kzq("+");
        change();
    }

    //小点点击
    function xiaoD(e) {
        i = $$(this).index();
        change();
    }

    //改变
    function change() {
        $$('#m_banner').css('backgroundImage', 'url(' + dimg[i] + ')');
        $$('#m_banner img').attr('src', iimg[i]);
        xd(i);
    }

    //控制展图片示序号
    function kzq(fh) {
        if ('-' == fh) {
            i--;
            if (i < 0) {
                i = 7;
            }
        } else if ('+' == fh) {
            i++;
            if (i > 7) {
                i = 0;
            }
        }
    }

    //自动播放，背景透明后执行函数
    function tf() {
        kzq("+");
        change();
        $$('#m_banner img').animate({opacity: 1}, 200, 'linear');
        flag = true;
    }

    //开启定时器
    function setSit() {
        tt = setInterval(function () {
            if (flag) {
                flag = false;
                $$('#m_banner img').animate({opacity: 0}, 800, 'linear', tf);
            }
        }, 6000);
    }

    //关闭定时器
    function clearSit() {
        clearInterval(tt);
    }
})();

//播放器样式
(function () {
    $$('#play .kz-p').click(function () {
        $$(this).toggleClass('kz-play');
    });
    $$('#g_play .a-suo').click(function () {
        if ($$(this).hasClass('suo-click')) {
            $$(this).removeClass('suo-click');
            $$('#g_play').on('mouseleave', fn2);
        } else {
            $$(this).addClass('suo-click');
            $$('#g_play').un('mouseleave', fn2);
        }
    });
    $$('#g_play').on('mouseover', fn1).on('mouseleave', fn2);
    var flag = true;

    function fn1() {
        var h = $$(this).css('bottom');
        if (flag && h != '0px') {
            flag = false;
            $$(this).animate({bottom: 0}, 200, 'linear', ft);
        }
    }

    function fn2() {
        if (flag) {
            flag = false;
            $$(this).animate({bottom: -45}, 200, 'linear', ft);
        }
    }

    function ft() {
        flag = true;
    }
})();
//播放器进度条
(function () {
    var pl = $$('.tiao')[0].offsetLeft;
    var pw = $$('.tiao')[0].offsetWidth;
    //进度条点击
    $$('.tiao').on('click', getWidth);
    function getWidth(e) {
        var x = $$.getEvent(e).clientX;
        var w = Math.ceil((x - pl) / pw * 100);
        if (x >= pl && x <= (pl + pw)) {
            $$('.t-btn').css('left', x - pl + 'px');
            $$('.t-red').css('width', w + '%');
        }
    }

    var bx = null;
    var px = 0;
    $$('.t-btn').on('mousedown', getX);
    $$('#g_play').on('mousemove', setX);
    //$$('#g_play').on('mousemoup', clearX);
    document.onmouseup = clearX;
    function getX(e) {
        this.ondragstart = function () {
            return false;
        };
        bx = $$.getEvent(e).clientX;
        px = parseFloat($$(this).css('left'));
    }

    function setX(e) {
        if (bx) {
            var x = $$.getEvent(e).clientX;
            var w = Math.ceil((px + x - bx) / pw * 100);
            if (x >= pl && x <= (pl + pw)) {
                $$('.t-btn').css('left', px + x - bx + 'px');
                $$('.t-red').css('width', w + '%');
            }
        }
    }

    function clearX() {
        bx = null;
        px = 0;
    }

})();

//top按钮
(function () {
    window.onscroll = function () {
        //console.log(window.scrollY);
        var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (y > 50) {
            $$('#g_back').show();
        } else {
            $$('#g_back').hide();
        }
    };
})();

//登录
(function () {
    $$('.m-login').on('mouseover', fnShow).on('mouseleave', fnHide);
    function fnShow() {
        $$('.login-inner').show();
    }

    function fnHide() {
        $$('.login-inner').hide();
    }
})();

//登录框
(function () {
    function showDl(e) {
        $$.preventDefault(e);
        $$('#dl-tp').show();
    }

    function hideDl() {
        $$('#dl-tp').hide();
        $$('.denglu').css({left: '50%', top: '150px'});
    }

    $$('#a-login').click(showDl);
    $$('#user_login').click(showDl);
    $$('.dl-close').click(hideDl);
})();

//登录框移动
(function () {
    $$('.dl-top').on('mousedown', get).on('mousemove', move);
    $$('#dl-tp').on('mouseup', clear);
    var x = 0;
    var y = 0;
    var flag = false;

    function get(e) {
        this.ondragstart = function () {
            return false;
        };
        flag = true;
        var event = $$.getEvent(e);
        x = event.x - ($$('.denglu')[0]['offsetLeft']-parseFloat($$('.denglu').css('marginLeft')));
        y = event.y - $$('.denglu')[0]['offsetTop'];
        //x = event.x - $$('.denglu')[0]['offsetLeft'];
        //y = event.y - $$('.denglu')[0]['offsetTop'];
        //console.log($$('.denglu')[0]['offsetLeft']-parseFloat($$('.denglu').css('marginLeft')), $$('.denglu')[0]['offsetTop']);
        //console.log(parseFloat($$('.denglu').css('left')), parseFloat($$('.denglu').css('top')));
    }

    function move(e) {
        if (flag) {
            var event = $$.getEvent(e);
            var nx = event.x - x;
            var ny = event.y - y;
            $$('.denglu').css({top: ny + 'px', left: nx + 'px'});
        }
    }

    function clear() {
        flag = false;
        x = 0;
        y = 0;
    }
})();