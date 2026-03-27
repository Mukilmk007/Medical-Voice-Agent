'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string,
    subscriptionRequired: boolean
}

type props = {
    doctorAgent: doctorAgent
}

const DoctorAgentCard = ({doctorAgent}: props) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {has} = useAuth();
    //@ts-ignore
    const paidUser = has && has({ plan: 'pro' })

    const onStartConsultation = async () => {
        setLoading(true);
        // SAVE ALL INFO TO DB
        const result = await axios.post('/api/session-chat', {
            notes: 'New Query',
            selectedDoctor: doctorAgent
        });

        console.log(result.data);
        if(result.data?.sessionId){
            console.log(result.data.sessionId);

            // ROUTE NEW CONVERSATION SCREEN
            router.push(`/dashboard/medical-agent/${result.data.sessionId}`);


        }
        setLoading(false);
    }

  return (
    <div className='relative'>
        {doctorAgent.subscriptionRequired&& <Badge className='absolute m-2 right-0'>
            Premium
        </Badge>}
        <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={200}
            className='w-full h-[250px] object-cover rounded-xl'
        /> 
        <span className="inline-block border-b-2 border-green-700 pb-1 text-slate-200">
            <h2 className='font-bold mt-1 text-slate-100'>{doctorAgent.specialist}</h2>
        </span>

        
        <p className='line-clamp-2 text-slate-400 text-sm'>{doctorAgent.description}</p> 
        <Button 
            onClick={onStartConsultation}
            className='bg-green-800 hover:bg-green-700 cursor-pointer w-full mt-2' disabled={!paidUser && doctorAgent.subscriptionRequired }>Start Consultation {loading ? <Loader2Icon className='animate-spin'/> : <IconArrowRight />} </Button>
    </div>
  )
}

export default DoctorAgentCard