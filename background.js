var list = ['Myntra,myntra,Flat Rs.200 Cashback', 'Jabong,jabong,Flat 7% Cashback', 'Fashionara,fashionara,Upto Rs 170 Cashback', 'Babyoye,babyoye,Upto Rs 230 Cashback', 'Adlabsimagica,adlabs_imagica,Rs 170 per sale', 'Basicslife,basics,Upto Rs 350 Cashback', 'DailyObjects,Daily_Objects,Rs 120 per sale', 'Expedia|Hotels,Expedia_Hotels,6% per sale on hotels', 'Expedia|Bus,expedia,Rs 30 per sale on buses', 'Expedia|Flights,Expedia_Flights,0.5% per sale on flights', 'Fabfurnish,fabfurnish,6% per sale', 'fnp,frensandpetals,12% per sale', 'fetise,fetise,8% per sale', 'floweraura,floweraura,12% per sale', 'Foodpanda,foodpanda,Upto Rs 160 Cashback', 'futurebazaar,futurebazaar,Upto Rs 90 Cashback', 'gaadi,gaadi,12% per sale', 'gobol,gobol,1% per sale', 'godaam,godaam,Rs 140 per sale', 'greendust,greendust,Upto Rs 1000 Cashback', 'greetzap|voice,greetzap,10% per sale on voice cards', 'greetzap|flowers,greetzap_flowers,10% per sale on flowers & gifts', 'Homeshop18,homeshop18,Upto 8% Cashback', 'Hotels.com,hotels,6% per sale Cashback', 'indiacircus,indiacircus,Rs 170 per sale cashback', 'indiarush,indiarush,Rs 100 per sale cashback', 'shopping.indiatimes,indiatimesshopping,4% flat', 'Inkfruit,inkfruit,Rs 127 Cashback', 'Justeat,justeat,Rs 153 Cashback ', 'Lenskart,lenskart,Rs 90 Cashback', 'watchkart,watchkart,Rs 90 Cashback', 'bagskart,bagskart,Rs 90 Cashback', 'Jewelskart,jewelskart,Rs 90 Cashback', 'limeroad,limeroad,Rs 240 Cashback', 'masticart,masticart,Rs 170 Cashback', 'moodsofcloe,moodsofcloe,Rs 200 Cashback', 'naaptol,naaptol,Rs 212 Cashback', 'Shopatdisney,shopatdisney, 6.80% Cashback', 'freedomtree,freedomtree,4% Cashback', 'tmhshop,Tata_McGraw_Hills,6.80%  Cashback', 'pepperfry,pepperfry,Upto Rs 6.40% Cashback', 'policyadvisor,policy_advisor,Rs  48 Cashback per lead', 'Printland.in,printland,12% Cashback', 'printvenue,printvenue,Rs 85 Cashback', 'zovi,zovi, Rs 195 Cashback', 'zivame,zivame,Rs 340 Cashback', 'yepme,yepme,9.6 % Cashback', 'yebhi,yebhi,8% Cashback', 'yatra|Hotels,yatraHotels,Rs 850 Cashback on Hotels', 'yatra|Domestic Flights,Yatra_Domestic_Flights,Rs 191 On domestic flights', 'yatra|international flights,yatra_international_flights,Rs 382 on international flights', 'vistaprint,vistaprint,Rs 200 Cashback', 'trendIN,trendIN,Rs 224 Cashback ', 'Travelguru,travelguru,Rs 510 Cashback', 'suratdiamond,suratdiamond,8.5% Cashback ', 'starCJ,starCJ,Rs 40 Cashback', 'snapdeal,snapdeal,Upto Rs 330 Cashback', 'shopclues,shopclues,3.60% Cashback', 'shopclues|electronics,shopclues_electronics,1.7% Cashback on Electronics', 'shopping.rediff,rediff_shopping,Rs 43 Cashback', 'provogue,provogue,5.95 % Cashback', 'Flipkart,flipkart,Upto 7% cashback', 'Ebay,ebay,Upto Rs 102 Cashback', 'Bestylish,bestylish,Rs 144 Cashback', 'RedBus,redbus,Rs 35 cashback', 'Paytm,Paytm,Rs 3 cashback ', 'Dominos,dominos,Rs 12 Cashback', 'Amazon,amazon,Upto 4% Cashback', 'Tradus,tradus,Flat 2% Cashback', 'Flaberry,flaberry,Flat 12% Cashback', 'Funatic,funatic,Flat 6.40% Cashback', 'Peprismine,peprismine,Flat Rs 112 Cashback', ''];             //List of websites, separated by ';'
var message = "do";

//Blink Alert
var searching_images = ['icons/alert.png',
                        'icons/cart.png',
           				];
var image_index = 1 ;
var timeout;
var flag = 0;

//Reset the alert
function reset(id) {
	if(timeout)
		clearTimeout(timeout);
	chrome.browserAction.setIcon({tabId: id, path:"icons/cart.png"});
}

//Animated alert 
function rotateIcon(id)
{   
   if ( flag == 1 )
   {
   	  //console.log("Icon: " + searching_images[image_index]);
      chrome.browserAction.setIcon({tabId: id, path: searching_images[image_index]});
      image_index = (image_index + 1) % 2;
      timeout = window.setTimeout(function() {
    		rotateIcon(id);
		}, 500);
   }
   else {
   	console.log("Reset from rotateIcon");
   	reset(id);
   }
   return 0;
}


//check function for a possible match
function check (id, url, title) {
	//chrome.browserAction.setPopup({tabId: id, popup:"browseraction/popup.html"});

	//message to be sent to content script
	//chrome.tabs.sendMessage(id, {type:"change", color:"red"});

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
	  	compare += ".";
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
	    //rotateIcon(id);
        if(timeout)
			clearTimeout(timeout);
       	rotateIcon(id);
	   	//chrome.browserAction.setBadgeText({text: "red!"});
	   	
	  }
	  else { 
	  	//Incase of reactivation of tab, if the previous one was a match
	    reset(id);
	  }
}

chrome.tabs.onUpdated.addListener(function(id,changeInfo,tab) {
	if (changeInfo.status == "complete") {
		flag = 0;
		check(tab.id, tab.url, tab.title);		
		console.log("updated/completed: " + tab.url);
		//check(id, tab.url ,tab.title);
	}
	
});

chrome.tabs.onActivated.addListener(function(tabd) {
	chrome.tabs.getSelected(null, function(tab) {
		console.log("Activated");
		flag = 0;
		check(tab.id, tab.url, tab.title);		
	});
});

