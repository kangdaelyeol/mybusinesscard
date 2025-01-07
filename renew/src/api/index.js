import axios from 'axios'
import { MAX_PROFILE_SIZE } from '../constants'
import { db } from '../service/firebase'
import { ref, set, get, child } from 'firebase/database'

const CLOUDINARY_UPLOAD_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload'

const CLOUDINARY_DELETE_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/asset/destroy'

export const uploadCloudinaryImage = async (file) => {
    if (file?.size > MAX_PROFILE_SIZE || !file.type.startsWith('image')) {
        return {
            status: 400,
            message:
                "Maximum size of file is 3MB or type of file should be 'image'",
        }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    const res = await axios.post(CLOUDINARY_UPLOAD_REQUEST_URL, formData)

    return { status: res.status, data: res.data }
}

export const deleteCloudinaryImage = (signature, assetId) => {
    const formData = new FormData()

    formData.append('api_key', import.meta.env.VITE_API_KEY)
    formData.append('signature', signature)
    formData.append('asset_id', assetId)

    axios.post(CLOUDINARY_DELETE_REQUEST_URL, formData).then(console.log)
}

export const userLogin = async (username, password) => {
    if (!/^[\w]{4,20}$/.test(username)) {
        return {
            status: 400,
            reason: "username has 4 to 20 length of characters and doesn't contain special symbol.",
        }
    }

    if (!/^[\w!@#$%^&*()]{4,20}$/.test(password)) {
        return {
            status: 400,
            reason: "password has 4 to 20 length of characters and doesn't contain blank",
        }
    }
    try {
        const snapshot = await get(child(ref(db), `/users/${username}`))

        if (!snapshot.exists()) {
            return { status: 400, reason: 'invalid username' }
        }

        const data = snapshot.val()
        if (data.password !== password)
            return { status: 400, reason: "password doesn't match!" }
        return { status: 200, data }
    } catch (e) {
        console.log(e)
        return { status: 400, reason: 'error' }
    }
}

export const userSignup = async (
    username,
    nickname,
    password,
    confirmPassword,
) => {
    if (!/^[A-Za-z0-9_-]{4,20}$/.test(username)) {
        return {
            status: 400,
            reason: "username should have 4 to 20 characters, shouldn't contain blank(nbsp) and special symbols.",
        }
    }

    if (!/^[A-Za-z가-힣0-9]{2,20}$/.test(nickname)) {
        return {
            status: 400,
            reason: "nickname should have 2 to 20 characters, shouldn't contain blank(nbsp) and special symbols.",
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
            reason: "Password doesn't match confirm password correctly.\nPlease check your password again",
        }
    }

    try {
        const userRef = ref(db)
        const snapshot = await get(child(userRef, `/users/${username}`))

        if (snapshot.exists()) {
            return { status: 400, reason: 'username already exists.' }
        }

        await set(child(userRef, `/users/${username}`), {
            username,
            nickname,
            password,
            profile: {
                url: '',
                assetId: '',
                signature: '',
                publicId: '',
                style: {
                    scale: 1,
                    transX: 0,
                    transY: 0,
                    rounded: 50,
                    width: 120,
                    height: 120,
                },
            },
            cards: [],
        })

        return {
            status: 200,
            value: {
                username,
                nickname,
                profile: {
                    url: '',
                    assetId: '',
                    signature: '',
                    publicId: '',
                    style: {
                        scale: 1,
                        transX: 0,
                        transY: 0,
                        rounded: 50,
                        width: 120,
                        height: 120,
                    },
                },
                cards: [],
            },
        }
    } catch (e) {
        console.log(e)
        return { status: 400, reason: e }
    }
}
