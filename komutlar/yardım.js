const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const pieceHelp = new Discord.RichEmbed()
    .setAuthor("Disko bot Yardım")
    .setDescription(
      "**!disko-rol-ayarla** = Disko rolünü ayarlar. \n**!disko-rol-sıfırla** = Disko rolünü sıfırlar. \n**!disko-hız-ayarla** = Disko hıznı ayarlar. \n**!disco** = Diskoyu başlatır. \n**!discodurdur** = Diskoyu durdurur."
    )
    .setColor("#ef00ff")
  .setFooter('Developed by Piece')
  return message.channel.send(pieceHelp);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım", "komutlar", "help", "y"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "yardım",
  usage: "yardım"
};
