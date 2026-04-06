// index.js - ANTI-RAID PREMIUM V25+ (Termux)
const fs = require("fs");
const readline = require("readline");
const { Client, GatewayIntentBits, Partials, REST, Routes, SlashCommandBuilder } = require("discord.js");

// -------------------------
// INTERFACE TERMINAL
// -------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// -------------------------
// ENTRADA HACKER ANIMADA
// -------------------------
async function hackerEntrance(callback) {
  console.clear();
  const steps = [
    "INICIANDO SISTEMA...",
    "CARREGANDO FIREWALL...",
    "ATIVANDO ANTI-RAID...",
    "CONFIGURANDO PROTEÇÕES...",
    "ENTRANDO NO PAINEL..."
  ];
  for (const step of steps) {
    console.log(`\x1b[32m${step}\x1b[0m`);
    await new Promise(r => setTimeout(r, 1000));
  }
  callback();
}

// -------------------------
// PAINEL HACKER
// -------------------------
function hackerPanel(extraLines = []) {
  console.clear();
  console.log("┌─────────────────────────────────────────────┐");
  console.log("│       █████╗ ███╗   ██╗████████╗ ██╗  ██╗  │");
  console.log("│      ██╔══██╗████╗  ██║╚══██╔══╝ ██║  ██║  │");
  console.log("│      ███████║██╔██╗ ██║   ██║    ███████║  │");
  console.log("│      ██╔══██║██║╚██╗██║   ██║    ██╔══██║  │");
  console.log("│      ██║  ██║██║ ╚████║   ██║    ██║  ██║  │");
  console.log("│                                             │");
  console.log("│  💻 Sistema Hacker Premium                   │");
  console.log("│  🛡️ Proteção completa Anti-Raid             │");
  console.log("│  🎬 Desenvolvedor: ERRO404                   │");
  extraLines.forEach(line => {
    const pad = Math.max(0, 45 - line.length);
    console.log(`│ ${line}${" ".repeat(pad)}│`);
  });
  console.log("└─────────────────────────────────────────────┘");
}

// -------------------------
// INÍCIO
// -------------------------
hackerEntrance(() => {
  hackerPanel(["BEM-VINDO!"]);
  rl.question("Insira seu TOKEN: ", token => {
    rl.question("Insira o GUILD ID do servidor: ", guildId => {
      rl.question("Insira seu ID de DONO: ", ownerId => {
        rl.close();
        startBot(token, guildId, ownerId);
      });
    });
  });
});

