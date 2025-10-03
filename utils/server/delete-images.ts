
import { unlink } from "fs/promises"
import path from "path"

export async function deleteImages(imageUrls: string[]) {
  try {
    const deletePromises = imageUrls.map(async (imageUrl) => {
      try {
        const filePath = path.join(process.cwd(), 'public', imageUrl)
        await unlink(filePath)
        console.log(`Deleted image: ${imageUrl}`)
      } catch (err) {
        console.error(`Error deleting image ${imageUrl}:`, err)
      }
    })

    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${imageUrls.length} images from folder`)
  } catch (error) {
    console.error('Error deleting images from folder:', error)
    throw new Error('Failed to delete images from folder: ' + error)
  }
}