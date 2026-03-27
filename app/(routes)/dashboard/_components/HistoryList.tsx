'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AddNewSessionDialog from './AddNewSessionDialog'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { SessionDetail } from '../medical-agent/[sessionId]/page';

function HistoryList () {

    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    useEffect(() => {
      GetHistoryList();
    },[])

    const GetHistoryList = async () => {
      const result = await axios.get('/api/session-chat?sessionId=all');
      console.log(result.data);
      setHistoryList(result.data);
    }

  return (
  <div className=" border rounded-2xl py-6">
    {historyList.length === 0 ? (
      <div className="text-slate-200 flex items-center flex-col justify-center p-7 border-2 border-dashed rounded-2xl">
        <Image
          src={'/medical-assistance.png'}
          alt="empty"
          width={150}
          height={150}
        />
        <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
        <p>It looks like you haven't consulted with any doctors yet.</p>
        <AddNewSessionDialog />
      </div>
    ) : (
      <div className="w-full">
        <HistoryTable historyList={historyList} />
      </div>
    )}
  </div>
)
}

export default HistoryList