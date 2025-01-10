import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message } = req.body;
    let reply: string;

    if (message.toLowerCase().includes("hello")) {
      reply = "Hello! How can I assist you today?";
    } else if (message.toLowerCase().includes("help")) {
      reply = "Sure! I'm here to help. Please ask your question.";
    } else {
      reply = "I'm sorry, I didn't understand that. Can you rephrase?";
    }

    res.status(200).json({ reply });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
