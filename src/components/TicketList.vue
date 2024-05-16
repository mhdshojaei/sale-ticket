<script setup>
	const { results } = defineProps(['results']);
	import Ticket from '@/components/Ticket.vue';
</script>
<template>
	<div
		v-if="results.length === 0"
		class="text-red-500">
		بلیطی یافت نشد.
	</div>
	<Ticket
		v-for="result in results"
		:key="result.id"
		:result="result" />
</template>
