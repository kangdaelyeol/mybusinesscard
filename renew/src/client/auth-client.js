import { db } from '../service/firebase'
import { ref, set, get, child } from 'firebase/database'

export const authClient = {
    signIn: async (username, password) => {
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
    },


}