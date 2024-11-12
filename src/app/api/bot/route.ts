import { addNote, checkNotes } from "@/lib/api";
import { aboutText, formatDate, formatText } from "@/lib/utils";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

const bot = new TelegramBot(token);

export async function POST(req: Request) {
  const body = await req.json();

  if (body.message) {
    const chatId = body.message.chat.id;
    const text = body.message.text;
    const user = {
      tID: body.message.from.id,
      username: body.message.from.username,
      firstName: body.message.from.first_name,
      lastName: body.message.from.last_name,
    };
    // Handle /start command
    if (/\/start/.test(text)) {
      const firstName = body.message.from.first_name;
      const lastName = body.message.from.last_name;
      await bot.sendMessage(
        chatId,
        `Welcome ${firstName} ${lastName}! Use the following commands:\n
/add - to add note to specific date to your calender. Use /format to see the formats\n
/check - check notes for specific date\n
/open - Opens a mini app to see your calender\n
/about - to know more about the bot\n`
      );
    }

    // handle /format command
    else if (/\/format/.test(text)) {
      await bot.sendMessage(chatId, formatText);
    }
    // handle /add command
    else if (/\/add/.test(text)) {
      const date = text.split(" ")[1];
      const note = text.split(" ").slice(2).join(" ");

      if (!date || !note) {
        await bot.sendMessage(
          chatId,
          "Invalid format! Please use /format to see the formats."
        );
      } else {
        const newDate = formatDate(date);
        if (!newDate) {
          await bot.sendMessage(
            chatId,
            "Invalid date! Please use /format to see the formats."
          );
        } else {
          await addNote(user, newDate, note);
        }
      }
    }
    // Handle /open command
    else if (/\/open/.test(text)) {
      const userName = `${body.message.from.first_name} ${body.message.from.last_name}`;
      if (!WEB_APP_URL) {
        await bot.sendMessage(
          chatId,
          `Hey, ${userName}, sorry! the calender is not available at the moment.`
        );
      } else {
        await bot.sendMessage(chatId, `Hey, ${userName}, open the calender:`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Open Calender", web_app: { url: WEB_APP_URL } }],
            ],
          },
        });
      }
    }
    // handle /check command
    else if (/\/check/.test(text)) {
      const date = text.split(" ")[1];
      if (!date) {
        await bot.sendMessage(
          chatId,
          "Invalid format! Please use /format to see the formats."
        );
      } else {
        const newDate = formatDate(date);
        if (!newDate) {
          await bot.sendMessage(
            chatId,
            "Invalid date! Please use /format to see the formats."
          );
        } else {
          await checkNotes(user, newDate);
        }
      }
    }
    // handle /about command
    else if (/\/about/.test(text)) {
      await bot.sendMessage(chatId, aboutText);
    }
  }

  // Respond to Telegram to confirm the message was received
  return new Response("OK", { status: 200 });
}
