async function setWebHook() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const webhookUrl = process.env.WEBHOOK_URL || "";

  const apiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;
  const body = new URLSearchParams();
  body.append("url", webhookUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: body,
    });

    const data = await response.json();
    if (data.ok) {
      console.log("Webhook successfully set!");
    } else {
      console.log("Failed to set webhook:", data);
    }
  } catch (error) {
    console.error("Error setting webhook:", error);
  }
}

setWebHook();
