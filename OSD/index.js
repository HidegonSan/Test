// 関数類 //
// キャンバス類 //

// 背景色 設定
function set_backgroundcolor(elm, color="white") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, elm.width, elm.height);
	}
}


// 長方形 描画
function draw_rect(elm, start_x, start_y, width, height, color="black") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(start_x, start_y, width, height);
	}
}


// 枠 描画
function draw_rect_border(elm, start_x, start_y, width, height, border_width=1, color="black") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth = border_width;
		ctx.strokeStyle = color;
		ctx.rect(start_x, start_y, width, height);
		ctx.stroke();
	}
}


// 点 描画
function draw_pixel(elm, x, y, color) {
	draw_rect(elm, x, y, 1, 1, color);
}


// 線 描画
function draw_line(elm, src_x, src_y, dst_x, dst_y, width=1, color="black") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d");
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(src_x, src_y);
		ctx.lineTo(dst_x, dst_y);
		ctx.stroke();
	}
}


// テキスト 描画
function draw_string(elm, string, x, y, size=10, color="white", font="px Noto") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d");
		ctx.font = size.toString() + font;
		ctx.textBaseline = "bottom";
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
	}
}


// 円 描画
function draw_cycle(elm, x, y, radius_start, radius_end, start=0, end=360, color="black") {
	var rect_length = parseInt((radius_end*2) / 1.41421356237);
	var mini_radius = parseInt(rect_length / 2);
	// C++側では高速化のために以下の処理を行うが、JSでは汚くなるので使用しない
	// var rect_x = x - mini_radius;
	// var rect_y = y - mini_radius;

	// if (start == 0 && end == 360 && radius_start == 0) {
	// 	draw_rect(elm, rect_x, rect_y, rect_length, rect_length, color);
	// }
	// else {
		mini_radius = radius_start;
	//}

	for (var r = mini_radius; r < radius_end; r++) {
		for (var angle = start; angle < end; angle++) {
			draw_pixel(elm, x + Math.cos(degree_to_radian(angle))*r, y + Math.sin(degree_to_radian(angle))*r, color);
		}
	}
}
// キャンバス類 終了 //

// キャンバス 実機寄り関数類 //
// u32 Draw(const std::string &str, u32 posX, u32 posY, const Color &foreground = Color::White, const Color &background = Color::Black) const;
function c_draw(elm, str, pos_x, pos_y, foreground="white", background="black") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d")
		ctx.font = "10px Noto Mono";
		draw_rect(elm, pos_x, pos_y, ctx.measureText(str).width, 10, background);
		draw_string(elm, str, pos_x, pos_y + 10, 10, foreground, "px Noto Mono");
	}
}


// u32 DrawSysfont(const std::string &str, u32 posX, u32 posY, const Color &foreground = Color::White) const;
function c_draw_sysfont(elm, str, pos_x, pos_y, foreground="white") {
	if (elm.getContext) {
		var ctx = elm.getContext("2d")
		ctx.font = "14px Noto";
		draw_string(elm, str, pos_x, pos_y + 16, 14, foreground);
	}
}


// void DrawPlus(const Screen &scr, const std::string &str, u32 posX, u32 posY, u32 borderWidth, u32 padding, const Color &foreground, const Color &background, const Color &border)
function c_draw_plus(elm, str, pos_x, pos_y, border_width, padding, foreground, background, border_color) {
	if (elm.getContext) {
		var ctx = elm.getContext("2d")
		ctx.font = "10px Noto Mono";
		var bg_width = ctx.measureText(str).width;
		var height = 10 + padding*2;

		// 枠 描画
		// Top
		draw_rect(elm, pos_x, pos_y, bg_width + (border_width*2) + (padding*2), border_width, border_color);
		// Right
		draw_rect(elm, pos_x + border_width + padding + bg_width + padding, pos_y + border_width, border_width, height, border_color);
		// Bottom
		draw_rect(elm, pos_x, pos_y + border_width + height, bg_width + (border_width*2) + (padding)*2, border_width, border_color);
		// Left
		draw_rect(elm, pos_x, pos_y + border_width, border_width, height, border_color);

		// 背景 描画
		draw_rect(
			elm,
			pos_x + border_width,
			pos_y + border_width,
			bg_width + padding*2,
			10 + padding*2,
			background
		);

		// 文字 描画
		c_draw(
			elm,
			str,
			pos_x + border_width + padding,
			pos_y + border_width + padding,
			foreground,
			background
		);
	}
}


// DrawSysfontPlus(const Screen &scr, const std::string &str, u32 posX, u32 posY, u32 borderWidth, u32 padding, const Color &foreground, const Color &background, const Color &border)
function c_draw_sysfont_plus(elm, str, pos_x, pos_y, border_width, padding, foreground, background, border_color, fillBackground) {
	if (elm.getContext) {
		var ctx = elm.getContext("2d")
		ctx.font = "14px Noto";
		var bg_width = ctx.measureText(str).width;
		var height = 16 + padding*2;

		// 枠 描画
		// Top
		draw_rect(elm, pos_x, pos_y, bg_width + (border_width*2) + (padding*2), border_width, border_color);
		// Right
		draw_rect(elm, pos_x + border_width + padding + bg_width + padding, pos_y + border_width, border_width, height, border_color);
		// Bottom
		draw_rect(elm, pos_x, pos_y + border_width + height, bg_width + (border_width*2) + (padding)*2, border_width, border_color);
		// Left
		draw_rect(elm, pos_x, pos_y + border_width, border_width, height, border_color);

		// 背景 描画
		if (fillBackground) {
			draw_rect(
				elm,
				pos_x + border_width,
				pos_y + border_width,
				bg_width + padding*2,
				16 + padding*2,
				background
			);
		}

		// 文字 描画
		c_draw_sysfont(
			elm,
			str,
			pos_x + border_width + padding,
			pos_y + border_width + padding,
			foreground
		);
	}
}


// void DrawRect(u32 posX, u32 posY, u32 width, u32 height, const Color &color, bool filled = true) const;
function c_draw_rect(elm, pos_x, pos_y, width, height, color, filled = true) {
	if (filled) {
		draw_rect(elm, pos_x, pos_y, width, height, color);
	}
	else {
		draw_rect_border(elm, pos_x, pos_y, width, height, 2, color); // 本来はborder-widthを1にすべきだが汚くなるため2にしている
	}
}


// void DrawPixel(u32 posX, u32 posY, const Color &color) const;
function c_draw_pixel(elm, pos_x, pos_y, color) {
	draw_pixel(elm, pos_x, pos_y, color);
}


// void DrawLine(const Screen &scr, int srcX, int srcY, int dstX, int dstY, const Color &color)
function c_draw_line(elm, src_x, src_y, dst_x, dst_y, color) {
	draw_line(elm, src_x, src_y, dst_x, dst_y, 2, color);
}


// void DrawCycle(const Screen &scr, u32 x, u32 y, u32 radiusStart, u32 radiusEnd, int start, int end, Color &color)
c_draw_cycle = draw_cycle;


