import Image from "next/image";
import scroll from '~/img/scroll.svg'


// TODO: figure out how to invert
export default function ScrollIndicator() {

  return (
    <a
      className={`
        fixed bottom-8 right-8 w-24 h-24 rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        invert
        motion-safe:hover:scale-125
      `}
      href="#projects"
    >
      <Image className={`
        w-full h-full relative motion-safe:animate-rotate-slow
        motion-safe:hover:animate-rotate-fast motion-safe:hover:scale-105
      `} src={scroll} alt="scroll" />
      {/* <div className={`
        w-full h-full relative animate-rotate-slow
        hover:animate-rotate-fast hover:scale-105
      `}>
        <Scroll />
      </div> */}
    </a>
  )
}
