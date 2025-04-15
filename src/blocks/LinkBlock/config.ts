import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const LinkBlock: Block = {
  slug: 'link',
  interfaceName: 'LinkBlock',
  fields: [
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Links',
    singular: 'Link',
  },
}
