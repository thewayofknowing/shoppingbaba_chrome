var s = "myntra,myntra,Flat Rs.200 Cashback;Jabong,jabong,Flat 7% Cashback;Fashionara,fashionara,Upto Rs 170 Cashback;Babyoye,babyoye,Upto Rs 230 Cashback;Adlabs imagica,adlabs_imagica,Rs 170 per sale;Basics life,basics,Upto Rs 350 Cashback;Daily Objects,Daily_Objects,Rs 120 per sale;Expedia|Hotels,Expedia_Hotels,6% per sale on hotels;Expedia|Buses,expedia,Rs 30 per sale on buses;Expedia|Flights,Expedia_Flights,0.5% per sale on flights;Fab|furnish,fabfurnish,6% per sale;frens|petals,frensandpetals,12% per sale;fetise,fetise,8% per sale;floweraura,floweraura,12% per sale;Foodpanda,foodpanda,Upto Rs 160 Cashback;futurebazaar,futurebazaar,Upto Rs 90 Cashback;gaadi,gaadi,12% per sale;Globus,globus,No Cash Back Available Yet;go air,goair,No Cash Back Available Yet;gobol,gobol,1% per sale;godaam,godaam,Rs 140 per sale;greendust,greendust,Upto Rs 1000 Cashback;greetzap|voice,greetzap,10% per sale on voice cards;greetzap|flowers,greetzap_flowers,10% per sale on flowers & gifts;Homeshop18,homeshop18,Upto 8% Cashback;Hotels.com,hotels,6% per sale Cashback;indiacircus,indiacircus,Rs 170 per sale cashback;indiarush,indiarush,Rs 100 per sale cashback;shopping.indiatimes,indiatimesshopping,4% flat;Inkfruit,inkfruit,Rs 127 Cashback;Justeat,justeat,Rs 153 Cashback ;Lenskart,lenskart,Rs 90 Cashback;watchkart,watchkart,Rs 90 Cashback;bagskart,bagskart,Rs 90 Cashback;Jewelskart,jewelskart,Rs 90 Cashback;limeroad,limeroad,Rs 240 Cashback;masticart,masticart,Rs 170 Cashback;moodsofcloe,moodsofcloe,Rs 200 Cashback;naaptol,naaptol,Rs 212 Cashback;Shop at disney,shopatdisney, 6.80% Cashback;freedomtree,freedomtree,4% Cashback;Tata McGraw Hills,Tata_McGraw_Hills,6.80%  Cashback;pepperfry,pepperfry,Upto Rs 6.40% Cashback;policy advisor,policy_advisor,Rs  48 Cashback per lead;Printland.in,printland,12% Cashback;printvenue,printvenue,Rs 85 Cashback;zovi,zovi, Rs 195 Cashback;zivame,zivame,Rs 340 Cashback;yepme,yepme,9.6 % Cashback;yebhi,yebhi,8% Cashback;yatra|Hotels,yatraHotels,Rs 850 Cashback on Hotels;yatra|Domestic Flights,Yatra_Domestic_Flights,Rs 191 On domestic flights;yatra|international flights,yatra_international_flights,Rs 382 on international flights;vistaprint,vistaprint,Rs 200 Cashback;trendIN,trendIN,Rs 224 Cashback ;Travelguru,travelguru,Rs 510 Cashback;suratdiamond,suratdiamond,8.5% Cashback ;starCJ,starCJ,Rs 40 Cashback;snapdeal,snapdeal,Upto Rs 330 Cashback;shopclues,shopclues,3.60% Cashback;shopclues electronics,shopclues_electronics,1.7% Cashback on Electronics;rediff shopping,rediff_shopping,Rs 43 Cashback;provogue,provogue,5.95 % Cashback;Flipkart,flipkart,Upto 7% cashback;Ebay,ebay,Upto Rs 102 Cashback;Bestylish,bestylish,Rs 144 Cashback;Red Bus,redbus,Rs 35 cashback;Paytm,Paytm,Rs 3 cashback ;Dominos,dominos,Rs 12 Cashback;Amazon,amazon,Upto 4% Cashback;Tradus,tradus,Flat 2% Cashback;Flaberry,flaberry,Flat 12% Cashback;Funatic,funatic,Flat 6.40% Cashback;Peprismine,peprismine,Flat Rs 112 Cashback;";
var list = s.split(";");
var flag = 0;     	//bool for match found or not
var message = "do";

