"use client";

import { motion } from "motion/react";
//import { motion } from "framer-motion"; 

import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {


  return (
    <div className="relative my-10 mt-0 flex flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20 bg-black/95">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-sm font-bold text-slate-200 md:text-4xl lg:text-7xl dark:text-slate-300">

          {"From scheduling to consulting to reports — AI handles it all in seconds"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-slate-100 dark:text-neutral-400"
        >
          Deliver 24/7 medical support with Conversational AI — triage symptoms, book appointments, and care for patients
        </motion.p>
        <Link href={'/sign-in'}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          
           
          
        </motion.div>
        </Link>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {

  const {user} = useUser()

  return (
    <nav className="bg-black/95 text-white flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
       {/* <div className="size-7 rounded-full bg-gradient-to-br from-green-500 to-black/90" /> */}
        {/* <div>
          <img src="icon.svg" alt="icon"  />
        </div> */}
        <h1 className="text-base font-bold md:text-2xl bg-gradient-to-r from-[#05662a] via-[#08893a] to-[#0fc555] bg-clip-text text-transparent">ClinIQ AI</h1>
        <img src="icon.svg" alt="icon" height={150} width={150} />
        
      </div>
      {!user ? 
      <Link href={'/sign-in'}>
        <button className="w-24 transform rounded-lg bg-green-800 hover:bg-green-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5  md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      </Link> :

      <div className="flex gap-5 items-center">
        <UserButton />
        
        <Link
            href="/dashboard"
            className="block w-40 text-center cursor-pointer transform rounded-lg bg-green-800 hover:bg-green-600 py-2 "
          >
            Dashboard
          </Link>
      </div>
      }
    </nav>
  );
};

