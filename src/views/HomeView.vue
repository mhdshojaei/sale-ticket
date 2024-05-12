<script setup>
	import { useResultStore } from '@/stores/results';

	const results = useResultStore();
	results.fill();
</script>

<template>
	<main class="w-[1160px] m-auto">
		<div
			v-for="result in results.filterdItems"
			:key="result.id"
			class="w-full border flex justify-between p-10 flex-row-reverse items-center">
			<div class="flex flex-row-reverse border p-4 items-center">
				<p>:مبدا</p>
				<h2 class="text-2xl">{{ result.start }}</h2>
			</div>
			<div class="flex flex-row-reverse border p-4 items-center">
				<p>:مقصد</p>
				<h2 class="text-2xl">{{ result.destination }}</h2>
			</div>
			<p>{{ result.date }}</p>
			<div class="flex flex-row-reverse border p-4 items-center">
				<p>:صندلی های خالی</p>
				<p class="pr-2">{{ result.available_seats }}</p>
			</div>
			<div
				:class="[
					'flex flex-row-reverse border p-4 items-center',
					result.is_available ? 'bg-green-500' : 'bg-red-500',
					errorClass,
				]">
				<p>:موجود</p>
				<p class="pr-2">{{ result.is_available == true ? 'بله' : 'خیر  ' }}</p>
			</div>
		</div>
	</main>
</template>
