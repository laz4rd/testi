import Image from "next/image";
import DecryptedText from "@/components/DecryptedText";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#FC0F49]">
      {/* <h1 className="font-tech text-[12rem] text-[#0F0F0F]">36</h1> */}
      <DecryptedText
        text="36"
        className="font-tech"
        encryptedClassName="font-tech text-[#B9E901]"
        parentClassName="text-[6rem]"
        maxIterations={50}
        speed={50}
        animateOn="view"
      />
    </div>
  );
}
