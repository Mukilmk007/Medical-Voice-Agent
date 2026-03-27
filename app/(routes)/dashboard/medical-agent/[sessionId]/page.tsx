'use client'

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Languages, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import Provider from '@/app/provider';
import { toast } from 'sonner';

export type SessionDetail = { 
    id: number,
    notes: string,
    sessionId: string,
    report: JSON,
    selectedDoctor: doctorAgent,
    createdOn: string,
    

}

type messages = {
    role: string,
    text: string
}

function MedicalVoiceAgent  () {

    const {sessionId} = useParams();
    const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
    const [callStarted, setCallStarted] = useState(false);
    const [vapiInstance, setVapiInstance] = useState<any>();
    const [currentRole, setCurrentRole] = useState<string | null>();
    const [liveTranscript, setLiveTranscript] = useState<string>();
    const [messages, setMessages] = useState<messages[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    

    useEffect(()=>{
        if(sessionId) GetSessionDetails();
    },[sessionId]);

    const GetSessionDetails = async () => {
        const result = await axios.get('/api/session-chat?sessionId='+sessionId);
        //console.log(result.data);
        setSessionDetail(result.data);

    }

    // CALL VAPI WHEN BUTTON CLICKED
    const StartCall = () => {
            setLoading(true);
            
            const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
            setVapiInstance(vapi);
            vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);

            vapi.on('call-start', () => {
                setLoading(false);
                console.log('Call started')
                setCallStarted(true);
            });
            vapi.on('call-end', () => {
                console.log('Call ended')
                setCallStarted(false);
            });
            vapi.on('message', (message) => {
                if(message.type === 'transcript') {
                    const {role, transcriptType, transcript} = message;
                    console.log(`${message.role}: ${message.transcript}`);

                    if(transcriptType == 'partial') {
                        setLiveTranscript(transcript);
                        setCurrentRole(role);
                    } else if(transcriptType == 'final') {
                        // FINAL TRANSCRIPT
                        setMessages((prev: any) => [...prev, {role: role, text: transcript}])
                        setLiveTranscript("");
                        setCurrentRole(null);
                    }
                    
                }
            });
            vapiInstance.on('speech-start', () => {
                console.log('Assistant started speaking');
                setCurrentRole('assistant')
            });
            vapiInstance.on('speech-end', () => {
                console.log('Assistant stopped speaking');
                setCurrentRole('user')
        });

    }

    


    const endCall = async () => {
        
        const result = await GenerateReport();

        if(!vapiInstance) return;

        vapiInstance.stop();

        // OPTIONALLY REMOVE LISTENERS (good for memory management)
        vapiInstance.off('call-start');
        vapiInstance.off('call-end');
        vapiInstance.off('message');
        vapiInstance.off('speech-start');
        vapiInstance.off('speech-end');


        // RESET CALL STATE
        setCallStarted(false);
        setVapiInstance(null); 

        toast.success("Your report is generated!")
        router.replace('/dashboard');

    };

    // GENERATE REPORT
    const GenerateReport = async () => {
        setLoading(true);
        const result = await axios.post('/api/medical-report', {
            messages: messages,
            sessionDetail: sessionDetail,
            sessionId: sessionId
        })
        console.log(result.data);
        setLoading(false);

        return result.data;
    }

  return (
    <div className='p-5 py-19 mt-10 border rounded-3xl bg-secondary'>
        <div className='flex justify-between items-center'>
            <h2 className='p-1 px-2 border bg-black/70 rounded-md flex gap-2 items-center text-slate-100 '> <Circle className={`w-4 h-4 rounded-full ${callStarted ? 'bg-green-800' : 'bg-red-600'}`}/>{callStarted?'Connected...' : 'Not Connected'}</h2>
            <h2 className='font-bold text-xl text-gray-500'>00:00</h2>
        </div>

        {sessionDetail && <div className='flex items-center flex-col mt-10'>
            {sessionDetail?.selectedDoctor?.image ? (
            <Image 
                src={sessionDetail.selectedDoctor.image} 
                alt={sessionDetail.selectedDoctor.specialist ?? ''}
                width={120} 
                height={120}
                className='h-[100px] w-[100px] object-cover rounded-full'
            />
            ) : null}

            {/* <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist??''}
                width={120} height={120}
                className='h-[100px] w-[100px] object-cover rounded-full'
            /> */}
            <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
            <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

            <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
                {messages?.slice(-4).map((msg: messages, index)=>(
                    <h2 className='text-gray-400 p-2' key={index}>{msg.role}: {msg.text}</h2>
                ))}

                {liveTranscript && liveTranscript?.length > 0 && <h2 className='text-lg'>{currentRole}: {liveTranscript}</h2>}
            </div>    

            {/* {!callStarted ? <Button 
                onClick={StartCall} disabled={loading}
                className='mt-15 bg-green-800 hover:bg-green-700 cursor-pointer'>
                    {loading ? <Loader className='animate-spin'/> : <PhoneCall />}
                    Start Call
            </Button> : 
            <Button variant={'destructive'} onClick={endCall} className='cursor-pointer'> <PhoneOff /> Disconnect</Button>
            } */}

            {!callStarted ? (
                <Button className='mt-20 cursor-pointer bg-green-800 hover:bg-green-600' onClick={StartCall} disabled={loading} >
                    {loading ? <Loader className='animate-spin'/> : <PhoneCall />} Start Call
                </Button>
            ) : (
                <Button className='bg-green-800 hover:bg-green-600 cursor-pointer' variant={'destructive'} onClick={endCall} disabled={loading}>
                   {loading ? <Loader className='animate-spin'/> : <PhoneOff /> }  Disconnect
                </Button>
            )}

            
        </div>}
    </div>
  )
}

export default MedicalVoiceAgent