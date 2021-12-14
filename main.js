function draw() {
	// 入力チェック
	var bgColorEle = document.getElementById('bgColor');
	var ptTypeEle = document.getElementById('pattern_type');
	var ptValEle = document.getElementById('pattern_variation');
	var ptSizeEle = document.getElementById('ptSize');
	var ptColorEle = document.getElementById('ptColor');
	//var ptShadowEle = document.getElementById('ptShadow');
	
	if(!bgColorEle.checkValidity()){
		return false;
	}

	if(!ptTypeEle.checkValidity()){
		return false;
	}

	if(!ptValEle.checkValidity()){
		return false;
	}

	if(!ptSizeEle.checkValidity()){
		return false;
	}

	if(!ptColorEle.checkValidity()){
		return false;
	}

	//if(!ptShadowEle.checkValidity()){
	//	return false;
	//}
	
	var bgColor = bgColorEle.value;	
	var ptType = ptTypeEle.value;
	var ptVal = ptValEle.value;
	var ptSize = ptSizeEle.value;
	var ptColor = ptColorEle.value;
	var ptShadow = 0;//ptShadowEle.value;
	
	if(bgColor == null || bgColor.length == 0){
		return false;
	}
	
	if(ptType == null || ptType.length == 0){
		return false;
	}
	
	if(ptVal == null || ptVal.length == 0){
		return false;
	}
	
	if(ptSize == null || ptSize.length == 0){
		return false;
	}
	
	if(ptColor == null || ptColor.length == 0){
		return false;
	}
	
	if(ptShadow == null || ptShadow.length == 0){
		return false;
	}
	
	var ptSides = "";
	var ptSidesIndent = "0.38";
	if(ptType == "star" || ptType == "flower"){
		var ptSidesEle = document.getElementById('ptSides');
		
		if(!ptSidesEle.checkValidity()){
			return false;
		}
		
		ptSides = ptSidesEle.value;
		
		if(ptSides == null || ptSides.length == 0){
			return false;
		}
	}
	/* canvas要素のノードオブジェクト */
	var canvas = document.getElementById('bg_pattern');
	/* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
	if ( ! canvas || ! canvas.getContext ) {
	return false;
	}
	
	/* 2Dコンテキスト */
	var ctx = canvas.getContext('2d');

	/* 背景色 */
	ctx.fillStyle = HexToRgb(bgColor);
	ctx.beginPath();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	drawPattern(ctx, ptType, ptVal, ptSize, ptColor, ptShadow, ptSides, ptSidesIndent);
	
	/* 描画 */
	ctx.stroke();
}

