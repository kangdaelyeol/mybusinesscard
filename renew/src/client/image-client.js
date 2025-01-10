import axios from 'axios'
import {
    MAX_PROFILE_SIZE,
    CLOUDINARY_DELETE_REQUEST_URL,
    CLOUDINARY_UPLOAD_REQUEST_URL,
} from '../constants'

export const imageClient = {
    uploadInCloudinary: async (file) => {
        if (file?.size > MAX_PROFILE_SIZE || !file.type.startsWith('image')) {
            return {
                status: 400,
                reason: "Maximum size of file is 3MB or type of file should be 'image'",
            }
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('api_key', import.meta.env.VITE_API_KEY)
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

        const res = await axios.post(CLOUDINARY_UPLOAD_REQUEST_URL, formData)

        return { status: res.status, data: res.data }
    },

    deleteInCloudinary: (signature, assetId) => {
        const formData = new FormData()

        formData.append('api_key', import.meta.env.VITE_API_KEY)
        formData.append('signature', signature)
        formData.append('asset_id', assetId)

        axios.post(CLOUDINARY_DELETE_REQUEST_URL, formData).then(console.log)
    },
}
