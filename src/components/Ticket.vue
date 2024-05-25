<script setup>
	const { result } = defineProps(['result']);
	import { useTicketsStore } from '@/stores/tickets';
	import { computed } from 'vue';
	const ticketsStore = useTicketsStore();
	const checkAlreadyAdd = computed(() => {
		const check = ticketsStore.cart.find((item) => item?.id == result.id);
		if (check) {
			return true;
		} else return false;
	});
</script>
<template>
	<div
		:key="result.id"
		class="border rounded mb-4 flex shadow-md items-center">
		<div class="flex flex-col gap-4 basis-3/4 items-stretch p-4">
			<div class="flex gap-2 space-x-4">
				<span
					class="bg-slate-200 text-gray-400 rounded-md px-2 py-1 text-xs"
					:key="ticket_type"
					v-for="ticket_type in result.ticket_type"
					>{{ ticket_type }}</span
				>
			</div>

			<div class="flex flex-row gap-4">
				<div class="basis-1/4 items-start">
					<div class="flex flex-col items-center gap-2 w-32">
						<img
							:src="result.company_img"
							alt=""
							class="w-10 rounded-full" />
						<p class="text-xs">{{ result.company_name }}</p>
					</div>
				</div>
				<div class="basis-2/4">
					<div class="flex items-center justify-between">
						<p class="text-2xl">{{ result.departure }}</p>
						<div
							class="border-b w-full items-center justify-center flex m-2 mb-4">
							<span>{{ result.duration }}</span>
						</div>
						<p class="text-2xl">{{ result.arrival }}</p>
					</div>
					<div class="flex justify-between">
						<p>{{ result.start }}</p>
						<p>{{ result.destination }}</p>
					</div>
				</div>
				<div class="flex items-center justify-center basis-1/4">
					<p>
						{{ result.luggage == 0 ? 'بدون بار' : result.luggage + 'KG' }}
					</p>
				</div>
			</div>
		</div>

		<div
			class="flex items-center flex-col justify-center basis-1/4 border-r p-4 gap-2">
			<p>{{ result.price }} تومان</p>
			<button
				v-if="result.is_available && !checkAlreadyAdd"
				@click="ticketsStore.openReserveModal(result)"
				class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
				رزرو بلیط
			</button>
			<button
				v-if="checkAlreadyAdd"
				@click="ticketsStore.editCart(result)"
				class="bg-gray-500 text-white px-4 py-2 rounded">
				ویرایش بلیط
			</button>
			<button
				v-if="!result.is_available"
				disabled
				class="bg-red-500 text-white px-4 py-2 rounded">
				تکمیل ظرفیت
			</button>
			<div>
				<p>ظرفیت باقی‌مانده: {{ result.available_seats }}</p>
			</div>
		</div>
	</div>
</template>
