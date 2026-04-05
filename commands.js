const { SlashCommandBuilder } = require("discord.js");

module.exports = [
  new SlashCommandBuilder()
    .setName("status")
    .setDescription("Mostra o status do Anti-Raid"),
  new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Bloqueia o canal temporariamente"),
  new SlashCommandBuilder()
    .setName("limpar")
    .setDescription("Limpa mensagens do canal")
    .addIntegerOption(option => 
        option.setName("quantidade")
              .setDescription("Quantidade de mensagens")
              .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName("config")
    .setDescription("Mostra as configurações do bot")
];
