<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStudentInfoStore } from "../stores/studentInfo";
import { getRequest } from "../services/corsProxyService";
import { useRouter } from "vue-router";

const studentInfo = useStudentInfoStore();
const router = useRouter();
const result = ref();

onMounted(async () => {
	await getAbsences();
});

async function getAbsences() {
	try {
		result.value = await getRequest(
			`/students/${studentInfo.studentId}/absences/details`,
			{
				"z-auth-token": studentInfo.token
			}
		);
	} catch (error: any) {
		if (import.meta.env.DEV) {
			console.error(error);
		}
		await router.push("/error");
	}
}
</script>

<template>
	<div @click="getAbsences">Click me</div>
	<div>
		<pre>
            <code>
                {{ result ? result.body : "No data"}}
            </code>
        </pre>
	</div>
</template>

<style scoped></style>
