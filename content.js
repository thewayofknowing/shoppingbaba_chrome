chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	
		if(message.type == "change") {
			console.log("Color!!");
			var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("There are no any divs in the page.");
			} else {
				for(var i=0; i<divs.length; i++) {
				//	divs[i].style.backgroundColor = message.color;
				}
			}
			$( "#dialog-content1" ).dialog("open");

		}
		else if(message.type == "add") {
			console.log("Added");
			$("html").append("<div id='dialog-content1' > Hello </div> ");
			 $("#dialog-content1").dialog({
			 	autoOpen : false,
			 	height: 200,
			 	position: {at :'right top'}
			 });
			 //$(".ui-dialog-titlebar").hide();
		}
		
});