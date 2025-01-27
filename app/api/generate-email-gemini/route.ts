import { OpenAI } from '@langchain/openai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { PromptTemplate } from '@langchain/core/prompts';
import { NextRequest, NextResponse } from 'next/server';

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-pro',
})

export async function POST(req: NextRequest) {
    try{
        const {name, email, purpose, keypoints} = await req.json();

        if(!name || !email || !purpose || !keypoints) {
            return NextResponse.json({
                err: 'All fields required',
                status: 400
            })
        }

        const promt = PromptTemplate.fromTemplate(`
                Write a professional email for:
                Recipient Name: {name}
                email: {email}
                Purpose: {purpose}
                cosidering this key points: {keypoints}
            `);
        
        const formattedPromt = await promt.format({
            name,
            email,
            purpose,
            keypoints
        })
        console.log(formattedPromt);

        const res = await model.invoke([
            "human",
            formattedPromt
        ])

        console.log(res.content);
        
        return NextResponse.json({
            msg: 'All good',
            content: res.content
        })
    }catch(err) {
        console.log("Error accured: ", err);
        return NextResponse.json({
            msg: 'something broke',
            err: err
        })
    }
}