// キャンバス 実機寄り関数類 終了 //


// 便利関数類 //
// 度 → ラジアン
function degree_to_radian(degree) {
	return degree*(Math.PI / 180);
}


// ゼロ埋め
function zfill(num, length) {
	return ("0".repeat(length) + num).slice(-length);
}


// Thanks: https://qiita.com/simiraaaa/items/2e7478d72f365aa48356
// クリップボードにコピーする
function copy(string) {
	var tmp = document.createElement("div");
	var pre = document.createElement('pre');
	pre.style.webkitUserSelect = "auto";
	pre.style.userSelect = "auto";
	tmp.appendChild(pre).textContent = string;
	var s = tmp.style;
	s.position = "fixed";
	s.right = "200%";
	document.body.appendChild(tmp);
	document.getSelection().selectAllChildren(tmp);
	var result = document.execCommand("copy");
	document.body.removeChild(tmp);
	return result;
}


// テキストとしてダウンロードする
function download_text(text, file_name) {
	var tmp = document.createElement("a");
	tmp.href = "data:text/plain," + encodeURIComponent(text);
	tmp.download = file_name;
	tmp.click();
}


// 今日の日付・時間 オレオレフォーマット 取得
function get_date() {
	var date = new Date();
	var y = date.getFullYear();
	var M = zfill((date.getMonth() + 1), 2);
	var d = zfill(date.getDate(), 2);
	var h = zfill(date.getHours(), 2);
	var m = zfill(date.getMinutes(), 2);
	var s = zfill(date.getSeconds(), 2);
	return (y + "_" + M + "_" + d + "_" + h + "_" + m + "_" + s); 
}


// Thanks: https://qiita.com/FumioNonaka/items/678a1e74ab73e23d6f14
// 要素 入れ替え
function replace_array_elements(array, targetId, sourceId) {
	return array.reduce((resultArray, element, id, originalArray) => [
		...resultArray,
		id === targetId ? originalArray[sourceId] :
		id === sourceId ? originalArray[targetId] :
		element
	], []);
}


// クッキーを設定する
function set_cookie(key_, value_) {
	document.cookie = key_ + "=" + encodeURIComponent(value_) + "; max-age=2147483647; SameSite=Strict; Secure";
}


// 全てのクッキーを取得する
function get_all_cookies() {
	var arr = new Array();
	var splitted_cookies = document.cookie.split("; ");

	for(var i=0; i<splitted_cookies.length; i++) {
		var cookie = splitted_cookies[i].split("=");
		arr[cookie[0]] = decodeURIComponent(cookie[1]);
	}

	return arr;
}


