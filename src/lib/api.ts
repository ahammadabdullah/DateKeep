import TelegramBot from "node-telegram-bot-api";
import prisma from "./db";
import { formateDateToString } from "./utils";
type User = {
  tID: number;
  username: string;
  firstName: string;
  lastName: string;
};

export async function addNote(user: User, date: Date, note: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
  }
  const bot = new TelegramBot(token);
  const { tID, username, firstName, lastName } = user;
  try {
    await bot.sendMessage(
      tID,
      `Adding note to calender: ${formateDateToString(date)} - ${note}`
    );
    let dbUser = await prisma.user.findUnique({
      where: { username },
    });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          username,
          firstName,
          lastName,
        },
      });
    }
    await prisma.entry.create({
      data: {
        date: new Date(date),
        note,
        userId: dbUser.username,
      },
    });
    await bot.sendMessage(
      tID,
      `Note added to calender:${formateDateToString(date)}  - ${note}`
    );
  } catch {
    await bot.sendMessage(
      tID,
      `Failed to add note to calender: ${formateDateToString(
        date
      )} - ${note} \nPlease try again later.`
    );
  }
}

export async function checkNotes(user: User, date: Date) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
  }
  const bot = new TelegramBot(token);
  const { tID, username } = user;
  try {
    const dbUser = await prisma.user.findUnique({
      where: { username },
    });
    if (!dbUser) {
      await bot.sendMessage(
        tID,
        `No notes found for ${formateDateToString(date)}`
      );
      return;
    }
    const entries = await prisma.entry.findMany({
      where: {
        userId: dbUser.username,
        date: date,
      },
    });
    if (entries.length === 0) {
      await bot.sendMessage(
        tID,
        `No notes found for ${formateDateToString(date)}`
      );
      return;
    }
    const notes = entries.map((entry) => entry.note).join("\n");
    await bot.sendMessage(
      tID,
      `Notes for ${formateDateToString(date)}:\n${notes}`
    );
  } catch {
    await bot.sendMessage(
      tID,
      `Failed to check notes for ${formateDateToString(date)}`
    );
  }
}
