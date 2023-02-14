import { useStudentInfoStore } from "@/stores/studentInfo";
import { ref } from "vue";

const studentInfo = useStudentInfoStore();

// It takes an optional callback function to process the subscribed data
export function subscribeTo(property: string, callback?: (value: any) => any) {
	// @ts-ignore
	const result = ref(studentInfo[property]);

	studentInfo.$subscribe((_, state) => {
		if (callback) {
			// @ts-ignore
			result.value = callback(state[property]);
		} else {
			// @ts-ignore
			result.value = state[property];
		}
	});

	return result;
}
