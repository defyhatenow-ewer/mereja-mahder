import type { GenerateURL } from '@payloadcms/plugin-cloud-storage/types'
import type { CloudinaryStorageOptions } from './types'

import path from 'path'
import getResourceType from './getResourceType'

interface Args {
  config: CloudinaryStorageOptions['config']
  folder: string
}

export const getGenerateURL =
  ({ config, folder }: Args): GenerateURL =>
  ({ filename, prefix = '' }) => {
    // Construct the folder path with proper handling of prefix
    const folderPath = prefix ? path.posix.join(folder, prefix) : folder
    const filePath = path.posix.join(folderPath, filename)
    const ext = path.extname(filename).toLowerCase()
    const resourceType = getResourceType(ext)
    const baseUrl = `https://res.cloudinary.com/${config.cloud_name}`

    switch (resourceType) {
      case 'video':
        return `${baseUrl}/video/upload/f_auto,q_auto/${filePath}`
      case 'image':
        return `${baseUrl}/image/upload/f_auto,q_auto/${filePath}`
      case 'raw':
        return `${baseUrl}/raw/upload/${filePath}`
      default:
        return `${baseUrl}/auto/upload/${filePath}`
    }
  }
