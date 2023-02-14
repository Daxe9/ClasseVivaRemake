<!-- TODO: CHECK WHETHER SESSION IS EXPIRED EVERYTIME SOME TYPE OF ACTION IS CALLED -->
<script lang="ts" setup>
import { relogin } from "./services/auth";
relogin();
</script>

<template>
	<router-view></router-view>
</template>

<style scoped>
/* TODO: ADD MINIMUM WIDTH */
</style>
