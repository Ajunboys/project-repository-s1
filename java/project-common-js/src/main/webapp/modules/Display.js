var VvWork = VvWork || {};

/**
 * The VvWork display. The display does not deal with the VvWork
 * protocol, and instead implements a set of graphical operations which
 * embody the set of operations present in the protocol. The order operations
 * are executed is guaranteed to be in the same order as their corresponding
 * functions are called.
 * 
 * @constructor
 */
VvWork.Display = function(managerClient) {

    /**
     * Reference to this VvWork.Display.
     * @private
     */
    var guac_display = this;

    
    var displayWidth = 0;
    var displayHeight = 0;
    
    
    var displayScale = 1;
    
    if(!!!!managerClient){
    	displayScale = managerClient.lastScale;
    }
    
    if(!!!!tools) {
    	try{
        	
    		var clientController = tools.clientApplicationAngularObj();
        	
        	if(!!!!clientController && clientController != null){
            	
        		var clientLastScale = clientController.getClientLastScale();
            	
            	if(!!!clientLastScale) clientLastScale = 1;
            	
            	
            	displayScale = clientLastScale;
            	
            	Log.i("init scale:" + displayScale);
        	}        	
        	        	
    	}catch(e){
    		
    	}
    }
    
    var uiToolsDisplay = document.createElement("div");
    uiToolsDisplay.className = "client-view-ui";
    uiToolsDisplay.style.position = "fixed";
    
    
    var mousePointDisplay = document.createElement("div");
    mousePointDisplay.className = "client-view-mouse-point";
    
    var whirlElementCanvas = document.createElement("canvas");
    whirlElementCanvas.className = "client-view-whirl";
    //whirlElementCanvas.style.position = "fixed";
    var rippleElementCanvas = document.createElement("canvas");
    rippleElementCanvas.className = "client-view-ripple";
    //className = "client-view-ripple cssload-loader";
    
    //rippleElementCanvas.style.position = "fixed";
    
    
    var elementSsoCanvas = document.createElement("canvas");
      elementSsoCanvas.className = "client-view-sso";
    
    var wh = 96;
    var ssoW = window.innerWidth;
    var ssoH = window.innerHeight;
//    var ssoW = 2000;
//    var ssoH = 2000;
    /*
    rippleElementCanvas.style.width = 
    whirlElementCanvas.style.width = 
    		window.innerWidth + "px";
    	
    rippleElementCanvas.width = 
    whirlElementCanvas.width = 
    		window.innerWidth;
    	
    rippleElementCanvas.style.height = 
    whirlElementCanvas.style.height = 
    	window.innerHeight + "px";

    rippleElementCanvas.height = 
    whirlElementCanvas.height = 
    	window.innerHeight;
    */
    
    
    elementSsoCanvas.style.width = ssoW + "px";
    rippleElementCanvas.style.width = 
    whirlElementCanvas.style.width =  wh + "px";
    	
    elementSsoCanvas.width = ssoW;
    rippleElementCanvas.width = 
    whirlElementCanvas.width =  wh;
    	
    elementSsoCanvas.style.height = ssoH + "px";
    rippleElementCanvas.style.height = 
    whirlElementCanvas.style.height = wh + "px";

    elementSsoCanvas.height =  ssoH;
    rippleElementCanvas.height = 
    whirlElementCanvas.height = wh;
    
    
    /**
     * sso定位框
     */
    var ssoObj = function(element){
    	
    	
    	var sso = this;
    	var clientX ,clientY = 0;
    	var buttonX ,buttonY = 0;
    	var stepClear=1;
    	
    	/**
    	 * 波纹长度
    	 * @param {Number} L
    	 */
    	var H = 20;//14
    	var W = 80;//60
    	var L = 10;//8
    	var ZH = 15;//中心正方形10
    	var CW = 13;//需要擦掉的中心正方形6
    	
    	var AH = 60;//提示框长方形高
    	var AL = 160;//提示框长方形长
    	var AW = 2;//提示框正方形划线宽度
    	var AR = 30;//圆形半径
    	
    	
    	/**
    	 * @returns {Element} ripple element
    	 */
    	var getSso = function() {
    		
    		return element;
    	};
    
    //画图	
	this.drawSso = function(clientX, clientY,data,ssoScale,last,isUser) {
		
	
			var x = clientX;
			var y = clientY;
			var ssoScale = 1;
			
			sso.hide();
    		element.style.display = "block";
    		element.style.visibility = "visible";
    		var ctx = getSso().getContext("2d"); 
    		if(data==""){
    			sso.setBg(ssoW,ssoH,ssoScale,ctx);
    			this.clientX = clientX;
    			this.clientY = clientY;
			} else if(data == "no"){
    			if(ssoW > ssoH){
    				if(ssoScale > 1){
    					ctx.clearRect(0, 0, ssoW * ssoScale, ssoW * ssoScale);
    				} else {
    					ctx.clearRect(0, 0, ssoW, ssoW);
    				}
    			} else {
    				if(ssoScale > 1){
    					ctx.clearRect(0, 0, ssoH * ssoScale, ssoH * ssoScale);
    				} else {
    					ctx.clearRect(0, 0, ssoH, ssoH);
    				}

    			}
				return ; 
			}
    		ctx.beginPath();  		
    	/*if(isUser && data != ""){

    			ctx.clearRect(x - W*ssoScale, y - H*ssoScale, W*2*ssoScale, 1);
    			ctx.clearRect(x + W*ssoScale, y - H*ssoScale, 1, H*2*ssoScale+2);
    			ctx.clearRect(x - W*ssoScale, y + H*ssoScale, W*2*ssoScale, 1);
    			ctx.clearRect(x - W*ssoScale, y - H*ssoScale, 1, H*2*ssoScale);
    		} else {
    			ctx.clearRect(x - W*ssoScale, y - H*ssoScale, W*2*ssoScale, H*2*ssoScale); 
                
    		}*/
    		
    		//管理员采集坐标才执行
    		if(!isUser){
    			H = 14;
    	    	W = 60;
    	    	L = 8;
    	    	ZH = 10;//中心正方形
    	    	CW = 10;//需要擦掉的中心正方形
    			ctx.clearRect(x - W*ssoScale, y - H*ssoScale, W*2*ssoScale, H*2*ssoScale); 
    			//中心圆圈
//        		ctx.arc(x,y,2*ssoScale,0,Math.PI*2);
//        		ctx.fillStyle="rgba(0,0,0,0.1)";
//        		ctx.strokeStyle="rgba(0,0,0,1)";
//        		ctx.stroke();	
//        		ctx.fill();
    	
    		
	    		//矩形框
	    		ctx.moveTo(x-W*ssoScale,y-H*ssoScale);//第一个起点
	    		ctx.lineTo(x+W*ssoScale,y-H*ssoScale);//第二个点
	    		ctx.lineTo(x+W*ssoScale,y+H*ssoScale);//第三个点
	    		ctx.lineTo(x-W*ssoScale,y+H*ssoScale);
	    		ctx.closePath();
	    		

    			//十字架
    			ctx.moveTo(x-L*ssoScale,y);
    			ctx.lineTo(x+L*ssoScale,y);
    			ctx.moveTo(x,y-L*ssoScale);
    			ctx.lineTo(x,y+L*ssoScale);
    			//正方形
    			ctx.moveTo(x-ZH*ssoScale,y-ZH*ssoScale);
    			ctx.lineTo(x+ZH*ssoScale,y-ZH*ssoScale);
    			ctx.lineTo(x+ZH*ssoScale,y+ZH*ssoScale);
    			ctx.lineTo(x-ZH*ssoScale,y+ZH*ssoScale);
    			ctx.closePath();
    	

	    		ctx.lineWidth=1;
	    		ctx.strokeStyle="rgba(0, 0, 0, 0.5)";
	    		ctx.stroke();
    	
//	    		//擦掉正方形边框
//	    		ctx.clearRect(x - CW/2*ssoScale, y - (ZH)*ssoScale-1, CW*ssoScale, AW);
//	    		ctx.clearRect(x + (ZH)*ssoScale-1, y - CW/2*ssoScale, AW, CW*ssoScale);
//	    		ctx.clearRect(x - CW/2*ssoScale, y + (ZH)*ssoScale-1, CW*ssoScale, AW);
//	    		ctx.clearRect(x - (ZH)*ssoScale-1, y - CW/2*ssoScale, AW, CW*ssoScale);
	    		
	    		//擦掉正方形边框
	    		ctx.clearRect(x - CW*ssoScale +4, y - (ZH)*ssoScale-1, CW*2*ssoScale-8, AW);
	    		ctx.clearRect(x + (ZH)*ssoScale-1, y - CW*ssoScale+4, AW, CW*2*ssoScale-8);
	    		ctx.clearRect(x - CW*ssoScale +4, y + (ZH)*ssoScale-1, CW*2*ssoScale-8, AW);
	    		ctx.clearRect(x - (ZH)*ssoScale-1, y - CW*ssoScale+4, AW, CW*2*ssoScale-8);
	    		
	    		ctx.clearRect(x-3, y-3 , 6, 6);
    		}
    		
    		//判断是用户登录时并且是第一次执行时
    		if(isUser && data == ""){
    			sso.clearArc(x,y,AR*ssoScale,ctx); 

	    		ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
	    		ctx.font = 12 * ssoScale+"px arial";
	    		ctx.fillStyle = "rgba(255, 255, 255, 1)";
	    		ctx.fillText("请点击\"用户名\"输入框的", x - 95 * ssoScale,y - (AR + 10) * ssoScale,130 * ssoScale);
	    		
	    		ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
	    		ctx.font = 12 * ssoScale+"px arial";
	    		ctx.fillStyle = "rgba(255, 255, 0, 1)";
	    		ctx.fillText("正中央", x + 34 * ssoScale,y - (AR + 10) * ssoScale, 36 * ssoScale);
	    		
	    		ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
	    		ctx.font = 12 * ssoScale+"px arial";
	    		ctx.fillStyle = "rgba(255, 255, 255, 1)";
	    		ctx.fillText("位置", x + (34+36) * ssoScale,y - (AR + 10) * ssoScale,24 * ssoScale);
	    		
	    		ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
				ctx.font = 18 * ssoScale+"px arial";
				ctx.fillStyle = "rgba(255, 255, 0, 1)";
				ctx.fillText("先", x - 100 * ssoScale,y - (AR + 30) * ssoScale,18 * ssoScale);
				
				ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
				ctx.font = 18 * ssoScale+"px arial";
				ctx.fillStyle = "rgba(255, 255, 255, 1)";
				ctx.fillText("单击瞄准，", x - 82 * ssoScale,y - (AR + 30) * ssoScale,90 * ssoScale);
				
				ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
				ctx.font = 18 * ssoScale+"px Verdana";
				ctx.fillStyle = "rgba(255, 255, 0, 1)";
				ctx.fillText("后", x + 9 * ssoScale,y - (AR + 30) * ssoScale,18 * ssoScale);
				
	    		ctx.beginPath();
	    		ctx.lineWidth=1*ssoScale;
				ctx.font = 18 * ssoScale+"px Verdana";
				ctx.fillStyle = "rgba(255, 255, 255, 1)";
				ctx.fillText("双击登录", x + 27 * ssoScale,y - (AR + 30) * ssoScale,72 * ssoScale);
				
				ctx.beginPath();
				//中心圆圈
//				ctx.lineWidth=1;
//        		ctx.arc(x,y,2*ssoScale,0,Math.PI*2);
//        		ctx.fillStyle="rgba(0,0,0,0.1)";
//        		ctx.strokeStyle="rgba(0,0,0,1)";
//        		ctx.stroke();	
//        		ctx.fill();

    			//十字架   		
    			ctx.moveTo(x-L*ssoScale,y);
    			ctx.lineTo(x+L*ssoScale,y);
    			ctx.moveTo(x,y-L*ssoScale);
    			ctx.lineTo(x,y+L*ssoScale);
    			//正方形
    			ctx.strokeStyle="rgba(0, 0, 0, 1)";
    			ctx.moveTo(x-ZH*ssoScale,y-ZH*ssoScale);
    			ctx.lineTo(x+ZH*ssoScale,y-ZH*ssoScale);
    			ctx.lineTo(x+ZH*ssoScale,y+ZH*ssoScale);
    			ctx.lineTo(x-ZH*ssoScale,y+ZH*ssoScale);
    			ctx.closePath();
    	

	    		ctx.lineWidth=1;
	    		ctx.strokeStyle="rgba(0, 0, 0, 1)";
	    		ctx.stroke();
    	
	    		//擦掉正方形边框
	    		ctx.clearRect(x - CW*ssoScale +4, y - (ZH)*ssoScale-1, CW*2*ssoScale-8, AW);
	    		ctx.clearRect(x + (ZH)*ssoScale-1, y - CW*ssoScale+4, AW, CW*2*ssoScale-8);
	    		ctx.clearRect(x - CW*ssoScale +4, y + (ZH)*ssoScale-1, CW*2*ssoScale-8, AW);
	    		ctx.clearRect(x - (ZH)*ssoScale-1, y - CW*ssoScale+4, AW, CW*2*ssoScale-8);
	    		
//	    		sso.clearArc(x,y,3*ssoScale,ctx); 
	    		ctx.clearRect(x-3, y-3 , 6, 6);
				
    			
    	/*	var newY = y+H*ssoScale + AH/2;
    		ctx.beginPath();
			ctx.strokeStyle="rgba(255, 255, 255, 1)";
			ctx.lineWidth=0.5;
			
			ctx.fillStyle = "rgba(0, 0, 0, 0)";
			ctx.arc(this.clientX-(23 + 30) * ssoScale,newY,10*ssoScale,0,Math.PI*2);
    		ctx.stroke();	
    		ctx.fill();
			
			//设置字体样式
			ctx.font = 12 * ssoScale+"px Verdana";
			//设置字体填充颜色
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillText("2", this.clientX-(23 + 30) * ssoScale -3 * ssoScale,newY+5* ssoScale,20 * ssoScale);
			
			ctx.beginPath();
			ctx.lineWidth=0.5;
			//设置字体样式
			ctx.font = 10 * ssoScale+"px Verdana";
			//设置字体填充颜色
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			//从坐标点开始绘制文字
			
			ctx.fillText("确认瞄准器已经在【用户", this.clientX- 10 * ssoScale -30 * ssoScale, newY-6 * ssoScale,100 * ssoScale);
			ctx.fillText("名】框的正中央位置？", this.clientX- 10 * ssoScale -30 * ssoScale, newY+10 * ssoScale,100 * ssoScale);
			
			//确认提交按钮
			
			ctx.beginPath();
			sso.roundedRect(this.clientX -30 * ssoScale + 100 * ssoScale, newY-15 * ssoScale, 60 * ssoScale, 30 * ssoScale, 15 * ssoScale,ctx);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
			ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx.stroke();
			ctx.fill();
			
			ctx.beginPath();
			ctx.font = 18 * ssoScale+"px Verdana";
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillText("确认", this.clientX -100 * ssoScale + (150+32) * ssoScale, newY+6 * ssoScale,60 * ssoScale);
			
			
			buttonX = parseInt(this.clientX -30 * ssoScale + 100 * ssoScale);
			buttonY = parseInt(newY);*/

    			
    			
    		}
    		
    		//用户登录时，并且最后一次画图时执行
    		/*if(isUser && last=="yes"){
    			ctx.beginPath();
    			sso.setBg(ssoW,ssoH,ssoScale,ctx);
        		
    			ctx.strokeStyle="rgba(255, 255, 255, 1)";
    			ctx.lineWidth=1;
    			ctx.fillStyle = "rgba(0, 0, 0, 0)";
    			ctx.fillRect(this.clientX -AL/2 * ssoScale,this.clientY -AH/2 * ssoScale,AL * ssoScale, AH * ssoScale);
    			ctx.strokeRect(this.clientX -AL/2 * ssoScale,this.clientY -AH/2 * ssoScale,AL * ssoScale, AH * ssoScale);
    			ctx.fill();
				
    			ctx.fillStyle = "rgba(0, 0, 0, 0)";
				ctx.arc(this.clientX-50*ssoScale,this.clientY,15*ssoScale,0,Math.PI*2);
        		ctx.stroke();	
        		ctx.fill();
				
				//设置字体样式
    			ctx.font = 20 * ssoScale+"px Verdana";
    			//设置字体填充颜色
    			ctx.fillStyle = "rgba(255, 255, 255, 1)";
				ctx.fillText("1", this.clientX-(50+6) * ssoScale,this.clientY+8* ssoScale,30 * ssoScale);	
				ctx.beginPath();
    			ctx.font = 15 * ssoScale+"px Verdana";
    			ctx.fillStyle = "rgba(255, 255, 255, 1)";
    			ctx.fillText("请点击【用户名】输", this.clientX-30 * ssoScale, this.clientY-6 * ssoScale,100 * ssoScale);
    			ctx.fillText("入框的正中央位置", this.clientX-30 * ssoScale, this.clientY+14 * ssoScale,100 * ssoScale);
    
    			
    			ctx.clearRect(this.clientX -(AL/2 + 5)* ssoScale, this.clientY -(AH/2 + 5) * ssoScale, (AL/2/2/2+ 5) * ssoScale, AW * ssoScale);
    			ctx.clearRect(this.clientX -(AL/2 + 5) * ssoScale, this.clientY -(AH/2 + 5) * ssoScale, AW * ssoScale, AL/2/2 * ssoScale);
    			
    			ctx.clearRect(this.clientX +(AL/2-AL/2/2/2) * ssoScale, this.clientY -(AH/2 + 5) * ssoScale, (AL/2/2/2 + 5) * ssoScale, AW * ssoScale);
    			ctx.clearRect(this.clientX +((AL/2 + 5) * ssoScale - AW * ssoScale), this.clientY -(AH/2 + 5) * ssoScale, AW * ssoScale, (AH/2 + 5) * ssoScale);
    			
    			ctx.clearRect(this.clientX +((AL/2 + 5) * ssoScale - AW * ssoScale), this.clientY, AW * ssoScale, (AH/2+ 5) * ssoScale);
    			ctx.clearRect(this.clientX +(AL/2-AL/2/2/2) * ssoScale, this.clientY +((AH/2 + 5) * ssoScale - AW * ssoScale), (AL/2/2/2+ 5) * ssoScale, AW * ssoScale);
    			
    			ctx.clearRect(this.clientX -(AL/2 + 5) * ssoScale, this.clientY +((AH/2 + 5) * ssoScale - AW * ssoScale),(AL/2/2/2+ 5) * ssoScale, AW * ssoScale);
    			ctx.clearRect(this.clientX -(AL/2 + 5) * ssoScale, this.clientY , AW * ssoScale, (AH/2+ 5) * ssoScale);
    			
    		}*/
    	}
	
		/**
		 * 擦掉重新画背景
		 */
		this.setBg = function(ssoW,ssoH,ssoScale,ctx) {
			if(ssoW > ssoH){
				if(ssoScale > 1){
					ctx.clearRect(0, 0, ssoW * ssoScale, ssoW * ssoScale);
				} else {
					ctx.clearRect(0, 0, ssoW, ssoH);
				}
			} else {
				if(ssoScale > 1){
					ctx.clearRect(0, 0, ssoH * ssoScale, ssoH * ssoScale);
				} else {
					ctx.clearRect(0, 0, ssoH, ssoH);
				}
			}
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			if(ssoScale > 1){
				ctx.fillRect(0,0,window.innerWidth * ssoScale,window.innerHeight * ssoScale);
			} else {
				ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			}
    		ctx.fill();
    		ctx.beginPath();
		}
		
		/**
		 * 擦掉圆形
		 */
		this.clearArc = function (x,y,radius,ctx){//圆心(x,y)，半径radius  
            var calcWidth=radius-stepClear;  
            var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);  
            var posX=x-calcWidth;  
            var posY=y-calcHeight;  
              
            var widthX=2*calcWidth;  
            var heightY=2*calcHeight;  
              
            if(stepClear<=radius){  
                ctx.clearRect(posX,posY,widthX,heightY);  
                stepClear+=1;  
                sso.clearArc(x,y,radius,ctx);  
            }  else {
            	stepClear = 1;
            }
        }  
		
		/**
		 * 画圆角按钮
		 */
		this.roundedRect = function(cornerX, cornerY, width, height, cornerRadius,content) {
			   if (width> 0) content.moveTo(cornerX + cornerRadius, cornerY);
			   else  content.moveTo(cornerX - cornerRadius, cornerY);
			   content.arcTo(cornerX+width,cornerY,cornerX + width,cornerY+height,cornerRadius);
			   content.arcTo(cornerX+width,cornerY + height,cornerX,cornerY+height,cornerRadius);
			   content.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
			   if(width> 0) {
				   content.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
			   }
			   else{
				   content.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
			   }
	}
		
		/**
		 * 返回确认按钮的坐标
		 */
		
		this.getConfirmXY =  function (){
			return {"x" : buttonX , "y" : buttonY};
		}
		/**
		 * 隐藏
		 */
		this.hide = function() {
			element.style.display = "none";
			element.style.visibility = "hidden";

		};
		
		/**
		 *canvas随着放大比例放大而增加 
		 */
		this.ssoCanvas = function(ssoScale) {
			if(ssoScale>1){
			  ssoW = window.innerWidth * ssoScale;
			  ssoH = window.innerHeight * ssoScale;
			  elementSsoCanvas.style.width = ssoW + "px";
			  elementSsoCanvas.width = ssoW;
			  elementSsoCanvas.style.height = ssoH + "px";
			  elementSsoCanvas.height =  ssoH;
			} else {
			  ssoW = window.innerWidth;
			  ssoH = window.innerHeight;
			  elementSsoCanvas.style.width = ssoW + "px";
			  elementSsoCanvas.width = ssoW;
			  elementSsoCanvas.style.height = ssoH + "px";
			  elementSsoCanvas.height =  ssoH;
			}
		}
		
		this.transition = function(x , y) {
			var x = x -elementSsoCanvas.parentNode.parentNode.offsetLeft ;
			var y = y - mousePointDisplay.parentNode.parentNode.offsetTop ;
			return {"x" : x , "y" : y};
		}
		
		this.setInnerWidth = function(scale){

		    ssoW = window.innerWidth * scale;
			ssoH = window.innerHeight * scale;
			elementSsoCanvas.style.width = ssoW + "px";
			elementSsoCanvas.width = ssoW;
			elementSsoCanvas.style.height = window.innerHeight + "px";
			elementSsoCanvas.height =  window.innerHeight;

		}
    }
    
    
    
    var rippleObj = function(element) {

    	var ripple = this;
    	/**
    	 * 是否已经完成画圈
    	 * @param {Boolean} finish
    	 */
    	var finish = false;

    	/**
    	 * 波纹长度
    	 * @param {Number} L
    	 */
    	var L = 96;

    	/**
    	 * 波纹画板
    	 * @param {Element} ripple element
    	 */
    	 
    	/**
    	 * resize the ripple
    	 */
    	this.resize = function(width, height) {
    		/*
    		element.width = width;
    		element.height = height;
    		element.style.width = width + "px";
    		element.style.height = height + "px";
    		*/
    	};
    	/**
    	 * @returns {Element} ripple element
    	 */
    	var getRipple = function() {
    		
    		return element;
    	};
    	
    	
    	 
    	/**
    	 * 动画定时器
    	 * @param {Function} animationInterval
    	 */
    	var animationInterval = null;
    	/**
    	 * 动画延时器
    	 * @param {Function} animationTimeout
    	 */
    	var animationTimeout = null;

    	/**
    	 * 是否延迟
    	 */
    	this.isDelay = function() {
    		return finish;
    	};
    	
    

    	/**
    	 * 画图
    	 */
    	this.drawToLayer = function(x, y) {
    		//x = x - element.parentNode.offsetLeft;
    		//y = y + element.parentNode.offsetTop;
    		x = L / 2;
    		y = L / 2;
    		ripple.hide();
    		element.style.display = "block";
    		element.style.visibility = "visible";
    		/*
    		animationTimeout = window.setTimeout(function(s) {
    			window.clearInterval(animationInterval);
				animationInterval = null;
				ripple.hide();
    		}, 650);
    		
    		*/
    		var ctx = getRipple().getContext("2d");

    		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    		var radius = new Array();

    		for (var i = L / 2; i >= 2; i -= 3) {
    			radius.push(i);
    		}

    		//radius.sort(function(r1,r2){
    			//if(r1 < r2) return 1;else if(r1 > r2) return -1; else return 0;}
    		//);

    		var ri = 0;

    		var colors = [ "#3c3f41", "#d5dadd" ];
    		colors = ["rgba(0, 0, 0, 0.66)", "rgba(0, 0, 0, 0.36)"];

    		animationTimeout = window.setTimeout(function() {
    			animationInterval = window.setInterval(function() {
    				if (ri < radius.length) {
    					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    					ctx.beginPath();
    					var color = colors[0];
    					var width = 1;
    					if (ri % 2 == 0) {
    						color = colors[1];
    						width = 1;
    					}
    					
    					ctx.arc(x, y, radius[ri++], 0, 2 * Math.PI);
    					ctx.strokeStyle = color;
    					ctx.lineWidth = width;
    					ctx.fillStyle = color;
    					ctx.fill();
    					ctx.stroke();
    				} else {
    					finish = true;
    					start = false;
    					window.clearInterval(animationInterval);
    					animationInterval = null;
    					ripple.hide();
    				}
    			}, 20);
    		}, radius.length * 10);
    		

    	};

    	/**
    	 * 隐藏波纹圈圈
    	 */
    	this.hide = function() {
    		
    		element.style.display = "none";
    		element.style.visibility = "hidden";
    		window.clearTimeout(animationTimeout);
    		animationTimeout = null;
    		window.clearInterval(animationInterval);
    		animationInterval = null;
    		finish = false;
    	};

    };
    
    var whirlObj = function(element) {
    	var whirl = this;
    	/**
    	 * 是否完成选画完圈圈
    	 * @param {Boolean} finish
    	 */
    	var finish = false;
    	/**
    	 * 画布大小
    	 * @param {Number} L
    	 */
    	var L = 96;
    	/**
    	 * 旋转圈中的点
    	 * @param {Number} R
    	 */
    	var R = (L / 2) - 5;

    	/**
    	 * 旋转圈的画布
    	 * @param {Element} element
    	 */
    	//var element = null;
    	/**
    	 * 动画定时器
    	 * @param {Function} animationInterval
    	 */
    	var animationInterval = null;
    	/**
    	 * 定时器时间
    	 * @param {Number} animationTimeoutTime
    	 */
    	var animationIntervalTime = 50;
    	/**
    	 * 动画延时器
    	 * @param {Function} animationTimeout
    	 */
    	var animationTimeout = null;
    	/**
    	 * 延时器时间
    	 * @param {Number} animationTimeoutTime
    	 */
    	var animationTimeoutTime = 500;
    	
    	/**
    	 * @returns {Element} ripple element
    	 */
    	var getWhirl = function() {
    		
    		return element;
    	};
    	 
    	/**
    	 * 是否延迟(画完)
    	 */
    	this.isDelay = function() {
    		return finish;
    	};

    	/**
    	 * resize the whirl
    	 */
    	this.resize = function(width, height) {
    		/*
    		element.width = width;
    		element.height = height;
    		element.style.width = width + "px";
    		element.style.height = height + "px";
    		*/
    	};

    	/**
    	 * 做画旋转圈
    	 */
    	this.drawToLayer = function(x, y) {
    		//x = x - element.parentNode.offsetLeft;
    		//y = y + element.parentNode.offsetTop;
    		x = L / 2;
    		y = L / 2;
    		whirl.hide();

    		finish = false;

    		//element.style.display = "inline-block";
    		element.style.display = "block";
    		
    		element.style.visibility = "visible";
    		

    		var ctx = getWhirl().getContext("2d");

    		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    		//速度
    		var speed = 5;
    		//逢angle角度就画一个圆点
    		var angle = Math.PI / speed;
    		// 左半圆画多少个圆点
    		var lCount = 2 * speed;
    		// 右半圆画多少个圆点
    		var rCount = 2 * speed;
    		// 圆点半径
    		var r = 5;

    		animationTimeout = window.setTimeout(function() {
    			animationInterval = window.setInterval(function() {
    				if (lCount > 0) {
    					var Xa = x
    							+ Math.cos(angle * lCount + Math.PI / 2 + Math.PI
    									/ speed) * R;
    					var Ya = y
    							- Math.sin(angle * lCount + Math.PI / 2 + Math.PI
    									/ speed) * R;
    					ctx.beginPath();

    					if (lCount > speed) {
    						ctx.arc(Xa, Ya, r * ((lCount / speed) - 1), 0,
    								Math.PI * 2, false);
    					} else if (lCount == speed) {
    						ctx.arc(Xa, Ya, r, 0, Math.PI * 2, false);
    					} else {
    						ctx.arc(Xa, Ya, r * ((rCount / speed) - 1), 0,
    								Math.PI * 2, false);
    						rCount--;
    					}

    					ctx.fillStyle = '#2edaff';
    					ctx.strokeStyle = '#2edaff';
    					ctx.fill();
    					ctx.stroke();

    					ctx.save();

    					lCount--;

    				} else {
    					finish = true;
    					window.clearInterval(animationInterval);
    					animationInterval = null;
    				}
    			}, animationIntervalTime);
    		}, animationTimeoutTime - animationIntervalTime);

    	};

    	/**
    	 * 隐藏旋转圈
    	 */
    	this.hide = function() {
    		if (!!!element)
    			init();
    		element.style.display = "none";
    		element.style.visibility = "hidden";
    		window.clearTimeout(animationTimeout);
    		animationTimeout = null;
    		window.clearInterval(animationInterval);
    		animationInterval = null;
    	};

    };

    
    // Create display
    var display = document.createElement("div");
    display.style.position = "relative";
    display.style.width = displayWidth + "px";
    display.style.height = displayHeight + "px";

    // Ensure transformations on display originate at 0,0
    display.style.transformOrigin =
    display.style.webkitTransformOrigin =
    display.style.MozTransformOrigin =
    display.style.OTransformOrigin =
    display.style.msTransformOrigin =
        "0 0";

    // Create default layer
    var default_layer = new VvWork.Display.VisibleLayer(displayWidth, displayHeight);

    // Create cursor layer
    var cursor = new VvWork.Display.VisibleLayer(0, 0);
    cursor.setChannelMask(VvWork.Layer.SRC);

    // Add default layer and cursor to display
    display.appendChild(default_layer.getElement());
    display.appendChild(cursor.getElement());

    // Create bounding div 
    var bounds = document.createElement("div");
    /*bounds.id = "client-bounds-view";*/
    bounds.style.position = "relative";
    bounds.style.width = (displayWidth*displayScale) + "px";
    bounds.style.height = (displayHeight*displayScale) + "px";
    
    //bounds.appendChild(whirlElementCanvas);
    //bounds.appendChild(rippleElementCanvas);
    
    uiToolsDisplay.appendChild(elementSsoCanvas);
    uiToolsDisplay.appendChild(mousePointDisplay);
    uiToolsDisplay.appendChild(whirlElementCanvas);
    uiToolsDisplay.appendChild(rippleElementCanvas);
    
