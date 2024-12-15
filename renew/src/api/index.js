import axios from 'axios'

export const uploadCloudinaryImage = async (file) => {
    const requestURL = `https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    const res = await axios.post(requestURL, formData)

    return res.data
}
