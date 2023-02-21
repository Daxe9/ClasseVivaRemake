<script setup lang="ts">
import AverageGrade from './AverageGrade.vue';
import { subscribeTo } from '@/composables/studentStore';

const grades = subscribeTo('grades');


setTimeout(() => {

console.log(JSON.parse(JSON.stringify(grades.value.grades)))
}, 1000)
</script>

<template>
        <v-container v-if="grades">
            <AverageGrade :grades="grades.grades"/>
            <v-card
                v-for="grade, i in grades.grades"
                :key="i"
            >{{  grade   }}</v-card>
        </v-container>
</template>