function drawPattern(ctx, s, val, size, color, shadow, sides, sidesIndent){
	
	if(s == "stripe_tate"){
	
		ctx.strokeStyle = HexToRgb(color);
		
		var ratioW = ctx.canvas.width/2;
		ctx.beginPath();
		ctx.lineWidth = size;
		ctx.moveTo(ratioW, 0);
		ctx.lineTo(ratioW, ctx.canvas.height);
		ctx.closePath();
		ctx.stroke();
		
		var hanbun = size/2;
		var hanbun2 = hanbun/2;
		ctx.beginPath();
		ctx.lineWidth = hanbun;
		ctx.moveTo(hanbun2, 0);
		ctx.lineTo(hanbun2, ctx.canvas.height);
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = hanbun;
		ctx.moveTo(ctx.canvas.width - hanbun2, 0);
		ctx.lineTo(ctx.canvas.width - hanbun2, ctx.canvas.height);
		ctx.closePath();
		ctx.stroke();
	
	}else if(s == "stripe_yoko"){
	
		ctx.strokeStyle = HexToRgb(color);
		
		var ratioH = ctx.canvas.height/2;
		ctx.beginPath();
		ctx.lineWidth = size;
		ctx.moveTo(0, ratioH);
		ctx.lineTo(ctx.canvas.width, ratioH);
		ctx.closePath();
		ctx.stroke();
		
		var hanbun = size/2;
		var hanbun2 = hanbun/2;
		ctx.beginPath();
		ctx.lineWidth = hanbun;
		ctx.moveTo(0, hanbun2);
		ctx.lineTo(ctx.canvas.width, hanbun2);
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = hanbun;
		ctx.moveTo(0, ctx.canvas.height - hanbun2);
		ctx.lineTo(ctx.canvas.width, ctx.canvas.height - hanbun2);
		ctx.closePath();
		ctx.stroke();
	
	}else if(s == "stripe"){
	
		ctx.strokeStyle = HexToRgb(color);
		
		ctx.beginPath();
		ctx.lineWidth = size;
		ctx.moveTo(0, 0);
		ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
		ctx.closePath();
		ctx.stroke();
		
		var hanbun = size/2;
		var hanbun2 = size/3 * 2;
		ctx.fillStyle = HexToRgb(color);
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0, ctx.canvas.height);
		ctx.lineTo(0, ctx.canvas.height - hanbun2);
		ctx.lineTo(hanbun2, ctx.canvas.height);
		ctx.closePath();
		ctx.fill();
		
		ctx.lineWidth = 1;
		ctx.moveTo(ctx.canvas.width, 0);
		ctx.lineTo(ctx.canvas.width - hanbun2, 0);
		ctx.lineTo(ctx.canvas.width, hanbun2);
		ctx.closePath();
		ctx.fill();
	
	}else if(s == "dot"){
		if(val == "1"){
			fillCircle(ctx, ctx.canvas.width/2, ctx.canvas.height/2, size, color, shadow);
		}else if(val == "2"){
			var ratioW = ctx.canvas.width/4;
			var ratioH = ctx.canvas.height/4;
			fillCircle(ctx, ratioW, ratioH, size, color, shadow);
			fillCircle(ctx, ratioW*3, ratioH*3, size, color, shadow);
		}else if(val == "3"){
			var ratioW = ctx.canvas.width/6;
			var ratioH = ctx.canvas.height/6;
			fillCircle(ctx, ratioW, ratioH, size, color, shadow);
			fillCircle(ctx, ratioW*3, ratioH*5, size, color, shadow);
			fillCircle(ctx, ratioW*5, ratioH*3, size, color, shadow);
		}
	
	}else if(s == "star"){
		ctx.beginPath();
		
		if(val == "1"){
			fillStar(ctx, ctx.canvas.width/2, ctx.canvas.height/2, size, sides, sidesIndent, 270, color, shadow);
		}else if(val == "2"){
			var ratioW = ctx.canvas.width/4;
			var ratioH = ctx.canvas.height/4;
			fillStar(ctx, ratioW, ratioH, size, sides, sidesIndent, 270, color, shadow);
			fillStar(ctx, ratioW*3, ratioH*3, size, sides, sidesIndent, 270, color, shadow);
		}else if(val == "3"){
			var ratioW = ctx.canvas.width/6;
			var ratioH = ctx.canvas.height/6;
			fillStar(ctx, ratioW, ratioH, size, sides, sidesIndent, 270, color, shadow);
			fillStar(ctx, ratioW*3, ratioH*5, size, sides, sidesIndent, 270, color, shadow);
			fillStar(ctx, ratioW*5, ratioH*3, size, sides, sidesIndent, 270, color, shadow);
		}
		
	}else if(s == "flower"){
		ctx.beginPath();
		
		if(val == "1"){
			fillFlower(ctx, ctx.canvas.width/2, ctx.canvas.height/2, size, sides, sidesIndent, 90, color, shadow);
		}else if(val == "2"){
			var ratioW = ctx.canvas.width/4;
			var ratioH = ctx.canvas.height/4;
			fillFlower(ctx, ratioW, ratioH, size, sides, sidesIndent, 90, color, shadow);
			fillFlower(ctx, ratioW*3, ratioH*3, size, sides, sidesIndent, 90, color, shadow);
		}else if(val == "3"){
			var ratioW = ctx.canvas.width/6;
			var ratioH = ctx.canvas.height/6;
			fillFlower(ctx, ratioW, ratioH, size, sides, sidesIndent, 90, color, shadow);
			fillFlower(ctx, ratioW*3, ratioH*5, size, sides, sidesIndent, 90, color, shadow);
			fillFlower(ctx, ratioW*5, ratioH*3, size, sides, sidesIndent, 90, color, shadow);
		}
	}
}

