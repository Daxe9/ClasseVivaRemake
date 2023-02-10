<script setup lang="ts">
import { useStudentInfoStore } from "@/stores/studentInfo";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const studentInfo = useStudentInfoStore();
const router = useRouter();

onMounted(async () => {
	try {
		const result = await studentInfo.getGrades();
		console.log(result);
	} catch (error: any) {
		if (import.meta.env.DEV) {
			console.error(error);
		}
		await router.push("/error");
	}
});
</script>

<template>
	<div>
		<h1>Grades</h1>
	</div>
</template>

<style scoped></style>
