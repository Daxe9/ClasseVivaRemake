<script lang="ts" setup>
import type { RawGrade } from "@/types/studentInfoTypes";

defineProps<{
	grades: RawGrade[] | null
}>();

function averageGrade(grades: RawGrade[] | null): number | string {
	if (grades) {
		if (grades.length === 0) return 0;
		const sum = grades.reduce((acc, curr) => acc + curr.decimalValue, 0);
		return (sum / grades.length).toFixed(2)
	}
	return 0;
}
</script>

<template>
	<v-container>Bravo! {{ averageGrade(grades) }} </v-container>
</template>

<style scoped></style>