// Thanks: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
// 全てのクッキーを削除する
function delete_all_cookies() {
	var cookies = document.cookie.split(";");

	for (var i=0; i<cookies.length; i++) {
		var cookie = cookies[i];
		var eq_pos = cookie.indexOf("=");
		var name = eq_pos > -1 ? cookie.substr(0, eq_pos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}


// Thanks: https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
// indexOf all
function get_indices_of(searchStr, str, caseSensitive) {
	var searchStrLen = searchStr.length;

	if (searchStrLen == 0) {
		return [];
	}
	var startIndex = 0, index, indices = [];
	if (!caseSensitive) {
		str = str.toLowerCase();
		searchStr = searchStr.toLowerCase();
	}
	while ((index = str.indexOf(searchStr, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchStrLen;
	}

	return indices;
}


// Thanks: https://yamanoku.hatenablog.com/entry/2016/07/18/XSS%E5%AF%BE%E7%AD%96%E3%81%AE%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2%E3%81%AAJS%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%EF%BC%88%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E3%81%93%E3%81%A8%EF%BC%89
// XSSが発生しないようにサニタイズする
function escapeHTML(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, '&#39;');
	return str;
}


// IDを受け取り、そのIDの要素に値をセットする
function set_value(id, value) {
	document.getElementById(id).value = value;
}


// IDを受け取り、そのIDの値を返す
function get_value(id) {
	return document.getElementById(id).value;
}


// Thanks: https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
// 色名をカラーコードに変換する
function color_name_to_hex(color) {
	var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
	"beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
	"cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
	"darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
	"darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
	"darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
	"firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
	"gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
	"honeydew":"#f0fff0","hotpink":"#ff69b4",
	"indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
	"lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
	"lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
	"lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
	"magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
	"mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
	"navajowhite":"#ffdead","navy":"#000080",
	"oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
	"palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
	"rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
	"saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
	"tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
	"violet":"#ee82ee",
	"wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
	"yellow":"#ffff00","yellowgreen":"#9acd32"};

	if (typeof colors[color.toLowerCase()] != 'undefined') {
		return colors[color.toLowerCase()];
	}

	return "#000000";
}
// 便利関数類 終了 //
// 関数類 終了 //



// キャンバス 初期化 //
var top_screen = document.getElementById("top_screen");
var bottom_screen = document.getElementById("bottom_screen");

// キャンバス サイズ 設定
top_screen.width = 400;
top_screen.height = 240;
bottom_screen.width = 320;
bottom_screen.height = 240;

// 背景 設定
set_backgroundcolor(top_screen, "white");
set_backgroundcolor(bottom_screen, "white");
// キャンバス 初期化 終了//



// 処理類 //
/*
Types: Pixel, Rect, Draw, DrawSysfont, Line, Cycle, Arc, Image
[Type: (types), Properties: [(Show/Hide), (Top/Bottom), (Comment), ...], ...]

Pixel                : x, y, color
Rect                 : x, y, width, height, color, filled
(Draw | DrawSysfont) : string, x, y, borderWidth, padding, foregroundColor, backgroundColor, borderColor, fillBackground
Line                 : x, y, x2, y2, color
Cycle                : x, y, radiusStart, radiusEnd, start, end, color
*/

// 変数類 //
var output_code = document.getElementById("output_code"); // 出力コード テキストエリア
var g_selecting_index = -1; // アイテムリスト 選択中 アイテム
var g_items = []; // アイテム リスト
var g_generated_codes = []; // 生成 コード リスト
var g_top_screen_background_url = ""; // 上画面 背景 データ
var g_bottom_screen_background_url = ""; // 下画面 背景 データ
var default_output_code = `
/* DrawOSD */
void DrawOSD(void) {
	const Screen& topScr = OSD::GetTopScreen();
	const Screen& btmScr = OSD::GetBottomScreen();
/* {CODE} */

}
/* End of DrawOSD */
`.replace(/\t/g, "  ").replace("\n", ""); // デフォルト 出力コード
// 変数類 終了 //


// CTRPF 色形式 変換
function to_ctrpf_color(color) {
	if (Array.isArray(color)) {
		return `Color(${color[0]}, ${color[1]}, ${color[2]})`;
	}
	else if (color.startsWith("#")) {
		var r = parseInt(color.slice(1, 1 + 2), 16);
		var g = parseInt(color.slice(3, 3 + 2), 16);
		var b = parseInt(color.slice(5, 5 + 2), 16);
		return `Color(${r}, ${g}, ${b})`;
	}
	else {
		return "Color::" + color.slice(0, 1).toUpperCase() + color.slice(1, color.length);
	}
}


// CSS 色形式 変換
function to_css_color(color) {
	if (color.indexOf("::") != -1) {
		return color.slice(7, color.length).toLowerCase();
	}
	else if (Array.isArray(color)) {
		var r = color[0];
		var g = color[1];
		var b = color[2];
		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
	}
	else {
		return color;
	}
}


// アイテム 追加
function add_item(kind, properties) {
	g_items.push([kind, properties]);
}


// アイテム 削除
function remove_item(index) {
	g_items.splice(index, 1)
	if (g_selecting_index != -1 && (index < g_selecting_index || index == g_items.length)) {
		g_selecting_index--;
	}
}


// アイテム 入れ替え 上
function up_item(index) {
	if (2 <= g_items.length && 0 < index) {
		g_items = replace_array_elements(g_items, index, index - 1);
		if ((index - 1) == g_selecting_index) {
			g_selecting_index++;
			return;
		}
		if (index == g_selecting_index) {
			g_selecting_index--;
		}
	}
}


// アイテム 入れ替え 下
function down_item(index) {
	if (2 <= g_items.length && index < (g_items.length - 1)) {
		g_items = replace_array_elements(g_items, index, index + 1);
		if ((index + 1) == g_selecting_index) {
			g_selecting_index--;
			return;
		}
		if (index == g_selecting_index) {
			g_selecting_index++;
		}
	}
}


// アイテム 表示 非表示 切り替え
function toggle_visibility(index) {
	g_items[index][1][0] = !g_items[index][1][0];
}


// 背景 描画
function draw_background() {
	// 上画面
	if (g_top_screen_background_url && top_screen.getContext) {
		var ctx = top_screen.getContext("2d");
		var img = new Image;
		img.addEventListener("load", function() {
			ctx.drawImage(img, 0, 0);
			if (document.getElementById("draw_ctrpf").checked) { // この条件式がないとdraw_ctrpf_backgroundのelse内で背景削除コードが働き、ユーザ背景も消える
				draw_ctrpf_background(); // CTRPF 背景 描画
			}
			draw_items(); // キャンバス 描画
		})
		img.src = g_top_screen_background_url;
	}
	// 下画面
	if (g_bottom_screen_background_url && bottom_screen.getContext) {
		var ctx_ = bottom_screen.getContext("2d");
		var img_ = new Image;
		img_.addEventListener("load", function() {
			ctx_.drawImage(img_, 0, 0);
			if (document.getElementById("draw_ctrpf").checked) { // この条件式がないとdraw_ctrpf_backgroundのelse内で背景削除コードが働き、ユーザ背景も消える
				draw_ctrpf_background(); // CTRPF 背景 描画
			}
			draw_items(); // キャンバス 描画
		})
		img_.src = g_bottom_screen_background_url;
	}
}


// CTRPF 背景 描画
function draw_ctrpf_background() {
	// 背景 描画 選択済み
	if (document.getElementById("draw_ctrpf").checked) {
		// ベースウィンドウ 描画
		draw_rect(top_screen, 30, 20, 340, 200, "black");
		draw_rect(bottom_screen, 20, 20, 280, 200, "black");
		// ウィンドウ 枠 描画
		draw_rect_border(top_screen, 32, 22, 336, 196, 2, "white");
		draw_rect_border(bottom_screen, 22, 22, 276, 196, 2, "white");
	}
	else {
		// 背景 削除
		set_backgroundcolor(top_screen, "white");
		set_backgroundcolor(bottom_screen, "white");
	}
}


// コード 生成
function output_generated_code() {
	// Types: Pixel, Rect, Draw, DrawSysfont, Line, Cycle, Arc, Image
	g_generated_codes = []; // 一旦リセット

	for (var i=0; i<g_items.length; i++) {
		var item = g_items[i];
		var type = item[0];
		var properties = item[1];
		var show = properties[0];
		var comment_out = show ? "" : "// ";
		var is_top_screen = properties[1];
		var scr = is_top_screen ? "topScr" : "btmScr";
		var comment = " // " + properties[2];

		if (type == -1) { // 未生成
			g_generated_codes.push("/* UNDEFINED */");
		}

		if (type == 0) { // Pixel
			// x, y, color
			var x = properties[3];
			var y = properties[4];
			var color = to_ctrpf_color(properties[5]);
			var code = comment_out + scr + `.DrawPixel(${x}, ${y}, ${color});${comment}`;
			g_generated_codes.push(code);
		}

		else if (type == 1) { // Rect
			// x, y, width, height, color, filled
			var x = properties[3];
			var y = properties[4];
			var width = properties[5];
			var height = properties[6];
			var color = to_ctrpf_color(properties[7]);
			var filled = properties[8];
			var code = comment_out + scr + `.DrawRect(${x}, ${y}, ${width}, ${height}, ${color}, ${filled});${comment}`;
			g_generated_codes.push(code);
		}

		else if (type == 2) { // Draw
			// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
			var str = properties[3];
			var x = properties[4];
			var y = properties[5];
			var border_width = properties[6];
			var padding = properties[7];
			var foreground = to_ctrpf_color(properties[8]);
			var background = to_ctrpf_color(properties[9]);
			var border_color = to_ctrpf_color(properties[10]);
			var code = comment_out + `DrawPlus(${scr}, "${str.replace(/"/g, "\\\"")}", ${x}, ${y}, ${border_width}, ${padding}, ${foreground}, ${background}, ${border_color});${comment}`;
			g_generated_codes.push(code);
		}

		else if (type == 3) { // DrawSysfont
			// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
			var str = properties[3];
			var x = properties[4];
			var y = properties[5];
			var border_width = properties[6];
			var padding = properties[7];
			var foreground = to_ctrpf_color(properties[8]);
			var background = to_ctrpf_color(properties[9]);
			var border_color = to_ctrpf_color(properties[10]);
			var fillBackground = properties[11];
			
			var code = comment_out + `DrawSysfontPlus(${scr}, "${str.replace(/"/g, "\\\"")}", ${x}, ${y}, ${border_width}, ${padding}, ${foreground}, ${background}, ${border_color}, ${fillBackground});${comment}`;
			g_generated_codes.push(code);
		}

		else if (type == 4) { // Line
			// x, y, x2, y2, color
			var x = properties[3];
			var y = properties[4];
			var x2 = properties[5];
			var y2 = properties[6];
			var color = to_ctrpf_color(properties[7]);
			var code = comment_out + `DrawLine(${scr}, ${x}, ${y}, ${x2}, ${y2}, ${color});${comment}`;
			g_generated_codes.push(code);
		}

		else if (type == 5) { // Cycle
			// x, y, radius_start, radius_end, start=0, end=360, color
			var x = properties[3];
			var y = properties[4];
			var radius_start = properties[5];
			var radius_end = properties[6];
			var start = properties[7];
			var end = properties[8];
			var color = to_ctrpf_color(properties[9]);
			var code = comment_out + `DrawCycle(${scr}, ${x}, ${y}, ${radius_start}, ${radius_end}, ${start}, ${end}, ${color});${comment}`;
			g_generated_codes.push(code);
		}
	}
	// 画面左のテキストエリアに代入
	output_code.value = default_output_code.replace("/* {CODE} */", "\n  " + g_generated_codes.join("\n  ").replace(/\s\/\/\s\n/g, "\n").replace(/\s\/\/\s$/g, ""));
}


// アイテムリスト 選択 イベント
function items_select_event() {
	// オレンジ 強調
	var elements = document.getElementsByClassName("item");

	for (var i=0; i<elements.length; i++) {
		elements[i].addEventListener("click", function(e) {
			var items = Array.prototype.slice.call(document.querySelectorAll("#items > div"));
			var target = e.target;
			if (target.className.indexOf("item_ignore") != -1) return; // チェックボックス等 無視
			while (target.parentNode.id != "items") { // 子要素をクリックした場合親要素になるまでループ
				target = target.parentNode;
			}
			var selecting = document.getElementById("item_selecting");
			if (selecting) selecting.id = ""; // 選択状態 剥奪
			target.id = "item_selecting"; // 選択状態 付与
			var index = items.indexOf(target);
			g_selecting_index = index; // 選択中アイテム グローバル変数
		})
	}

	// UP DOWN REMOVE SHOW イベント
	var item_buttons = document.getElementsByClassName("item_ignore");
	for (var i=0; i<item_buttons.length; i++) {
		var item_button = item_buttons[i];
		item_button.addEventListener("click", function(e) {
			var items = Array.prototype.slice.call(document.querySelectorAll("#items > div"));
			var target = e.target;
			while (target.parentNode.id != "items") { // 親要素になるまでループ
				target = target.parentNode;
			}
			var index = items.indexOf(target);
			// ITEM UP
			if (e.target.className.indexOf("item_up") != -1) {
				up_item(index);
			}
			// ITEM DOWN
			else if (e.target.className.indexOf("item_down") != -1) {
				down_item(index);
			}
			// ITEM REMOVE
			else if (e.target.className.indexOf("item_remove") != -1) {
				remove_item(index);
			}
			// ITEM SHOW/HIDE
			else if (e.target.className.indexOf("item_show") != -1) {
				toggle_visibility(index);
			}
		});
	}
}


// アイテムリスト 更新
function update_items() {
	var items = document.getElementById("items");
	items.innerHTML = ''; // 一旦空にする
	var template = '<hr><div class="item update_" id="{SELECTING}" title="{COMMENT}" ><button class="item_up item_ignore update_" >↑</button><button class="item_down item_ignore update_" >↓</button><input class="item_show item_ignore update_" type="checkbox" {SHOW}><button class="item_remove item_ignore update_" ()>🗑</button><div>{CODE}</div></div>';

	for (var i=0; i<g_items.length; i++) {
		var generated_code = g_generated_codes[i];
		var show = (!generated_code.startsWith("//") && g_items[i][0] != -1) ? "checked" : "";
		var comments = get_indices_of("//", generated_code);
		var last_comment = comments[comments.length - 1];
		var comment = escapeHTML(generated_code.slice(last_comment + 3, generated_code.length));
		var code = escapeHTML(generated_code.slice(0, last_comment));
		var selecting = i == g_selecting_index ? "item_selecting" : "";
		items.insertAdjacentHTML("beforeend", template.replace("{COMMENT}", comment).replace("{SHOW}", show).replace("{CODE}", code).replace("{SELECTING}", selecting));
	}
	items.innerHTML += '<hr><button id="item_add" class="update_">Add Item</button>'; // アイテム追加ボタン

	// 編集中 アイテム 表示
	if (g_selecting_index != -1) {
		document.querySelector("#item_editor_title > span").innerText = "Editing: " + (g_selecting_index + 1).toString();
	}
	else {
		document.querySelector("#item_editor_title > span").innerText = "Editing: ---";
	}

	// イベント
	// アイテムの中のボタン等
	items_select_event();
	// 更新イベント付与
	var update_buttons = document.getElementsByClassName("update_");
	for (var i=0; i<update_buttons.length; i++) {
		update_buttons[i].addEventListener("click", function() {
			update();
		});
	}
	// 新規アイテム追加
	var add_item_button = document.getElementById("item_add");
	add_item_button.addEventListener("click", function() {
		add_item(-1, [false]);
		update();
	});

	// アイテム一覧 アイテム数 表示
	document.querySelector("#items_title > span").innerText = `(${g_items.length})`;
}


// 指定IDの要素を表示する
function show_element(id) {
	document.getElementById(id).classList.remove("hide");
}


// IDをリストで受け取り、その全ての要素を表示する
function show_elements(ids) {
	for (var i=0; i<ids.length; i++) {
		show_element(ids[i]);
	}
}


// アイテムエディタ セット
function set_item_editor(index) {
	document.getElementById("item_color2_checkbox").classList.add("hide");
	var editor_elements = document.getElementsByClassName("item_editor_block");
	for (var i=0; i<editor_elements.length; i++) {
		editor_elements[i].classList.add("hide");
	}

	if (g_selecting_index < 0) return;

	var item = g_items[g_selecting_index];
	var type = item[0];
	var properties = item[1];
	document.querySelector("#item_color1_block > label").innerText = "Color: ";
	document.querySelector("#item_x_block > label").innerText = "X: ";
	document.querySelector("#item_y_block > label").innerText = "Y: ";

	if (type == -1) { // 未生成
		set_value("item_types", "");
		show_elements(["item_types_block"]);
		return;
	}

	else if (type == 0) { // Pixel
		// x, y, color
		var x = properties[3];
		var y = properties[4];
		var color = to_css_color(properties[5]);
		show_elements(["item_types_block", "item_x_block", "item_y_block", "item_color1_block", "item_comment_block", "item_screen_block"]);
		set_value("item_types", "pixel");
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());

		if (color.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", color);
		}
		else {
			set_value("item_color1", color.slice(0, 1).toUpperCase() + color.slice(1, color.length));
			set_value("item_colorpicker1", color_name_to_hex(color));
		}
	}

	else if (type == 1) { // Rect
		// x, y, width, height, color, filled
		var x = properties[3];
		var y = properties[4];
		var width = properties[5];
		var height = properties[6];
		var color = to_css_color(properties[7]);
		var filled = properties[8];
		show_elements(["item_types_block", "item_width_block", "item_height_block", "item_x_block", "item_y_block", "item_color1_block", "item_filled_block", "item_comment_block", "item_screen_block"]);
		set_value("item_types", "rect");
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());
		set_value("item_width", width.toString());
		set_value("item_height", height.toString());
		document.getElementById("item_filled").checked = filled;

		if (color.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", color);
		}
		else {
			set_value("item_color1", color.slice(0, 1).toUpperCase() + color.slice(1, color.length));
			set_value("item_colorpicker1", color_name_to_hex(color));
		}
	}

	else if (type == 2) { // Draw
		// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
		var str = properties[3];
		var x = properties[4];
		var y = properties[5];
		var border_width = properties[6];
		var padding = properties[7];
		var foreground = to_css_color(properties[8]);
		var background = to_css_color(properties[9]);
		var border_color = to_css_color(properties[10]);
		show_elements(["item_types_block", "item_text_block", "item_x_block", "item_y_block", "item_border_width_block", "item_padding_block", "item_color1_block", "item_color2_block", "item_color3_block", "item_comment_block", "item_screen_block"]);
		set_value("item_types", "draw");
		set_value("item_text", str);
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());
		set_value("item_border_width", border_width.toString());
		set_value("item_padding", padding.toString());
		document.querySelector("#item_color1_block > label").innerText = "Foreground: ";

		if (foreground.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", foreground);
		}
		else {
			set_value("item_color1", foreground.slice(0, 1).toUpperCase() + foreground.slice(1, foreground.length));
			set_value("item_colorpicker1", color_name_to_hex(foreground));
		}

		if (background.startsWith("#")) {
			set_value("item_color2", "");
			set_value("item_colorpicker2", background);
		}
		else {
			set_value("item_color2", background.slice(0, 1).toUpperCase() + background.slice(1, background.length));
			set_value("item_colorpicker2", color_name_to_hex(background));
		}

		if (border_color.startsWith("#")) {
			set_value("item_color3", "");
			set_value("item_colorpicker3", border_color);
		}
		else {
			set_value("item_color3", border_color.slice(0, 1).toUpperCase() + border_color.slice(1, border_color.length));
			set_value("item_colorpicker3", color_name_to_hex(border_color));
		}
	}

	else if (type == 3) { // DrawSysfont
		// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
		var str = properties[3];
		var x = properties[4];
		var y = properties[5];
		var border_width = properties[6];
		var padding = properties[7];
		var foreground = to_css_color(properties[8]);
		var background = to_css_color(properties[9]);
		var border_color = to_css_color(properties[10]);
		var fillBackground = properties[11];
		show_elements(["item_types_block", "item_text_block", "item_x_block", "item_y_block", "item_border_width_block", "item_padding_block", "item_color1_block", "item_color2_block", "item_color3_block", "item_comment_block", "item_screen_block", "item_color2_checkbox"]);
		set_value("item_types", "draw_sysfont");
		set_value("item_text", str);
		set_value("item_x", x.toString());
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());
		set_value("item_border_width", border_width.toString());
		set_value("item_padding", padding.toString());
		document.getElementById("item_color2_checkbox").checked = fillBackground;

		if (foreground.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", foreground);
		}
		else {
			set_value("item_color1", foreground.slice(0, 1).toUpperCase() + foreground.slice(1, foreground.length));
			set_value("item_colorpicker1", color_name_to_hex(foreground));
		}

		if (background.startsWith("#")) {
			set_value("item_color2", "");
			set_value("item_colorpicker2", background);
		}
		else {
			set_value("item_color2", background.slice(0, 1).toUpperCase() + background.slice(1, background.length));
			set_value("item_colorpicker2", color_name_to_hex(background));
		}

		if (border_color.startsWith("#")) {
			set_value("item_color3", "");
			set_value("item_colorpicker3", border_color);
		}
		else {
			set_value("item_color3", border_color.slice(0, 1).toUpperCase() + border_color.slice(1, border_color.length));
			set_value("item_colorpicker3", color_name_to_hex(border_color));
		}
	}

	else if (type == 4) { // Line
		// x, y, x2, y2, color
		var x = properties[3];
		var y = properties[4];
		var x2 = properties[5];
		var y2 = properties[6];
		var color = to_css_color(properties[7]);
		show_elements(["item_types_block", "item_x_block", "item_y_block", "item_x2_block", "item_y2_block", "item_color1_block", "item_comment_block", "item_screen_block"]);
		set_value("item_types", "line");
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());
		set_value("item_x2", x2.toString());
		set_value("item_y2", y2.toString());
		document.querySelector("#item_x_block > label").innerText = "From X: ";
		document.querySelector("#item_y_block > label").innerText = "From Y: ";

		if (color.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", color);
		}
		else {
			set_value("item_color1", color.slice(0, 1).toUpperCase() + color.slice(1, color.length));
			set_value("item_colorpicker1", color_name_to_hex(color));
		}
	}

	else if (type == 5) { // Cycle
		// x, y, radius_start, radius_end, start=0, end=360, color
		var x = properties[3];
		var y = properties[4];
		var radius_start = properties[5];
		var radius_end = properties[6];
		var start = properties[7];
		var end = properties[8];
		var color = to_css_color(properties[9]);
		show_elements(["item_types_block", "item_x_block", "item_y_block", "item_radius_start_block", "item_radius_end_block", "item_arc_start_block", "item_arc_end_block", "item_color1_block", "item_comment_block", "item_screen_block"]);
		set_value("item_types", "cycle");
		set_value("item_x", x.toString());
		set_value("item_y", y.toString());
		set_value("item_radius_start", radius_start.toString());
		set_value("item_radius_end", radius_end.toString());
		set_value("item_arc_start", start.toString());
		set_value("item_arc_end", end.toString());

		if (color.startsWith("#")) {
			set_value("item_color1", "");
			set_value("item_colorpicker1", color);
		}
		else {
			set_value("item_color1", color.slice(0, 1).toUpperCase() + color.slice(1, color.length));
			set_value("item_colorpicker1", color_name_to_hex(color));
		}
	}

	var is_top_screen = properties[1];
	var comment = properties[2];
	set_value("item_comment", comment);
	document.getElementById("item_screen").checked = is_top_screen;
}


