<script setup>
	import { computed, ref } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';

	const ticketsStore = useTicketsStore();
	const passengers = ref([{ name: '', natinalId: '' }]);

	const addPassenger = () => {
		passengers.value.push({ name: '', natinalId: '' });
	};
	const canReserve = computed(() => {
		return passengers.value.every(
			(passenger) => passenger.name && passenger.natinalId,
		);
	});
	const resetPassengersValue = () => {
		passengers.value = [{ name: '', natinalId: '' }];
	};
</script>
<template>
	<div
		v-if="ticketsStore.showReserveModal"
		class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
		<div class="bg-white p-4 rounded w-1/2">
			<h2 class="text-xl font-bold mb-4">رزرو بلیط</h2>
			<div
				v-for="(passenger, index) in passengers"
				:key="index"
				class="mb-4 flex gap-4">
				<input
					v-model="passenger.name"
					type="text"
					placeholder="نام"
					class="block border border-gray-300 rounded px-4 py-2 w-full mb-2" />
				<input
					v-model="passenger.natinalId"
					type="number"
					placeholder="کدملی"
					class="block border border-gray-300 rounded px-4 py-2 w-full mb-2" />
			</div>
			<div class="flex gap-8 align-middle justify-center">
				<button
					@click="addPassenger"
					class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					اضافه کردن مسافر
				</button>
				<button
					@click="
						ticketsStore.reserveTicket(passengers), resetPassengersValue()
					"
					:disabled="!canReserve"
					:class="
						canReserve
							? 'mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
							: 'mt-4 bg-red-500 text-white px-4 py-2 rounded '
					">
					افزودن به سبد خرید
				</button>
				<button
					@click="ticketsStore.closeReserveModal"
					class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
					بستن
				</button>
			</div>
		</div>
	</div>
</template>
