"use client";
import CalendarPage from "@/components/calender/Calender";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      import("@twa-dev/sdk").then((WebAppModule) => {
        const WebApp = WebAppModule.default;
        setUser(WebApp.initDataUnsafe.user);
        setLoading(false);
      });
    }
  }, []);

  if (loading || !isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader size={20} color="#800080" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 font-semibold">
            You&apos;re not authorized. Visit through Telegram.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CalendarPage user={user} />
      </div>
    </div>
  );
}
