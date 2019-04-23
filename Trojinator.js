const Discord = require('discord.js')
const {Client, RichEmbed} = require('discord.js')
const client = new Discord.Client()
let checked = false
var importantRoles = []
var admins = []
adCount = 0
var succChans = []
succChanCount = 0
client.on('message',mess =>
{
	if(mess.author == client.user)
		return
	if(!checked)
	{
		checked = true
		let temp = mess.guild.roles
		let a=0;
		temp.forEach((value) => 
		{
			if(value.permissions & 0x00000008 == 0x00000008)
				importantRoles[a++]=value
		})
	}
	if(mess.toString().substr(0,2).search(/t /i)>-1)
		processCommand(mess)
})
function processCommand(mess)
{
	let fullCommand = mess.content.substr(1)
	let splitCommand = fullCommand.split(" ")
	let pmand = splitCommand[1]
	let arguments = splitCommand.slice(1)
	if(pmand.search(/test/i)>-1)
	{
		mess.reply("Testing testing 1 2 1 2")
		return
	}
	if(pmand.search(/boop/i)>-1)
	{
		boop(mess)
		return
	}
	if(pmand.search(/blap/i)>-1)
	{
		blap(mess)
		return
	}
	if(pmand.search(/wave/i)>-1)
	{
		wave(mess)
		return
	}
	if(pmand.search(/bansucc/i)>-1)
	{
		banSucc(mess)
		return
	}
	if(pmand.search(/allowsuccall/i)>-1)
	{
		allowSuccAll(mess)
		return
	}	
	if(pmand.search(/allowsucc/i)>-1)
	{
		allowSucc(mess)
		return
	}
	if(pmand.search(/succ/i)>-1)
	{
		succ(mess)
		return
	}
}
function boop(mess)
{
	embedIt(mess,"boop0")
}
function blap(mess)
{
	embedIt(mess,"blap0")
}
function wave(mess)
{
	embedIt(mess,"wave0")
}
function succ(mess)
{
	let found = false
	try
	{
		succChans.forEach((chan) =>
		{
			if(chan == mess.channel)
			{
				found = true
				throw BreakException
			}
		})
	}catch(e){}
	if(!found)
	{
		mess.reply("succ is not legal in this channel. To have this law passed, convince your local Admin to type `T allowSucc`")
		return
	}
	embedIt(mess, "succ0")
}
function allowSucc(mess)
{
	let perm = false
	try
	{
		admins.forEach((admin) =>
		{
			if(mess.member == admin)
			{
				perm = true
				throw BreakException
			}
		})
	}catch(e){}
	try{
		mess.member.roles.forEach((role) => 
		{
			importantRoles.forEach((imRole) =>
			{
				if(role == imRole)
				{
					perm = true
					admins[adCount++]==mess.member
					throw BreakException
				}
			})
		})
	}
	catch(e){}
	if(perm)
	{
		let found = false
		try
		{
			succChans.forEach((chan) =>
			{
				if(chan == mess.channel)
				{
					found = true
					throw BreakException
				}
			})
		}catch(e){}
		if(found)
			mess.reply("the succ law has already been passed in this channel!")
		else
		{
			succChans[succChanCount++] = mess.channel
			mess.reply("the succ law has been **succ**essfully been passed for this channel!")
		}
	}
}
function allowSuccAll(mess)
{
	let perm = false
	try
	{
		admins.forEach((admin) =>
		{
			if(mess.member == admin)
			{
				perm = true
				throw BreakException
			}
		})
	}catch(e){}
	try{
		mess.member.roles.forEach((role) => 
		{
			importantRoles.forEach((imRole) =>
			{
				if(role == imRole)
				{
					perm = true
					admins[adCount++]==mess.member
					throw BreakException
				}
			})
		})
	}
	catch(e){}
	if(perm)
	{
		succChanCount=0
		mess.guild.channels.forEach((chan) =>	
		{
			succChans[succChanCount++] = chan
		})
	}
}
function banSucc(mess)
{
	let perm = false
	try
	{
		admins.forEach((admin) =>
		{
			if(mess.member == admin)
			{
				perm = true
				throw BreakException
			}
		})
	}catch(e){}
	try{
		mess.member.roles.forEach((role) => 
		{
			importantRoles.forEach((imRole) =>
			{
				if(role == imRole)
				{
					perm = true
					admins[adCount++]==mess.member
					throw BreakException
				}
			})
		})
	}
	catch(e){}
	if(perm)
	{
		let found = false
		for(var a=0;a<succChans.length;a++)
		{
			if(succChans[a] == mess.channel)
			{
				if(succChans.length-1<a)
					for(var b=a+1;b<succChans.length;b++)
						succChans[a++] = succChans[b] 
				else
					succChans[a]=null
				succChanCount--
				found = true
				break;
			}
		}
		if(found)
			mess.reply("succ has ~~succ~~essfully been made illegal in this channel...")
		else
			mess.reply("you can't make succ doubly illegal!")
	}
}
function embedIt(mess, part)
{
	const embed = new RichEmbed()
	var num = Math.floor(Math.random()*10)
	let name = "Someboio/Trojinator/blob/images/"+part+num+".gif"
	let img = "https://github.com/Someboio/Trojinator/blob/images/blap00.gif"
	const exampleEmbed = new Discord.RichEmbed()
		//.attachFiles([name])
		//.setImage('attachment://'+name);
		//.setImage(img);
	mess.channel.send(exampleEmbed);
}
client.login(process.env.BOT_TOKEN)
