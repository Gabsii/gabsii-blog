'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import Button from '@/components/Atoms/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('ErrorPage')

  useEffect(() => {
    // Log error details for debugging
    console.error('[Error Boundary] Caught error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
      cause: error.cause,
    })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{t('somethingWentWrong')}</h2>
        <p className="text-grey mb-4">{t('errorBody')}</p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 border-2 border-red text-left text-sm overflow-auto">
            <p className="font-mono text-red">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-red mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {error.digest && process.env.NODE_ENV === 'production' && (
          <p className="text-sm text-grey mb-4">
            {t('errorIdHint')}{' '}
            <a className="underline underline-offset-4" href={`mailto:hello@gabsii.com?subject=Error%20${error.digest}`}>
              {error.digest}
            </a>
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={reset} isInverted>{t('tryAgain')}</Button>
          <Link href="/"><Button as="span">{t('goHome')}</Button></Link>
        </div>
      </div>
    </div>
  )
}
