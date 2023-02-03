import { useSessionStore } from '../stores/session'

export default class ClasseVivaAPI {
    
    sessionStore = useSessionStore()

    constructor()
    {

    }

    getFinalGrades()
    {

    }

    getDocuments()
    {

    }

    getNotes()
    {

    }

    getLessons()
    {

    }

    getHomework()
    {

    }

    getGrades()
    {

    }

    getAbsences()
    {

    }

    login()
    {

    }

    logout()
    {
        this.sessionStore.logout()
    }
}