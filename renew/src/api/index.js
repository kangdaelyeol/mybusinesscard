import axios from 'axios'

export const uploadCloudinaryImage = async (file) => {
    const requestURL = `https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    const res = await axios.post(requestURL, formData)
    console.log(res.data)
    return res.data
}

export const deleteCloudinaryImage = (signature, assetId) => {
    const requestURL = `https://api.cloudinary.com/v1_1/dfvqmpyji/asset/destroy`
    const formData = new FormData()

    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('signature', signature)
    formData.append('asset_id', assetId)

    axios.post(requestURL, formData).then(console.log)
}
