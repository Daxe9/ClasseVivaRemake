<script setup lang="ts">
import { subscribeTo } from "@/composables/studentStore";

const absences = subscribeTo("absences");
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
