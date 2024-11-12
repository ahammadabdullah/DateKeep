import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string) {
  const today = new Date();
  const dateRegex = /^(\d{1,2})(?:-(\d{1,2}))?(?:-(\d{4}))?$/;
  const match = dateInput.match(dateRegex);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = match[2] ? parseInt(match[2], 10) - 1 : today.getMonth();
  const year = match[3] ? parseInt(match[3], 10) : today.getFullYear();
  return new Date(year, month, day);
}

export function formateDateToString(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const formatDateToLocalString = (date: Date) => {
  return date.toLocaleDateString("en-CA");
};

export const formatText = `Use the following formats to add notes to your calendar:

/add <date>-<month>-<year> <note>
/add <date>-<month> <note>
/add <date> <note>

Examples:
- /add 10-11-2024 Doctor appointment at 10 AM
- /add 10 Doctor appointment at 10 AM (uses current month's 10th)
- /add 10-11 Doctor appointment at 10 AM (uses current year's 10th November)

Note:
- You can include a time or leave it blank
- If no year or month is provided, the current year and month will be used

To check your notes:

/check <date>-<month>-<year>
/check <date>-<month>
/check <date>

Examples:
- /check 10-11-2024
- /check 10-11
- /check 10

Note:
- If no year or month is provided, the current year and month will be used
`;

export const aboutText = `DateKeep is a simple bot to keep track of your notes and appointments.
It uses a simple command to add notes to your calendar.
Use /format to see the formats to add notes or check notes.
Use /open to open the calender.
For any queries, contact Ahammad Abdullah on github:
https://github.com/ahammadabdulah
        `;
