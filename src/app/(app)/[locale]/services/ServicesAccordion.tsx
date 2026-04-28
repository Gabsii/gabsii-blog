'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type Service = {
  id: string
  title: string
  description: string
  tags: string[]
}

export default function ServicesAccordion() {
  const t = useTranslations('Services')
  const [openId, setOpenId] = useState<string | null>(null)

  const services: Service[] = [
    {
      id: 'web-development',
      title: t('service1Title'),
      description: t('service1Description'),
      tags: t.raw('service1Tags') as string[],
    },
    {
      id: 'creative-direction',
      title: t('service2Title'),
      description: t('service2Description'),
      tags: t.raw('service2Tags') as string[],
    },
    {
      id: 'consulting',
      title: t('service3Title'),
      description: t('service3Description'),
      tags: t.raw('service3Tags') as string[],
    },
  ]

  return (
    <ul className="w-full">
      {services.map((service, index) => {
        const isOpen = openId === service.id
        return (
          <li key={service.id} className="border-t-2 border-secondary last:border-b-2">
            <button
              className="w-full flex items-center justify-between py-6 lg:py-8 text-left group cursor-pointer"
              onClick={() => setOpenId(isOpen ? null : service.id)}
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-suisse font-medium text-grey text-sm tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-piazzolla font-light text-4xl lg:text-6xl group-hover:translate-x-2 transition-transform duration-300">
                  {service.title}
                </span>
              </div>
              <motion.span
                className="font-suisse text-2xl ml-4 shrink-0 text-grey"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 lg:pb-12 pl-12 lg:pl-20 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <p className="font-suisse font-light text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-col justify-between gap-8">
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-suisse font-medium text-xs uppercase tracking-widest border border-secondary px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className="font-suisse font-medium text-sm uppercase tracking-widest hover:underline w-fit"
                      >
                        {t('letsWorkTogether')} →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
