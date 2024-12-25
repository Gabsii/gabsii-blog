import ContactForm from "@/components/ContactForm/ContactForm";
import { VelocityScroll } from "@/components/Marquee/Marquee";
import NewsOverview from "@/components/NewsOverview/NewsOverview";
import ProjectSlider from "@/components/ProjectSlider/ProjectSlider";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectSlider />
      {/* <NewsOverview /> */}
      <ContactForm />
    </>
  );
}


// TODO: weather location
const Hero = () => (
  <section className="p-8 lg:p-24 relative h-screen">
    <div className="max-w-1200 mx-auto w-full grid grid-cols-4 gap-px">
      <div className="col-span-full flex flex-col font-suisse font-medium">
        <VelocityScroll default_velocity={10} text="Gabsii" className="text-5xl lg:text-9xl" />
        <div className="mt-20 lg:mt-[10vh] font-piazzolla font-light text-2xl lg:text-5xl leading-normal lg:leading-normal col-span-2 col-start-2 flex flex-col items-center text-center">
          <div>
            is a <span className="font-medium">creative, freelance full-stack developer</span>
            <br />building <span className="font-medium">memorable</span> and <b>performant</b>
            <p className="mx-auto w-max font-medium">✨ virtual experiences ✨</p>
          </div>
          <span className="mt-2 font-light text-xl"><span className="mr-2">🟢</span>available for work</span>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  </section>
)
