<script setup>
	import { computed, ref } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';

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
				v-model="ticketsStore.filter.start"
				class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
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
				v-model="ticketsStore.filter.destination"
				class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
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
				v-model="ticketsStore.dateFilter"
				class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
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
				v-model="ticketsStore.filter.availability"
				class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
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
				v-model="sortType"
				class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
				<option value="price-asc">قیمت ارزان به گران</option>
				<option value="price-desc">قیمت گران به ارزان</option>
			</select>
		</div>
		<div>
			<button
				@click="openCartModal"
				class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
				سبد خرید ({{ ticketsStore.cart.length }})
			</button>
		</div>
	</div>
</template>
