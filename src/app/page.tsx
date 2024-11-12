"use client";
import CalendarPage from "@/components/calender/Calender";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <BeatLoader color="#800080" />;
  }
  const user = WebApp.initDataUnsafe.user;
  console.log(user);
  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 font-semibold">
            You&apos;re not authorized. Visit through Telegram.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CalendarPage />
      </div>
    </div>
  );
}
