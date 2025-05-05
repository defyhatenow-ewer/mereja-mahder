/* eslint-disable @next/next/no-img-element */
'use client'
import { useTheme } from '@payloadcms/ui'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const CustomLogo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const { theme } = useTheme()

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  return (
    <div {...(theme ? { 'data-theme': theme } : {})}>
      <img
        alt="Mereja Mahder Logo"
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[9.375rem] w-full h-[34px] invert-0 dark:invert', className)}
        src="/logo.png"
        style={{
          filter: theme === 'dark' ? 'invert(100%)' : 'invert(0)',
        }}
      />
    </div>
  )
}

export default CustomLogo
