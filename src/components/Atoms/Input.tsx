import { cn } from "~/util/cn";

type InputProps = {
  label?: string;
  isInverted?: boolean;
  type: React.HTMLInputTypeAttribute;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export default function Input({ label, isInverted, ...props }: InputProps) {
  switch (props.type) {
    case 'checkbox':
      return (
        <Checkbox label={label} {...props} />
      );
    default:
      return <InputField label={label} isInverted={isInverted} className={props.className} {...props} />
  }
}

function InputField({ label, isInverted, className, ...props }: InputProps) {
  if (!label) {
    return <RawInputField className={className} isInverted={isInverted} {...props} />
  }

  return (
    <label className="flex flex-col space-y-1">
      <span className={`uppercase font-suisse font-medium tracking-widest w-fit mb-ch
        ${props.required ? "after:ml-ch after:content-['*'] after:text-red" : ''}`}
      >{label}</span>
      <RawInputField className={className} isInverted={isInverted} {...props} />
    </label>
  );
}

function RawInputField({ className, isInverted, ...props }: Omit<InputProps, "label">) {
  return (
    <span className={`relative w-full
      after:absolute after:bottom-0 after:left-0
      after:h-1 after:w-0 ${isInverted ? "after:bg-primary" : "after:bg-secondary"}
      after:transition-all
      focus-within:after:animate-growltr focus-within:after:w-full
    `}>
      <input className={cn(`px-4 py-2 h-9 md:h-12 lg:h-16 w-full
        border-2 ${isInverted ? "border-primary bg-secondary" : "border-secondary bg-primary"}
        font-suisse font-medium text-sm ${isInverted ? "text-primary" : "text-secondary"}
        transition-all duration-300
        placeholder:text-grey
        hover:bg-grey/25
        focus:outline-none focus:bg-grey/25`, className)} {...props} />
    </span>
  );
}

function Checkbox({ label, ...props }: Omit<InputProps, "isInverted">) {
  return (
    <label className="relative w-fit h-9 md:h-12 lg:h-16
      flex items-center
    ">
      <span className="h-9 w-9 md:h-12 md:w-12 lg:h-16 lg:w-16 relative
        after:absolute after:bottom-0 after:left-0
        after:h-1 after:w-0 after:bg-primary
        after:transition-all
        focus-within:after:animate-growltr focus-within:after:w-full
      ">
        {/* TODO: could use a svg drawing animation for the checkmark here */}
        <input className={`h-9 w-9 md:h-12 md:w-12 lg:h-16 lg:w-16
          appearance-none border-2 border-primary
          bg-secondary
          checked:bg-checkmark checked:bg-no-repeat checked:bg-center checked:bg-contain
          hover:bg-secondary/75
          focus:outline-none focus:bg-secondary/75`}
          {...props}
        />
      </span>
      {label &&
        <span className={`uppercase ml-ch md:ml-[2ch] lg:ml-[4ch] font-suisse font-medium tracking-widest w-fit
          ${props.required ? "after:ml-ch after:content-['*'] after:text-red" : ''}`}
        >{label}</span>
      }
    </label>
  );
}
