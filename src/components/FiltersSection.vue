<script setup>
	import { computed, ref, watch } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';
	import { useRoute, useRouter } from 'vue-router';
	import { defineEmits, defineProps } from 'vue';

	const emit = defineEmits(['update:filteredResults']);

	const ticketsStore = useTicketsStore();

	const openCartModal = () => {
		ticketsStore.openCartModal();
	};

	const uniqueStarts = computed(() => {
		return [...new Set(ticketsStore.results.map((ticket) => ticket.start))];
	});

	const uniqueDestinations = computed(() => {
		return [
			...new Set(ticketsStore.results.map((ticket) => ticket.destination)),
		];
	});

	const uniqueDates = computed(() => {
		return [...new Set(ticketsStore.results.map((ticket) => ticket.date))];
	});

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

	const getAvailability = (id) => {
		const ticket = availability.value.find((item) => item.id === id);
		return ticket ? ticket.available : false;
	};

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

	// Watch filteredResults and emit the update when it changes
	watch(filteredResults, (newValue) => {
		emit('update:filteredResults', newValue);
	});
	emit('update:filteredResults', filteredResults.value);

	const router = useRouter();
	const updateFilters = () => {
		const query = {};
		if (filter.value.start) query.start = filter.value.start;
		if (filter.value.destination) query.destination = filter.value.destination;
		if (filter.value.dateFilter) query.date = filter.value.dateFilter;
		if (filter.value.availability)
			query.availability = filter.value.availability;
		if (filter.value.sortType === 'price-desc')
			query.sortType = filter.value.sortType;

		router.push({ query });
	};
</script>

<template>
	<div class="flex space-x-4 mb-4 justify-between items-center">
		<div>
			<label
				for="start"
				class="block mb-2"
				>مبدا:</label
			>
			<select
				id="start"
				v-model="filter.start"
				@change="updateFilters"
				class="block border border-gray-300 rounded px-4 py-2 w-32 focus:outline-none focus:border-blue-500">
				<option value="">همه</option>
				<option
					v-for="option in uniqueStarts"
					:key="option"
					:value="option">
					{{ option }}
				</option>
			</select>
		</div>
		<div>
			<label
				for="destination"
				class="block mb-2"
				>مقصد:</label
			>
			<select
				id="destination"
				v-model="filter.destination"
				@change="updateFilters"
				class="block border border-gray-300 rounded px-4 py-2 w-32 focus:outline-none focus:border-blue-500">
				<option value="">همه</option>
				<option
					v-for="option in uniqueDestinations"
					:key="option"
					:value="option">
					{{ option }}
				</option>
			</select>
		</div>
		<div>
			<label
				for="date"
				class="block mb-2"
				>تاریخ:</label
			>
			<select
				id="date"
				v-model="filter.dateFilter"
				@change="updateFilters"
				class="block border border-gray-300 rounded px-4 py-2 w-32 focus:outline-none focus:border-blue-500">
				<option value="">همه</option>
				<option
					v-for="option in uniqueDates"
					:key="option"
					:value="option">
					{{ option }}
				</option>
			</select>
		</div>
		<div>
			<label
				for="availability"
				class="block mb-2"
				>موجود :</label
			>
			<select
				id="availability"
				v-model="filter.availability"
				@change="updateFilters"
				class="block border border-gray-300 rounded px-4 py-2 w-32 focus:outline-none focus:border-blue-500">
				<option value="">همه</option>
				<option value="true">بله</option>
				<option value="false">خیر</option>
			</select>
		</div>
		<div>
			<label
				for="sort"
				class="block mb-2"
				>مرتب‌سازی:</label
			>
			<select
				id="sort"
				v-model="filter.sortType"
				@change="updateFilters"
				class="block border border-gray-300 rounded px-4 py-2 w-44 focus:outline-none focus:border-blue-500">
				<option value="price-asc">قیمت ارزان به گران</option>
				<option value="price-desc">قیمت گران به ارزان</option>
			</select>
		</div>

		<button
			@click="openCartModal"
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
			سبد خرید ({{ ticketsStore.cart.length }})
		</button>
	</div>
</template>
