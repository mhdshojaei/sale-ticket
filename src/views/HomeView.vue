<script setup>
	import TicketList from '@/components/TicketList.vue';
	import CartModal from '@/components/CartModal.vue';
	import ReserveModal from '@/components/ReserveModal.vue';
</script>

<template>
	<div class="block max-w-screen-xl m-auto">
		<TicketList />
		<CartModal />
		<ReserveModal />
	</div>
</template>
