import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTicketsStore = defineStore('tickets', () => {
	const results = ref([
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
	]);

	const cart = ref([]);

	const addToCart = (ticket) => {
		cart.value.push(ticket);
	};

	const removeFromCart = (ticketId) => {
		cart.value = cart.value.filter((item) => item.id !== ticketId);
	};

	const maxPrice = computed(() => {
		return Math.max(...results.value.map((ticket) => ticket.price));
	});

	const minPrice = computed(() => {
		return Math.min(...results.value.map((ticket) => ticket.price));
	});

	const cartItems = computed(() => {
		return cart.value;
	});

	const totalPrice = computed(() => {
		return cart.value.reduce(
			(sum, item) => sum + item.price * item.passengers.length,
			0,
		);
	});

	return {
		results,
		cart,
		addToCart,
		removeFromCart,
		maxPrice,
		minPrice,
		cartItems,
		totalPrice,
	};
});
