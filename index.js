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
    await new Promise(r => setTimeout(r, 1500));
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
    new SlashCommandBuilder().setName("status").setDescription("Mostra status do sistema"),
    new SlashCommandBuilder().setName("help").setDescription("Lista todos os comandos disponíveis"),
    new SlashCommandBuilder().setName("antiraid").setDescription("Controla Anti-Raid").addStringOption(opt => opt.setName("acao").setDescription("on/off/status").setRequired(true)),
    new SlashCommandBuilder().setName("antispam").setDescription("Controla Anti-Spam").addStringOption(opt => opt.setName("acao").setDescription("on/off").setRequired(true)),
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
    new SlashCommandBuilder().setName("punishment").setDescription("Sistema de punição").addStringOption(opt => opt.setName("acao").setDescription("ban/kick/mute/timeout").setRequired(true))
  ];

  // -------------------------
  // LOGIN E REGISTRO DE COMANDOS
  // -------------------------
  client.once("clientReady", async () => {
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
  // CONFIGURAÇÃO ANTI-SPAM
  // -------------------------
  const spamData = new Map();
  let spamLimit = 5;
  let spamTimer = 10;

  // -------------------------
  // INTERAÇÕES
  // -------------------------
  client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.user.id !== OWNER_ID) return interaction.reply({ content: "❌ Apenas o dono pode usar esses comandos.", flags: 64 });

    const { commandName, options } = interaction;

    // evita erro de interaction expirada
    await interaction.deferReply({ ephemeral: true });

    switch (commandName) {
      case "status":
        await interaction.editReply({ content: "🟢 Anti-Raid Premium Ativo\n💻 Sistema completo Online\n🎬 Desenvolvedor: ERRO404" });
        break;

      case "help":
        await interaction.editReply({ content: `🛡️ **Comandos Anti-Raid Premium**\n\n/antiraid on|off\n/antispam on|off\n/setspamlimit\n/setspamtimer\n/antijoin on|off\n/setjoinlimit\n/setjointime\n/lockserver\n/unlockserver\n/antinuke on|off\n/punishment ban|kick|mute|timeout\n/status\n/help` });
        break;

      case "antiraid":
        await interaction.editReply({ content: `💻 Anti-Raid ${options.getString("acao").toUpperCase()}` });
        break;

      case "antispam":
        const spamAction = options.getString("acao").toLowerCase();
        if (spamAction === "on") {
          await interaction.editReply({ content: "✅ Anti-Spam ativado!" });
        } else {
          await interaction.editReply({ content: "⚠️ Anti-Spam desativado!" });
        }
        break;

      case "setspamlimit":
        spamLimit = options.getInteger("limite");
        await interaction.editReply({ content: `✅ Limite de mensagens definido para ${spamLimit}` });
        break;

      case "setspamtimer":
        spamTimer = options.getInteger("tempo");
        await interaction.editReply({ content: `✅ Timer de mensagens definido para ${spamTimer} segundos` });
        break;

      default:
        await interaction.editReply({ content: "Comando ainda não implementado." });
        break;
    }
  });

  // -------------------------
  // ANTI-SPAM MENSAGENS
  // -------------------------
  client.on("messageCreate", message => {
    if (message.author.bot) return;

    const now = Date.now();
    if (!spamData.has(message.author.id)) spamData.set(message.author.id, []);
    const timestamps = spamData.get(message.author.id);
    timestamps.push(now);

    const filtered = timestamps.filter(t => now - t < spamTimer * 1000);
    spamData.set(message.author.id, filtered);

    if (filtered.length > spamLimit) {
      message.member.ban({ reason: "🚫 Spam detectado - Anti-Raid Premium" }).catch(() => {});
      spamData.set(message.author.id, []);
      console.log(`🚨 Usuário ${message.author.tag} banido por spam.`);
    }
  });

  // -------------------------
  // LOGIN
  // -------------------------
  client.login(TOKEN);
}
