const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Yetersiz yetki!')
  let rol = message.mentions.roles.first()
  if (!rol) return message.channel.send('Bir rol etiketlemelisin')
  db.set(`discorol_${message.guild.id}`, rol.name)
  db.set(`discoid_${message.guild.id}`, rol.id)
  const PieceEmbed = new Discord.RichEmbed()
  .setTitle('Rol ayarlandı!')
   .setDescription('Ayarlanan rol: `'+ rol.name +'`')
  .setColor(rol.hexColor)
  .setFooter('Developed by Piece')
  message.channel.send(PieceEmbed)
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['diskorol'],
  permLevel: 0
};

exports.help = {
  name: 'disko-rol-ayarla',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  usage: 'rolinfo <rolismi>'
};