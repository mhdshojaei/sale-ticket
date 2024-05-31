<script setup>
	const { results } = defineProps(['results']);
	import Ticket from '@/components/Ticket.vue';
	import { computed, ref, watch } from 'vue';
	import FiltersSection from './FiltersSection.vue';
	import SidebarFilter from './SidebarFilter.vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useTicketsStore } from '@/stores/tickets';
	const route = useRoute();
	const ticketsStore = useTicketsStore();
	const openCartModal = () => {
		ticketsStore.openCartModal();
	};
	const filter = ref({
		start: route.query.start || '',
		destination: route.query.destination || '',
		availability: route.query.availability || '',
		dateFilter: route.query.date || '',
		sortType: route.query.sortType || 'price-asc',
	});

	const filteredResults = ref([]);

	const handleFilteredResults = (newFilteredResults) => {
		let filtered = ticketsStore.results;

		filter.value = newFilteredResults;

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

		filteredResults.value = filtered;
	};
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

	if (route.query) {
		handleFilteredResults(filter.value);
	}
</script>
<template>
	<div class="flex justify-between items-center">
		<div></div>
		<h1 class="text-2xl font-bold my-10 text-center">لیست بلیط‌ها</h1>
		<div>
			<button
				@click="openCartModal"
				class="bg-gray-500 h-10 w-10 rounded-full text-white grid place-items-center hover:bg-blue-600 cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
				</svg>
			</button>
		</div>
	</div>
	<FiltersSection
		@update:filteredResults="handleFilteredResults"
		:filter="filter" />
	<div class="flex gap-4 flex-col md:flex-row">
		<div class="basis-full md:basis-1/4">
			<SidebarFilter
				@update:filteredResults="handleFilteredResults"
				:filter="filter" />
		</div>
		<div
			v-if="filteredResults.length != 0"
			class="basis-3/4">
			<Ticket
				v-for="result in filteredResults"
				:key="result.id"
				:result="result" />
		</div>
		<div
			v-else
			class="text-red-500">
			پروازی در تاریخ انتخابی شما یافت نشد.
		</div>
	</div>
</template>
