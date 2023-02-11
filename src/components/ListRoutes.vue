<script setup lang="ts">
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";

const router = useRouter();

async function logoutHandler() {
	logout();
	await router.push({ name: "login" });
}
</script>

<template>
	<v-list>
		<v-list-item
			prepend-icon="mdi-account"
			title="Profilo"
			value="profile"
			to="/profile"
		/>
		<v-list-item
			prepend-icon="mdi-home-city"
			title="Panoramica"
			value="home"
			to="/overview"
		/>
		<v-list-item
			prepend-icon="mdi-marker"
			title="Voti"
			value="grades"
			to="/grades"
		/>
		<v-list-item
			prepend-icon="mdi-book-alert"
			title="Compiti"
			value="homework"
			to="/homework"
		/>
		<v-list-item
			prepend-icon="mdi-bell-alert"
			title="Comunicazioni"
			value="documents"
			to="/documents"
		/>
		<v-list-item
			prepend-icon="mdi-account-off"
			title="Eventi"
			value="events"
			to="/events"
		/>
		<v-list-item
			prepend-icon="mdi-account-off"
			title="Assenze"
			value="absences"
			to="/absences"
		/>
		<v-list-item
			prepend-icon="mdi-folder-multiple"
			title="Argomenti Lezione"
			value="lessons"
			to="/lessons"
		/>
		<v-list-item
			prepend-icon="mdi-alert"
			title="Sanzioni Disciplinari"
			value="notes"
			to="/notes"
		/>
		<v-list-item
			prepend-icon="mdi-logout"
			title="Logout"
			value="logout"
			@click="logoutHandler"
		/>
	</v-list>
</template>

<style scoped></style>