// アイテム 描画
function draw_items() {
	g_generated_codes = [];
	var g_items_reversed = [...g_items].reverse();

	for (var i=0; i<g_items_reversed.length; i++) {
		var item = g_items_reversed[i];
		var type = item[0];
		var properties = item[1];
		var show = properties[0];
		var is_top_screen = properties[1];
		var scr = is_top_screen ? top_screen : bottom_screen;

		if (type == -1 || !show) {
			continue;
		}

		if (type == 0) { // Pixel
			// x, y, color
			var x = properties[3];
			var y = properties[4];
			var color = to_css_color(properties[5]);
			c_draw_pixel(scr, x, y, color);
		}

		else if (type == 1) { // Rect
			// x, y, width, height, color, filled
			var x = properties[3];
			var y = properties[4];
			var width = properties[5];
			var height = properties[6];
			var color = to_css_color(properties[7]);
			var filled = properties[8];
			c_draw_rect(scr, x, y, width, height, color, filled);
		}

		else if (type == 2) { // Draw
			// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
			var str = properties[3];
			var x = properties[4];
			var y = properties[5];
			var border_width = properties[6];
			var padding = properties[7];
			var foreground = to_css_color(properties[8]);
			var background = to_css_color(properties[9]);
			var border_color = to_css_color(properties[10]);
			c_draw_plus(scr, str, x, y, border_width, padding, foreground, background, border_color);
		}

		else if (type == 3) { // DrawSysfont
			// str, pos_x, pos_y, border_width, padding, foreground, background, border_color
			var str = properties[3];
			var x = properties[4];
			var y = properties[5];
			var border_width = properties[6];
			var padding = properties[7];
			var foreground = to_css_color(properties[8]);
			var background = to_css_color(properties[9]);
			var border_color = to_css_color(properties[10]);
			var fillBackground = properties[11];
			c_draw_sysfont_plus(scr, str, x, y, border_width, padding, foreground, background, border_color, fillBackground);
		}

		else if (type == 4) { // Line
			// x, y, x2, y2, color
			var x = properties[3];
			var y = properties[4];
			var x2 = properties[5];
			var y2 = properties[6];
			var color = to_css_color(properties[7]);
			c_draw_line(scr, x, y, x2, y2, color);
		}

		else if (type == 5) { // Cycle
			// x, y, radius_start, radius_end, start=0, end=360, color
			var x = properties[3];
			var y = properties[4];
			var radius_start = properties[5];
			var radius_end = properties[6];
			var start = properties[7];
			var end = properties[8];
			var color = to_css_color(properties[9]);
			c_draw_cycle(scr, x, y, radius_start, radius_end, start, end, color);
		}
	}
}


