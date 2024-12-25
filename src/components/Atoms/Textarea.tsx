type TextareaProps = {
  label?: string;
} & React.ComponentProps<'textarea'>;

export default function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className="flex flex-col space-y-1">
      {label && (
        <span
          className={`uppercase mb-ch font-suisse font-medium tracking-widest w-fit
          ${props.required ? "after:ml-ch after:content-['*'] after:text-red" : ''}`}
        >{label}</span>
      )}
      <span className="w-full relative flex
        after:absolute after:bottom-0 after:left-0
        after:h-1 after:w-0 after:bg-primary
        after:transition-all
        focus-within:after:animate-growltr focus-within:after:w-full
      ">
        <textarea
          rows={props.rows || 9}
          className="resize-none px-4 py-2 w-full
        border-2 border-primary bg-secondary
        font-suisse font-medium text-sm text-primary
        transition-all duration-300
        placeholder:text-grey
        focus:outline-none focus:bg-grey focus:bg-opacity-25
        " {...props} />
      </span>
    </label>
  )
}