function HexToRgb(t) {
	var r1 = t.substr(1,2);
	var g1 = t.substr(3,2);
	var b1 = t.substr(5,2);
	
	var r2 = parseInt(r1, 16);
	var g2 = parseInt(g1, 16);
	var b2 = parseInt(b1, 16);
	
	return "rgb(" + r2 + "," + g2 + "," + b2 + ")";
}

function HexToShadow(t) {
	var r1 = t.substr(1,2);
	var g1 = t.substr(3,2);
	var b1 = t.substr(5,2);
	
	var r2 = parseInt(r1, 16);
	var g2 = parseInt(g1, 16);
	var b2 = parseInt(b1, 16);
	
	return "rgba(" + r2 + "," + g2 + "," + b2 + ", 5)";
}

function cmykToHex(c,m,y,k) {

    function padZero(str) {
        return ("00"+str).substring(str.length, str.length+2);
    }

	var r=Math.round((1-Math.min(1,c/100*(1-k/100)+k/100))*255);
	var g=Math.round((1-Math.min(1,m/100*(1-k/100)+k/100))*255);
	var b=Math.round((1-Math.min(1,y/100*(1-k/100)+k/100))*255);

    return "#"+padZero(r.toString(16))+padZero(g.toString(16))+padZero(b.toString(16));
}

function setBackground() {

	var ptn_canvas = document.getElementById('bg_pattern');

	/* 背景 */
	/* canvas要素のノードオブジェクト */
	var bg_canvas = document.getElementById('bg');
	bg_canvas.width = window.innerWidth;
	bg_canvas.height = window.innerHeight;
	
	/* 2Dコンテキスト */
	var bg_ctx = bg_canvas.getContext('2d');
	
	bg_ctx.beginPath();
	
	var ptn = bg_ctx.createPattern(ptn_canvas, 'repeat');
	bg_ctx.fillStyle = ptn;

	bg_ctx.fillRect(0, 0, bg_canvas.width, bg_canvas.height);
	bg_ctx.stroke();
}

function chgColor(obj) {

	var colorEle = document.getElementById(obj.id);
	
	if(!colorEle.checkValidity()){
		return false;
	}

	var color = colorEle.value;
	
	if(color == null || color.length ==0){
		return false;
	}
	
	/* canvas要素のノードオブジェクト */
	var canvas = document.getElementById(obj.id + 'Canvas');
	
	canvas.value = color;
}

function chgColorCode(obj) {

	var colorEle = document.getElementById(obj.id);
	
	if(!colorEle.checkValidity()){
		return false;
	}

	var color = colorEle.value;
	
	if(color == null || color.length ==0){
		return false;
	}
	
	/* canvas要素のノードオブジェクト */
	var id_name = obj.id;
	id_name = id_name.substring(0,id_name.length - 6);
	var colorcode = document.getElementById(id_name);

	colorcode.value = color;
}
function chgSize() {

	var tHeightEle = document.getElementById('tHeight');
	var tWidthEle = document.getElementById('tWidth');
	
	if(!tHeightEle.checkValidity()){
		return false;
	}
	
	if(!tWidthEle.checkValidity()){
		return false;
	}
	
	/* canvas要素のノードオブジェクト */
	var canvas = document.getElementById('bg_pattern');

	var tHeight = tHeightEle.value;
	var tWidth = tWidthEle.value;
	canvas.height = tHeight;
	canvas.width = tWidth;
	
	draw();
}

function downloadPng(){
	// GoogleChromeしか考えていないためwebkitURLでいいや
	var ptn_canvas = document.getElementById('bg_pattern');
	
	// リンク要素を生成
	var a = document.createElement('a');
	a.setAttribute('href', ptn_canvas.toDataURL());
	a.setAttribute('target', '_blank');
	a.download = "bg.png";
	
	// ダウンロード実行したいためclickイベント
	var e = document.createEvent("MouseEvents");
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, true, false, false,  0, null);
	a.dispatchEvent(e);
}

