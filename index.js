// index.js - ANTI-RAID V10 (Token + Guild + Dono)
const readline = require("readline");
const fs = require("fs");
const {
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

// -------------------------
// INTERFACE TERMINAL
// -------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// -------------------------
// FUNÇÃO DE ENTRADA HACKER
// -------------------------
function hackerEntrance(callback) {
  console.clear();
  console.log(`
       .-"      "-.
      /            \\
     |,  .-.  .-.  ,|
     | )(_o/  \\o_)( |
     |/     /\\     \\|
     (_     ^^     _)
      \\__|IIIIII|__/
       | /IIIIII\\ |
       \\          /
        \`--------\`
`);
  console.log("\x1b[32mCONECTANDO PANEL...\x1b[0m");
  setTimeout(callback, 10000); // espera 6s antes de mostrar painel
}

// -------------------------
// PAINEL HACKER
// -------------------------
function hackerPanel(extraLines = []) {
  console.clear();
  console.log("┌───────────────────────────────────────┐");
  console.log("|[H4CK3R_007|{ BY 404 @ linux} |404*    │");
  console.log("│-----------|------------------|--------│");
  console.log("│           | PANEL ANTI RAID  |        │");
  console.log("│           | VERSAO V2        |        │");
  console.log("│           |                  |        │");
  console.log("│           --------------------        │");
  console.log("│                                       │");
  console.log("│  💻 Sistema ANTI RAID V2              │");
  console.log("│  📡 Proteção completa anti-raid       │");
  console.log("│  📚 BY (ERRO404/TONY)                 │");
  extraLines.forEach(line => {
    const pad = Math.max(0, 45 - line.length);
    console.log(`│ ${line}${" ".repeat(pad)}│`);
  });
  console.log("└───────────────────────────────────────┘");
}

// -------------------------
// INÍCIO
// -------------------------
hackerEntrance(() => {
  hackerPanel(["👋 OLA, SEJA BEM VINDO!", "COLOQUE SEU TOKEN, GUILD E ID DO DONO"]);
  rl.question("Insira seu TOKEN: ", token => {
    rl.question("Insira o GUILD ID do servidor: ", guildId => {
      rl.question("Insira seu ID de DONO: ", ownerId => {
        console.log("\n🔄 Conectando bot e registrando comandos Slash...\n");
        rl.close();
        startBot(token, guildId, ownerId);
      });
    });
  });
});

// -------------------------
// TRENS ANIMADO
// -------------------------
function trainAnimation() {
  const frames = [
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________ ",
    "   /     |  |   H  |  |     |   |         ||_| |_||     _| ",
    "  |      |  |   H  |__--------------------| [___] |   =| ",
    "  | ________|___H__/__|_____/[][]~\\_______|       |   =| ",
    "  |/ |   |-----------I_____I [][] []  D   |=======|____|_ ",
    "_/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|_________________ ",
    " |/-=|___|=O=====O=====O=====O~ \\_/ |   |_______|_/=O=====O=====O~ "
  ];
  let i = 0;
  const interval = setInterval(() => {
    console.clear();
    console.log(frames[i]);
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      console.log("\n✅ Bot inicializado com sucesso! Rodando 24h...\n");
    }
  }, 300);
}

