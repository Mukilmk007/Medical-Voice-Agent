import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  console.log('Received notes:', notes);
  try {
    const completion = await openai.chat.completions.create({
    //   model: 'meta-llama/llama-3.2-3b-instruct:free',
      model: 'google/gemini-2.0-flash-exp:free',  
      messages: [
        { role: 'system', content: JSON.stringify(AIDoctorAgents) },
        {
          role: 'user',
          content:
            'User Notes/Symptoms:' +
            notes +
            ', Depends on user notes and symptoms, Please suggest list of doctors, Return Object in JSON only ',
        },
      ],
    });
    // console.log('OpenRouter response:', completion);
    const rawResp = completion.choices[0].message;

    //@ts-ignore
    const Resp = rawResp.content.trim().replace('```json','').replace('```','')
    
    const JSONResp = JSON.parse(Resp);

    return NextResponse.json(JSONResp);

  } catch (e) {
    console.error('OpenRouter error:', e);
    return NextResponse.json(e);
  }
}


