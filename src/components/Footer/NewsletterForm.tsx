"use client";

import { useState } from 'react'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'
import { useToast } from '~/util/hooks/use-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const { toast } = useToast();

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
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        variant: 'error'
      })
      return;
    }

    toast({
      title: 'Successfully signed up!',
      description: 'I hope, you hope to hear from me soon :)',
    })

    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end w-full">
      <div className='flex-grow'>
        <Input
          label="Stay updated"
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
