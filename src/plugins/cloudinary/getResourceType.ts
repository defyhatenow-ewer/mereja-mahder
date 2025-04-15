import { IMAGE_EXTENSIONS, RAW_EXTENSIONS, VIDEO_EXTENSIONS } from './constants'

const getResourceType = (ext: string): 'video' | 'image' | 'raw' | 'auto' => {
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video'
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image'
  if (RAW_EXTENSIONS.includes(ext)) return 'raw'
  return 'auto' // Default to auto for unknown types
}

export default getResourceType
