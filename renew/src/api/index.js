import axios from 'axios'
import { MAX_PROFILE_SIZE } from '../constants'
import { db } from '../service/firebase'
import { ref, set, get, child, remove } from 'firebase/database'

const CLOUDINARY_UPLOAD_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/image/upload'

const CLOUDINARY_DELETE_REQUEST_URL =
    'https://api.cloudinary.com/v1_1/dfvqmpyji/asset/destroy'

export const uploadCloudinaryImage = async (file) => {
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
        data.cards = data.cards ? Object.values(data.cards) : []

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
            cards: {},
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
                cards: {},
            },
        }
    } catch (e) {
        console.log(e)
        return { status: 400, reason: e }
    }
}

export const setCard = async (username, card) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${card.id}`)
        await set(cardRef, card)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setCardName = async (username, cardId, value) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${cardId}/name`)
        await set(cardRef, value)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setCardDescription = async (username, cardId, value) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${cardId}/description`)
        await set(cardRef, value)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setCardTheme = async (username, cardId, value) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${cardId}/theme`)
        await set(cardRef, value)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setCardProfile = async (username, cardId, value) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${cardId}/profile`)
        await set(cardRef, value)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setCardProfileStyle = async (username, cardId, value) => {
    console.log(username, cardId, value)
    try {
        const cardRef = ref(
            db,
            `users/${username}/cards/${cardId}/profile/style`,
        )
        await set(cardRef, value)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const removeCard = async (username, cardId) => {
    try {
        const cardRef = ref(db, `users/${username}/cards/${cardId}`)
        remove(cardRef)

        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const getUser = async (username) => {
    const userRef = ref(`users/${username}`)
    const user = await get(db, userRef)
    if (!user.exists()) {
        return {
            status: 400,
            reason: "user doesn't exist!",
        }
    }
    return {
        status: 200,
        data: user,
    }
}

export const setUserProfile = async (username, profile) => {
    const userProfileRef = ref(db, `users/${username}/profile`)
    try {
        await set(userProfileRef, profile)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}

export const setUserProfileStyle = async (username, style) => {
    const userProfileStyleRef = ref(db, `users/${username}/profile/style`)
    try {
        await set(userProfileStyleRef, style)
        return {
            status: 200,
        }
    } catch (e) {
        return {
            status: 400,
            reason: e,
        }
    }
}