// 現在の状況をCookieに保存
function save() {
	set_cookie("save", JSON.stringify([g_selecting_index, document.getElementById("draw_ctrpf").checked, g_items]));
}


// Cookieに保存した状態を復元
function restore() {
	var save_data = JSON.parse(get_all_cookies()["save"]);
	g_selecting_index = parseInt(save_data[0]);
	document.getElementById("draw_ctrpf").checked = save_data[1];

	if (save_data[2]) {
		g_items = save_data[2];
	}

	update();
}


// メインループ
function update() {
	set_backgroundcolor(top_screen, "white");                // 一旦まっさらにする (上画面)
	set_backgroundcolor(bottom_screen, "white");             // 一旦まっさらにする (下画面)
	draw_background();                                       // 背景 描画
	draw_ctrpf_background();                                 // CTRPF 背景 描画
	if (!document.getElementById("draw_ctrpf").checked) {
		draw_background();                                   // CTRPF背景 削除 で消えてしまうためもう一度描画する
	}
	output_generated_code();                                 // コード 生成
	update_items();                                          // アイテムリスト 更新 & イベント 設定
	set_item_editor(g_selecting_index);                      // 現在選択中のアイテムに合ったアイテムエディタを設定する
	draw_items();                                            // キャンバス 描画
	save();                                                  // 保存

}
// 処理類 終了//



