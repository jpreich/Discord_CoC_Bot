const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs');
fs.readFile('notes/hello.txt', function(err, data){
    console.log(data.toString());
})
var num;
var ndice;
var dice;

var notes = {};
var existingnote;

bot.login('SUPERSECRETLOGINTOKEN');

bot.on('message', (message) => {
    if(message.content == "!roll"){
        num = Math.ceil((Math.random()*100)).toString();
        message.channel.send("@" + message.author.username + " rolled " + num);
    } else if(message.content.startsWith('!r') || message.content.startsWith('!R')) {
        try{
            if(message.content.includes('d')){
                ndice = message.content.split('d')[0].substr(2).valueOf();
                dice = message.content.split('d')[1].valueOf();
            } else {
                ndice = message.content.split('D')[0].substr(2).valueOf();
                dice = message.content.split('d')[1].valueOf();
            }
            num = 0;
            for(var i = 0;i<ndice;i++){
                num = (num + Math.ceil((Math.random()*dice)));
            }
            message.channel.send("@" + message.author.username + " rolled " + Math.ceil(num).toString());
        }
        catch(e){
            message.channel.send('Difficulty parsing that roll.');
        }
    } else if(message.content.startsWith('!n') || message.content.startsWith('!N')) {
        try{
            fs.appendFile('notes/'+message.author.id+'.txt', message.content.substr(2) + "\r\n\r\n", function(err){
                if (err) throw err;
            })
        }
        catch(e){
            message.author.send('Failed to take your note.' + e.toString())
        }
    } else if(message.content == '!notes' || message.content == '!NOTES'){
        try{
            
            message.author.sendFile('notes/'+message.author.id+'.txt');
        }
        catch(e){
            message.author.send("Sorry, I can't seem to send you your notes." + e.toString());
        }
    }

})

