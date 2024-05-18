<script setup>
	import { computed } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';

	const ticketsStore = useTicketsStore();

	const cartItems = computed(() => ticketsStore.cart);
	const totalPrice = computed(() => {
		return ticketsStore.cart.reduce(
			(sum, item) => sum + item.price * item.passengers.length,
			0,
		);
	});

	const removeFromCart = (itemId) => {
		ticketsStore.removeFromCart(itemId);
	};

	const closeCartModal = () => {
		ticketsStore.closeCartModal();
	};
</script>

<template>
	<div
		v-if="ticketsStore.showCartModal"
		class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
		<div class="bg-white p-4 rounded w-2/3">
			<h2 class="text-xl font-bold mb-4">سبد خرید</h2>
			<ul>
				<li
					v-for="(item, index) in cartItems"
					:key="item.id"
					class="mb-2">
					<div class="w-full flex border justify-between items-center p-4">
						<div class="flex flex-col gap-4">
							<div
								:key="passenger.name"
								v-for="passenger in item.passengers">
								<p>نام مسافر: {{ passenger.name }}</p>
								<p>شماره ملی مسافر: {{ passenger.natinalId }}</p>
							</div>
						</div>
						<p>مبدا: {{ item.start }}</p>
						<p>مقصد: {{ item.destination }}</p>
						<p>شماره بلیط:{{ item.ticket_number }}</p>
						<p>قیمت هر بلیط: {{ item.price }} تومان</p>
						<p>مجموع قیمت: {{ item.passengers.length * Number(item.price) }}</p>

						<button
							@click="removeFromCart(index)"
							class="text-red-500 ml-2">
							حذف
						</button>
					</div>
				</li>
			</ul>
			<p class="font-bold mt-4">
				مجموع: {{ Intl.NumberFormat().format(totalPrice) }} تومان
			</p>
			<button
				@click="closeCartModal"
				class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
				بستن
			</button>
		</div>
	</div>
</template>
