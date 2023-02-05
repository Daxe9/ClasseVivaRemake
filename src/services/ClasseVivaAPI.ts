import { useSessionStore } from '../stores/session'
import axios from 'axios'

export default class ClasseVivaAPI {

    apiUrl = 'https://web.spaggiari.eu/rest/v1'
    devApiKey = '+zorro+'
    sessionStore = useSessionStore()

    constructor() {
        axios.defaults.baseURL = this.apiUrl
    }

    async getProfile() {

    }

    getFinalGrades() {

    }

    getDocuments() {

    }

    getNotes() {

    }

    getLessons() {

    }

    getHomework() {

    }

    getGrades() {

    }

    getAbsences() {

    }

    async login(username: String, password: String) {
        const loginResult = await axios.post(`/auth/login`,
        {
            ident: username,
            pass: password,
            uid: username
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Z-Dev-Apikey': this.devApiKey,
                'User-Agent': 'zorro/1.0'
            }
        })
        // const loginResult = await (await fetch(`${this.apiUrl}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'User-Agent': 'CVVS/std/4.2.2 Android/11',
        //         'Content-Type': 'application/json',
        //         'z-dev-apikey': this.devApiKey,
        //     },
        //     body: JSON.stringify({
        //         ident: username,
        //         pass: password,
        //         uid: username
        //     })
        // })).json()

        console.log(loginResult)
    }

    logout() {
        this.sessionStore.logout()
    }
}