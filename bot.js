const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  http.get(`http://ringed-harmonious-voice.glitch.me/`);
}, 50000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

// hız ayarlama kısmı 

client.on('message', async msg => {
   let discohiz = await db.fetch(`dhiz_${msg.guild.id}`);
  let dhiz;
  if (discohiz == null) dhiz = '750'
  if (discohiz == '1') dhiz = '1200'
    if (discohiz == '2') dhiz = '1150'
    if (discohiz == '3') dhiz = '1100'
    if (discohiz == '4') dhiz = '1050'
    if (discohiz == '5') dhiz = '1000'
    if (discohiz == '6') dhiz = '950'
    if (discohiz == '7') dhiz = '900'
    if (discohiz == '8') dhiz = '850'
    if (discohiz == '9') dhiz = '800'
    if (discohiz == '10') dhiz = '750'
  //
  let discorol = await db.fetch(`discorol_${msg.guild.id}`);
  let drol;
  if (discorol == null) drol = 'disco'
  else drol = `${discorol}`
    const rol = `${drol}` 
    if (msg.content.toLowerCase() === prefix + "disco") {  //disco
       if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Yetersiz yetki!')
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("RANDOM")
  }, dhiz)

        const piece = new Discord.RichEmbed()
.setTitle('Aktif edildi!')
.setColor('RANDOM')
        .addField('Hız', `${dhiz || 'Hızı ayarlanmamış!'}`, true)
          .setFooter(`Not: ${drol} adında rol ismi olmazsa çalışmaz!`)
msg.channel.send(piece)
      }  
      
    }
    
      
   
) 

client.on('message', async msg => {
   let discorol = await db.fetch(`discorol_${msg.guild.id}`);
  let drol;
  if (discorol == null) drol = 'Disco'
  else drol = `${discorol}`
    const rol = `${drol}` // Rol ismi buraya
   /* if (msg.content.toLowerCase() === prefix + "discodurdur") {
       if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send('Olamaz! `Rolleri Yönet` yetkin yok!')
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("DEFAULT")
  }, 0)
        const disc = new Discord.RichEmbed()
.setTitle('Durduruldu!')
        .setColor('RANDOM').setDescription('Disco durduruldu!')
        .setFooter(`Not: ${drol} adında rol ismi olmazsa çalışmaz!`)
msg.channel.send(disc)*/
  
  if(msg.content.startsWith(prefix + "discodurdur")) {
setTimeout(() => { console.log(process.exit(0)); }, 300);
const kürşatdurdur = new Discord.RichEmbed()
        .setColor('RANDOM')
.setDescription('Disco başarıyla durduruldu')
        .setFooter(`Developed by Piece`)

//.addField("**Disko**", `Disko Durduruldu`)

 
  return msg.channel.sendEmbed(kürşatdurdur);
};
 
  
      }  
         
    
    
      
) 



        const {
stripIndents,
          oneLine
        } = require("common-tags")
        let kürşat = "424544845290536970"
      client.on("message", async msg => {
        	const args = msg.content.split(' ');
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

   /*   var guild = await client.shard.fetchClientValues("guilds.size")
var channel = await client.shard.fetchClientValues("channels.size")
var user = await client.shard.fetchClientValues("users.size")

var guilds = await guild.reduce((prev, val) => prev + val, 0);
var channels = await channel.reduce((prev, val) => prev + val, 0);
var users = await user.reduce((prev, val) => prev + val, 0);
*/
        
        
        
        
        const os = require('os');
let cpuStat = require("cpu-stat");
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
  
                                //ne olur ne olmaz aşağıda beleş mainden yönetilen stat koydum
      
      
        
          /*       if (msg.content.toLowerCase() === prefix + "istatistik" || msg.content.toLowerCase() === prefix + "i" || msg.content.toLowerCase() === prefix + "botbilgi") {

        
                 
                   
                   

        const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const piecee = new Discord.RichEmbed()
            .setAuthor(client.user.username + " | İstatistikler", client.user.avatarURL)
                .setColor("#0080ff")
      //    .addField("Geliştirici", `**[**${client.users.get(anan).tag}**]** - **[**${client.users.get(baban).tag}**]**`)
            .addField("Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField("Çalışma Süresi ", `${duration}`)
            .addField("Bot İstatistikleri", stripIndents`
             Kullanıcı: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
             Sunucu: ${client.guilds.size.toLocaleString()}
             Kanal: ${client.channels.size.toLocaleString()}
             Müzik Çalınan Sunucu Sayısı: ${client.voiceConnections.size ? client.voiceConnections.size : '0'}
            `) 
      
        .addField("Shard Bilgi", stripIndents`
        Toplam Shard Sayısı: \`\`${client.shard.count}/${client.shard.count}\`\`
Bu Sunucuya Hizmet Veren Shard: \`\`${client.shard.id+1}\`\`
Bu Shard'daki Kullanıcı Sayısı: \`\`${users.toLocaleString()}\`\`
Bu Shard'daki Sunucu Sayısi: \`\`${guilds.toLocaleString()}\`\`
Shard Gecikmesi: \`\`${client.ping}ms.\`\`
`)
        
        
            .addField("Versiyonlar", stripIndents`
            » Discord.js: v${Discord.version}
            » Node.js: ${process.version}
            `)
            .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
            .addField("Bit", `\`${os.arch()}\``, true)
            .addField("İşletim Sistemi", `\`\`${os.platform()}\`\``)
        msg.channel.send(piecee)
        */
                    
    }
      )
      })

client.login(ayarlar.token)