<script setup lang="ts">
import { useStudentInfoStore } from "@/stores/studentInfo";
import GradesOverview from "@/components/GradesOverview.vue";

const studentInfo = useStudentInfoStore();
</script>

<template>
	<div>
		<GradesOverview />
	</div>
</template>

<style scoped></style>
