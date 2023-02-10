<!-- TODO: CHECK WHETHER SESSION IS EXPIRED EVERYTIME SOME TYPE OF ACTION IS CALLED -->

<script lang="ts" setup>
import { useStudentInfoStore } from "./stores/studentInfo";
import ListRoutes from "./components/ListRoutes.vue";
import { ref } from "vue";
import { getLocalStorage, type CachedStudentInfo } from "@/services/storages";

const studentInfo = useStudentInfoStore();
const isLogged = ref<boolean>(!!studentInfo.token ?? false);
const fullName = ref<string>(studentInfo.fullName ?? "");
const cachedStudentInfo: CachedStudentInfo | null = getLocalStorage();

studentInfo.$subscribe((_, state) => {
	isLogged.value = !!state.token;
	fullName.value = state.firstName + " " + state.lastName;
});

// check whether there's a cached student info
if (cachedStudentInfo) {
	studentInfo.$patch({
		ident: cachedStudentInfo.ident,
		token: cachedStudentInfo.token,
		firstName: cachedStudentInfo.firstName,
		lastName: cachedStudentInfo.lastName,
		studentId: cachedStudentInfo.ident.substring(
			1,
			cachedStudentInfo.ident.length - 1
		)
	});
}
</script>

<template>
	<v-app>
		<v-card>
			<v-layout>
				<v-app-bar>
					<v-app-bar-title>ClasseViva Remake</v-app-bar-title>
					<v-spacer />
					<v-avatar
						v-if="isLogged"
						icon="mdi-checkbox-marked-circle"
					></v-avatar>
					<h3 class="logged-fullname">{{ fullName }}</h3>
				</v-app-bar>
				<v-navigation-drawer expand-on-hover rail permanent>
					<ListRoutes />
				</v-navigation-drawer>
				<v-main style="min-height: 100vh">
					<router-view> </router-view>
				</v-main>
			</v-layout>
		</v-card>
	</v-app>
</template>

<style scoped>
.logged-fullname {
	margin-right: 1.5em;
}
</style>
