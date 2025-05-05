/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const NavIcon = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  return (
    <img
      alt="Mereja Mahder NavIcon"
      width={18}
      height={18}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('', className)}
      src="favicon.png"
    />
  )
}

export default NavIcon
