"use client";

import { useState } from 'react'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'

import { useToast } from '~/util/hooks/use-toast';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const { toast } = useToast();
  const t = useTranslations('NewsletterForm');
  const tGeneral = useTranslations('General');

  // TODO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/newsletter/submit', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
          required
        />
      </div>
      <div>
        <Button
          type="submit"
          isInverted
        >
          Send
        </Button>
      </div>
    </form>
  )
}
