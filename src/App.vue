<script lang="ts" setup>
import router from './router/index'

</script>

<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar title="ClasseViva Remake"/>
        <v-navigation-drawer expand-on-hover rail permanent>
          <v-list>
            <v-list-item prepend-icon="mdi-account" title="Profilo" value="profile" @click="router.push('/profile')"/>
            <v-list-item prepend-icon="mdi-home-city" title="Panoramica" value="home" @click="router.push('/')"/>
            <v-list-item prepend-icon="mdi-marker" title="Voti" value="grades" @click="router.push('/grades')"/>
            <v-list-item prepend-icon="mdi-book-alert" title="Compiti" value="homework" @click="router.push('/homework')"/>
            <v-list-item prepend-icon="mdi-bell-alert" title="Comunicazioni" value="documents" @click="router.push('/documents')"/>
            <v-list-item prepend-icon="mdi-account-off" title="Assenze" value="events" @click="router.push('/events')"/>
            <v-list-item prepend-icon="mdi-folder-multiple" title="Argomenti Lezione" value="lessons" @click="router.push('/lessons')"/>
            <v-list-item prepend-icon="mdi-alert" title="Sanzioni Disciplinari" value="notes" @click="router.push('/notes')"/>
          </v-list>
        </v-navigation-drawer>
        <v-main style="min-height: 100vh;">
          <router-view>
          </router-view>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<style scoped>

</style>