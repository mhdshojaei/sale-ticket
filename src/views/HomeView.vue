<script setup>
	import { useTicketsStore } from '@/stores/tickets';
	import { ref, computed } from 'vue';
	import FiltersSection from '@/components/FiltersSection.vue';
	import TicketList from '@/components/TicketList.vue';
	import CartModal from '@/components/CartModal.vue';
	import ReserveModal from '@/components/ReserveModal.vue';
	import { useRoute } from 'vue-router';

	const ticketsStore = useTicketsStore();
	const route = useRoute();

	const filter = ref({
		start: route.query.start || '',
		destination: route.query.destination || '',
		availability: route.query.availability || '',
		dateFilter: route.query.date || '',
		sortType: route.query.sortType || 'price-asc',
	});

	const availability = ref([
		{ id: 1, available: true },
		{ id: 2, available: true },
		{ id: 3, available: false },
		{ id: 4, available: true },
		{ id: 5, available: false },
		{ id: 6, available: false },
	]);

	const filteredResults = computed(() => {
		let filtered = ticketsStore.results;

		if (filter.value.start !== '') {
			filtered = filtered.filter((item) => item.start === filter.value.start);
		}

		if (filter.value.destination !== '') {
			filtered = filtered.filter(
				(item) => item.destination === filter.value.destination,
			);
		}

		if (filter.value.availability !== '') {
			filtered = filtered.filter(
				(item) =>
					getAvailability(item.id).toString() === filter.value.availability,
			);
		}

		if (filter.value.sortType === 'price-asc') {
			filtered.sort((a, b) => a.price - b.price);
		} else if (filter.value.sortType === 'price-desc') {
			filtered.sort((a, b) => b.price - a.price);
		}

		if (filter.value.dateFilter !== '') {
			filtered = filtered.filter(
				(item) => item.date === filter.value.dateFilter,
			);
		}

		return filtered;
	});

	const getAvailability = (id) => {
		const ticket = availability.value.find((item) => item.id === id);
		return ticket ? ticket.available : false;
	};
</script>

<template>
	<div class="p-4">
		<h1 class="text-2xl font-bold mb-4 text-right">لیست بلیط‌ها</h1>
		<FiltersSection :filter="filter" />
		<TicketList :results="filteredResults" />
		<CartModal />
		<ReserveModal />
	</div>
</template>
