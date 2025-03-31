// require('dotenv').config();
// const { Telegraf, Markup } = require('telegraf');
// const { session } = require('@telegraf/session'); // Подключаем сессии

// const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.start((ctx) => {
//     ctx.reply('Привет! Напиши своё имя:');
//     ctx.session = {};
// });

// // Запоминаем имя
// bot.on('text', (ctx) => {
//     if (!ctx.session.name) {
//         ctx.session.name = ctx.message.text;
//         ctx.reply('Теперь напиши свою фамилию:');
//     } else if (!ctx.session.surname) {
//         ctx.session.surname = ctx.message.text;
//         ctx.reply('Какой у тебя класс?');
//     } else if (!ctx.session.class) {
//         ctx.session.class = ctx.message.text;
//         ctx.reply('Выбери предмет:', Markup.inlineKeyboard([
//             [Markup.button.callback('Математика', 'subject_math')],
//             [Markup.button.callback('Физика', 'subject_physics')],
//         ]));
//     }
// });


// bot.action(/subject_(.+)/, async(ctx) => {
//     const subject = ctx.match[1];
//     await ctx.reply(`Ты выбрал предмет: ${subject}`);
//     await ctx.reply('Тебе нравится этот предмет?', Markup.inlineKeyboard([
//         [Markup.button.callback('👍 Нравится', `like_${subject}`)],
//         [Markup.button.callback('👎 Не нравится', `dislike_${subject}`)]
//     ]));
// });


// bot.action(/(like|dislike)_(.+)/, async(ctx) => {
//     const [action, subject] = ctx.match;
//     const feedback = action === 'like' ? '❤️ Любимый' : '💔 Нелюбимый';

//     const message = `📝 Новый отзыв:\nИмя: ${ctx.session.name}\nФамилия: ${ctx.session.surname}\nКласс: ${ctx.session.class}\nПредмет: ${subject}\nОтзыв: ${feedback}`;

//     await ctx.telegram.sendMessage(process.env.ADMIN_CHAT_ID, message);
//     await ctx.reply('Спасибо за отзыв!');
// });

// bot.use(session());
// console.log('🤖 Бот запущен!');