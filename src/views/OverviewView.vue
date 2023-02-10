<script setup lang="ts">
import { useStudentInfoStore } from "@/stores/studentInfo";

const studentInfo = useStudentInfoStore();
function f() {
	studentInfo.log();
}
</script>

<template>
	<div>
		<h1 @click="f">Overview</h1>
	</div>
</template>

<style scoped></style>
