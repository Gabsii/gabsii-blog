"use client";

import { useState } from 'react'

import Input from '../Atoms/Input'
import Button from '../Atoms/Button'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  // TODO
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission logic here
    console.log('Email submitted:', email)
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
          SEND
        </Button>
      </div>
    </form>
  )
}
