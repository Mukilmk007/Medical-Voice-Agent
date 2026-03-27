import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type Props = {
  doctorAgent: doctorAgent
  setSelectedDoctor: (doc: doctorAgent) => void
  selectedDoctor: doctorAgent
}

const SuggestedDoctorCard = ({ doctorAgent, setSelectedDoctor, selectedDoctor }: Props) => {
  const getImageSrc = () => {
    if (doctorAgent?.image) {
      // Remote image
      if (doctorAgent.image.startsWith('http')) {
        return doctorAgent.image
      }
      // Local image in /public (remove any leading slash duplication)
      return `/${doctorAgent.image.replace(/^\/+/, '')}`
    }
    // Fallback image from /public
    return '/doctor1.png'
  }

  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5
      hover:border-green-700 cursor-pointer
      ${selectedDoctor?.id === doctorAgent?.id ? 'border-green-700' : ''}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={getImageSrc()}
        alt={doctorAgent?.specialist || 'Doctor'}
        width={70}
        height={70}
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <h2 className="font-bold text-sm text-slate-800 text-center">{doctorAgent?.specialist}</h2>
      <p className="text-xs text-slate-500 text-center line-clamp-2">{doctorAgent?.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
