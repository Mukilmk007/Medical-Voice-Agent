import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen shadow-2xl bg-gradient-to-r from-black/90 to-black/90">
      
        <SignUp />
      
    </div>
  );
}
