// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('white');

var window3 = Titanium.UI.createWindow;

var searchTextField = Titanium.UI.createTextField({
    color:'#336699',
    height:35,
    top:10,
    left:10,
    width:250,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
window3.add(searchTextField);

var searchButton = Ti.UI.createButton({
	top:60,
    left:10,
    width: 300,
    height:40,
    title:'Search'
});
window3.add(searchButton);

var resultsData = [];

searchButton.addEventListener('click', function() {
	var xhr = Titanium.Network.createHTTPClient();
 
	xhr.onload = function()
	{
		resultsData = [];
		
		var resultsWin = Ti.UI.createWindow({
			title:'Search'
		});
		
		var closeButton = Ti.UI.createButton({
			title:'Close'
		});
		resultsWin.setLeftNavButton(closeButton);
		
		closeButton.addEventListener('click', function() {
			resultsWin.close();
		});
		
		
		var results = JSON.parse(this.responseText);
		
		for (var i=0; i < results.results.length; i++) {
			var row = Titanium.UI.createTableViewRow({
				height:'auto',
				width:320
			});
				
			var imageView = Titanium.UI.createImageView({
				image:results.results[i].profile_image_url,
				height:96,
				hires:true,
				width:64,
				left:5
			});
						
			var tweet = Titanium.UI.createLabel({
				text:results.results[i].text,
				left:85,
				width:'auto',
				height:'auto'
			});
					
			row.add(imageView);
			row.add(tweet);
			resultsData.push(row);
		};
		
		var resultsTabelView = Ti.UI.createTableView({
			data:resultsData
		});
		resultsWin.add(resultsTabelView);
		
		//alert(results.results[0].profile_image_url);
	 	
	 	
	 	resultsWin.open({modal:true});
	};
	 
	// open the client
	xhr.open('GET','http://search.twitter.com/search.json?q=' + Titanium.Network.encodeURIComponent(searchTextField.value) + '&rpp=100&include_entities=true&result_type=mixed');
	 
	// send the data
	xhr.send();
	
});
window3.open();