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
