const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Yetersiz yetki!')
    db.set(`discorol_${message.guild.id}`, 'Disco')
  db.set(`discoid_${message.guild.id}`, 'Disco')
  message.channel.send('Başarıyla sıfırlandı!')
  
   }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'disko-rol-sıfırla',
  description: 'Disko rolünü sıfırlar',
  usage: ''
};