// -------------------------
// MANTER BOT 24H
// -------------------------
function keepAlive() {
  setInterval(() => {
    console.log("💻 Sistema ativo... Bot rodando normalmente.");
  }, 60 * 1000); // mensagem a cada 1 minuto
}

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

  const commands = [
    new SlashCommandBuilder().setName("antiraid").setDescription("Controla Anti-Raid").addStringOption(opt => opt.setName("acao").setDescription("enable/disable/status").setRequired(true)),
    new SlashCommandBuilder().setName("security").setDescription("Configura nível de segurança").addStringOption(opt => opt.setName("nivel").setDescription("nível de segurança").setRequired(true)),
    new SlashCommandBuilder().setName("limit").setDescription("Define limites").addStringOption(opt => opt.setName("tipo").setDescription("join/ban/kick/channel/role/webhook").setRequired(true)).addIntegerOption(opt => opt.setName("numero").setDescription("quantidade").setRequired(true)).addIntegerOption(opt => opt.setName("tempo").setDescription("tempo em segundos").setRequired(true)),
    new SlashCommandBuilder().setName("action").setDescription("Executa ações").addStringOption(opt => opt.setName("acao").setDescription("ação").setRequired(true)),
    new SlashCommandBuilder().setName("lockdown").setDescription("Bloqueia todos canais"),
    new SlashCommandBuilder().setName("unlockdown").setDescription("Desbloqueia todos canais"),
    new SlashCommandBuilder().setName("whitelist").setDescription("Gerencia whitelist").addStringOption(opt => opt.setName("acao").setDescription("add/remove").setRequired(true)).addUserOption(opt => opt.setName("user").setDescription("Usuário").setRequired(true)),
    new SlashCommandBuilder().setName("antispam").setDescription("Ativa Anti-Spam").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("antilink").setDescription("Ativa Anti-Link").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("antiping").setDescription("Ativa Anti-Ping").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("antinuke").setDescription("Ativa Anti-Nuke").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("captcha").setDescription("Ativa captcha").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("antivpn").setDescription("Ativa Anti-VPN").addStringOption(opt => opt.setName("acao").setDescription("enable/disable").setRequired(true)),
    new SlashCommandBuilder().setName("backup").setDescription("Backup do servidor").addStringOption(opt => opt.setName("acao").setDescription("create/load").setRequired(true)).addStringOption(opt => opt.setName("id").setDescription("ID do backup").setRequired(false)),
    new SlashCommandBuilder().setName("logs").setDescription("Define canal de logs").addChannelOption(opt => opt.setName("canal").setDescription("Canal de logs").setRequired(true)),
    new SlashCommandBuilder().setName("status").setDescription("Mostra status do sistema")
  ];

  client.once("ready", async () => {
    console.log(`✅ Bot online como ${client.user.tag}`);
    
    // animação do trem
    trainAnimation();

    // manter bot vivo 24h
    keepAlive();

    try {
      const rest = new REST({ version: "10" }).setToken(TOKEN);
      await rest.put(
        Routes.applicationGuildCommands(client.user.id, guildId),
        { body: commands.map(cmd => cmd.toJSON()) }
      );
      console.log("✅ Comandos Slash registrados! Somente o dono pode usar.");
    } catch (err) {
      console.error("❌ Erro ao registrar comandos:", err);
    }

    hackerPanel(["ANTI RAID ONLINE", "💻 Sistema Hacker Ativo", `🕹 BY (ERRO404/TONY) | Dono ID: ${OWNER_ID}`]);
  });

  // -------------------------
  // ANTI-RAID & ANTI-BOT
  // -------------------------
  const allowedBots = []; // IDs confiáveis
  const userMessages = new Map();
  const messageLimit = 5;
  const timeLimit = 5000;

  function logEvent(data) {
    const file = "./logs.json";
    const logs = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    logs.push({ time: new Date().toISOString(), ...data });
    fs.writeFileSync(file, JSON.stringify(logs, null, 2));
  }

  client.on("guildMemberAdd", member => {
    if (member.user.bot && !allowedBots.includes(member.id)) {
      member.ban({ reason: "🚫 Bot desconhecido - Anti Raid V10" });
      logEvent({ type: "bot_ban", user: member.user.tag });
      return;
    }

    const diffDays = (Date.now() - member.user.createdAt) / (1000 * 60 * 60 * 24);
    if (diffDays < 7) {
      member.ban({ reason: "🚫 Conta muito nova - Anti Raid V10" });
      logEvent({ type: "new_account_ban", user: member.user.tag });
    }
  });

  client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (/(https?:\/\/|www\.)/i.test(message.content)) {
      message.delete().catch(() => {});
      logEvent({ type: "link_deleted", user: message.author.tag, content: message.content });
    }

    const userId = message.author.id;
    if (!userMessages.has(userId)) userMessages.set(userId, []);
    const timestamps = userMessages.get(userId);
    const now = Date.now();
    timestamps.push(now);
    const filtered = timestamps.filter(t => now - t < timeLimit);
    userMessages.set(userId, filtered);
    if (filtered.length > messageLimit) {
      message.member.ban({ reason: "🚫 Raid detectado (Sistema Hacker V10)" });
      logEvent({ type: "spam_ban", user: message.author.tag });
    }
  });

  // -------------------------
  // INTERACTIONS
  // -------------------------
  client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.user.id !== OWNER_ID) return interaction.reply({ content: "❌ Apenas o dono pode usar esses comandos.", ephemeral: true });

    const { commandName, guild } = interaction;

    if (commandName === "lockdown") {
      guild.channels.cache.forEach(c => {
        if (c.isTextBased()) c.permissionOverwrites.edit(guild.roles.everyone, { SendMessages: false }).catch(() => {});
      });
      await interaction.reply("🔒 Todos os canais foram bloqueados!");
    }

    if (commandName === "unlockdown") {
      guild.channels.cache.forEach(c => {
        if (c.isTextBased()) c.permissionOverwrites.edit(guild.roles.everyone, { SendMessages: true }).catch(() => {});
      });
      await interaction.reply("🔓 Todos os canais foram desbloqueados!");
    }

    if (commandName === "status") {
      await interaction.reply("🟢 Anti-Raid V10 Ativo\n💻 Sistema Hacker Online\nBY (ERRO404/TONY)");
    }
  });

  client.login(TOKEN);
}
