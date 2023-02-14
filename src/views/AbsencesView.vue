<script setup lang="ts">
import { subscribeTo } from "@/composables/studentStore";

const absences = subscribeTo("absences");

function processAbsenceCode(code: string) {
    // TODO: process the code

    // ABR0 = ritardo
    // ABA0 = assenza
    let result: string;

    switch (code) {
        case "ABR0":
            result = "Ritardo";
            break;
        case "ABA0":
            result = "Assenza";
            break;
        default:
            result = "Altro";
            break;
    }
    return result;
}
</script>

<template>
	<h1 class="title">Absences</h1>
	<v-item-group v-if="absences">
		<v-container>
			<v-row>
				<v-col
					v-for="(absence, index) in absences.events"
					:key="index"
					cols="12"
					md="4"
				>
					<v-item v-slot="{ active, toggle }">
						<v-card
							:color="active ? 'primary' : ''"
							class=""
							dark
							height="125"
							@click="toggle"
						>
							<v-card-title>
								Giorno {{ absence.evtDate }}
							</v-card-title>
							<v-card-subtitle>
								{{
									absence.isJustified
										? "Giustificata"
										: "Non giustificata"
								}}
							</v-card-subtitle>
                            <v-card-text>
                                {{ processAbsenceCode(absence.evtCode)}}
                            </v-card-text>
						</v-card>
					</v-item>
				</v-col>
			</v-row>
		</v-container>
	</v-item-group>
</template>

<style scoped>
.title {
	text-align: center;
}
</style>
