<template>
	<div class="p-4">
		<h1 class="text-2xl font-bold mb-4 text-right">لیست بلیط‌ها</h1>
		<FiltersSection />
		<TicketList :results="ticketsStore.filteredResults" />

		<CartModal />
		<ReserveModal />
	</div>
</template>

<script setup>
	import { useTicketsStore } from '@/stores/tickets';

	import CartModal from '@/components/CartModal.vue';
	import ReserveModal from '@/components/ReserveModal.vue';
	import TicketList from '@/components/TicketList.vue';
	import FiltersSection from '@/components/FiltersSection.vue';

	const ticketsStore = useTicketsStore();
</script>
