import NextLink, { LinkProps } from 'next/link'

import * as m from '@/paraglide/messages'
import { cn } from '~/util/cn'
import NewsletterForm from './NewsletterForm'

const Link = ({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) =>
  (<NextLink {...props} className={cn(`hover:underline`, className)}>{children}</NextLink>)

export default function Footer() {
  return (
    <footer
      className="relative text-secondary py-8 px-4 md:px-8 border-t-2 border-secondary font-piazzolla lg:w-[calc(100vw-50px)] lg:ml-[50px]"
    >
      <section className='max-w-1200 mx-auto w-full grid grid-cols-4 gap-y-4 lg:gap-y-px gap-px pt-10 pb-24'>

        <div className="space-y-2 col-span-full lg:col-span-1 flex flex-col">
          <p className="font-bold mb-6">{m.thanksForReading()}</p>
          <Link href="/imprint" className='inline-block'>{m.imprint()}</Link>
          <Link href="/privacy" className='inline-block'>{m.dataPrivacy()}</Link>
        </div>

        <div className="col-span-full lg:col-span-1">
          <h3 className="mb-6">{m.contact()}</h3>
          <Link href="mailto:hello@gabsii.com">hello@gabsii.com</Link>
        </div>

        <div className='col-span-full lg:col-span-2'>
          <NewsletterForm />
        </div>

        <div className='col-span-2 lg:col-span-1 lg:mt-14'>© LUKAS GABSI {new Date().getFullYear()}</div>

        <div className='col-span-2 lg:col-span-1 lg:mt-14'>
          <Link href="https://www.linkedin.com/in/gabsii/">LI</Link>{' - '}
          <Link href="https://github.com/Gabsii/">GH</Link>{' - '}
          <Link href="https://www.instagram.com/not.gabsi/">IG</Link>{' - '}
          <Link href="https://x.com/G4bsi">TWT</Link>
        </div>
      </section>
    </footer >
  )
}
