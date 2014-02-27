window.onload = function() {
	
		chrome.extension.sendMessage({
	        type: "change"
	    }, function(response) {
	    	var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("There are no any divs in the page.");
			} else {
				for(var i=0; i<divs.length; i++) {
				//	divs[i].style.backgroundColor = response.color;
					divs[i].innerHTML = response.message.split(",")[1];
					divs[i].addEventListener('click', function(){

						chrome.extension.sendMessage({type: "link", link: "http://shoppingbaba.in/stores/" + response.message.split(",")[0]});
					}, false);
				}
			}	
	    });
	
}
