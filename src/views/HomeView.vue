<template>
	<div class="p-4">
		<h1 class="text-2xl font-bold mb-4 text-right">لیست بلیط‌ها</h1>
		<div class="flex space-x-4 mb-4 justify-between items-center">
			<div>
				<label
					for="start"
					class="block mb-2"
					>مبدا:</label
				>
				<select
					id="start"
					v-model="filter.start"
					class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
					<option value="">همه</option>
					<option value="تهران">تهران</option>
					<option value="مشهد">مشهد</option>
					<option value="اصفهان">اصفهان</option>
					<option value="بندرعباس">بندرعباس</option>
					<option value="شیراز">شیراز</option>
					<option value="رشت">رشت</option>
				</select>
			</div>
			<div>
				<label
					for="destination"
					class="block mb-2"
					>مقصد:</label
				>
				<select
					id="destination"
					v-model="filter.destination"
					class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
					<option value="">همه</option>

					<option value="تهران">تهران</option>
					<option value="مشهد">مشهد</option>
					<option value="اصفهان">اصفهان</option>
					<option value="بندرعباس">بندرعباس</option>
					<option value="شیراز">شیراز</option>
					<option value="رشت">رشت</option>
				</select>
			</div>
			<div>
				<label
					for="date"
					class="block mb-2"
					>تاریخ:</label
				>
				<select
					id="date"
					v-model="dateFilter"
					class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
					<option value="">همه</option>
					<option value="2024-05-12">2024-05-12</option>
					<option value="2024-05-13">2024-05-13</option>
				</select>
			</div>
			<div>
				<label
					for="availability"
					class="block mb-2"
					>موجود :</label
				>
				<select
					id="availability"
					v-model="filter.availability"
					class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
					<option value="">همه</option>
					<option value="true">بله</option>
					<option value="false">خیر</option>
				</select>
			</div>
			<div>
				<label
					for="sort"
					class="block mb-2"
					>مرتب‌سازی:</label
				>
				<select
					id="sort"
					v-model="sortType"
					class="block border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-blue-500">
					<option value="price-asc">قیمت ارزان به گران</option>
					<option value="price-desc">قیمت گران به ارزان</option>
				</select>
			</div>
			<div>
				<button
					@click="openCartModal"
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					سبد خرید ({{ cartItems.length }})
				</button>
			</div>
		</div>
		<div
			v-if="filteredResults.length === 0"
			class="text-red-500">
			بلیطی یافت نشد.
		</div>
		<div
			v-for="result in filteredResults"
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
				@click="addToCart(result.id)"
				class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
				اضافه به سبد خرید
			</button>
		</div>
		<div>
			<p>گرانترین قیمت: {{ maxPrice }}</p>
			<p>ارزانترین قیمت: {{ minPrice }}</p>
		</div>
		<div
			v-if="showCartModal"
			class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div class="bg-white p-4 rounded w-1/2">
				<h2 class="text-xl font-bold mb-4">سبد خرید</h2>
				<ul>
					<li
						v-for="item in cartItems"
						:key="item.id"
						class="mb-2">
						{{ item.ticket_number }} - {{ item.price }} تومان
						<button
							@click="removeFromCart(item.id)"
							class="text-red-500 ml-2">
							حذف
						</button>
					</li>
				</ul>
				<p class="font-bold mt-4">مجموع: {{ totalPrice }} تومان</p>
				<button
					@click="closeCartModal"
					class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					بستن
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { computed, ref } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';
	import { useTicketAvailabilityStore } from '@/stores/TicketAvailability';

	export default {
		setup() {
			const ticketsStore = useTicketsStore();
			const availabilityStore = useTicketAvailabilityStore();

			const filter = ref({
				start: '',
				destination: '',
				availability: '',
			});

			const dateFilter = ref('');

			const sortType = ref('');

			const showCartModal = ref(false);

			const openCartModal = () => {
				showCartModal.value = true;
			};

			const closeCartModal = () => {
				showCartModal.value = false;
			};

			const addToCart = (itemId) => {
				ticketsStore.addToCart(itemId);
			};

			const removeFromCart = (itemId) => {
				ticketsStore.removeFromCart(itemId);
			};

			const filteredResults = computed(() => {
				let filtered = ticketsStore.results;

				if (filter.value.start !== '') {
					filtered = filtered.filter(
						(item) => item.start === filter.value.start,
					);
				}

				if (filter.value.destination !== '') {
					filtered = filtered.filter(
						(item) => item.destination === filter.value.destination,
					);
				}

				if (filter.value.availability !== '') {
					filtered = filtered.filter(
						(item) =>
							availabilityStore.getAvailability(item.id).toString() ===
							filter.value.availability,
					);
				}

				if (dateFilter.value !== '') {
					filtered = filtered.filter((item) => item.date === dateFilter.value);
				}

				if (sortType.value === 'price-asc') {
					filtered.sort((a, b) => a.price - b.price);
				} else if (sortType.value === 'price-desc') {
					filtered.sort((a, b) => b.price - a.price);
				}

				return filtered;
			});

			const maxPrice = computed(() => {
				return ticketsStore.maxPrice;
			});

			const minPrice = computed(() => {
				return ticketsStore.minPrice;
			});

			const cartItems = computed(() => {
				return ticketsStore.cartItems;
			});

			const totalPrice = computed(() => {
				return ticketsStore.totalPrice;
			});

			return {
				filter,
				dateFilter,
				sortType,
				showCartModal,
				openCartModal,
				closeCartModal,
				addToCart,
				removeFromCart,
				filteredResults,
				maxPrice,
				minPrice,
				cartItems,
				totalPrice,
			};
		},
	};
</script>
