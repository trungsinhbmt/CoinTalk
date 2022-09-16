const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const Markup = require("telegraf/markup");
module.exports = (bot) => {
  const texto = (
    msg
  ) => `Chào mừng @${msg.from.username} đến với <a href="https://t.me/CoinTalkGroupChat/">CoinTalk Crypto BOT!</a> được tạo bởi @xalacongtu.
     
Bạn có thể xem bất cứ đồng tiền điện tử nào bằng cách /p mã coin (ví dụ /p btc)`;

  const keyboard = [
    [
    
    ],
  ];

  bot.start((msg) =>
    msg.replyWithHTML(texto(msg), { disable_web_page_preview: true })
  );
  bot.catch((err, msg) => {
    
    console.log(err);
  });
  bot.use(showMenu.init());
  bot.on("text", async (msg) => {
    if (msg.message.entities[0].type === "bot_command") {
      msg.reply(await getCryptoApi(msg.message.text.replace("/p ", "")), {
        reply_markup: new Markup().inlineKeyboard(keyboard),
        parse_mode: "Html",
        disable_web_page_preview: true
      });
    }
  });
};
