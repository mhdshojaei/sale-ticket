import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTicketAvailabilityStore = defineStore(
	'TicketAvailability',
	() => {
		const availability = ref([
			{ id: 1, available: true },
			{ id: 2, available: true },
			{ id: 3, available: false },
			{ id: 4, available: true },
			{ id: 5, available: false },
			{ id: 6, available: false },
		]);

		const getAvailability = (id) => {
			const ticket = availability.value.find((item) => item.id === id);
			return ticket ? ticket.available : false;
		};

		return {
			availability,
			getAvailability,
		};
	},
);