// イベント類 //
// 著作権表示 & 初期出力
var copyright = `
/*****************************************************/
/*                                                   */
/*             Generated by OSD Designer             */
/*                  Made by Hidegon                  */
/*  OSD Designer: https://HidegonSan.github.io/OSD/  */
/*                                                   */
/*****************************************************/

/* Utility functions for OSD */
// Thanks: https://en.wikipedia.org/wiki/Digital_differential_analyzer_(graphics_algorithm)
void DrawLine(const Screen &scr, int srcX, int srcY, int dstX, int dstY, const Color &color) {
	float x, y, dx, dy, step;
	int i;

	dx = (dstX - srcX);
	dy = (dstY - srcY);

	if (abs(dx) >= abs(dy)) {
		step = abs(dx);
	}
	else {
		step = abs(dy);
	}

	dx = dx / step;
	dy = dy / step;
	x = srcX;
	y = srcY;
	i = 1;

	while (i <= step) {
		scr.DrawPixel(x, y, color);
		x = x + dx;
		y = y + dy;
		i++;
	}
}


void DrawPlus(const Screen &scr, const std::string &str, u32 posX, u32 posY, u32 borderWidth, u32 padding, const Color &foreground, const Color &background, const Color &border) {
	int bgWidth = OSD::GetTextWidth(false, str);
	int height = 10 + padding*2;

	scr.DrawRect(posX, posY, bgWidth + (borderWidth*2) + (padding*2), borderWidth, border);
	scr.DrawRect(posX + borderWidth + padding + bgWidth + padding, posY + borderWidth, borderWidth, height, border);
	scr.DrawRect(posX, posY + borderWidth + height, bgWidth + (borderWidth*2) + (padding)*2, borderWidth, border);
	scr.DrawRect(posX, posY + borderWidth, borderWidth, height, border);

	scr.DrawRect(
		posX + borderWidth,
		posY + borderWidth,
		bgWidth + padding*2,
		10 + padding*2,
		background
	);

	scr.Draw(
		str,
		posX + borderWidth + padding,
		posY + borderWidth + padding,
		foreground,
		background
	);
}


void DrawSysfontPlus(const Screen &scr, const std::string &str, u32 posX, u32 posY, u32 borderWidth, u32 padding, const Color &foreground, const Color &background, const Color &border, bool fillBackground) {
	int bgWidth = OSD::GetTextWidth(true, str);
	int height = 16 + padding*2;

	scr.DrawRect(posX, posY, bgWidth + (borderWidth*2) + (padding*2), borderWidth, border);
	scr.DrawRect(posX + borderWidth + padding + bgWidth + padding, posY + borderWidth, borderWidth, height, border);
	scr.DrawRect(posX, posY + borderWidth + height, bgWidth + (borderWidth*2) + (padding)*2, borderWidth, border);
	scr.DrawRect(posX, posY + borderWidth, borderWidth, height, border);

	if (fillBackground) {
		scr.DrawRect(
			posX + borderWidth,
			posY + borderWidth,
			bgWidth + padding*2,
			16 + padding*2,
			background
		);
	}

	scr.DrawSysfont(
		str,
		posX + borderWidth + padding,
		posY + borderWidth + padding,
		foreground
	);
}


float DegreeToRadian(float degree) {
	return degree*(M_PI / 180);
}


void DrawCycle(const Screen &scr, u32 x, u32 y, u32 radiusStart, u32 radiusEnd, int start, int end, const Color &color) {
	u32 rectLength = (radiusEnd*2) / 1.41421356237;
	u32 miniRadius = rectLength / 2;

	u32 rectX = x - miniRadius;
	u32 rectY = y - miniRadius;

	if (start == 0 && end == 360 && radiusStart == 0) {
		scr.DrawRect(rectX, rectY, rectLength, rectLength, color);
	}
	else {
		miniRadius = radiusStart;
	}

	for (int r = miniRadius; r < radiusEnd; r++) {
		for (int angle = start; angle < end; angle++) {
			scr.DrawPixel(x + cos(DegreeToRadian(angle))*r, y + sin(DegreeToRadian(angle))*r, color);
		}
	}
}
/* End of Utility functions for OSD */
\n\n`.replace(/\n/, "");

