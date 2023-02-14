<script setup lang="ts">
import { useStudentInfoStore } from "@/stores/studentInfo";
import ListRoutes from "@/components/ListRoutes.vue";
import { ref } from "vue";

const studentInfo = useStudentInfoStore();
const isLogged = ref<boolean>(!!studentInfo.token);
const fullName = ref<string>(studentInfo.fullName);

studentInfo.$subscribe((_, state) => {
	isLogged.value = !!state.token;
	fullName.value = state.firstName + " " + state.lastName;
});
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
					/>
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
	margin-right: 1rem;
}
</style>
