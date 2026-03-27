import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type props={
  record: SessionDetail
}

function ViewReportDialog({record}: props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'link'} size={'sm'} className=' cursor-pointer text-slate-100'>View Report</Button>
        </DialogTrigger>
        <DialogContent className=''>
            <DialogHeader>
                <DialogTitle asChild>
                  <h2 className='text-center text-4xl'>🩺ClinIQ AI Voice Agent Report</h2>
                </DialogTitle>
                <DialogDescription asChild>
                    <div className='mt-10'>
                        <h2 className='font-bold text-green-700 text-lg'>Session Info:</h2>
                        
                        <div className='grid grid-cols-2 text-slate-800'>
                          
                            <h2><span className='font-bold'>Doctor Specialization:</span> {record.selectedDoctor?.specialist}</h2>
                            <h2>Consultation Date: { moment(new Date(record?.createdOn)).fromNow() }</h2>
                          
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog



// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { SessionDetail } from '../medical-agent/[sessionId]/page'
// import moment from 'moment'

// type Props = {
//   record: SessionDetail
// }

// function ViewReportDialog({ record }: Props) {
//   const getValue = (val?: string) => val && val.trim() !== "" ? val : "Not mentioned"

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant={'link'} size={'sm'} className='cursor-pointer text-slate-100'>
//           View Report
//         </Button>
//       </DialogTrigger>
//       <DialogContent className='max-w-2xl'>
//         <DialogHeader>
//           <DialogTitle asChild>
//             <h2 className='text-center text-4xl'>🩺 ClinIQ AI Voice Agent Report</h2>
//           </DialogTitle>
//           <DialogDescription asChild>
//             <div className='mt-10 space-y-6 text-slate-800'>

//               {/* Session Info */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Session Info:</h2>
//                 <div className='grid grid-cols-2 gap-2'>
//                   <p><span className='font-bold'>Doctor Specialization:</span> {getValue(record.selectedDoctor?.specialist)}</p>
//                   <p><span className='font-bold'>User:</span> {getValue(record.userName)}</p>
//                   <p><span className='font-bold'>Consultation Date:</span> {moment(new Date(record?.createdOn)).format("MMMM Do YYYY, h:mm a")}</p>
//                 </div>
//               </section>

//               {/* Complaint */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Complaint:</h2>
//                 <p>{getValue(record.complaint)}</p>
//               </section>

//               {/* Call Summary */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Call Summary:</h2>
//                 <p>{getValue(record.callSummary)}</p>
//               </section>

//               {/* Symptoms */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Symptoms Mentioned:</h2>
//                 <p>{getValue(record.symptoms)}</p>
//               </section>

//               {/* Duration & Severity */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Duration & Severity:</h2>
//                 <p>{getValue(record.durationSeverity)}</p>
//               </section>

//               {/* Medications */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Medications:</h2>
//                 <p>{getValue(record.medications)}</p>
//               </section>

//               {/* Recommendations */}
//               <section className='pb-4 border-b'>
//                 <h2 className='font-bold text-green-700 text-lg mb-2'>Recommendations:</h2>
//                 <p>{getValue(record.recommendations)}</p>
//               </section>

//               {/* Footer */}
//               <section className='pt-4'>
//                 <p className='text-center text-xs text-gray-500 italic'>
//                   Generated by ClinIQ AI Medical Agent
//                 </p>
//               </section>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default ViewReportDialog
