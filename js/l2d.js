//live2d

function hide_live2d() {
    if (getCookie("live2d") == "Hide") {
        setTimeout(function () {
            $(".prpr").css("visibility", "hidden");
            if (document.body.clientWidth > 860) {
                $(".hide-live2d").css("bottom", "66px");
                $(".save-live2d, .switch-live2d").addClass("hide-live2d-tool");
            }
            $(".hide-live2d .keys").html("Show");
            setCookie("live2d", "Show", 7);
        }, 00);
    } else {
        setTimeout(function () {
            $(".prpr").css("visibility", "visible");
            if (document.body.clientWidth > 860) {
                $(".hide-live2d").css("bottom", "156px");
                $(".save-live2d, .switch-live2d").removeClass("hide-live2d-tool");
            }
            $(".hide-live2d .keys").html("Hide");
            setCookie("live2d", "Hide", 7);
        }, 00);
    }
}

mashiro_global.ini.live2d = function () {
    if (!getCookie("live2d")) setCookie("live2d", "Hide", 7);
    if (getCookie("live2d") == "Show") {
        setCookie("live2d", "Hide", 7);
        hide_live2d();
    }
}
mashiro_global.ini.live2d();

function checkPIOCookie() {
    var donotneed = getCookie("dontwantlive2d");
    if (donotneed != "") {
        if (donotneed == "yes") {
            $(".hide-live2d").css("visibility", "hidden");
            $(".prpr").css("visibility", "hidden");
            console.log("If you want to see live2d please clean cookie!");
        } else {
            loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.39/img/live2d/appv4.json");
        }
    } else {
        loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.39/img/live2d/appv4.json");
    }
}

function pio() {
    loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.39/img/live2d/appv4.json");
}
pio();

function switch_pio() {
    if (isIE || isEdge) {
        addComment.createButterbar("此功能不支持您的浏览器<br>Feature cannot work on your browser");
        return false;
    } else if (isChrome) {
        pio();
    } else if (isSafari) {
        addComment.createButterbar("此功能不支持您的浏览器<br>Feature cannot work on your browser");
        return false;
    } else {
        pio();
    }
}

function save_pio() {
    window.Live2D.captureName = 'Screenshot-' + Date.now() + '.png';
    window.Live2D.captureFrame = true;
    addComment.createButterbar("保存成功！<br>Screenshot saved!", 1000);
}
if (!window.is_app) {
    var userAgent = navigator.userAgent;
    console.log('userAgent = ' + userAgent);
    console.log('window inner size: ' + window.innerWidth + ' x ' + window.innerHeight);
    var isOpera = userAgent.indexOf("Opera") > -1;
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
    var isEdge = userAgent.indexOf("Edge") > -1;
    var isSafari = userAgent.indexOf("Safari") > -1;
    if (isIE || isEdge) {
        Live2D_img_path = 'https://spiritx.xyz/live2d/model/getmodel.php';
        loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.39/img/live2d/model-default.json");
    } else if (isChrome) {
        pio();
    } else if (isSafari) {
        Live2D_img_path = 'https://spiritx.xyz/live2d/model/getmodel.php';
        loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.39/img/live2d/model-default.json");
    } else {
        pio();
    }
};

function render(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function (context) {
    return render(this, context);
};
var re = /x/;
re.toString = function () {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};
$(document).on('copy', function () {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
});
$.ajax({
    cache: true,
    url: "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.35/js/tips.json",
    dataType: "json",
    success: function (result) {
        $.each(result.mouseover, function (index, tips) {
            $(document).on("mouseover", tips.selector, function () {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({
                    text: $(this).text()
                });
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips) {
            $(document).on("click", tips.selector, function () {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({
                    text: $(this).text()
                });
                showMessage(text, 5000);
            });
        });
    }
});
(function () {
    var text;
    if (document.referrer !== '') {
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hello! 来自 <span style="color:#E06020;">' + referrer.hostname + '</span> 的朋友~';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hello! 从 百度 进来的朋友<br>欢迎阅读<span style="color:#E06020;';
        } else if (domain == 'so') {
            text = 'Hello! 用 360搜索 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
        } else if (domain == 'sogou') {
            text = 'Hello! 用 搜狗搜索 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
        } else if (domain == 'bing') {
            text = 'Hello! 用 必应 找到我的朋友<br>欢迎阅读<span style="color:#E06020;';
        } else if (domain == 'github') {
            text = '来自GitHub的大佬吗？<br>给大佬递茶。';
        } else if (domain == 'google') {
            text = 'Hello! 来自 Google 的朋友<br>欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    } else {
        if (window.location.href == 'https://spiritx.xyz/') {
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起得来嘛?';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛？不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，幸福地睡个午觉吧？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外的夕阳很美丽呢~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        } else if (window.location.href == 'https://spiritx.xyz/about/') {
            text = 'Do you like me? ヾ(≧?≦*)ゝ';
        } else {
            text = '欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }
    showMessage(text, 12000);
})();
window.setInterval(showHitokoto, 30000);

function showHitokoto() {
    $.get('https://spiritx.xyz/yan/', function (result) {
        showMessage(result, 16000);
    });
}

function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
    $('.mashiro-tips').stop();
    $('.mashiro-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout) {
    $('.mashiro-tips').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    $('.mashiro-tips').delay(timeout).fadeTo(200, 0);
}


mashiro_global.ini.live2d;
