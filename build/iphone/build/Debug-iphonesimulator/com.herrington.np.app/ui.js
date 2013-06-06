(function() {
    var ui = {};
    Titanium.UI.setBackgroundColor('#1D75BC');
    ui.openMainWindow = function() {
        var tabGroup = Titanium.UI.createTabGroup();
        var tab1 = Titanium.UI.createTab({
            title:'Now Playing',
            icon:'light_music@2x.png',
            backgroundColor:'#1D75BC',
            window: Ti.App.ui.createNowPlayingWindow()
        });
		var window2 = Titanium.UI.createWindow({
			title:'Recent Tags',
			fontFamily: 'Baskerville-BoldItalic',
			backgroundColor:'#1D75BC',
			barColor:'#1D75BC'
			});
    	var xhr = Titanium.Network.createHTTPClient();
    	load();
   	function load(){	
   		xhr.onload = function() {
       	 	var resultsData = [];
        	var results = JSON.parse(this.responseText);
        	for (var i=0; i < results.results.length; i++) {
            	var row = Titanium.UI.createTableViewRow({
                	msg:results.results[i].text,
                	height:50,
                	width:320
            	});
            	var imageView = Titanium.UI.createImageView({
            	    image:results.results[i].profile_image_url,
            	    height:64,
            	    hires:true,
            	    width:43,
            	    left:5
            	});
            	var tweet = Titanium.UI.createLabel({
            	    text:results.results[i].text,
            	    left:65,
            	    color:'#1D75BC',
            	    selectedColor:'white',
            	    font:{fontSize:14, fontWeight:'bold', fontFamily:'Helvetica Neue'},
            	    width:'auto',
            	    height:'auto'
            	});
            	row.add(imageView);
            	row.add(tweet);
        		resultsData.push(row);
        	};
       		var resultsTableView = Ti.UI.createTableView({
        	    data:resultsData,
        	    top:0
        	});
        	function showClickEventInfo(e) {
				var msg = e.rowData.msg;
				var alert = Titanium.UI.createAlertDialog({
					title:'Would you like to search YouTube for this song:',
					buttonNames:['Yes', 'No'], 
					message:msg
				});
				alert.addEventListener('click', function(ev) {
    				if (ev.index == 0) { // clicked "Yes"
						var message = Titanium.Network.encodeURIComponent(msg);
						message = message.replace(/[\W\d\s]+/g, '+');
						message = message.replace('np', '');
						message = message.replace('Np', '');
						message = message.replace('NP', '');						
					    message = message.replace('OnAir_App', '');
						message = message.replace('OnAir', '');
						message = message.replace(' ','');

						var webview = Ti.UI.createWebView({
							//url:'http://google.com//search?q='+message
							url:'http://www.youtube.com/results?search_query='+message
							//url:'http://itunes.apple.com/search?term=jack+johnson&limit=10&entity=musicArtist'
						});
						var searchResults = Ti.UI.createWindow({});
						var close = Titanium.UI.createButton({
							title:'Close',
        			    	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
						});
						close.addEventListener('click', function(){
							searchResults.remove(webview);
							window2.remove(searchResults);
							window2.setLeftNavButton();
						});
						searchResults.add(webview);
						window2.setLeftNavButton(close);
						window2.add(searchResults);
						window2.open(); 					
    				}else if (ev.index == 1) { // clicked "No"
						alert.close;
    				}
 				 });
				alert.show();					
			}
			
			resultsTableView.addEventListener('click', function(e) {
				showClickEventInfo(e);
			});
        	window2.add(resultsTableView);
        	resultsWin.open({modal:true});
    	};
    	//open the client
    	xhr.open('GET','http://search.twitter.com/search.json?q=' + Titanium.Network.encodeURIComponent("#NP") + '&rpp=100&include_entities=true&result_type=mixed');
    	//send the data
    	xhr.send();
    }
		var reload = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.REFRESH,
		});
		reload.addEventListener('click', function(){
			load();
		});
		window2.setRightNavButton(reload);
		var tab2 = Titanium.UI.createTab({
            title:'Tags',
            icon:'light_bird@2x.png',
            window: window2
        });

    	var window3 = Titanium.UI.createWindow({
			title:'Friends Recent Tags',
			backgroundColor:'#1D75BC',
			barColor:'#1D75BC'
		});
    
	var searchTextField = Titanium.UI.createTextField({
    	color:'#1D75BC',
    	hintText:'enter a twitter handle', 
    	height:35,
    	top:10,
    	left:10,
    	width:200,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	window3.add(searchTextField);
	
	var searchTextField = Titanium.UI.createTextField({
    	color:'#1D75BC',
    	value:'OnAir_App',
    	height:35,
    	top:10,
    	left:10,
    	width:200,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    	hintText:'@friend_user_name'
	});
	window3.add(searchTextField);
	
	//searchTextField.focus();
	
	var searchButton = Ti.UI.createButton({
    	top:10,
    	left:220,
    	width: 90,
    	height: 35,
    	title:'Search'
	});
	window3.add(searchButton);
 function friendTags(){
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onerror = function(e) {
        alert("Looks like we can't get an internet connection. Options: \n Try to close this app and reopen it.\n Try to connect to the wifi. \n Give up and move away. Maybe to a beach."); 
    }; 

    xhr.onload = function() {
        resultsData = [];
        var results = JSON.parse(this.responseText);
        for (var i=0; i < results.results.length; i++) {
            var row = Titanium.UI.createTableViewRow({
                msg:results.results[i].text,
                height:50,
                width:320
            });
            var imageView = Titanium.UI.createImageView({
                image:results.results[i].profile_image_url,
                height:64,
                hires:true,
                width:43,
                left:5
            });
            var tweet = Titanium.UI.createLabel({
                text:results.results[i].text,
                left:65,
                color:'#1D75BC',
                selectedColor:'white',
                font:{fontSize:14, fontWeight:'bold', fontFamily:'Helvetica Neue'},
                width:'auto',
                height:'auto'
            });
            row.add(imageView);
            row.add(tweet);
            resultsData.push(row);
        };
        var resultsTableView = Ti.UI.createTableView({
            data:resultsData,
            top:55
        });
    	    function showOtherClickEventInfo(e) {
				var msg = e.rowData.msg;
				var alert = Titanium.UI.createAlertDialog({
					title:'Would you like to search YouTube for this song:',
					buttonNames:['Yes', 'No'], 
					message:msg
				});
				alert.addEventListener('click', function(ev) {
    				if (ev.index == 0) { // clicked "Yes"
						var message = Titanium.Network.encodeURIComponent(msg);
						message = message.replace(/[\W\d\s]+/g, '+');
						message = message.replace('np', '');
						message = message.replace('Np', '');
						message = message.replace('NP', '');						
					    message = message.replace('OnAir_App', '');
						message = message.replace('OnAir', '');
						message = message.replace(' ','');
						var webview = Ti.UI.createWebView({
							//url:'http://google.com//search?q='+message
							url:'http://www.youtube.com/results?search_query='+message
							//url:'http://itunes.apple.com/search?term=jack+johnson&limit=10&entity=musicArtist'
						});
						var searchResults = Ti.UI.createWindow({
							title:'Search'
						});
						var close = Titanium.UI.createButton({
							title:'Close',
        			    	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
						});
						close.addEventListener('click', function(){
							searchResults.remove(webview);
							window3.remove(searchResults);
							window3.setLeftNavButton();
							
						});
						window3.setLeftNavButton(close);
						searchResults.add(webview);
						window3.add(searchResults);
						window3.open(); 					
    				}else if (ev.index == 1) { // clicked "No"
						alert.close;
    				}
 				 });
				alert.show();					
			}
    	
    	resultsTableView.addEventListener('click', function(e){
			showOtherClickEventInfo(e);
    	});
    	
        window3.add(resultsTableView);
        resultsWin.open({modal:true});
    };
    // open the client
    var searchUser = searchTextField.value;
    if (searchUser == ''){
    	searchUser = '@OnAir_App';
    }
    xhr.open('GET','http://search.twitter.com/search.json?q=' + Titanium.Network.encodeURIComponent("#np + from:" + searchUser) + '&rpp=100&include_entities=true&result_type=mixed');
    // send the data
    xhr.send();
	}
	searchButton.addEventListener('click', function(e) {
   		friendTags();
	});
		
        var tab3 = Titanium.UI.createTab({
        	title:'Friends',
        	icon:'light_pictures@2x.png',
        	window:window3
        });
        friendTags();
        searchTextField.setValue('');
        tabGroup.addTab(tab1);
        tabGroup.addTab(tab2);
        tabGroup.addTab(tab3);
		setTimeout(function() {
    		tabGroup.open();
		}, 2000);}

ui.createNowPlayingWindow = function() {
 	 	var win = Ti.UI.createWindow({
            title:'',
            barColor: '#1D75BC'
        });
        win.titleImage='OnAir_banner_LR.png';
        var musicPlayer = {};
        musicPlayer.player = Titanium.Media.systemMusicPlayer;
        musicPlayer.player.pause();
        musicPlayer.player.play();
        
        var background = Ti.UI.createImageView({
        	width:'100%',
        	height:387,
        	top:0,
        	//image:'on_air_logo_bg_5.png'
        	image:'2387background.png',
        });
        win.add(background);
		/*win.titleControl = Ti.UI.createLabel({
			text: "On Air",
			font: {
        		'fontSize': 24,
        		'fontFamily':'Baskerville-BoldItalic',
        		},
    		color: 'white'
		});
		*/
        var selectMusicBtn = Titanium.UI.createButton({
            title:'Library',
            style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
        });
        selectMusicBtn.addEventListener('click', Ti.App.musicPlayer.selectMusicFromDevice);

        var play = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.PLAY,
        });
        play.addEventListener('click', Ti.App.musicPlayer.playMusic);
		
        var forward = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.FAST_FORWARD,
        });
        forward.addEventListener('click', Ti.App.musicPlayer.skipForwardMusic);

        var back = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.REWIND,
        });
        back.addEventListener('click', Ti.App.musicPlayer.skipBackMusic);

        var pause = Titanium.UI.createButton({
            systemButton:Titanium.UI.iPhone.SystemButton.PAUSE,
        });
        pause.addEventListener('click',Ti.App.musicPlayer.pauseMusic);

		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		var share = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.ADD,
		});
		share.addEventListener("click", function(e){
                if(msg != ''){
                    var module  = require('de.marcelpociot.twitter');
                    module.tweet({
                        message: msg + " #np @OnAir_App",
                        succes: function(){
                            alert("Tweet successfully sent");
                        },
                        cancel: function(){
                           alert("User canceled tweet");
                        },
                        error: function(){
                           alert("Unable to send tweet");
                        }
                    });
                }
               });

		var musicToolbar = Titanium.UI.iOS.createToolbar({
			//items:[back, flexSpace, pause, flexSpace, play, flexSpace, forward],
			items:[back, flexSpace, pause, flexSpace, play, flexSpace, forward],
			bottom:0,
			borderTop:false,
			borderBottom:false,
			//translucent:true,
			barColor:'#1D75BC',
       		width:320
		});
		win.add(musicToolbar);
        
        win.setLeftNavButton(selectMusicBtn);
        win.setRightNavButton(share);
		var songLabel = Titanium.UI.createLabel({
            	text:'',
            	color: 'white',
                font: {fontSize: 22, fontFamily:'HelveticaNeue-Bold'},
            	bottom: 50,//220
            	left: 10
            });
        win.add(songLabel);
		/*var artistLabel = Titanium.UI.createLabel({
            	text:'',
            	color: 'white',
                font: {fontSize: 22, fontFamily:'HelveticaNeue-Light'},
            	top: 270,
            	left: 10
            });
        win.add(artistLabel);
        */
       songLabel.setText('');
        //artistLabel.setText('Artist Title');
        /*var logo = Ti.UI.createImageView({
            	image:'on_air_logo.png',
            	top: 50,
            	width: 'auto',
            	height: 'auto',
            });
        win.add(logo);
        */
        Ti.App.addEventListener("app.updateNowPlaying", function(d) {
            //win.remove(logo);                         
            songLabel.setText(d.title + '\n' + '-'+ d.artist);
           // artistLabel.setText(d.artist);
            msg = d.info;
            if (win.iv){
            	win.remove(win.iv);
            }
            
            if (d.info != '') {   
                var blob = Ti.App.musicPlayer.player.nowPlaying.artwork;
                win.iv = Ti.UI.createImageView({
                    top: 35,
                    right: 20,
                    hires:true,
                    width:160,
                    height:160,
                    image: blob
                });
                win.iv.addEventListener("doubletap", function(){
                if(msg != ''){
                    var module  = require('de.marcelpociot.twitter');
                    module.tweet({
                        message: msg + " #np @OnAir_App",
                        succes: function(){
                            alert("Tweet successfully sent");
                        },
                        cancel: function(){
                           alert("User canceled tweet");
                        },
                        error: function(){
                           alert("Unable to send tweet");
                        }
                    });
                }
                });
                win.add(win.iv);
                
            } else {
                if (win.iv) {
                    win.remove(win.iv);
                }
                win.iv = null;
            }
            
        });
        return win;
    };
    Ti.App.ui = ui;

})();
