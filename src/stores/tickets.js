// tickets.js
import { reactive } from 'vue';

const state = reactive({
	results: [
		{
			id: 1,
			ticket_number: 23212,
			start: 'تهران',
			destination: 'اصفهان',
			date: '2024-05-12',
			available_seats: 9,
			is_available: true,
			price: 200000,
		},
		{
			id: 2,
			ticket_number: 72632,
			start: 'مشهد',
			destination: 'تهران',
			date: '2024-05-13',
			available_seats: 2,
			is_available: true,
			price: 180000,
		},
		{
			id: 3,
			ticket_number: 53728,
			start: 'اصفهان',
			destination: 'شیراز',
			date: '2024-05-12',
			available_seats: 0,
			is_available: false,
			price: 150000,
		},
		{
			id: 4,
			ticket_number: 92738,
			start: 'رشت',
			destination: 'تهران',
			date: '2024-05-12',
			available_seats: 22,
			is_available: true,
			price: 250000,
		},
		{
			id: 5,
			ticket_number: 73097,
			start: 'اصفهان',
			destination: 'مشهد',
			date: '2024-05-12',
			available_seats: 0,
			is_available: false,
			price: 220000,
		},
		{
			id: 6,
			ticket_number: 68902,
			start: 'اصفهان',
			destination: 'بندرعباس',
			date: '2024-05-13',
			available_seats: 0,
			is_available: false,
			price: 180000,
		},
	],
	cartItems: [],
});

export const useTicketsStore = () => ({
	results: state.results,
	maxPrice: Math.max(...state.results.map((item) => item.price)),
	minPrice: Math.min(...state.results.map((item) => item.price)),
	cartItems: state.cartItems,
	totalPrice: state.cartItems.reduce((total, item) => total + item.price, 0),
	addToCart(itemId) {
		const itemToAdd = state.results.find((item) => item.id === itemId);
		if (itemToAdd) {
			state.cartItems.push(itemToAdd);
		}
	},
	removeFromCart(itemId) {
		const indexToRemove = state.cartItems.findIndex(
			(item) => item.id === itemId,
		);
		if (indexToRemove !== -1) {
			state.cartItems.splice(indexToRemove, 1);
		}
	},
});
