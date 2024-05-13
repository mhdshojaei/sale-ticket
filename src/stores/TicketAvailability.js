// TicketAvailability.js
import { reactive } from 'vue';

const state = reactive({
	tickets: [
		{
			id: 1,
			ticket_number: 23212,
			is_available: true,
		},
		{
			id: 2,
			ticket_number: 72632,
			is_available: true,
		},
		{
			id: 3,
			ticket_number: 53728,
			is_available: false,
		},
		{
			id: 4,
			ticket_number: 92738,
			is_available: true,
		},
		{
			id: 5,
			ticket_number: 73097,
			is_available: false,
		},
		{
			id: 6,
			ticket_number: 68902,
			is_available: false,
		},
	],
});

export const useTicketAvailabilityStore = () => ({
	getAvailability(ticketId) {
		const ticket = state.tickets.find((t) => t.id === ticketId);
		return ticket ? ticket.is_available : false;
	},
});