//    bounds.appendChild(elementSsoCanvas);
    bounds.appendChild(uiToolsDisplay);
    
    // Add display to bounds
    bounds.appendChild(display);
    
    this.myRipple = new rippleObj(rippleElementCanvas);
    this.myWhirl = new whirlObj(whirlElementCanvas);
    this.mySso = new ssoObj(elementSsoCanvas);
    
    
    this.setUiToolsDisplaySize = function(width, height){
    	uiToolsDisplay.style.width  = width + "px";
    	uiToolsDisplay.width  = width;
    	
    	
    	uiToolsDisplay.style.height = height + "px";
    	uiToolsDisplay.height = height;
        
        
        /*
    	rippleElementCanvas.style.width = 
    	whirlElementCanvas.style.width = 
    		width + "px";
    	rippleElementCanvas.width = 
    	whirlElementCanvas.width = 
    		width;
    		
    	rippleElementCanvas.height = 
        whirlElementCanvas.height = height;
        
        rippleElementCanvas.style.height = 
    	whirlElementCanvas.style.height = 
    	height + "px";
    	*/
    	
    	//guac_display.myRipple.resize(width, height);
    	//guac_display.myWhirl.resize(width, height);
    };
    
    this.showMousePoint = function(shown){
    	if(shown){
    		mousePointDisplay.style.display = "block";
    		mousePointDisplay.style.visibility = "visible";
    	} else {
    		mousePointDisplay.style.display = "none";
    		mousePointDisplay.style.visibility = "hidden";
    	}
    };
    this.moveMousePoint = function(x, y){
    	var translate = "translate(" + (x - mousePointDisplay.parentNode.parentNode.offsetLeft) + "px, " + (y - mousePointDisplay.parentNode.parentNode.offsetTop) + "px)";
    	
    	var matrix = "matrix(1, 0, 0, 1, 0, 0)";
    	
    	mousePointDisplay.style.transform =
    	mousePointDisplay.style.WebkitTransform =
    	mousePointDisplay.style.MozTransform =
    	mousePointDisplay.style.OTransform =
    	mousePointDisplay.style.msTransform =
    		
                translate + " " + matrix;
    };
    
    this.moveMouseRipple = function(x, y){
    	var L = 96;
    	var translate = "translate(" + (x - rippleElementCanvas.parentNode.parentNode.offsetLeft - L/2) + "px, " + (y - rippleElementCanvas.parentNode.parentNode.offsetTop - L/2) + "px)";
    	
    	var matrix = "matrix(1, 0, 0, 1, 0, 0)";
    	
    	rippleElementCanvas.style.transform =
    	rippleElementCanvas.style.WebkitTransform =
    	rippleElementCanvas.style.MozTransform =
    	rippleElementCanvas.style.OTransform =
    	rippleElementCanvas.style.msTransform =
    		
                translate + " " + matrix;
    };
    
    this.moveMouseWhirl = function(x, y){
    	var L = 96;
    	var translate = "translate(" + (x - whirlElementCanvas.parentNode.parentNode.offsetLeft - L/2) + "px, " + (y - whirlElementCanvas.parentNode.parentNode.offsetTop - L/2) + "px)";
    	
    	var matrix = "matrix(1, 0, 0, 1, 0, 0)";
    	
    	whirlElementCanvas.style.transform =
    	whirlElementCanvas.style.WebkitTransform =
    	whirlElementCanvas.style.MozTransform =
    	whirlElementCanvas.style.OTransform =
    	whirlElementCanvas.style.msTransform =
    		
                translate + " " + matrix;
    };
    

    /**
     * The X coordinate of the hotspot of the mouse cursor. The hotspot is
     * the relative location within the image of the mouse cursor at which
     * each click occurs.
     * 
     * @type {Number}
     */
    this.cursorHotspotX = 0;

    /**
     * The Y coordinate of the hotspot of the mouse cursor. The hotspot is
     * the relative location within the image of the mouse cursor at which
     * each click occurs.
     * 
     * @type {Number}
     */
    this.cursorHotspotY = 0;

    /**
     * The current X coordinate of the local mouse cursor. This is not
     * necessarily the location of the actual mouse - it refers only to
     * the location of the cursor image within the VvWork display, as
     * last set by moveCursor().
     * 
     * @type {Number}
     */
    this.cursorX = 0;

    /**
     * The current X coordinate of the local mouse cursor. This is not
     * necessarily the location of the actual mouse - it refers only to
     * the location of the cursor image within the VvWork display, as
     * last set by moveCursor().
     * 
     * @type {Number}
     */
    this.cursorY = 0;

    /**
     * Fired when the default layer (and thus the entire VvWork display)
     * is resized.
     * 
     * @event
     * @param {Number} width The new width of the VvWork display.
     * @param {Number} height The new height of the VvWork display.
     */
    this.onresize = null;

    /**
     * Fired whenever the local cursor image is changed. This can be used to
     * implement special handling of the client-side cursor, or to override
     * the default use of a software cursor layer.
     * 
     * @event
     * @param {HTMLCanvasElement} canvas The cursor image.
     * @param {Number} x The X-coordinate of the cursor hotspot.
     * @param {Number} y The Y-coordinate of the cursor hotspot.
     */
    this.oncursor = null;

    /**
     * The queue of all pending Tasks. Tasks will be run in order, with new
     * tasks added at the end of the queue and old tasks removed from the
     * front of the queue (FIFO). These tasks will eventually be grouped
     * into a Frame.
     * @private
     * @type {Task[]}
     */
    var tasks = [];

    /**
     * The queue of all frames. Each frame is a pairing of an array of tasks
     * and a callback which must be called when the frame is rendered.
     * @private
     * @type {Frame[]}
     */
    var frames = [];

    /**
     * Flushes all pending frames.
     * @private
     */
    function __flush_frames() {

        var rendered_frames = 0;

        // Draw all pending frames, if ready
        while (rendered_frames < frames.length) {

            var frame = frames[rendered_frames];
            if (!frame.isReady())
                break;

            frame.flush();
            rendered_frames++;

        } 

        // Remove rendered frames from array
        frames.splice(0, rendered_frames);

    }

    /**
     * An ordered list of tasks which must be executed atomically. Once
     * executed, an associated (and optional) callback will be called.
     *
     * @private
     * @constructor
     * @param {function} callback The function to call when this frame is
     *                            rendered.
     * @param {Task[]} tasks The set of tasks which must be executed to render
     *                       this frame.
     */
    function Frame(callback, tasks) {

        /**
         * Returns whether this frame is ready to be rendered. This function
         * returns true if and only if ALL underlying tasks are unblocked.
         * 
         * @returns {Boolean} true if all underlying tasks are unblocked,
         *                    false otherwise.
         */
        this.isReady = function() {

            // Search for blocked tasks
            for (var i=0; i < tasks.length; i++) {
                if (tasks[i].blocked)
                    return false;
            }

            // If no blocked tasks, the frame is ready
            return true;

        };

        /**
         * Renders this frame, calling the associated callback, if any, after
         * the frame is complete. This function MUST only be called when no
         * blocked tasks exist. Calling this function with blocked tasks
         * will result in undefined behavior.
         */
        this.flush = function() {

            // Draw all pending tasks.
            for (var i=0; i < tasks.length; i++)
                tasks[i].execute();

            // Call callback
            if (callback) callback();

        };

    }

    /**
     * A container for an task handler. Each operation which must be ordered
     * is associated with a Task that goes into a task queue. Tasks in this
     * queue are executed in order once their handlers are set, while Tasks 
     * without handlers block themselves and any following Tasks from running.
     *
     * @constructor
     * @private
     * @param {function} taskHandler The function to call when this task 
     *                               runs, if any.
     * @param {boolean} blocked Whether this task should start blocked.
     */
    function Task(taskHandler, blocked) {
       
        var task = this;
       
        /**
         * Whether this Task is blocked.
         * 
         * @type {boolean}
         */
        this.blocked = blocked;

        /**
         * Unblocks this Task, allowing it to run.
         */
        this.unblock = function() {
            if (task.blocked) {
                task.blocked = false;
                __flush_frames();
            }
        };

        /**
         * Calls the handler associated with this task IMMEDIATELY. This
         * function does not track whether this task is marked as blocked.
         * Enforcing the blocked status of tasks is up to the caller.
         */
        this.execute = function() {
            if (taskHandler) taskHandler();
        };

    }

    /**
     * Schedules a task for future execution. The given handler will execute
     * immediately after all previous tasks upon frame flush, unless this
     * task is blocked. If any tasks is blocked, the entire frame will not
     * render (and no tasks within will execute) until all tasks are unblocked.
     * 
     * @private
     * @param {function} handler The function to call when possible, if any.
     * @param {boolean} blocked Whether the task should start blocked.
     * @returns {Task} The Task created and added to the queue for future
     *                 running.
     */
    function scheduleTask(handler, blocked) {
        var task = new Task(handler, blocked);
        tasks.push(task);
        return task;
    }

    /**
     * Returns the element which contains the VvWork display.
     * 
     * @return {Element} The element containing the VvWork display.
     */
    this.getElement = function() {
        return bounds;
    };

    /**
     * Returns the width of this display.
     * 
     * @return {Number} The width of this display;
     */
    this.getWidth = function() {
        return displayWidth;
    };

    /**
     * Returns the height of this display.
     * 
     * @return {Number} The height of this display;
     */
    this.getHeight = function() {
        return displayHeight;
    };

    /**
     * Returns the default layer of this display. Each VvWork display always
     * has at least one layer. Other layers can optionally be created within
     * this layer, but the default layer cannot be removed and is the absolute
     * ancestor of all other layers.
     * 
     * @return {VvWork.Display.VisibleLayer} The default layer.
     */
    this.getDefaultLayer = function() {
        return default_layer;
    };

    /**
     * Returns the cursor layer of this display. Each VvWork display contains
     * a layer for the image of the mouse cursor. This layer is a special case
     * and exists above all other layers, similar to the hardware mouse cursor.
     * 
     * @return {VvWork.Display.VisibleLayer} The cursor layer.
     */
    this.getCursorLayer = function() {
        return cursor;
    };

    /**
     * Creates a new layer. The new layer will be a direct child of the default
     * layer, but can be moved to be a child of any other layer. Layers returned
     * by this function are visible.
     * 
     * @return {VvWork.Display.VisibleLayer} The newly-created layer.
     */
    this.createLayer = function() {
        var layer = new VvWork.Display.VisibleLayer(displayWidth, displayHeight);
        layer.move(default_layer, 0, 0, 0);
        return layer;
    };

    /**
     * Creates a new buffer. Buffers are invisible, off-screen surfaces. They
     * are implemented in the same manner as layers, but do not provide the
     * same nesting semantics.
     * 
     * @return {VvWork.Layer} The newly-created buffer.
     */
    this.createBuffer = function() {
        var buffer = new VvWork.Layer(0, 0);
        buffer.autosize = 1;
        return buffer;
    };

    /**
     * Flush all pending draw tasks, if possible, as a new frame. If the entire
     * frame is not ready, the flush will wait until all required tasks are
     * unblocked.
     * 
     * @param {function} callback The function to call when this frame is
     *                            flushed. This may happen immediately, or
     *                            later when blocked tasks become unblocked.
     */
    this.flush = function(callback) {

        // Add frame, reset tasks
        frames.push(new Frame(callback, tasks));
        tasks = [];

        // Attempt flush
        __flush_frames();

    };

    /**
     * Sets the hotspot and image of the mouse cursor displayed within the
     * VvWork display.
     * 
     * @param {Number} hotspotX The X coordinate of the cursor hotspot.
     * @param {Number} hotspotY The Y coordinate of the cursor hotspot.
     * @param {VvWork.Layer} layer The source layer containing the data which
     *                                should be used as the mouse cursor image.
     * @param {Number} srcx The X coordinate of the upper-left corner of the
     *                      rectangle within the source layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcy The Y coordinate of the upper-left corner of the
     *                      rectangle within the source layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcw The width of the rectangle within the source layer's
     *                      coordinate space to copy data from.
     * @param {Number} srch The height of the rectangle within the source
     *                      layer's coordinate space to copy data from.

     */
    this.setCursor = function(hotspotX, hotspotY, layer, srcx, srcy, srcw, srch) {
        scheduleTask(function __display_set_cursor() {

            // Set hotspot
            guac_display.cursorHotspotX = hotspotX;
            guac_display.cursorHotspotY = hotspotY;

            // Reset cursor size
            cursor.resize(srcw, srch);

            // Draw cursor to cursor layer
            cursor.copy(layer, srcx, srcy, srcw, srch, 0, 0);
            guac_display.moveCursor(guac_display.cursorX, guac_display.cursorY);

            // Fire cursor change event
            if (guac_display.oncursor) {
            	guac_display.oncursor(cursor.getCanvas(), hotspotX, hotspotY);
            }
                
        });
    };

    /**
     * Sets whether the software-rendered cursor is shown. This cursor differs
     * from the hardware cursor in that it is built into the VvWork.Display,
     * and relies on its own VvWork layer to render.
     *
     * @param {Boolean} [shown=true] Whether to show the software cursor.
     */
    this.showCursor = function(shown) {

        var element = cursor.getElement();
        var parent = element.parentNode;

        // Remove from DOM if hidden
        if (shown === false) {
            if (parent)
                parent.removeChild(element);
        }

        // Otherwise, ensure cursor is child of display
        else if (parent !== display)
            display.appendChild(element);

    };

    /**
     * Sets the location of the local cursor to the given coordinates. For the
     * sake of responsiveness, this function performs its action immediately.
     * Cursor motion is not maintained within atomic frames.
     * 
     * @param {Number} x The X coordinate to move the cursor to.
     * @param {Number} y The Y coordinate to move the cursor to.
     */
    this.moveCursor = function(x, y) {

        // Move cursor layer
        cursor.translate(x - guac_display.cursorHotspotX,
                         y - guac_display.cursorHotspotY);
        
        // Update stored position
        guac_display.cursorX = x;
        guac_display.cursorY = y;
        
    };

    /**
     * Changes the size of the given Layer to the given width and height.
     * Resizing is only attempted if the new size provided is actually different
     * from the current size.
     * 
     * @param {VvWork.Layer} layer The layer to resize.
     * @param {Number} width The new width.
     * @param {Number} height The new height.
     */
    this.resize = function(layer, width, height) {
        scheduleTask(function __display_resize() {

            layer.resize(width, height);

            // Resize display if default layer is resized
            if (layer === default_layer) {

                // Update (set) display size
                displayWidth = width;
                displayHeight = height;
                display.style.width = displayWidth + "px";
                display.style.height = displayHeight + "px";

                // Update bounds size
                bounds.style.width = (displayWidth*displayScale) + "px";
                bounds.style.height = (displayHeight*displayScale) + "px";

                // Notify of resize
                if (guac_display.onresize)
                    guac_display.onresize(width, height);

            }

        });
    };

    /**
     * Draws the specified image at the given coordinates. The image specified
     * must already be loaded.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The destination X coordinate.
     * @param {Number} y The destination Y coordinate.
     * @param {Image} image The image to draw. Note that this is an Image
     *                      object - not a URL.
     */
    this.drawImage = function(layer, x, y, image) {
        scheduleTask(function __display_drawImage() {
            layer.drawImage(x, y, image);
        });
    };

    /**
     * Draws the image contained within the specified Blob at the given
     * coordinates. The Blob specified must already be populated with image
     * data.
     *
     * @param {VvWork.Layer} layer
     *     The layer to draw upon.
     *
     * @param {Number} x
     *     The destination X coordinate.
     *
     * @param {Number} y
     *     The destination Y coordinate.
     *
     * @param {Blob} blob
     *     The Blob containing the image data to draw.
     */
    this.drawBlob = function(layer, x, y, blob) {

        // Create URL for blob
        var url = URL.createObjectURL(blob);

        // Draw and free blob URL when ready
        var task = scheduleTask(function __display_drawBlob() {
            layer.drawImage(x, y, image);
            URL.revokeObjectURL(url);
        }, true);

        // Load image from URL
        var image = new Image();
        image.onload = task.unblock;
        image.src = url;

    };

    /**
     * Draws the image at the specified URL at the given coordinates. The image
     * will be loaded automatically, and this and any future operations will
     * wait for the image to finish loading.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The destination X coordinate.
     * @param {Number} y The destination Y coordinate.
     * @param {String} url The URL of the image to draw.
     */
    this.draw = function(layer, x, y, url) {

        var task = scheduleTask(function __display_draw() {
            layer.drawImage(x, y, image);
        }, true);

        var image = new Image();
        image.onload = task.unblock;
        image.src = url;

    };

    /**
     * Plays the video at the specified URL within this layer. The video
     * will be loaded automatically, and this and any future operations will
     * wait for the video to finish loading. Future operations will not be
     * executed until the video finishes playing.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {String} mimetype The mimetype of the video to play.
     * @param {Number} duration The duration of the video in milliseconds.
     * @param {String} url The URL of the video to play.
     */
    this.play = function(layer, mimetype, duration, url) {

        // Start loading the video
        var video = document.createElement("video");
        video.type = mimetype;
        video.src = url;

        // Start copying frames when playing
        video.addEventListener("play", function() {
            
            function render_callback() {
                layer.drawImage(0, 0, video);
                if (!video.ended)
                    window.setTimeout(render_callback, 20);
            }
            
            render_callback();
            
        }, false);

        scheduleTask(video.play);

    };

    /**
     * Transfer a rectangle of image data from one Layer to this Layer using the
     * specified transfer function.
     * 
     * @param {VvWork.Layer} srcLayer The Layer to copy image data from.
     * @param {Number} srcx The X coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcy The Y coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcw The width of the rectangle within the source Layer's
     *                      coordinate space to copy data from.
     * @param {Number} srch The height of the rectangle within the source
     *                      Layer's coordinate space to copy data from.
     * @param {VvWork.Layer} dstLayer The layer to draw upon.
     * @param {Number} x The destination X coordinate.
     * @param {Number} y The destination Y coordinate.
     * @param {Function} transferFunction The transfer function to use to
     *                                    transfer data from source to
     *                                    destination.
     */
    this.transfer = function(srcLayer, srcx, srcy, srcw, srch, dstLayer, x, y, transferFunction) {
        scheduleTask(function __display_transfer() {
            dstLayer.transfer(srcLayer, srcx, srcy, srcw, srch, x, y, transferFunction);
        });
    };

    /**
     * Put a rectangle of image data from one Layer to this Layer directly
     * without performing any alpha blending. Simply copy the data.
     * 
     * @param {VvWork.Layer} srcLayer The Layer to copy image data from.
     * @param {Number} srcx The X coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcy The Y coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcw The width of the rectangle within the source Layer's
     *                      coordinate space to copy data from.
     * @param {Number} srch The height of the rectangle within the source
     *                      Layer's coordinate space to copy data from.
     * @param {VvWork.Layer} dstLayer The layer to draw upon.
     * @param {Number} x The destination X coordinate.
     * @param {Number} y The destination Y coordinate.
     */
    this.put = function(srcLayer, srcx, srcy, srcw, srch, dstLayer, x, y) {
        scheduleTask(function __display_put() {
            dstLayer.put(srcLayer, srcx, srcy, srcw, srch, x, y);
        });
    };

    /**
     * Copy a rectangle of image data from one Layer to this Layer. This
     * operation will copy exactly the image data that will be drawn once all
     * operations of the source Layer that were pending at the time this
     * function was called are complete. This operation will not alter the
     * size of the source Layer even if its autosize property is set to true.
     * 
     * @param {VvWork.Layer} srcLayer The Layer to copy image data from.
     * @param {Number} srcx The X coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcy The Y coordinate of the upper-left corner of the
     *                      rectangle within the source Layer's coordinate
     *                      space to copy data from.
     * @param {Number} srcw The width of the rectangle within the source Layer's
     *                      coordinate space to copy data from.
     * @param {Number} srch The height of the rectangle within the source
     *                      Layer's coordinate space to copy data from.
     * @param {VvWork.Layer} dstLayer The layer to draw upon.
     * @param {Number} x The destination X coordinate.
     * @param {Number} y The destination Y coordinate.
     */
    this.copy = function(srcLayer, srcx, srcy, srcw, srch, dstLayer, x, y) {
        scheduleTask(function __display_copy() {
            dstLayer.copy(srcLayer, srcx, srcy, srcw, srch, x, y);
        });
    };

    /**
     * Starts a new path at the specified point.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The X coordinate of the point to draw.
     * @param {Number} y The Y coordinate of the point to draw.
     */
    this.moveTo = function(layer, x, y) {
        scheduleTask(function __display_moveTo() {
            layer.moveTo(x, y);
        });
    };

    /**
     * Add the specified line to the current path.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The X coordinate of the endpoint of the line to draw.
     * @param {Number} y The Y coordinate of the endpoint of the line to draw.
     */
    this.lineTo = function(layer, x, y) {
        scheduleTask(function __display_lineTo() {
            layer.lineTo(x, y);
        });
    };

    /**
     * Add the specified arc to the current path.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The X coordinate of the center of the circle which
     *                   will contain the arc.
     * @param {Number} y The Y coordinate of the center of the circle which
     *                   will contain the arc.
     * @param {Number} radius The radius of the circle.
     * @param {Number} startAngle The starting angle of the arc, in radians.
     * @param {Number} endAngle The ending angle of the arc, in radians.
     * @param {Boolean} negative Whether the arc should be drawn in order of
     *                           decreasing angle.
     */
    this.arc = function(layer, x, y, radius, startAngle, endAngle, negative) {
        scheduleTask(function __display_arc() {
            layer.arc(x, y, radius, startAngle, endAngle, negative);
        });
    };

    /**
     * Starts a new path at the specified point.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} cp1x The X coordinate of the first control point.
     * @param {Number} cp1y The Y coordinate of the first control point.
     * @param {Number} cp2x The X coordinate of the second control point.
     * @param {Number} cp2y The Y coordinate of the second control point.
     * @param {Number} x The X coordinate of the endpoint of the curve.
     * @param {Number} y The Y coordinate of the endpoint of the curve.
     */
    this.curveTo = function(layer, cp1x, cp1y, cp2x, cp2y, x, y) {
        scheduleTask(function __display_curveTo() {
            layer.curveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        });
    };

    /**
     * Closes the current path by connecting the end point with the start
     * point (if any) with a straight line.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     */
    this.close = function(layer) {
        scheduleTask(function __display_close() {
            layer.close();
        });
    };

    /**
     * Add the specified rectangle to the current path.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} x The X coordinate of the upper-left corner of the
     *                   rectangle to draw.
     * @param {Number} y The Y coordinate of the upper-left corner of the
     *                   rectangle to draw.
     * @param {Number} w The width of the rectangle to draw.
     * @param {Number} h The height of the rectangle to draw.
     */
    this.rect = function(layer, x, y, w, h) {
        scheduleTask(function __display_rect() {
            layer.rect(x, y, w, h);
        });
    };

    /**
     * Clip all future drawing operations by the current path. The current path
     * is implicitly closed. The current path can continue to be reused
     * for other operations (such as fillColor()) but a new path will be started
     * once a path drawing operation (path() or rect()) is used.
     * 
     * @param {VvWork.Layer} layer The layer to affect.
     */
    this.clip = function(layer) {
        scheduleTask(function __display_clip() {
            layer.clip();
        });
    };

    /**
     * Stroke the current path with the specified color. The current path
     * is implicitly closed. The current path can continue to be reused
     * for other operations (such as clip()) but a new path will be started
     * once a path drawing operation (path() or rect()) is used.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {String} cap The line cap style. Can be "round", "square",
     *                     or "butt".
     * @param {String} join The line join style. Can be "round", "bevel",
     *                      or "miter".
     * @param {Number} thickness The line thickness in pixels.
     * @param {Number} r The red component of the color to fill.
     * @param {Number} g The green component of the color to fill.
     * @param {Number} b The blue component of the color to fill.
     * @param {Number} a The alpha component of the color to fill.
     */
    this.strokeColor = function(layer, cap, join, thickness, r, g, b, a) {
        scheduleTask(function __display_strokeColor() {
            layer.strokeColor(cap, join, thickness, r, g, b, a);
        });
    };

    /**
     * Fills the current path with the specified color. The current path
     * is implicitly closed. The current path can continue to be reused
     * for other operations (such as clip()) but a new path will be started
     * once a path drawing operation (path() or rect()) is used.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {Number} r The red component of the color to fill.
     * @param {Number} g The green component of the color to fill.
     * @param {Number} b The blue component of the color to fill.
     * @param {Number} a The alpha component of the color to fill.
     */
    this.fillColor = function(layer, r, g, b, a) {
        scheduleTask(function __display_fillColor() {
            layer.fillColor(r, g, b, a);
        });
    };

    /**
     * Stroke the current path with the image within the specified layer. The
     * image data will be tiled infinitely within the stroke. The current path
     * is implicitly closed. The current path can continue to be reused
     * for other operations (such as clip()) but a new path will be started
     * once a path drawing operation (path() or rect()) is used.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {String} cap The line cap style. Can be "round", "square",
     *                     or "butt".
     * @param {String} join The line join style. Can be "round", "bevel",
     *                      or "miter".
     * @param {Number} thickness The line thickness in pixels.
     * @param {VvWork.Layer} srcLayer The layer to use as a repeating pattern
     *                                   within the stroke.
     */
    this.strokeLayer = function(layer, cap, join, thickness, srcLayer) {
        scheduleTask(function __display_strokeLayer() {
            layer.strokeLayer(cap, join, thickness, srcLayer);
        });
    };

    /**
     * Fills the current path with the image within the specified layer. The
     * image data will be tiled infinitely within the stroke. The current path
     * is implicitly closed. The current path can continue to be reused
     * for other operations (such as clip()) but a new path will be started
     * once a path drawing operation (path() or rect()) is used.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     * @param {VvWork.Layer} srcLayer The layer to use as a repeating pattern
     *                                   within the fill.
     */
    this.fillLayer = function(layer, srcLayer) {
        scheduleTask(function __display_fillLayer() {
            layer.fillLayer(srcLayer);
        });
    };

    /**
     * Push current layer state onto stack.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     */
    this.push = function(layer) {
        scheduleTask(function __display_push() {
            layer.push();
        });
    };

    /**
     * Pop layer state off stack.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     */
    this.pop = function(layer) {
        scheduleTask(function __display_pop() {
            layer.pop();
        });
    };

    /**
     * Reset the layer, clearing the stack, the current path, and any transform
     * matrix.
     * 
     * @param {VvWork.Layer} layer The layer to draw upon.
     */
    this.reset = function(layer) {
        scheduleTask(function __display_reset() {
            layer.reset();
        });
    };

    /**
     * Sets the given affine transform (defined with six values from the
     * transform's matrix).
     * 
     * @param {VvWork.Layer} layer The layer to modify.
     * @param {Number} a The first value in the affine transform's matrix.
     * @param {Number} b The second value in the affine transform's matrix.
     * @param {Number} c The third value in the affine transform's matrix.
     * @param {Number} d The fourth value in the affine transform's matrix.
     * @param {Number} e The fifth value in the affine transform's matrix.
     * @param {Number} f The sixth value in the affine transform's matrix.
     */
    this.setTransform = function(layer, a, b, c, d, e, f) {
        scheduleTask(function __display_setTransform() {
            layer.setTransform(a, b, c, d, e, f);
        });
    };

    /**
     * Applies the given affine transform (defined with six values from the
     * transform's matrix).
     * 
     * @param {VvWork.Layer} layer The layer to modify.
     * @param {Number} a The first value in the affine transform's matrix.
     * @param {Number} b The second value in the affine transform's matrix.
     * @param {Number} c The third value in the affine transform's matrix.
     * @param {Number} d The fourth value in the affine transform's matrix.
     * @param {Number} e The fifth value in the affine transform's matrix.
     * @param {Number} f The sixth value in the affine transform's matrix.
     */
    this.transform = function(layer, a, b, c, d, e, f) {
        scheduleTask(function __display_transform() {
            layer.transform(a, b, c, d, e, f);
        });
    };

    /**
     * Sets the channel mask for future operations on this Layer.
     * 
     * The channel mask is a VvWork-specific compositing operation identifier
     * with a single bit representing each of four channels (in order): source
     * image where destination transparent, source where destination opaque,
     * destination where source transparent, and destination where source
     * opaque.
     * 
     * @param {VvWork.Layer} layer The layer to modify.
     * @param {Number} mask The channel mask for future operations on this
     *                      Layer.
     */
    this.setChannelMask = function(layer, mask) {
        scheduleTask(function __display_setChannelMask() {
            layer.setChannelMask(mask);
        });
    };

    /**
     * Sets the miter limit for stroke operations using the miter join. This
     * limit is the maximum ratio of the size of the miter join to the stroke
     * width. If this ratio is exceeded, the miter will not be drawn for that
     * joint of the path.
     * 
     * @param {VvWork.Layer} layer The layer to modify.
     * @param {Number} limit The miter limit for stroke operations using the
     *                       miter join.
     */
    this.setMiterLimit = function(layer, limit) {
        scheduleTask(function __display_setMiterLimit() {
            layer.setMiterLimit(limit);
        });
    };

    /**
     * Sets the scale of the client display element such that it renders at
     * a relatively smaller or larger size, without affecting the true
     * resolution of the display.
     *
     * @param {Number} scale The scale to resize to, where 1.0 is normal
     *                       size (1:1 scale).
     */
    this.scale = function(scale) {

        display.style.transform =
        display.style.WebkitTransform =
        display.style.MozTransform =
        display.style.OTransform =
        display.style.msTransform =

            "scale(" + scale + "," + scale + ")";

        displayScale = scale;

        // Update bounds size
        bounds.style.width = (displayWidth*displayScale) + "px";
        bounds.style.height = (displayHeight*displayScale) + "px";

    };

    /**
     * Returns the scale of the display.
     *
     * @return {Number} The scale of the display.
     */
    this.getScale = function() {
        return displayScale;
    };

    /**
     * Returns a canvas element containing the entire display, with all child
     * layers composited within.
     *
     * @return {HTMLCanvasElement} A new canvas element containing a copy of
     *                             the display.
     */
    this.flatten = function() {
       
        // Get destination canvas
        var canvas = document.createElement("canvas");
        canvas.width = default_layer.width;
        canvas.height = default_layer.height;

        var context = canvas.getContext("2d");

        // Returns sorted array of children
        function get_children(layer) {

            // Build array of children
            var children = [];
            for (var index in layer.children)
                children.push(layer.children[index]);

            // Sort
            children.sort(function children_comparator(a, b) {

                // Compare based on Z order
                var diff = a.z - b.z;
                if (diff !== 0)
                    return diff;

                // If Z order identical, use document order
                var a_element = a.getElement();
                var b_element = b.getElement();
                var position = b_element.compareDocumentPosition(a_element);

                if (position & Node.DOCUMENT_POSITION_PRECEDING) return -1;
                if (position & Node.DOCUMENT_POSITION_FOLLOWING) return  1;

                // Otherwise, assume same
                return 0;

            });

            // Done
            return children;

        }

        // Draws the contents of the given layer at the given coordinates
        function draw_layer(layer, x, y) {

            // Draw layer
            if (layer.width > 0 && layer.height > 0) {

                // Save and update alpha
                var initial_alpha = context.globalAlpha;
                context.globalAlpha *= layer.alpha / 255.0;

                // Copy data
                context.drawImage(layer.getCanvas(), x, y);

                // Draw all children
                var children = get_children(layer);
                for (var i=0; i<children.length; i++) {
                    var child = children[i];
                    draw_layer(child, x + child.x, y + child.y);
                }

                // Restore alpha
                context.globalAlpha = initial_alpha;

            }

        }

        // Draw default layer and all children
        draw_layer(default_layer, 0, 0);

        // Return new canvas copy
        return canvas;
        
    };

};

