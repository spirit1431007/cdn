"use strict";var canvas=document.getElementById("stars"),ctx=canvas.getContext("2d"),w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight,hue=217,stars=[],count=0,maxStars=2333;var canvas2=document.createElement("canvas"),ctx2=canvas2.getContext("2d");canvas2.width=100;canvas2.height=100;var half=canvas2.width/2,gradient2=ctx2.createRadialGradient(half,half,0,half,half,half);gradient2.addColorStop(0.025,"#fff");gradient2.addColorStop(0.1,"hsl("+hue+", 61%, 33%)");gradient2.addColorStop(0.25,"hsl("+hue+", 64%, 6%)");gradient2.addColorStop(1,"transparent");ctx2.fillStyle=gradient2;ctx2.beginPath();ctx2.arc(half,half,half,0,Math.PI*2);ctx2.fill();function random(min,max){if(arguments.length<2){max=min;min=0}if(min>max){var hold=max;max=min;min=hold}return Math.floor(Math.random()*(max-min+1))+min}function maxOrbit(x,y){var max=Math.max(x,y),diameter=Math.round(Math.sqrt(max*max+max*max));return diameter/2}var Star=function(){this.orbitRadius=random(maxOrbit(w,h));this.radius=random(60,this.orbitRadius)/12;this.orbitX=w/2;this.orbitY=h/2;this.timePassed=random(0,maxStars);this.speed=random(this.orbitRadius)/1431007;this.alpha=random(2,10)/10;count++;stars[count]=this};Star.prototype.draw=function(){var x=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,y=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY,twinkle=random(10);if(twinkle===1&&this.alpha>0){this.alpha-=0.05}else{if(twinkle===2&&this.alpha<1){this.alpha+=0.05}}ctx.globalAlpha=this.alpha;ctx.drawImage(canvas2,x-this.radius/2,y-this.radius/2,this.radius,this.radius);this.timePassed+=this.speed};for(var i=0;i<maxStars;i++){new Star()}function animation(){ctx.globalCompositeOperation="source-over";ctx.globalAlpha=0.8;ctx.fillStyle="hsla("+hue+", 64%, 6%, 1)";ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation="lighter";for(var i=1,l=stars.length;i<l;i++){stars[i].draw()}window.requestAnimationFrame(animation)}animation();

    //Star模式
(function(){
    var ocanvas=document.getElementById("stars");
    if(document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === ''){
        if(new Date().getHours() > 22 || new Date().getHours() < 6){
            document.body.classList.add('night');
            ocanvas.style.visibility="visible";
            document.cookie = "night=1;path=/";
            console.log('夜间模式开启');
        }else{
            document.body.classList.remove('night');
            ocanvas.style.visibility="hidden";
            document.cookie = "night=0;path=/";
            console.log('夜间模式关闭');
        }
    }else{
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if(night == '0'){
            document.body.classList.remove('night');
            ocanvas.style.visibility="hidden";
        }else if(night == '1'){
            document.body.classList.add('night');
            ocanvas.style.visibility="visible";
        }
    }
})();
//Star模式切换
function switchStarMode(){
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    var ocanvas=document.getElementById("stars");
    if(night == '0'  || ocanvas.style.visibility=="hidden"){
        document.body.classList.add('night');
        ocanvas.style.visibility="visible";
        document.cookie = "night=1;path=/"
        console.log('夜间模式开启');
    }else if(night == '1'  || ocanvas.style.visibility=="visible"){
        document.body.classList.remove('night');
        ocanvas.style.visibility="hidden";
        document.cookie = "night=0;path=/"
        console.log('夜间模式关闭');
    }
}


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

function checkPIOCookie() {
    var donotneed = getCookie("dontwantlive2d");
    if (donotneed != "") {
        if (donotneed == "yes") {
            $(".hide-live2d").css("visibility", "hidden");
            $(".prpr").css("visibility", "hidden");
            console.log("If you want to see live2d please clean cookie!");
        } else {
            pio();
        }
    } else {
        pio();
    }
}

function pio() {
    loadlive2d("live2d", "https://spirit143107.ooo/live2d/model/getmodel.php");
}
pio();

function switch_pio() {
        pio();
}

function save_pio() {
    window.Live2D.captureName = 'Screenshot-' + Date.now() + '.png';
    window.Live2D.captureFrame = true;
    addComment.createButterbar("保存成功！<br>Screenshot saved!", 1000);
}

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
    url: "https://cdn.jsdelivr.net/gh/spirit1431007/cdn@1.21/js/tips.json",
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
        } else if (domain == '2heng') {
            text = '只要微笑就可以了 ^_^';
        } else if (domain == 'google') {
            text = 'Hello! 来自 Google 的朋友<br>欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    } else {
        if (window.location.href == 'https://spirit143107.ooo/') {
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
        } else if (window.location.href == 'https://spirit143107.ooo/about/') {
            text = 'Do you like me? ヾ(≧?≦*)ゝ';
        } else {
            text = '欢迎阅读<span style="color:#E06020;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }
    showMessage(text, 12000);
})();
window.setInterval(showHitokoto, 30000);

function showHitokoto() {
    $.get('https://spirit143107.ooo/yan/', function (result) {
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
