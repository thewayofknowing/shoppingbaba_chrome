chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			$( "body" ).prepend( "<div id='shopping-baba' style='position:fixed;  background: url(\"http://1.bp.blogspot.com/--tscpVzcBjo/TdUarKtcAlI/AAAAAAAAA3I/qVkypiYO9rc/s150/w2b_facebookbadge.png\") no-repeat; height:270px; width:245px; padding-bottom:2px; top:15%; right:-200px; z-index: 999999;'></div>" );
			//console.log("<div id='shopping-baba' style='position:fixed;  background: url(\"icons/fb.png\") no-repeat; margin-left:96%; height:270px; width:245px; top:30%; z-index: 9999;'></div>");
			var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("There are no any divs in the page.");
			} else {
				for(var i=0; i<divs.length; i++) {
				//	divs[i].style.backgroundColor = message.color;
				}
			}
		break;
	}
});