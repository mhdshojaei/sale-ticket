import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTicketsStore = defineStore('tickets', {
	state() {
		return {
			results: ref([
				{
					id: 1,
					ticket_number: 23212,
					start: 'تهران',
					destination: 'اصفهان',
					date: '2024-05-12',
					available_seats: 9,
					is_available: true,
					price: 60000,
				},
				{
					id: 2,
					ticket_number: 72632,
					start: 'مشهد',
					destination: 'تهران',
					date: '2024-05-13',
					available_seats: 2,
					is_available: true,
					price: 120000,
				},
				{
					id: 3,
					ticket_number: 53728,
					start: 'اصفهان',
					destination: 'شیراز',
					date: '2024-05-12',
					available_seats: 0,
					is_available: false,
					price: 45000,
				},
				{
					id: 4,
					ticket_number: 92738,
					start: 'رشت',
					destination: 'تهران',
					date: '2024-05-12',
					available_seats: 22,
					is_available: true,
					price: 3000,
				},
				{
					id: 5,
					ticket_number: 73097,
					start: 'اصفهان',
					destination: 'مشهد',
					date: '2024-05-12',
					available_seats: 0,
					is_available: false,
					price: 24000,
				},
				{
					id: 6,
					ticket_number: 68902,
					start: 'اصفهان',
					destination: 'بندرعباس',
					date: '2024-05-13',
					available_seats: 0,
					is_available: false,
					price: 50000,
				},
			]),
			cart: ref([]),
			showCartModal: ref(false),
			showPassengerModal: ref(false),
			selectedTicket: ref(null),
			showReserveModal: ref(false),
		};
	},

	actions: {
		addToCart(ticket) {
			this.cart.push(ticket);
		},
		removeFromCart(index) {
			this.cart.splice(index, 1);
		},
		maxPrice() {
			return Math.max(...results.value.map((ticket) => ticket.price));
		},
		minPrice() {
			return Math.min(...results.value.map((ticket) => ticket.price));
		},

		openCartModal() {
			this.showCartModal = true;
		},
		closeCartModal() {
			this.showCartModal = false;
		},
		openReserveModal(ticket) {
			this.selectedTicket = ticket;
			this.showReserveModal = true;
		},
		closeReserveModal() {
			this.showReserveModal = false;
		},
		reserveTicket(passengers) {
			this.addToCart({
				...this.selectedTicket,
				passengers: passengers,
			});

			this.closeReserveModal();
		},
	},
});