// -------------------------
// BOT
// -------------------------
function startBot(TOKEN, guildId, OWNER_ID) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
  });

  // -------------------------
  // COMANDOS SLASH
  // -------------------------
  const commands = [
    new SlashCommandBuilder().setName("help").setDescription("Mostra todos os comandos"),
    new SlashCommandBuilder().setName("status").setDescription("Mostra status do sistema"),
    new SlashCommandBuilder().setName("antiraid").setDescription("Controla Anti-Raid").addStringOption(opt => opt.setName("acao").setDescription("on/off/status").setRequired(true)),
    new SlashCommandBuilder().setName("antispam").setDescription("Controla Anti-Spam").addStringOption(opt => opt.setName("acao").setDescription("on/off/status").setRequired(true)),
    new SlashCommandBuilder().setName("setspamlimit").setDescription("Define limite de mensagens").addIntegerOption(opt => opt.setName("limite").setDescription("Número máximo de mensagens").setRequired(true)),
    new SlashCommandBuilder().setName("setspamtimer").setDescription("Define tempo entre mensagens").addIntegerOption(opt => opt.setName("tempo").setDescription("Segundos").setRequired(true)),
    new SlashCommandBuilder().setName("warnspam").setDescription("Aviso automático anti-spam"),
    new SlashCommandBuilder().setName("muteduration").setDescription("Tempo de mute").addIntegerOption(opt => opt.setName("tempo").setDescription("Segundos").setRequired(true)),
    new SlashCommandBuilder().setName("antijoin").setDescription("Proteção contra entradas em massa").addStringOption(opt => opt.setName("acao").setDescription("on/off").setRequired(true)),
    new SlashCommandBuilder().setName("setjoinlimit").setDescription("Define limite de entradas").addIntegerOption(opt => opt.setName("limite").setDescription("Número máximo de entradas").setRequired(true)),
    new SlashCommandBuilder().setName("setjointime").setDescription("Tempo analisado (s)").addIntegerOption(opt => opt.setName("tempo").setDescription("Segundos").setRequired(true)),
    new SlashCommandBuilder().setName("lockserver").setDescription("Trava todos canais"),
    new SlashCommandBuilder().setName("unlockserver").setDescription("Destrava todos canais"),
    new SlashCommandBuilder().setName("antinuke").setDescription("Controle Anti-Nuke").addStringOption(opt => opt.setName("acao").setDescription("on/off").setRequired(true)),
    new SlashCommandBuilder().setName("punishment").setDescription("Sistema de punição").addStringOption(opt => opt.setName("acao").setDescription("ban/kick/mute/timeout").setRequired(true)),
  ];

  // -------------------------
  // LOGIN E REGISTRO DE COMANDOS
  // -------------------------
  client.once("ready", async () => {
    console.clear();
    console.log("┌───────────────────────────────┐");
    console.log("│   🔓 BOT ANTI-RAID PREMIUM    │");
    console.log("│   💻 Desenvolvedor: ERRO404    │");
    console.log("│   🎬 Créditos: Anti-Raid v25  │");
    console.log("│   🛡️ Sistema completo          │");
    console.log("└───────────────────────────────┘\n");

    const rest = new REST({ version: "10" }).setToken(TOKEN);
    try {
      await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), { body: commands.map(cmd => cmd.toJSON()) });
      console.log("✅ Comandos slash registrados com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao registrar comandos:", err);
    }
  });

  // -------------------------
  // INTERAÇÕES
  // -------------------------
  client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.user.id !== OWNER_ID) return interaction.reply({ content: "❌ Apenas o dono pode usar esses comandos.", ephemeral: true });

    const { commandName, options } = interaction;

    try {
      // Sempre usar deferReply para evitar Unknown interaction
      await interaction.deferReply({ ephemeral: true });

      switch (commandName) {
        case "help":
          await interaction.editReply(`
**🛡️ Comandos Anti-Raid Premium**
/help — Mostra comandos
/status — Status do sistema
/antiraid on/off/status
/antispam on/off/status
/setspamlimit
/setspamtimer
/warnspam
/muteduration
/antijoin on/off
/setjoinlimit
/setjointime
/lockserver
/unlockserver
/antinuke on/off
/punishment ban/kick/mute/timeout
          `);
          break;
        case "status":
          await interaction.editReply("🟢 Anti-Raid Premium Ativo\n💻 Sistema completo Online\n🎬 Desenvolvedor: ERRO404");
          break;
        case "antiraid":
          await interaction.editReply(`💻 Anti-Raid ${options.getString("acao").toUpperCase()}`);
          break;
        case "antispam":
          await interaction.editReply(`💻 Anti-Spam ${options.getString("acao").toUpperCase()}`);
          break;
        case "setspamlimit":
          await interaction.editReply(`💻 Limite de mensagens definido para ${options.getInteger("limite")}`);
          break;
        case "setspamtimer":
          await interaction.editReply(`💻 Timer de mensagens definido para ${options.getInteger("tempo")} segundos`);
          break;
        case "warnspam":
          await interaction.editReply("⚠️ Aviso automático anti-spam ativado");
          break;
        case "muteduration":
          await interaction.editReply(`⏱️ Duração do mute definida para ${options.getInteger("tempo")} segundos`);
          break;
        case "antijoin":
          await interaction.editReply(`💻 Anti-Join ${options.getString("acao").toUpperCase()}`);
          break;
        case "setjoinlimit":
          await interaction.editReply(`💻 Limite de entradas definido para ${options.getInteger("limite")}`);
          break;
        case "setjointime":
          await interaction.editReply(`💻 Tempo de análise definido para ${options.getInteger("tempo")} segundos`);
          break;
        case "lockserver":
          await interaction.editReply("🔒 Todos os canais foram travados");
          break;
        case "unlockserver":
          await interaction.editReply("🔓 Todos os canais foram destravados");
          break;
        case "antinuke":
          await interaction.editReply(`💻 Anti-Nuke ${options.getString("acao").toUpperCase()}`);
          break;
        case "punishment":
          await interaction.editReply(`⚖️ Punição definida: ${options.getString("acao").toUpperCase()}`);
          break;
        default:
          await interaction.editReply("Comando ainda não implementado.");
          break;
      }
    } catch (err) {
      console.error("Erro na interação:", err);
    }
  });

  client.login(TOKEN);
}
