// prisma/seed.js
import prisma from "@/lib/db";

const dummyUsers = [
  { telegramId: 123456789, username: 'john_doe', firstName: 'John', lastName: 'Doe' },
  { telegramId: 987654321, username: 'jane_doe', firstName: 'Jane', lastName: 'Doe' },
  { telegramId: 1122334455, username: 'alex_smith', firstName: 'Alex', lastName: 'Smith' },
];

const dummyEntries = [
  { userId: 1, text: 'Doctor appointment at 10 AM.', createdAt: new Date('2024-11-10T09:00:00Z') },
  { userId: 2, text: 'Team meeting at 2 PM.', createdAt: new Date('2024-11-10T14:00:00Z') },
  { userId: 1, text: 'Grocery shopping at 5 PM.', createdAt: new Date('2024-11-11T17:00:00Z') },
  { userId: 3, text: 'Gym session at 7 PM.', createdAt: new Date('2024-11-11T19:00:00Z') },
  { userId: 2, text: 'Project deadline at midnight.', createdAt: new Date('2024-11-12T00:00:00Z') },
  { userId: 1, text: 'Dinner with family at 8 PM.', createdAt: new Date('2024-11-12T20:00:00Z') },
];

async function main() {
  console.log('Seeding started...');

  // Create users
  for (const user of dummyUsers) {
    await prisma.user.create({
      data: user,
    });
  }

  // Create entries (assuming user IDs are correct)
  for (const entry of dummyEntries) {
    await prisma.entry.create({
      data: entry,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
