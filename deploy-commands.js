const { REST, Routes } = require("discord.js");
const commands = require("./commands");
require("dotenv").config(); // se quiser colocar token em .env

const clientId = "SEU_CLIENT_ID_DO_BOT";
const guildId = "SEU_ID_DO_SERVIDOR"; // para teste, usar server específico
const token = "SEU_TOKEN_DO_BOT";

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("🔄 Registrando comandos Slash...");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map(cmd => cmd.toJSON())
    });
    console.log("✅ Comandos Slash registrados!");
  } catch (err) {
    console.error(err);
  }
})();
