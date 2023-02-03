import ClasseVivaAPI from '@/services/ClasseVivaAPI'
import { defineStore } from 'pinia'

interface API
{
  isLoggedIn: boolean
  devToken: string | null
  userToken: string | null
}

export const useAPIStore = defineStore('api', {
  state: () => ({
    api: new ClasseVivaAPI()
  }),
  actions: {

  }
})
