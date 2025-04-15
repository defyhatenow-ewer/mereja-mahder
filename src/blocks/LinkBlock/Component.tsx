import React from 'react'

import type { LinkBlock as LinkBlocKTypes } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const LinkBlock: React.FC<LinkBlocKTypes> = ({ links }) => {
  return (
    <div className="flex flex-col gap-8">
      {(links || []).map(({ link }, i) => {
        return <CMSLink key={i} size="lg" {...link} />
      })}
    </div>
  )
}
