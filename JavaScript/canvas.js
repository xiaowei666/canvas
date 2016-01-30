function shape(canvas,canvas1,cobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.cobj=cobj;
    this.fillStyle="#fff";
    this.strokeStyle="#fff";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";
    this.arr = [];
    this.width = canvas.width;
    this.height= canvas.height;
}
shape.prototype= {
    init: function () {
        this.cobj.fillStyle = this.fillStyle;
        this.cobj.strokeStyle = this.strokeStyle;
        this.cobj.lineWidth = this.lineWidth;
    },
    line: function (x, y, x1, y1) {
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(x, y);
        that.cobj.lineTo(x1, y1);
        that.cobj.stroke();
        that.cobj.closePath();

    },
    rect: function (x, y, x1, y1) {
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.rect(x, y, x1 - x, y1 - y);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    arc: function (x, y, x1, y1) {
        var that = this;
        var r = Math.sqrt((x1 - x) * (x1 - x1) + (y1 - y) * (y1 - y));
        that.init();
        that.cobj.beginPath();
        that.cobj.arc(x, y, r, 0, Math.PI * 2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    five:function(x,y,x1,y1){
        var that = this ;
        var r = Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1= r/2 ;
        that.cobj.beginPath(x+r,y);
        for(var i = 0 ; i < 10 ; i++){
            if(i%2==0){
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1);
            }
        }
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    draw: function () {
        var that = this;
        that.canvas.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.canvas.style.cursor="crosshair";
            that.canvas.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.canvas1.width, that.canvas1.height);
                if (that.arr.length != 0) {
                    that.cobj.putImageData(that.arr[that.arr.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shapes](startx, starty, endx, endy);
            }
            that.canvas.onmouseup = function () {
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.arr.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height));
            }
        }

    },
    pen: function () {
        var that = this;
        that.canvas.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx, starty);
            that.canvas.onmousemove = function (e) {
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.lineTo(endx, endy);
                that.cobj.stroke();
            }
            that.canvas.onmouseup = function () {
                that.cobj.closePath();
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.arr.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height));
            }
        }
    },
    xp:function(xpobj,w,h){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            xpobj.css({
                display:"block",
                width:w,
                height:h
            });
            that.canvas.style.cursor="none";
            var lefts=ox-w/2;
            var tops=oy-h/2;
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-w){
                lefts>that.width-w;
            }
            if(tops<0){
                tops=0;
            }
            if(tops>that.height-h){
                tops>that.height-h;
            }
            xpobj.css({
                left:lefts,
                top:tops
            })
        }
        that.canvas.onmousedown=function(e){
            that.canvas.onmousemove=function(e){

                var ox= e.offsetX;
                var oy= e.offsetY;
                var lefts=ox-w/2;
                var tops=oy-h/2;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts>that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                xpobj.css({
                    display:"block",
                    left:lefts,
                    top:tops
                })
                that.canvas.style.cursor="none";
                that.cobj.clearRect(lefts,tops,w,h);
            }
            that.canvas.onmouseup=function(){
                that.canvas.style.cursor="pointer";
                xpobj.css({
                    display:"none"
                })
                that.arr.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }

    },

    select2:function(selectArryObj){
        var that= this ;
        that.canvas.onmousedown = function(e){
            var startx = e.offsetX;
            var starty = e.offsetY,minx,miny, w,h;

            that.canvas.onmousemove = function(e){
                var endx = e.offsetX;var endy = e.offsetY;
                minx = startx>endx?endx:startx;
                miny = starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectArryObj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h
                })
            }

        }
    },
    select:function(selectareaobj){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            that.init();
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny,w,h;
            that.canvas.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectareaobj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h
                })
            }
            that.canvas.onmouseup=function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.arr.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectareaobj);
            }
        }
    },
    drag:function(x,y,w,h,selectareaobj){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
            }
        }
        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
                return;
            }
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.cobj.width,that.cobj.height);
                if(that.arr.length!=0){
                    that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h
                }
                selectareaobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);
            }
            that.canvas.onmouseup=function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.drag(x,y,w,h,selectareaobj);
            }

        }

    }






}