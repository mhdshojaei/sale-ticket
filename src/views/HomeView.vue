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
					<option
						v-for="option in uniqueStarts"
						:key="option"
						:value="option">
						{{ option }}
					</option>
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
					<option
						v-for="option in uniqueDestinations"
						:key="option"
						:value="option">
						{{ option }}
					</option>
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
					<option
						v-for="option in uniqueDates"
						:key="option"
						:value="option">
						{{ option }}
					</option>
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
				v-if="result.is_available"
				@click="openReserveModal(result)"
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
		<div
			v-if="showReserveModal"
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
						@click="reserveTicket"
						:disabled="!canReserve"
						:class="
							canReserve
								? 'mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
								: 'mt-4 bg-red-500 text-white px-4 py-2 rounded '
						">
						افزودن به سبد خرید
					</button>
					<button
						@click="closeReserveModal"
						class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
						بستن
					</button>
				</div>
			</div>
		</div>
		<div
			v-if="showCartModal"
			class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div class="bg-white p-4 rounded w-2/3">
				<h2 class="text-xl font-bold mb-4">سبد خرید</h2>
				<ul>
					<li
						v-for="item in cartItems"
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
							<p>
								مجموع قیمت: {{ item.passengers.length * Number(item.price) }}
							</p>

							<button
								@click="removeFromCart(item.id)"
								class="text-red-500 ml-2">
								حذف
							</button>
						</div>
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
			const showReserveModal = ref(false);

			const selectedTicket = ref(null);
			const passengers = ref([{ name: '', natinalId: '' }]);

			const openCartModal = () => {
				showCartModal.value = true;
			};

			const closeCartModal = () => {
				showCartModal.value = false;
			};

			const openReserveModal = (ticket) => {
				selectedTicket.value = ticket;
				showReserveModal.value = true;
			};

			const closeReserveModal = () => {
				showReserveModal.value = false;
				passengers.value = [{ name: '', natinalId: '' }];
			};

			const addPassenger = () => {
				passengers.value.push({ name: '', natinalId: '' });
			};

			const reserveTicket = () => {
				ticketsStore.addToCart({
					...selectedTicket.value,
					passengers: passengers.value,
				});
				console.log(cartItems.value);

				closeReserveModal();
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

			const canReserve = computed(() => {
				return passengers.value.every(
					(passenger) => passenger.name && passenger.natinalId,
				);
			});

			const uniqueStarts = computed(() => {
				return [...new Set(ticketsStore.results.map((ticket) => ticket.start))];
			});

			const uniqueDestinations = computed(() => {
				return [
					...new Set(ticketsStore.results.map((ticket) => ticket.destination)),
				];
			});

			const uniqueDates = computed(() => {
				return [...new Set(ticketsStore.results.map((ticket) => ticket.date))];
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
				openReserveModal,
				closeReserveModal,
				passengers,
				addPassenger,
				reserveTicket,
				canReserve,
				uniqueStarts,
				uniqueDestinations,
				uniqueDates,
				showReserveModal,
			};
		},
	};
</script>
