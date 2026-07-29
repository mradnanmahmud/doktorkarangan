import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { defaultClinic } from "@/lib/demo-data";

export async function POST(req:NextRequest){
 const body=await req.json();
 if(!process.env.OPENAI_API_KEY) return NextResponse.json({...defaultClinic,topic:body.topic,level:body.level,essayType:body.essayType});
 try{
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const prompt=`Hasilkan satu kes Klinik Karangan Bahasa Melayu untuk murid ${body.level}. Jenis: ${body.essayType}. Topik: ${body.topic}. Fokus kelemahan: ${(body.focus||[]).join(', ')}. Karangan mesti realistik, 220-300 patah perkataan dan mempunyai 5-7 kelemahan halus. Pulangkan JSON sahaja dengan medan essay, sentences (array ayat), issues (array: sentenceIndex, category, explanation), teacherScores (isi,bahasa,organisasi setiap satu 0-10), aiFeedback. Kategori mesti salah satu: Isi,Huraian,Contoh,Tatabahasa,Kosa kata,Organisasi,Fakta,Penanda wacana.`;
  const response=await client.responses.create({model:process.env.OPENAI_MODEL||"gpt-5-mini",input:prompt});
  const text=response.output_text.replace(/^```json|```$/g,'').trim();
  return NextResponse.json(JSON.parse(text));
 }catch(error){console.error(error);return NextResponse.json({...defaultClinic,topic:body.topic,level:body.level,essayType:body.essayType});}
}
