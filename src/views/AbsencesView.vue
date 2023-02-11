<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStudentInfoStore } from "../stores/studentInfo";
import { useRouter } from "vue-router";

const studentInfo = useStudentInfoStore();
const router = useRouter();
const absences = ref(studentInfo.absences);


</script>

<template>
	<div>
		<pre>
            <code>
                {{ absences ?? "No data"}}
            </code>
        </pre>
	</div>
</template>

<style scoped></style>
