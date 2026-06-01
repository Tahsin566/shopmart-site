import { v2 as cloudinary } from 'cloudinary'
import { cloudinary_api_key, cloudinary_api_secret, cloudinary_cloud_name } from './configEnv'

cloudinary.config({
    cloud_name: cloudinary_cloud_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret
})

export const uploadFile = (file: Buffer) => {
    if (!file) return Promise.resolve()

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', upload_preset: 'ml_default', folder: 'ecom/products' }, (error, result) => {
                if (error) return reject(error)
                resolve(result?.secure_url || '')
            }
        ).end(file)
    })
}

export const remove = async (file: string) => {
    if (!file) return
    try {
        const publicId = file.split('/upload/')[1]?.replace(/^v\d+\//, '').replace(/\.[^.]+$/, '')
        if (!publicId) throw new Error('Invalid Cloudinary URL')

        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        throw new Error(`Failed to remove image: ${error}`)
    }
}
