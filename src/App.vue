<script lang="ts" setup>
</script>

<template>
	<v-app>
		<v-card>
			<v-layout>
				<v-app-bar title="ClasseViva Remake" />
				<v-navigation-drawer expand-on-hover rail permanent>
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
                            to="/"
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
							title="Assenze"
							value="events"
                            to="/events"
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
					</v-list>
				</v-navigation-drawer>
				<v-main style="min-height: 100vh">
					<router-view> </router-view>
				</v-main>
			</v-layout>
		</v-card>
	</v-app>
</template>

<style scoped></style>
