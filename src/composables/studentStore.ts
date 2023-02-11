import { useStudentInfoStore } from "@/stores/studentInfo";
import { ref } from "vue";

export function subscribeTo(property: string) {
	const studentInfo = useStudentInfoStore();
	// @ts-ignore
	const result = ref(studentInfo[property]);

	studentInfo.$subscribe((_, state) => {
		// @ts-ignore
		result.value = state[property];
	});

	return result;
}
