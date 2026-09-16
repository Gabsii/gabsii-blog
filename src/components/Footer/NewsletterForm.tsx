"use client";

import { useState } from 'react'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'

import { useToast } from '~/util/hooks/use-toast';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast();
  const t = useTranslations('NewsletterForm');
  const tGeneral = useTranslations('General');

  // TODO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    let res: Response
    try {
      res = await fetch('/newsletter/submit', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } finally {
      setIsSubmitting(false)
    }

    // An address that is already subscribed is not an error the user can fix by
    // retrying, so it gets its own message rather than "try again later".
    if (res.status === 409) {
      toast({ title: t('alreadySubscribed') })
      setEmail('')
      return;
    }

    if (res.status !== 201) {
      toast({
        title: tGeneral('error'),
        description: tGeneral('tryAgainLater'),
        variant: 'error'
      })
      return;
    }

    toast({
      title: t('successfullySignedUp'),
      description: t('hearFromMeSoon'),
    })

    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end w-full">
      <div className='grow'>
        <Input
          label={t('stayUpdated')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@here.com"
          className='border-r-0'
          autoComplete="email"
          inputMode="email"
          required
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isInverted
        >
          {isSubmitting ? t('sending') : t('send')}
        </Button>
      </div>
    </form>
  )
}
