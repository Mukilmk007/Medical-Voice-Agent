import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment';
import ViewReportDialog from './ViewReportDialog';

type Props={
    historyList: SessionDetail[]
}

function HistoryTable ({historyList}: Props) {

    return (
        <div className='text-slate-100'>
            <Table className='text-slate-100'>
                <TableCaption >Previous Consultaion Reports</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-slate-100 font-bold">AI Medical Specialist</TableHead>
                        <TableHead className=' text-slate-100 font-bold'>Description</TableHead>
                        <TableHead className='text-slate-100 font-bold'>Date</TableHead>
                        <TableHead className="text-right text-slate-100 font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyList.map((record:SessionDetail, index: number) => (
                        <TableRow key={record.id ?? index}>
                            <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
                            <TableCell>{record.notes}</TableCell>
                            <TableCell>{ moment(new Date(record.createdOn)).fromNow()}</TableCell>
                            <TableCell className="text-right"><ViewReportDialog record={record}/></TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable