<script setup>
	import { ref } from 'vue';

	import { useRoute, useRouter } from 'vue-router';
	import { defineEmits, defineProps } from 'vue';

	const { filter } = defineProps(['filter']);
	const emit = defineEmits(['update:filteredResults']);

	const filters = ref({
		start: filter.start,
		destination: filter.destination,
		availability: filter.availability,
		dateFilter: filter.dateFilter,
		sortType: filter.sortType,
	});

	const router = useRouter();
	const updateFilters = () => {
		const query = {};
		query.start = filter.start;
		query.destination = filter.destination;
		query.date = filter.dateFilter;
		query.availability = filters.value.availability;
		query.sortType = filters.value.sortType;
		emit('update:filteredResults', filters.value);
		router.push({ query });
		console.log(query);
	};
</script>

<template>
	<div
		class="mb-4 justify-between items-center bg-white rounded-lg shadow-lg p-4">
		<div class="border-b mt-4 pb-4">
			<h2 class="font-bold text-xl">فیلترها</h2>
		</div>
		<div class="py-6 flex flex-col gap-3 space-y-4">
			<div class="flex items-center border p-2 rounded-lg">
				<span
					for="availability"
					class="block"
					>موجود
				</span>

				<select
					id="availability"
					v-model="filters.availability"
					@change="updateFilters"
					class="border-r border-gray-300 mr-3 pr-3 w-full focus:outline-none">
					<option value="">همه</option>
					<option value="true">بله</option>
					<option value="false">خیر</option>
				</select>
			</div>
			<div class="flex items-center border p-2 rounded-lg">
				<span
					for="availability"
					class="block"
					>مرتب‌سازی
				</span>

				<select
					id="sort"
					v-model="filter.sortType"
					@change="updateFilters"
					class="border-r border-gray-300 mr-3 pr-3 w-full focus:outline-none">
					<option value="price-asc">قیمت ارزان به گران</option>
					<option value="price-desc">قیمت گران به ارزان</option>
				</select>
			</div>
		</div>
	</div>
</template>
