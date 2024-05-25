<script setup>
	import { computed, ref } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';

	const ticketsStore = useTicketsStore();

	const addPassenger = () => {
		ticketsStore.passengers.push({ name: '', natinalId: '' });
	};
	const canReserve = computed(() => {
		return ticketsStore.passengers.every(
			(passenger) => passenger.name && passenger.natinalId,
		);
	});

	const reserveTicket = () => {
		const natinalIdCheck = ticketsStore.passengers.find(
			(item) => item.natinalId.length < 10 || item.natinalId.length > 10,
		);
		if (natinalIdCheck) {
			alert('کدملی معتبر وارد کنید');
			return;
		}
		ticketsStore.reserveTicket();
	};
	const deleteItem = (index) => {
		ticketsStore.passengers.splice(index, 1);
	};
	const closeModel = () => {
		ticketsStore.closeReserveModal();
	};
</script>
<template>
	<div
		v-if="ticketsStore.showReserveModal"
		class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
		<div class="bg-white p-4 rounded w-1/2">
			<h2 class="text-xl font-bold mb-4">رزرو بلیط</h2>

			<div
				v-for="(passenger, index) in ticketsStore.passengers"
				:key="index"
				class="mb-4 flex gap-4 justify-between">
				<input
					v-model="passenger.name"
					type="text"
					placeholder="نام"
					class="block border border-gray-300 rounded px-4 py-2 mb-2 w-full" />
				<input
					v-model="passenger.natinalId"
					type="tel"
					maxlength="10"
					minlength="10"
					pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
					placeholder="کدملی"
					class="block border border-gray-300 rounded px-4 py-2 mb-2 w-full" />

				<button
					v-if="index !== 0"
					class="w-40 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2"
					@click="deleteItem(index)">
					حذف
				</button>
			</div>
			<div class="flex gap-8 align-middle justify-center">
				<button
					:disabled="
						ticketsStore.selectedTicket.available_seats ==
						ticketsStore.passengers.length
					"
					@click="addPassenger"
					class="mt-2 w-40 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-red-500">
					اضافه کردن مسافر
				</button>
				<button
					@click="reserveTicket()"
					:disabled="!canReserve"
					class="mt-2 w-40 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-red-500">
					افزودن به سبد خرید
				</button>

				<button
					@click="closeModel"
					class="mt-2 w-40 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
					بستن
				</button>
			</div>
		</div>
	</div>
</template>
