"use client"
import Image from "next/image";
import GridBackground from "@/components/GridBackground";



export default function Page() {
  return (
    <GridBackground minHeight="100vh">
      <div className="relative flex flex-col flex-1 px-6 pt-36">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-12">
            
            {/* Left */}
            <div className="max-w-xl">
              <h1 className="font-sans font-extrabold text-[7vh] text-[#FFFFFF]">
                <span className="text-[#FFFFFF]">W</span>
                HO AM I
                <span className="text-[#FC0F49]">?</span>
              </h1>
              <p className="text-[#808080] font-geist">
                Computer Engineering student building across software, hardware, and design. Developed mobile applications with React Native, web platforms with Next.js, custom developer tools such as X4MD, productivity & student tools, and experimental hardware including cyberdeck designs & IOT. Also leading and contributing to open-source initiatives such as The Kaju Taklis Open Source while creating technology-driven storytelling projects like Law Of Machine & Wonder.
              </p>
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-center items-start">
              <div
                className="w-full max-w-sm bg-[#111] border border-white/10 rounded-xl overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  width={960}
                  height={1280}
                  src="/pfp.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover scale-200 grayscale"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </GridBackground>
  );
}