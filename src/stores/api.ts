import ClasseVivaAPI from '@/services/ClasseVivaAPI'
import { defineStore } from 'pinia'

interface API
{

}

export const useAPIStore = defineStore('api', {
  state: () => ({
    api: new ClasseVivaAPI()
  }),
  actions: {

  }
})