function downloadChgSizePng() {

	var dHeightEle = document.getElementById('dHeight');
	var dWidthEle = document.getElementById('dWidth');
	
	if(dHeightEle == null || dHeightEle.value.length == 0){
		alert("縦幅を設定してください");
		return false;
	}
	
	if(!dHeightEle.checkValidity()){
		alert("縦幅を正しく設定してください");
		return false;
	}
	
	if(dWidthEle == null || dWidthEle.value.length == 0){
		alert("横幅を設定してください");
		return false;
	}
	
	if(!dWidthEle.checkValidity()){
		alert("横幅を正しく設定してください");
		return false;
	}
	
	var ptn_canvas = document.getElementById('bg_pattern');

	/* 背景 */
	/* canvas要素のノードオブジェクト */
	var chgSizeDL_canvas = document.createElement('canvas');
	chgSizeDL_canvas.width = dWidthEle.value;
	chgSizeDL_canvas.height = dHeightEle.value;
	
	/* 2Dコンテキスト */
	var chgSizeDL_ctx = chgSizeDL_canvas.getContext('2d');
	
	chgSizeDL_ctx.beginPath();
	
	var ptn = chgSizeDL_ctx.createPattern(ptn_canvas, 'repeat');
	chgSizeDL_ctx.fillStyle = ptn;

	chgSizeDL_ctx.fillRect(0, 0, chgSizeDL_canvas.width, chgSizeDL_canvas.height);
	chgSizeDL_ctx.stroke();

	// リンク要素を生成
	var a = document.createElement('a');
	a.setAttribute('href', chgSizeDL_canvas.toDataURL());
	a.setAttribute('target', '_blank');
	a.download = "bg.png";
	
	// ダウンロード実行したいためclickイベント
	var e = document.createEvent("MouseEvents");
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, true, false, false,  0, null);
	a.dispatchEvent(e);
}

function replaceColorCode() {

	var bgcolorEle = document.getElementById('bgColor');
	var ptcolorEle = document.getElementById('ptColor');
	
	if(!bgcolorEle.checkValidity()){
		return false;
	}
	if(!ptcolorEle.checkValidity()){
		return false;
	}
	var bgcolor = bgcolorEle.value;
	var ptcolor = ptcolorEle.value;
	
	/* canvas要素のノードオブジェクト */
	bgcolorEle.value = ptcolor;
	ptcolorEle.value = bgcolor;
	
	chgColor(bgcolorEle);
	chgColor(ptcolorEle);
}

function randomColorCode() {

	var bgcolorEle = document.getElementById('bgColor');
	var ptcolorEle = document.getElementById('ptColor');
	
	var k = Math.floor( Math.random() * 6);
		
	var c1 = Math.floor( Math.random() * 6);
	var m1 = Math.floor( Math.random() * 6);
	var y1 = Math.floor( Math.random() * 6);
	
	var bgcolor = cmykToHex(25*c1,25*m1,25*y1,25*k);
	
	var c2 = 0;
	var m2 = 0;
	var y2 = 0;
	
	for (var i = 0 ; i < 5 ; i++){
		c2 = Math.floor( Math.random() * 6);
		m2 = Math.floor( Math.random() * 6);
		y2 = Math.floor( Math.random() * 6);

		ptcolor = cmykToHex(25*c2,25*m2,25*y2,25*k);
		
		if(bgcolor !== ptcolor) {
			break;
		}
	}
	
	bgcolorEle.value = bgcolor;
	ptcolorEle.value = ptcolor;
	
	chgColor(bgcolorEle);
	chgColor(ptcolorEle);
}
 
