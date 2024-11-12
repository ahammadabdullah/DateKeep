declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: any;
        user: {
          id: number;
          first_name: string;
          last_name: string;
          username: string;
        };
      };
    };
  }
}
export {};
