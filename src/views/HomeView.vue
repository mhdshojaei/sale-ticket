<script setup>
	import { useTicketsStore } from '@/stores/tickets';
	import { ref, computed } from 'vue';
	import FiltersSection from '@/components/FiltersSection.vue';
	import TicketList from '@/components/TicketList.vue';
	import CartModal from '@/components/CartModal.vue';
	import ReserveModal from '@/components/ReserveModal.vue';

	const filteredResults = ref([]);

	const handleFilteredResults = (newFilteredResults) => {
		filteredResults.value = newFilteredResults;
	};
</script>

<template>
	<div class="block max-w-screen-xl m-auto">
		<h1 class="text-2xl font-bold my-10 text-center">لیست بلیط‌ها</h1>
		<FiltersSection @update:filteredResults="handleFilteredResults" />
		<TicketList :results="filteredResults" />
		<CartModal />
		<ReserveModal />
	</div>
</template>
