import { mkdir, writeFile } from "fs/promises"
import path from "path"

export async function uploadImages(images:File[], productId:string|number) {
  if (images && images.length > 0) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')

    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (err) {
      console.log('Directory already exists or creation failed:', err)
    }

    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${productId}-${Date.now()}-${index}.${fileExt}`
      const filePath = path.join(uploadsDir, fileName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await writeFile(filePath, buffer)
      const publicUrl = `/uploads/products/${fileName}`

      return publicUrl
    })

    try {
      const imageUrls = await Promise.all(uploadPromises)
      return imageUrls
    } catch (uploadErr) {
      throw new Error('Image upload error: ' + uploadErr)
    }
  }
} 