//Blink Alert
var searching_images = ['icons/alert.gif',
                        'icons/empty.png',
           				];
var image_index = 1 ;

//Reset the alert
function reset(id) {
	chrome.tabs.getSelected(chrome.windows.WINDOW_ID_CURRENT, function(tab) {
		chrome.browserAction.setIcon({path:"icons/cart.png"});
		//chrome.browserAction.setBadgeText({text: "blue!"});
		chrome.browserAction.setPopup({tabId: id, popup: "browseraction/empty.html"});
		//chrome.tabs.sendMessage(tab.id, {type : "reset"});
	});
}

//Animated alert 
function rotateIcon(id)
{   
   if ( flag == 1 )
   {
   	  console.log("Icon: " + searching_images[image_index]);
      chrome.browserAction.setIcon({tabId: id, path: searching_images[image_index]});
      image_index = (image_index + 1) % 2;
      window.setTimeout(function() {
    		rotateIcon(id);
		}, 500);
   }
   else {
   	console.log("Reset from rotateIcon");
   	reset(id);
   }
   return 0;
}



// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onMessage.addListener(function(mess, sender, sendResponse) {
       	switch(mess.type) {
			case "change": {
				console.log("recieved in background" + message);
				sendResponse({message: message});
				break;
			}
			case "link": {
				console.log("link clicked" + mess.link);
				chrome.tabs.create({url: mess.link});
				break;
			}
		}
    });





//check function for a possible match
function check (id, url, title) {
	chrome.browserAction.setPopup({tabId: id, popup:"browseraction/popup.html"});

	//message to be sent to content script
	

	for (var item=0; item<list.length -1 ; item++) {
		//console.log(list[item]);
		var item_list = list[item].split(",");
		
		var compare;                //to check with the url
	  	if(item_list[0].indexOf("|")!=-1) {
	  		compare = item_list[0].split("|")[0];
	  	}
	  	else {
	  		compare = item_list[0];
	  	}
	  	//console.log("Compare: " + compare);
	    if(url.indexOf(compare.toLowerCase())!=-1 && url.indexOf("shoppingbaba.in")==-1) {
	      //For ambiguous cases on a single site ex. yatra
	      if (item_list[0].indexOf("|")!=-1) {
	      	console.log("Title: " + title);
	      	if(title.toLowerCase().indexOf(item_list[0].split("|")[1].toLowerCase())==-1) {
	      		continue;
	      	}
	      }
	      flag = 1;
	      message = item_list[1] + "," + item_list[2];
	      console.log("match found at Index:" + item);
	    }
	}

	  if (flag == 1) {
	    console.log("Changed: " + url);
	    rotateIcon(id);
	   	//chrome.browserAction.setBadgeText({text: "red!"});
	  }
	  else { 
	  	//Incase of reactivation of tab, if the previous one was a match
	    reset(id);
	  }
	}

//Check if the tab is reloaded or something.. updated i.e.
chrome.tabs.onUpdated.addListener(function(id,changeInfo,tab) {
	if (changeInfo.status == "loading") {
		console.log("updated/completed: " + tab.url);
		flag = 0;
		check(id, tab.url,tab.title);
	}
});

chrome.tabs.onActivated.addListener(function(info) {
		console.log("active: " + info.tabId);
		flag = 0;
		chrome.tabs.getSelected(null, function(tab) {
			check(tab.id,tab.url,tab.title);
		});
});
// send a message to the content script
