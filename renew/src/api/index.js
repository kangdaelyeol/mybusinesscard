import axios from 'axios'

const CLOUDINARY_UPLOAD_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload'

const CLOUDINARY_DELETE_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/asset/destroy'

const LOGIN_REQUEST_URL = 'http://localhost:5000/user'

export const uploadCloudinaryImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    const res = await axios.post(CLOUDINARY_UPLOAD_REQUEST_URL, formData)
    console.log(res.data)
    return res.data
}

export const deleteCloudinaryImage = (signature, assetId) => {
    const formData = new FormData()

    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('signature', signature)
    formData.append('asset_id', assetId)

    axios.post(CLOUDINARY_DELETE_REQUEST_URL, formData).then(console.log)
}

export const userLogin = async (username, password) => {
    const res = await fetch(LOGIN_REQUEST_URL)

    const json = await res.json()

    const user = json.find((user) => user.id === username)
    if (!user) return { status: 400 }
    if (user.password === password) return { status: 200, data: user }
    else return { status: 400 }
}
