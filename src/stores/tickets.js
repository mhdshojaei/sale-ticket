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
					duration: '1:00',
					company_img: './TK2.png',
					company_name: 'AnadoluJet',
					luggage: 0,
					ticket_type: ['سیستمی', 'اکونومی'],
					departure: '5:30',
					arrival: '6:30',
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
					duration: '1:30',
					company_img: './TK2.png',
					company_name: 'Mahan Airlines',
					luggage: 30,
					ticket_type: ['سیستمی', 'پرمیوم'],
					departure: '5:30',
					arrival: '7:00',
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
					duration: '2:30',
					company_img: './TK2.png',
					company_name: 'Iran Airlines',
					luggage: 10,
					ticket_type: ['سیستمی', 'اکونومی', 'چارتری'],
					departure: '5:30',
					arrival: '8:00',
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
					duration: '0:05',
					company_img: './TK2.png',
					company_name: 'Gheshm Airlines',
					luggage: 310,
					ticket_type: ['سیستمی', 'پرمیوم فرست'],
					departure: '5:30',
					arrival: '5:35',
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
					duration: '3:00',
					company_img: './TK2.png',
					company_name: 'Emirates Airlines',
					luggage: 0,
					ticket_type: ['اکونومی'],
					departure: '5:30',
					arrival: '8:30',
				},
				{
					id: 6,
					ticket_number: 68902,
					start: 'تهران',
					destination: 'تبریز',
					date: '2024-05-13',
					available_seats: 0,
					is_available: false,
					price: 0,
					duration: '6:00',
					company_img: './TK2.png',
					company_name: 'American Airlines',
					luggage: 25,
					ticket_type: ['هلیکوپتر رییسی'],
					departure: '5:30',
					arrival: '11:30',
				},
			]),
			cart: ref([]),
			showCartModal: ref(false),
			showPassengerModal: ref(false),
			selectedTicket: ref(null),
			showReserveModal: ref(false),
			passengers: ref([{ name: '', natinalId: '' }]),
		};
	},

	actions: {
		addToCart(ticket) {
			const itemIndex = this.cart.findIndex((item) => item.id == ticket.id);

			if (itemIndex !== -1) {
				this.cart[itemIndex].passengers = this.passengers;
			} else {
				this.cart.push(ticket);
			}
		},
		removeFromCart(index) {
			this.cart.splice(index, 1);
		},
		editCart(result) {
			this.closeCartModal();
			this.passengers = this.cart.find(
				(item) => item.id == result.id,
			).passengers;

			this.openReserveModal(result);
		},
		maxPrice() {
			return Math.max(...results.value.map((ticket) => ticket.price));
		},
		minPrice() {
			return Math.min(...results.value.map((ticket) => ticket.price));
		},

		openCartModal() {
			console.table(this.cart);
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
			this.passengers = [{ name: '', natinalId: '' }];
			this.showReserveModal = false;
		},
		reserveTicket() {
			this.addToCart({
				...this.selectedTicket,
				passengers: this.passengers,
			});

			this.closeReserveModal();
		},
		pay() {
			this.closeCartModal();
			this.cart.forEach((cartItem) => {
				let indexOf = this.results.findIndex((t) => t.id === cartItem.id);
				let numPassengers = cartItem.passengers.length;
				this.results[indexOf].available_seats -= numPassengers;
			});
			this.cart = [];
		},
	},
});