(function(np){
	
	np = np || window;
	
	/**
	 * @author phi
	 */
	/**
	 * スターパスセット
	 * @param   {CanvasRenderingContext2D}  ctx 描画先コンテキスト
	 * @param   {Number}	x 値
	 * @param   {Number}	y 値
	 * @param   {Number}	radius  半径
	 * @param   {Number}	sides   辺の数
	 * @param   {Number}	sideIndent  凹み(0.0 ~ 1.0)
	 * @param   {Number}	offsetAngle 角度(省略時は270°)
	 */
	np.star = function(ctx, x, y, radius, sides, sideIndent, offsetAngle)
	{
		// 内円の大きさ(radius * sideIndent)
		var sideIndentRadius = radius * (sideIndent || 0.38);
		var radOffset = (offsetAngle) ? offsetAngle*Math.PI/180 : -Math.PI/2;
		var radDiv = (Math.PI*2)/sides/2;
		
		ctx.moveTo(
	 	   x + Math.cos(radOffset)*radius,
	 	   y + Math.sin(radOffset)*radius
		);
		for (var i=1; i<sides*2; ++i) {
	 	   var rad = radDiv*i + radOffset;
	 	   // 内円, 外円を交互にパスをセット
	 	   var len = (i%2) ? sideIndentRadius : radius;
	 	   ctx.lineTo(
	 	 	  x + Math.cos(rad)*len,
	 	 	  y + Math.sin(rad)*len
	 	   );
		}
		ctx.closePath();
	};
	
	/**
	 * フラワーーパスセット
	 * @param   {CanvasRenderingContext2D}  ctx 描画先コンテキスト
	 * @param   {Number}	x 値
	 * @param   {Number}	y 値
	 * @param   {Number}	radius  半径
	 * @param   {Number}	sides   辺の数
	 * @param   {Number}	sideIndent  凹み(0.0 ~ 1.0)
	 * @param   {Number}	offsetAngle 角度(省略時は270°)
	 */
	np.flower = function(ctx, x, y, radius, sides, sideIndent, offsetAngle)
	{
		// 真似して作ったいいが理屈をよくわかってない。一応動く。
		// 内円の大きさ(radius * sideIndent)
		var sideIndentRadius = radius * (sideIndent || 0.38);
		var radOffset = (offsetAngle) ? offsetAngle*Math.PI/180 : -Math.PI/2;
		var radDiv = (Math.PI*2)/sides/2;
		
		ctx.moveTo(
	 	   x,
	 	   y
		);
		for (var i=1; i<sides*2+1; ++i) {
			var rad = radDiv*i + radOffset;
			var rad2 = radDiv*(i+2) + radOffset;
			// 内円, 外円を交互にパスをセット
			var len = (i%2) ? sideIndentRadius : radius;
			ctx.bezierCurveTo(
				x + Math.cos(rad)*len,
				y + Math.sin(rad)*len,
				x + Math.cos(rad2)*len,
				y + Math.sin(rad2)*len,
				x,
				y
			);
		}
		ctx.closePath();
	};
	
	/**
	 * スター塗りつぶし描画
	 * @param   {CanvasRenderingContext2D}  ctx 描画先コンテキスト
	 * @param   {Number}	x 値
	 * @param   {Number}	y 値
	 * @param   {Number}	radius  半径
	 * @param   {Number}	sides   辺の数
	 * @param   {Number}	sideIndent  凹み(0.0 ~ 1.0)
	 * @param   {Number}	offsetAngle 角度(省略時は270°)
	 */
	np.fillStar = function(ctx, x, y, radius, sides, sideIndent, offsetAngle, color, shadow)
	{
		ctx.fillStyle = HexToRgb(color);
		ctx.strokeStyle = HexToRgb(color);
		star(ctx, x, y, radius/2, sides, sideIndent, offsetAngle);
		ctx.shadowBlur = shadow;
		ctx.shadowColor = HexToShadow(color);
		ctx.fill();
	};
	
	np.fillCircle = function(ctx, x, y, r, color, shadow)
	{
		ctx.beginPath();
		ctx.fillStyle = HexToRgb(color);
		ctx.strokeStyle = HexToRgb(color);
		ctx.arc(x, y, r/2, 0, Math.PI*2.0, true);
		ctx.shadowBlur = shadow;
		ctx.shadowColor = HexToShadow(color);
		ctx.fill();
	};
	
	/**
	 * フラワーー塗りつぶし描画
	 */
	np.fillFlower = function(ctx, x, y, radius, sides, sideIndent, offsetAngle, color, shadow)
	{
		ctx.fillStyle = HexToRgb(color);
		ctx.strokeStyle = HexToRgb(color);
		flower(ctx, x, y, radius/2, sides, sideIndent, offsetAngle);
		ctx.shadowBlur = shadow;
		ctx.shadowColor = HexToShadow(color);
		ctx.fill();
	};
})();