/**
 * Simple container for VvWork.Layer, allowing layers to be easily
 * repositioned and nested. This allows certain operations to be accelerated
 * through DOM manipulation, rather than raster operations.
 * 
 * @constructor
 * @augments VvWork.Layer
 * @param {Number} width The width of the Layer, in pixels. The canvas element
 *                       backing this Layer will be given this width.
 * @param {Number} height The height of the Layer, in pixels. The canvas element
 *                        backing this Layer will be given this height.
 */
VvWork.Display.VisibleLayer = function(width, height) {

    VvWork.Layer.apply(this, [width, height]);

    /**
     * Reference to this layer.
     * @private
     */
    var layer = this;

    /**
     * Identifier which uniquely identifies this layer. This is COMPLETELY
     * UNRELATED to the index of the underlying layer, which is specific
     * to the VvWork protocol, and not relevant at this level.
     * 
     * @private
     * @type {Number}
     */
    this.__unique_id = VvWork.Display.VisibleLayer.__next_id++;

    /**
     * The opacity of the layer container, where 255 is fully opaque and 0 is
     * fully transparent.
     */
    this.alpha = 0xFF;

    /**
     * X coordinate of the upper-left corner of this layer container within
     * its parent, in pixels.
     * @type {Number}
     */
    this.x = 0;

    /**
     * Y coordinate of the upper-left corner of this layer container within
     * its parent, in pixels.
     * @type {Number}
     */
    this.y = 0;

    /**
     * Z stacking order of this layer relative to other sibling layers.
     * @type {Number}
     */
    this.z = 0;

    /**
     * The affine transformation applied to this layer container. Each element
     * corresponds to a value from the transformation matrix, with the first
     * three values being the first row, and the last three values being the
     * second row. There are six values total.
     * 
     * @type {Number[]}
     */
    this.matrix = [1, 0, 0, 1, 0, 0];

    /**
     * The parent layer container of this layer, if any.
     * @type {VvWork.Display.VisibleLayer}
     */
    this.parent = null;

    /**
     * Set of all children of this layer, indexed by layer index. This object
     * will have one property per child.
     */
    this.children = {};

    // Set layer position
    var canvas = layer.getCanvas();
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.background = "rgba(0, 0, 0, 0)";

    // Create div with given size
    var div = document.createElement("div");
    div.appendChild(canvas);
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.overflow = "hidden";

    /**
     * Superclass resize() function.
     * @private
     */
    var __super_resize = this.resize;

    this.resize = function(width, height) {

        // Resize containing div
        div.style.width = width + "px";
        div.style.height = height + "px";

        __super_resize(width, height);

    };
  
    /**
     * Returns the element containing the canvas and any other elements
     * associated with this layer.
     * @returns {Element} The element containing this layer's canvas.
     */
    this.getElement = function() {
        return div;
    };

    /**
     * The translation component of this layer's transform.
     * @private
     */
    var translate = "translate(0px, 0px)"; // (0, 0)

    /**
     * The arbitrary matrix component of this layer's transform.
     * @private
     */
    var matrix = "matrix(1, 0, 0, 1, 0, 0)"; // Identity

    /**
     * Moves the upper-left corner of this layer to the given X and Y
     * coordinate.
     * 
     * @param {Number} x The X coordinate to move to.
     * @param {Number} y The Y coordinate to move to.
     */
    this.translate = function(x, y) {

        layer.x = x;
        layer.y = y;

        // Generate translation
        translate = "translate("
                        + x + "px,"
                        + y + "px)";

        // Set layer transform 
        div.style.transform =
        div.style.WebkitTransform =
        div.style.MozTransform =
        div.style.OTransform =
        div.style.msTransform =

            translate + " " + matrix;

    };

    /**
     * Moves the upper-left corner of this VisibleLayer to the given X and Y
     * coordinate, sets the Z stacking order, and reparents this VisibleLayer
     * to the given VisibleLayer.
     * 
     * @param {VvWork.Display.VisibleLayer} parent The parent to set.
     * @param {Number} x The X coordinate to move to.
     * @param {Number} y The Y coordinate to move to.
     * @param {Number} z The Z coordinate to move to.
     */
    this.move = function(parent, x, y, z) {

        // Set parent if necessary
        if (layer.parent !== parent) {

            // Maintain relationship
            if (layer.parent)
                delete layer.parent.children[layer.__unique_id];
            layer.parent = parent;
            parent.children[layer.__unique_id] = layer;

            // Reparent element
            var parent_element = parent.getElement();
            parent_element.appendChild(div);

        }

        // Set location
        layer.translate(x, y);
        layer.z = z;
        div.style.zIndex = z;

    };

    /**
     * Sets the opacity of this layer to the given value, where 255 is fully
     * opaque and 0 is fully transparent.
     * 
     * @param {Number} a The opacity to set.
     */
    this.shade = function(a) {
        layer.alpha = a;
        div.style.opacity = a/255.0;
    };

    /**
     * Removes this layer container entirely, such that it is no longer
     * contained within its parent layer, if any.
     */
    this.dispose = function() {

        // Remove from parent container
        if (layer.parent) {
            delete layer.parent.children[layer.__unique_id];
            layer.parent = null;
        }

        // Remove from parent element
        if (div.parentNode)
            div.parentNode.removeChild(div);
        
    };

    /**
     * Applies the given affine transform (defined with six values from the
     * transform's matrix).
     * 
     * @param {Number} a The first value in the affine transform's matrix.
     * @param {Number} b The second value in the affine transform's matrix.
     * @param {Number} c The third value in the affine transform's matrix.
     * @param {Number} d The fourth value in the affine transform's matrix.
     * @param {Number} e The fifth value in the affine transform's matrix.
     * @param {Number} f The sixth value in the affine transform's matrix.
     */
    this.distort = function(a, b, c, d, e, f) {

        // Store matrix
        layer.matrix = [a, b, c, d, e, f];

        // Generate matrix transformation
        matrix =

            /* a c e
             * b d f
             * 0 0 1
             */
    
            "matrix(" + a + "," + b + "," + c + "," + d + "," + e + "," + f + ")";

        // Set layer transform 
        div.style.transform =
        div.style.WebkitTransform =
        div.style.MozTransform =
        div.style.OTransform =
        div.style.msTransform =

            translate + " " + matrix;

    };

};

/**
 * The next identifier to be assigned to the layer container. This identifier
 * uniquely identifies each VisibleLayer, but is unrelated to the index of
 * the layer, which exists at the protocol/client level only.
 * 
 * @private
 * @type {Number}
 */
VvWork.Display.VisibleLayer.__next_id = 0;
