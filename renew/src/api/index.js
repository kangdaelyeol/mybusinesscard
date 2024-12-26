import axios from 'axios'

const CLOUDINARY_UPLOAD_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload'

const CLOUDINARY_DELETE_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/asset/destroy'

const USER_REQUEST_URL = 'http://localhost:5000/user'

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
    const res = await fetch(USER_REQUEST_URL)

    const json = await res.json()

    const user = json.find((user) => user.id === username)
    if (!user) return { status: 400 }
    if (user.password === password) return { status: 200, data: user }
    else return { status: 400 }
}

export const userSignup = async (username, password, confirmPassword) => {
    if (!/^[A-Za-z0-9_-]{4,20}$/.test(username)) {
        return {
            status: 400,
            reason: "username should have 4 to 20 characters, shouldn't contain blank(nbsp) and special symbols.",
        }
    }

    if (!/^[\w.%+-]{4,20}$/.test(password)) {
        return {
            status: 400,
            reason: "password should have 4 to 20 characters, shouldn't contain blank(nbsp)",
        }
    }

    if (password !== confirmPassword) {
        return {
            status: 400,
            reason: "Password doesn't match confirm password correctly. Please check your password again",
        }
    }

    const userList = await (await fetch(USER_REQUEST_URL)).json()

    if (userList.find((user) => user.id === username)) {
        return {
            status: 400,
            reason: 'username exists already!',
        }
    }

    const userData = await (
        await fetch(USER_REQUEST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: username,
                password,
                profile: '',
                cards: [],
            }),
        })
    ).json()

    return {
        status: 200,
        value: userData,
    }
}
