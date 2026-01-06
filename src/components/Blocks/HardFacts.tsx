import { Project } from "~/payload-types";
import Section from "../Atoms/Section";

type HardFactsBlock = {
  title: string;
  facts: {
    label: string;
    value: string;
    long: boolean;
  }[];
};

type HardFactsProps = {
  block: HardFactsBlock;
} & Project;

const HardFacts = ({ block, ...props }: HardFactsProps) => {
  return (
    <Section>
      <h3 className="font-suisse font-medium text-4xl lg:text-8xl mb-14">{block.title}</h3>
      <ul className="grid grid-cols-2 lg:grid-cols-4 border border-secondary">
        {block.facts.map((fact, index) => (
          <li
            key={index}
            className={`
              ${fact.long ? 'col-span-2' : 'col-span-1 aspect-square'}
              border border-secondary border-collapse p-5 pt-0
              bg-primary z-10
              flex flex-col justify-between min-h-full max-w-full
            `}>
            <p className="font-piazzolla font-light text-2xl lg:leading-[68px] lg:text-5xl overflow-hidden wrap-break-word text-ellipsis">{fact.value}</p>
            <p className="font-suisse font-light text-lg lg:text-4xl">{fact.label}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};


export default HardFacts;
