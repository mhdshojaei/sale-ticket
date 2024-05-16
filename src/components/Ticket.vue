<script setup>
	const { result } = defineProps(['result']);
	import { useTicketsStore } from '@/stores/tickets';

	const ticketsStore = useTicketsStore();
</script>
<template>
	<div
		:key="result.id"
		class="border rounded p-4 mb-4 flex justify-between">
		<p class="font-bold">شماره بلیط: {{ result.ticket_number }}</p>
		<p>مبدا: {{ result.start }}</p>
		<p>مقصد: {{ result.destination }}</p>
		<p>تاریخ: {{ result.date }}</p>
		<p>ظرفیت باقی‌مانده: {{ result.available_seats }}</p>
		<p>موجود : {{ result.is_available ? 'بله' : 'خیر' }}</p>
		<p>قیمت: {{ result.price }} تومان</p>
		<button
			v-if="result.is_available"
			@click="ticketsStore.openReserveModal(result)"
			class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
			رزرو بلیط
		</button>
		<button
			v-else
			disabled
			class="bg-red-500 text-white px-4 py-2 rounded">
			تکمیل ظرفیت
		</button>
	</div>
</template>