// 出力コード コピー
var copy_button = document.getElementById("copy_button");
copy_button.addEventListener("click", function() {
	copy(copyright + output_code.value);
	alert("Copied!");
});

// 出力コード 保存
var save_button = document.getElementById("save_button");
save_button.addEventListener("click", function() {
	download_text(copyright + output_code.value, "osd_editor_" + get_date() + ".cpp");
});

// 上画面 背景 選択 ボタン
var background_image_top = document.getElementById("background_image_top");
var background_image_top_impl = document.getElementById("background_image_top_impl");
background_image_top.addEventListener("click", function() {
	background_image_top_impl.click();
});

// 下画面 背景 選択 ボタン
var background_image_bottom = document.getElementById("background_image_bottom");
var background_image_bottom_impl = document.getElementById("background_image_bottom_impl");
background_image_bottom.addEventListener("click", function() {
	background_image_bottom_impl.click();
});

// 上画面 背景 描画
background_image_top_impl.addEventListener("change", function(e) {
	g_top_screen_background_url = URL.createObjectURL(e.target.files[0]);
	draw_background();
});

// 下画面 背景 描画
background_image_bottom_impl.addEventListener("change", function(e) {
	g_bottom_screen_background_url = URL.createObjectURL(e.target.files[0]);
	draw_background();
});

// 背景 クリア
var clear_background_button = document.getElementById("clear_background");
clear_background_button.addEventListener("click", function() {
	set_backgroundcolor(top_screen, "white");
	set_backgroundcolor(bottom_screen, "white");
	g_top_screen_background_url = "";
	g_bottom_screen_background_url = "";
});

// リセット
var reset_button = document.getElementById("reset");
reset_button.addEventListener("click", function() {
	if (confirm("Are you sure want to reset?")) {
		g_items = [];
		g_selecting_index = -1;
		delete_all_cookies();
	}
})

// セーブデータ ダウンロード
var export_button = document.getElementById("export");
export_button.addEventListener("click", function() {
	download_text(JSON.stringify([g_selecting_index, document.getElementById("draw_ctrpf").checked].concat(g_items)), "osd_designer_" + get_date() + ".json");
});

// セーブデータ ロード
var import_button_impl = document.getElementById("import_impl");
var import_button = document.getElementById("import");
import_button.addEventListener("click", function() {
	if (confirm("Import save data will be delete now save data.\nAre you sure want to continue?")) {
		import_button_impl.click();
	}
});
import_button_impl.addEventListener("change", function(e) {
	var backup = g_items;
	var files = e.target.files;
	var reader = new FileReader();
	reader.readAsText(files[0]);
	reader.onload = function(ee) {
		try {
			var res = JSON.parse(reader.result);
			g_selecting_index = parseInt(res[0]);
			document.getElementById("draw_ctrpf").checked = res[1];
			g_items = res.slice(2);
			update();
		}
		catch {
			alert("Error: Invalid save data.");
			g_items = backup;
		}
	}
});

// アイテムエディタ
var item_types_inp = document.getElementById("item_types");
var item_screen_inp = document.getElementById("item_screen");
var item_str_inp = document.getElementById("item_text");
var item_x_inp = document.getElementById("item_x");
var item_y_inp = document.getElementById("item_y");
var item_x2_inp = document.getElementById("item_x2");
var item_y2_inp = document.getElementById("item_y2");
var item_width_inp = document.getElementById("item_width");
var item_height_inp = document.getElementById("item_height");
var item_border_width_inp = document.getElementById("item_border_width");
var item_padding_inp = document.getElementById("item_padding");
var item_radius_start_inp = document.getElementById("item_radius_start");
var item_radius_end_inp = document.getElementById("item_radius_end");
var item_arc_start_inp = document.getElementById("item_arc_start");
var item_arc_end_inp = document.getElementById("item_arc_end");
var item_color1_inp = document.getElementById("item_color1");
var item_colorpicker1_inp = document.getElementById("item_colorpicker1");
var item_color2_inp = document.getElementById("item_color2");
var item_colorpicker2_inp = document.getElementById("item_colorpicker2");
var item_color3_inp = document.getElementById("item_color3");
var item_colorpicker3_inp = document.getElementById("item_colorpicker3");
var item_filled_inp = document.getElementById("item_filled");
var item_comment_inp = document.getElementById("item_comment");
var item_fill_background_imp = document.getElementById("item_color2_checkbox");

item_types_inp.addEventListener("change", function() {
	var type = document.getElementById("item_types").value;
	var old_type = g_items[g_selecting_index][0];

	if (old_type != -1) {
		var show = g_items[g_selecting_index][1][0];
		var is_top = g_items[g_selecting_index][1][1];
		var comment = g_items[g_selecting_index][1][2];
		var x = parseInt(get_value("item_x"));
		var y = parseInt(get_value("item_y"));
		var color = (old_type == 2 || old_type == 3) ? "red" : get_value("item_color1");

		if (isNaN(x) || x < 0) {
			x = 0;
		}
		if (isNaN(y) || y < 0) {
			y = 0;
		}
		if (!color) {
			color = get_value("item_colorpicker1");
		}
	}
	else {
		var show = true;
		var is_top = true;
		var comment = "";
		var x = 0;
		var y = 0;
		var color = "red";
	}

	if (type == "pixel") {
		g_items[g_selecting_index][0] = 0;
		g_items[g_selecting_index][1] = [show, is_top, comment, x, y, color];
	}
	else if (type == "rect") {
		g_items[g_selecting_index][0] = 1;
		g_items[g_selecting_index][1] = [show, is_top, comment, x, y, 0, 0, color, true];
	}
	else if (type == "draw" || type == "draw_sysfont") {
		var is_draw = type == "draw";
		g_items[g_selecting_index][0] = is_draw ? 2 : 3;
		if (old_type == 2 || old_type == 3) {
			g_items[g_selecting_index][1] = g_items[g_selecting_index][1].slice(0, is_draw ? 11 : 12).concat(is_draw ? [] : [true]);
		}
		else {
			g_items[g_selecting_index][1] = [show, is_top, comment, "", x, y, 0, 0, "white", "black", "red"].concat(is_draw ? [] : [true]);
		}
	}
	else if (type == "line") {
		g_items[g_selecting_index][0] = 4;
		g_items[g_selecting_index][1] = [show, is_top, comment, 0, 0, 0, 0, color];
	}
	else if (type == "cycle") {
		g_items[g_selecting_index][0] = 5;
		g_items[g_selecting_index][1] = [show, is_top, comment, x, y, 0, 0, 0, 360, color];
	}

	update();
});

item_screen_inp.addEventListener("change", function() {
	g_items[g_selecting_index][1][1] = document.getElementById("item_screen").checked;
	update();
});

