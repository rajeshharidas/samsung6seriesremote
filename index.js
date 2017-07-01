'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
var request = require('request');

restService.use(express.static(path.join(__dirname, 'public')));

restService.post('/tvremote', function(req, res) {
    var speech = "I don't recognize that command!";
    
   	var command = req.body.result.parameters.switch; 
   
  	var Pusher = require('pusher');
    var pusher = new Pusher({
      appId: '361237',
        key: '0151ce4ad689c3e80759',
        secret: 'c2f7c8cb60fcb1387638',
        cluster: 'us2',
        encrypted: true
    });

	if (command === 'volumeup')
	{
	    pusher.trigger('channel-mirrormirror', 'tvremote-event', {
        	"message": "volumeup"       
    	},function(err,req,res){     
    		console.log('Error:' + err + 'Response: ' + res);
    	});

	    speech = "Volume is up on now.";
	}
	else if (command === 'volumedown')
	{
		pusher.trigger('channel-mirrormirror', 'tvremote-event', {
        	"message": "volumedown"       
    	},function(err,req,res){     
    		console.log('Error:' + err + 'Response: ' + res);
    	});

		speech = "Volume is down now.";
	}
	

    if (command === 'channelup')
    {
        pusher.trigger('channel-mirrormirror', 'tvremote-event', {
            "message": "channelup"       
        },function(err,req,res){     
            console.log('Error:' + err + 'Response: ' + res);
        });

        speech = "Channel is up on now.";
    }
    else if (command === 'channeldown')
    {
        pusher.trigger('channel-mirrormirror', 'tvremote-event', {
            "message": "channeldown"       
        },function(err,req,res){     
            console.log('Error:' + err + 'Response: ' + res);
        });

        speech = "Channel is down now.";
    }

    if (command === 'guide')
    {
        pusher.trigger('channel-mirrormirror', 'tvremote-event', {
            "message": "guide"       
        },function(err,req,res){     
            console.log('Error:' + err + 'Response: ' + res);
        });

        speech = "Guide is up on now.";
    }
	
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'Samsung6SeriesRemote'
    });
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
