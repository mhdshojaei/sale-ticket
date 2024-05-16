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
			filter: ref({
				start: '',
				destination: '',
				availability: '',
			}),
			dateFilter: ref(''),
			sortType: ref(''),
			availability: ref([
				{ id: 1, available: true },
				{ id: 2, available: true },
				{ id: 3, available: false },
				{ id: 4, available: true },
				{ id: 5, available: false },
				{ id: 6, available: false },
			]),
		};
	},
	getters: {
		filteredResults() {
			let filtered = this.results;

			if (this.filter.start !== '') {
				filtered = filtered.filter((item) => item.start === this.filter.start);
			}

			if (this.filter.destination !== '') {
				filtered = filtered.filter(
					(item) => item.destination === this.filter.destination,
				);
			}

			if (this.filter.availability !== '') {
				filtered = filtered.filter(
					(item) =>
						this.getAvailability(item.id).toString() ===
						this.filter.availability,
				);
			}

			if (this.dateFilter !== '') {
				filtered = filtered.filter((item) => item.date === this.dateFilter);
			}

			if (this.sortType === 'price-asc') {
				filtered.sort((a, b) => a.price - b.price);
			} else if (this.sortType === 'price-desc') {
				filtered.sort((a, b) => b.price - a.price);
			}

			return filtered;
		},
	},
	actions: {
		getAvailability(id) {
			const ticket = this.availability.find((item) => item.id === id);
			return ticket ? ticket.available : false;
		},
		addToCart(ticket) {
			this.cart.push(ticket);
		},
		removeFromCart(ticketId) {
			this.cart = this.cart.filter((item) => item.id !== ticketId);
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