item_str_inp.addEventListener("change", function() {
	g_items[g_selecting_index][1][3] = get_value("item_text");
	update();
})

item_x_inp.addEventListener("change", function() {
	var type = g_items[g_selecting_index][0];
	var value = parseInt(get_value("item_x"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	if (type == 2 || type == 3) { // Draw, DrawSysfont
		g_items[g_selecting_index][1][4] = value;
	}
	else {
		g_items[g_selecting_index][1][3] = value;
	}

	update();
});

item_y_inp.addEventListener("change", function() {
	var type = g_items[g_selecting_index][0];
	var value = parseInt(get_value("item_y"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	if (type == 2 || type == 3) { // Draw, DrawSysfont
		g_items[g_selecting_index][1][5] = value;
	}
	else {
		g_items[g_selecting_index][1][4] = value;
	}

	update();
});

item_x2_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_x2"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][5] = value;
	update();
});

item_y2_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_y2"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][6] = value;
	update();
});

item_width_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_width"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][5] = value;
	update();
});

item_height_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_height"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][6] = value;
	update();
});

item_border_width_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_border_width"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][6] = value;
	update();
});

item_padding_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_padding"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}

	g_items[g_selecting_index][1][7] = value;
	update();
});

item_radius_start_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_radius_start"));
	var end = parseInt(get_value("item_radius_end"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}
	if ((end - 1) <= value) {
		value = end - 1;
	}

	g_items[g_selecting_index][1][5] = value;
	update();
});

item_radius_end_inp.addEventListener("change", function() {
	var start = parseInt(get_value("item_radius_start"));
	var value = parseInt(get_value("item_radius_end"));
	if (isNaN(value) || value < 0) {
		value = 0;
	}
	if (value <= (start + 1)) {
		value = start + 1;
	}

	g_items[g_selecting_index][1][6] = value;
	update();
});

item_arc_start_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_arc_start"));
	if (isNaN(value)) {
		value = 0;
	}

	g_items[g_selecting_index][1][7] = value;
	update();
});

item_arc_end_inp.addEventListener("change", function() {
	var value = parseInt(get_value("item_arc_end"));
	if (isNaN(value)) {
		value = 0;
	}

	g_items[g_selecting_index][1][8] = value;
	update();
});

item_color1_inp.addEventListener("change", function() {
	var value = get_value("item_color1");
	var type =g_items[g_selecting_index][0];

	if (type == 0) {
		g_items[g_selecting_index][1][5] = value;
	}
	else if (type == 1) {
		g_items[g_selecting_index][1][7] = value;
	}
	else if (type == 2 || type == 3) {
		g_items[g_selecting_index][1][8] = value;
	}
	else if (type == 4) {
		g_items[g_selecting_index][1][7] = value;
	}
	else if (type == 5) {
		g_items[g_selecting_index][1][9] = value;
	}

	update();
});

item_colorpicker1_inp.addEventListener("change", function() {
	var value = get_value("item_colorpicker1");
	var type =g_items[g_selecting_index][0];

	if (type == 0) {
		g_items[g_selecting_index][1][5] = value;
	}
	else if (type == 1) {
		g_items[g_selecting_index][1][7] = value;
	}
	else if (type == 2 || type == 3) {
		g_items[g_selecting_index][1][8] = value;
	}
	else if (type == 4) {
		g_items[g_selecting_index][1][7] = value;
	}
	else if (type == 5) {
		g_items[g_selecting_index][1][9] = value;
	}

	update();
});

item_color2_inp.addEventListener("change", function() {
	var value = get_value("item_color2");
	g_items[g_selecting_index][1][9] = value;
	update();
});

item_colorpicker2_inp.addEventListener("change", function() {
	var value = get_value("item_colorpicker2");
	g_items[g_selecting_index][1][9] = value;
	update();
});

item_color3_inp.addEventListener("change", function() {
	var value = get_value("item_color3");
	g_items[g_selecting_index][1][10] = value;
	update();
});

item_colorpicker3_inp.addEventListener("change", function() {
	var value = get_value("item_colorpicker3");
	g_items[g_selecting_index][1][10] = value;
	update();
});

item_filled_inp.addEventListener("change", function() {
	g_items[g_selecting_index][1][8] = document.getElementById("item_filled").checked;
	update();
});

item_comment_inp.addEventListener("change", function() {
	g_items[g_selecting_index][1][2] = get_value("item_comment");
	update();
});

item_fill_background_imp.addEventListener("change", function() {
	g_items[g_selecting_index][1][11] = document.getElementById("item_color2_checkbox").checked;
	update();
});
// アイテムエディタ イベント 終了

// タッチ移動
// Thanks: https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function get_cursor_position(canvas, event) {
	const rect = canvas.getBoundingClientRect()
	const x = event.clientX - rect.left
	const y = event.clientY - rect.top
	return [parseInt(x), parseInt(y)];
}

// 上画面
top_screen.addEventListener("click", function(e) {
	if (!document.getElementById("click_move").checked || !g_items[g_selecting_index][1][1]) return;
	var type = g_items[g_selecting_index][0];
	var pos = get_cursor_position(top_screen, e);
	var x = pos[0];
	var y = pos[1];

	if (type == 2 || type == 3) { // Draw, DrawSysfont
		g_items[g_selecting_index][1][4] = x;
		g_items[g_selecting_index][1][5] = y;
	}
	else {
		g_items[g_selecting_index][1][3] = x;
		g_items[g_selecting_index][1][4] = y;
	}

	update();
});

// 下画面
bottom_screen.addEventListener("click", function(e) {
	if (!document.getElementById("click_move").checked || g_items[g_selecting_index][1][1]) return;
	var type = g_items[g_selecting_index][0];
	var pos = get_cursor_position(bottom_screen, e);
	var x = pos[0];
	var y = pos[1];

	if (type == 2 || type == 3) { // Draw, DrawSysfont
		g_items[g_selecting_index][1][4] = x;
		g_items[g_selecting_index][1][5] = y;
	}
	else {
		g_items[g_selecting_index][1][3] = x;
		g_items[g_selecting_index][1][4] = y;
	}

	update();
});
// タッチ移動 終了

// 描画等 更新
var update_buttons = document.getElementsByClassName("update");
for (var i=0; i<update_buttons.length; i++) {
	update_buttons[i].addEventListener("click", function() {
		update();
	});
}
// イベント類 終了 //



// 初期化 //
// アイテム 表示 チェック
var item_show = document.getElementsByClassName("item_show");
for (var i=0; i<item_show.length; i++) {
	item_show[i].checked = true;
}

// CTRPF 背景描画 チェック
document.getElementById("draw_ctrpf").checked = true;

// 出力コード デフォルト値
output_code.value = default_output_code;

// Cookieの状態を復元
if (get_all_cookies()["save"] != undefined) {
	restore();
}

// 初期描画
update();
// 初期化 終了 //



// (C) 2022 Hidegon
// This file is part of https://HidegonSan.github.io/OSD/
