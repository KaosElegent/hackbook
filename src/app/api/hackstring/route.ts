
import { NextRequest, NextResponse } from 'next/server'; 
import { getResponse } from '../gemini';
import Hackathon from "@/db/models/hackathon";

// create new lease
export async function PUT(req: NextRequest, res: NextResponse) {
    try { 
        const { userInput, hackathon_id } = await req.json();

        const appropritateString = await getResponse(userInput);
        
        Hackathon.updateOne({_id: hackathon_id}, [{ $set: { hackString: { $concat: [ "$hackString", appropritateString ] } } }]).exec();

        return NextResponse.json({ success:"HackString successfully updated" }, { status: 200 })
    } catch (e) {
        console.log("can't post: ", e);
        return NextResponse.json({ error: `Internal Server Error: ${e}` }, { status: 500 })
    }
}
