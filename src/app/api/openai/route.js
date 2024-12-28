import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(req) {
  const data = await req.json();
  console.log("Data:", data);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: "You are a writer who can create blogs and articles. Your niche area is Cricket. If the question is not in the area of cricket or cricketing personalities or cricket matches, then do not answer and just say that this is not my main area of interest.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: data["chatMessage"],
          },
        ],
      },
    ],
  });

  console.log("response:", response.choices[0].message.content);
  
  return NextResponse.json({
    message: response.choices[0].message.content
  });
}
