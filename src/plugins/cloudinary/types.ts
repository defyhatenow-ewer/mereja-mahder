import type { Adapter, CollectionOptions } from '@payloadcms/plugin-cloud-storage/types'
import type { Plugin, UploadCollectionSlug } from 'payload'

export type CloudinaryConfig = {
  cloud_name: string
  api_key: string
  api_secret: string
}

export type CloudinaryStorageOptions = {
  /**
   * Collection options to apply the Cloudinary adapter to.
   */
  collections: Partial<Record<UploadCollectionSlug, Omit<CollectionOptions, 'adapter'> | true>>

  /**
   * Cloudinary configuration
   */
  config: CloudinaryConfig

  /**
   * Folder path in Cloudinary where files will be uploaded
   * @default 'payload-media'
   */
  folder?: string

  /**
   * Whether or not to disable local storage
   * @default true
   */
  disableLocalStorage?: boolean

  /**
   * Whether or not to enable the plugin
   * @default true
   */
  enabled?: boolean
}

export type CloudinaryStoragePlugin = (cloudinaryArgs: CloudinaryStorageOptions) => Plugin

export type CloudinaryMetadata = {
  public_id: string
  resource_type: string
  format: string
  secure_url: string
  bytes: number
  created_at: string
  duration?: number
  width?: number
  height?: number
  eager?: unknown[]
}

export type CloudinaryAdapter = Adapter

export type MediaData = {
  alt: string
  sizes: {
    thumbnail: {
      filename: string
      filesize: number
      height: 200
      mimeType: 'image/jpeg'
      width: 300
      url: undefined | string
    }
    square: {
      filename: string
      filesize: number
      height: 500
      mimeType: 'image/jpeg'
      width: 500
      url: undefined | string
    }
    small: {
      filename: string
      filesize: number
      height: 400
      mimeType: 'image/jpeg'
      width: 600
      url: undefined | string
    }
    medium: {
      filename: string
      filesize: number
      height: 600
      mimeType: 'image/jpeg'
      width: 900
      url: undefined | string
    }
    large: {
      filename: string
      filesize: number
      height: 933
      mimeType: 'image/jpeg'
      width: 1400
      url: undefined | string
    }
    xlarge: {
      filename: string
      filesize: number
      height: 1280
      mimeType: 'image/jpeg'
      width: 1920
      url: undefined | string
    }
    og: {
      filename: string
      filesize: number
      height: 630
      mimeType: 'image/jpeg'
      width: 1200
      url: undefined | string
    }
  }
  width: number
  height: number
  filesize: number
  mimeType: 'image/jpeg'
  filename: string
  focalX: number
  focalY: number
  caption: undefined | string
  updatedAt: undefined | string
  createdAt: undefined | string
  url: undefined | string
  thumbnailURL: undefined | string
}
