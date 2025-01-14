import { db } from '../service/firebase'
import { ref, set, get } from 'firebase/database'

export const userClient = {
    get: async (username) => {
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
    },

    create: async (username, nickname, password, confirmPassword) => {
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
            const userRef = ref(db, `/users/${username}`)
            const snapshot = await get(userRef)

            if (snapshot.exists()) {
                return { status: 400, reason: 'username already exists.' }
            }

            await set(userRef, {
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
            // console.log(e)
            return { status: 400, reason: e }
        }
    },

    updateProfile: async (username, profile) => {
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
    },

    updateProfileStyle: async (username, style) => {
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
    },
}
