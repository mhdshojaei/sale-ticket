<script setup>
	import { computed, ref, watch } from 'vue';
	import { useTicketsStore } from '@/stores/tickets';
	import { useRoute, useRouter } from 'vue-router';
	import { defineEmits, defineProps } from 'vue';

	const { filter } = defineProps(['filter']);
	const emit = defineEmits(['update:filteredResults']);
	const startModal = ref(false);
	const DestinationModal = ref(false);
	const DateModal = ref(false);

	const ticketsStore = useTicketsStore();

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
	const filters = ref({
		start: filter.start,
		destination: filter.destination,
		availability: filter.availability,
		dateFilter: filter.dateFilter,
		sortType: filter.sortType,
	});

	const router = useRouter();
	const updateFilters = () => {
		if (
			filters.value.start == '' ||
			filters.value.destination == '' ||
			filters.value.dateFilter == ''
		) {
			alert('لطفا مقادیر را تکمیل کنید');
			return;
		}
		const query = {};
		query.start = filters.value.start;
		query.destination = filters.value.destination;
		query.date = filters.value.dateFilter;
		emit('update:filteredResults', filters.value);

		router.push({ query });
	};
	const handleStart = (e) => {
		filters.value.start = e;
		closeModals();
	};
	const handleDestination = (e) => {
		filters.value.destination = e;

		closeModals();
	};
	const handleDate = (e) => {
		filters.value.dateFilter = e;
		closeModals();
	};
	const closeModals = () => {
		startModal.value = false;
		DestinationModal.value = false;
		DateModal.value = false;
	};
</script>

<template>
	<div
		class="grid gap-4 grid-cols-2 md:grid-cols-5 shadow-lg my-5 p-10 rounded-md">
		<div class="relative basis-2/4 md:basis-1/4">
			<div class="absolute z-[1] flex h-full w-9 items-start pt-2 start-0">
				<svg
					aria-label="SendOutlineIcon"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					style="width: 1.5rem; height: 1.5rem">
					<path
						d="M7.37479 4.78522L5.85279 4.14221C5.68675 4.07009 5.50782 4.03237 5.32679 4.03125C5.10691 4.03147 4.8905 4.08611 4.69688 4.19031C4.50325 4.29451 4.33844 4.44503 4.21714 4.62842C4.09584 4.81181 4.02181 5.02238 4.00169 5.24133C3.98156 5.46029 4.01594 5.68081 4.10178 5.88324L9.74677 19.2042C9.84116 19.4362 9.9994 19.6368 10.2031 19.7825C10.4068 19.9283 10.6477 20.0133 10.8977 20.0277C11.1478 20.0422 11.3968 19.9855 11.6159 19.8641C11.835 19.7428 12.0153 19.5618 12.1358 19.3422L14.5638 15.0883C14.683 14.8801 14.8556 14.7075 15.0638 14.5883L19.3278 12.1632C19.5429 12.0394 19.7192 11.8582 19.837 11.6398C19.9547 11.4214 20.0093 11.1745 19.9945 10.9268C19.9798 10.6791 19.8963 10.4404 19.7535 10.2375C19.6106 10.0347 19.414 9.87563 19.1858 9.77826L10.3748 6.05426"
						class="stroke-gray-500"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
				</svg>
			</div>
			<label class="absolute bottom-0 z-[1] text-sm text-gray-400 start-9"
				>مبدا</label
			><input
				aria-autocomplete="list"
				aria-controls="react-autowhatever-source--autocomplete"
				autocomplete="off"
				type="text"
				tabindex="0"
				id="source-input--autocomplete"
				:placeholder="'از کجا'"
				:onclick="() => (closeModals(), (startModal = !startModal))"
				v-model="filters.start"
				class="appearance-none outline-none shadow-none w-full focus:outline-none disabled:text-gray-200 bg-white/0 font-bold d:h-[3.625rem] pb-6 ps-9 relative !text-xl text-gray-500 z-[2] placeholder:transition-all placeholder:!text-gray-500 focus:placeholder:!text-white" />
			<div
				v-show="startModal"
				aria-label="flight source"
				aria-modal="true"
				role="dialog"
				class="absolute bg-white border max-h-[0] rounded-lg shadow-lg start-0 transition-d w-[0] z-[10] scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500/10 scrollbar-track-transparent scroll-smooth motion-reduce:scroll-auto m:!scrollbar-none top-[4.75rem] !max-h-[21rem] shadow-1__12__black/8 !opacity-100 overflow-x-hidden !w-[28.125rem] d:scrollbar-none"
				id="react-autowhatever-source--autocomplete">
				<div class="w-[28.125rem] p-4.5">
					<ul role="listbox">
						<li
							v-for="option in uniqueStarts"
							:key="option"
							:value="option"
							:onclick="(e) => handleStart(option)"
							role="option"
							id="react-autowhatever-source--autocomplete--item-0"
							aria-selected="false"
							data-suggestion-index="0">
							<section
								class="m-container-px transition-inout-300 relative z-10 flex cursor-pointer select-none appearance-none rounded-md pt-1.5 pb-1.5 d:hover:bg-gray-75"
								role="button">
								<div
									class="flex h-11 w-11 flex-initial items-center justify-center rounded-2 border-1 border-divider">
									<svg
										aria-label="LocationIcon"
										width="24"
										height="24"
										viewBox="0 0 20 20"
										fill="none"
										style="width: 1.5rem; height: 1.5rem">
										<path
											d="M9.99989 1.66809C9.10874 1.66263 8.22563 1.8369 7.40336 2.18049C6.58109 2.52409 5.83653 3.02995 5.21421 3.66783C4.59188 4.30571 4.10456 5.06253 3.78137 5.89303C3.45818 6.72354 3.30576 7.61068 3.33323 8.50143C3.33323 11.1514 5.37212 14.2709 9.44989 17.8598C9.60386 17.9928 9.80056 18.066 10.0041 18.066C10.2076 18.066 10.4043 17.9928 10.5582 17.8598C14.6249 14.2681 16.661 11.1486 16.6666 8.50143C16.694 7.61068 16.5416 6.72354 16.2184 5.89303C15.8952 5.06253 15.4079 4.30571 14.7856 3.66783C14.1633 3.02995 13.4187 2.52409 12.5964 2.18049C11.7742 1.8369 10.891 1.66263 9.99989 1.66809ZM9.99989 10.0014C9.67026 10.0014 9.34802 9.90368 9.07394 9.72054C8.79986 9.53741 8.58624 9.27711 8.46009 8.97257C8.33395 8.66802 8.30094 8.33291 8.36525 8.00961C8.42956 7.68631 8.58829 7.38934 8.82138 7.15625C9.05447 6.92316 9.35144 6.76443 9.67474 6.70012C9.99804 6.63581 10.3332 6.66881 10.6377 6.79496C10.9422 6.92111 11.2025 7.13473 11.3857 7.40881C11.5688 7.68289 11.6666 8.00512 11.6666 8.33476C11.6652 8.77638 11.4892 9.19954 11.1769 9.51181C10.8647 9.82409 10.4415 10.0001 9.99989 10.0014Z"
											class="fill-gray-500"></path>
									</svg>
								</div>
								<div class="flex flex-1 flex-col justify-center ps-3">
									<span class="block text-sm font-medium"> {{ option }}</span
									><span class="block text-xs font-normal text-gray-400"
										>همه فرودگاه&zwnj;ها</span
									>
								</div>
							</section>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="m:absolute m:left-0 m:top-10 m:z-10 m:!mt-0 hidden md:block">
			<button
				aria-label="Iconic button"
				class="Button_root__au8HI inline-flex relative transition-inout-300 p-0 left-0 top-0 !rounded-full rounded-4 h-11 w-11 Button_btn__6gvuU Button_tertiary__t13FP bg-white border border-gray-75 d:hover:bg-gray-50"
				type="button">
				<svg
					width="24"
					height="24"
					class="m:rotate-90"
					viewBox="0 0 20 20"
					fill="none"
					style="width: 1.5rem; height: 1.5rem">
					<path
						d="M8.56 4.13378L6 6.80078L14 6.80078"
						class="stroke-gray-500"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M8.56024 9.46875L7.57324 8.37575"
						class="stroke-gray-500"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M11.44 10.5322L14 13.1992H6"
						class="stroke-gray-500"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M11.4404 15.8672L12.4274 14.7742"
						class="stroke-gray-500"
						stroke-linecap="round"
						stroke-linejoin="round"></path></svg
				><span
					class="MuiTouchRipple-root css-w0pj6f"
					style="opacity: 0.35"></span>
			</button>
		</div>
		<div class="d:h-[3.625rem] relative basis-2/4 md:basis-1/4">
			<div class="absolute z-[1] flex h-full w-9 items-start pt-2 start-0">
				<svg
					aria-label="MarkerOutlineIcon"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					style="width: 1.5rem; height: 1.5rem">
					<path
						d="M12.0001 1.99991C10.9307 1.99335 9.871 2.20248 8.88427 2.61479C7.89755 3.0271 7.00408 3.63413 6.25729 4.39959C5.5105 5.16505 4.92571 6.07323 4.53789 7.06983C4.15006 8.06644 3.96716 9.13101 4.00012 10.1999C4.00012 13.3799 6.44678 17.1232 11.3401 21.4299C11.5249 21.5896 11.7609 21.6774 12.0051 21.6774C12.2493 21.6774 12.4854 21.5896 12.6701 21.4299C17.5501 17.1199 19.9934 13.3766 20.0001 10.1999C20.0331 9.13101 19.8502 8.06644 19.4623 7.06983C19.0745 6.07323 18.4897 5.16505 17.7429 4.39959C16.9961 3.63413 16.1027 3.0271 15.116 2.61479C14.1292 2.20248 13.0695 1.99335 12.0001 1.99991V1.99991ZM12.0001 11.9999C11.6046 11.9999 11.2179 11.8826 10.889 11.6628C10.5601 11.4431 10.3037 11.1307 10.1524 10.7653C10.001 10.3998 9.96138 9.99769 10.0385 9.60972C10.1157 9.22176 10.3062 8.8654 10.5859 8.58569C10.8656 8.30599 11.222 8.11551 11.6099 8.03833C11.9979 7.96116 12.4 8.00077 12.7655 8.15215C13.1309 8.30352 13.4433 8.55987 13.6631 8.88877C13.8828 9.21766 14.0001 9.60434 14.0001 9.99991C13.9985 10.5299 13.7873 11.0376 13.4126 11.4124C13.0379 11.7871 12.5301 11.9983 12.0001 11.9999V11.9999Z"
						class="stroke-gray-500"
						stroke-width="1.5"></path>
				</svg>
			</div>
			<label class="absolute bottom-0 z-[1] text-sm text-gray-400 start-9"
				>مقصد</label
			><input
				aria-autocomplete="list"
				aria-controls="react-autowhatever-source--autocomplete"
				autocomplete="off"
				type="text"
				tabindex="0"
				id="source-input--autocomplete"
				placeholder="به کجا"
				:onclick="() => (closeModals(), (DestinationModal = !DestinationModal))"
				v-model="filters.destination"
				class="appearance-none outline-none shadow-none w-full focus:outline-none disabled:text-gray-200 bg-white/0 font-bold d:h-[3.625rem] pb-6 ps-9 relative !text-xl text-gray-500 z-[2] placeholder:transition-all placeholder:!text-gray-500 focus:placeholder:!text-white" />
			<div
				v-show="DestinationModal"
				aria-label="flight source"
				aria-modal="true"
				role="dialog"
				class="absolute bg-white border max-h-[0] rounded-lg shadow-lg start-0 transition-d w-[0] z-[10] scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500/10 scrollbar-track-transparent scroll-smooth motion-reduce:scroll-auto m:!scrollbar-none top-[4.75rem] !max-h-[21rem] shadow-1__12__black/8 !opacity-100 overflow-x-hidden !w-[28.125rem] d:scrollbar-none"
				id="react-autowhatever-source--autocomplete">
				<div class="w-[28.125rem] p-4.5">
					<ul role="listbox">
						<li
							v-for="option in uniqueDestinations"
							:key="option"
							:value="option"
							:onclick="(e) => handleDestination(option)"
							role="option"
							id="react-autowhatever-source--autocomplete--item-0"
							aria-selected="false"
							data-suggestion-index="0">
							<section
								class="m-container-px transition-inout-300 relative z-10 flex cursor-pointer select-none appearance-none rounded-md pt-1.5 pb-1.5 d:hover:bg-gray-75"
								role="button">
								<div
									class="flex h-11 w-11 flex-initial items-center justify-center rounded-2 border-1 border-divider">
									<svg
										aria-label="LocationIcon"
										width="24"
										height="24"
										viewBox="0 0 20 20"
										fill="none"
										style="width: 1.5rem; height: 1.5rem">
										<path
											d="M9.99989 1.66809C9.10874 1.66263 8.22563 1.8369 7.40336 2.18049C6.58109 2.52409 5.83653 3.02995 5.21421 3.66783C4.59188 4.30571 4.10456 5.06253 3.78137 5.89303C3.45818 6.72354 3.30576 7.61068 3.33323 8.50143C3.33323 11.1514 5.37212 14.2709 9.44989 17.8598C9.60386 17.9928 9.80056 18.066 10.0041 18.066C10.2076 18.066 10.4043 17.9928 10.5582 17.8598C14.6249 14.2681 16.661 11.1486 16.6666 8.50143C16.694 7.61068 16.5416 6.72354 16.2184 5.89303C15.8952 5.06253 15.4079 4.30571 14.7856 3.66783C14.1633 3.02995 13.4187 2.52409 12.5964 2.18049C11.7742 1.8369 10.891 1.66263 9.99989 1.66809ZM9.99989 10.0014C9.67026 10.0014 9.34802 9.90368 9.07394 9.72054C8.79986 9.53741 8.58624 9.27711 8.46009 8.97257C8.33395 8.66802 8.30094 8.33291 8.36525 8.00961C8.42956 7.68631 8.58829 7.38934 8.82138 7.15625C9.05447 6.92316 9.35144 6.76443 9.67474 6.70012C9.99804 6.63581 10.3332 6.66881 10.6377 6.79496C10.9422 6.92111 11.2025 7.13473 11.3857 7.40881C11.5688 7.68289 11.6666 8.00512 11.6666 8.33476C11.6652 8.77638 11.4892 9.19954 11.1769 9.51181C10.8647 9.82409 10.4415 10.0001 9.99989 10.0014Z"
											class="fill-gray-500"></path>
									</svg>
								</div>
								<div class="flex flex-1 flex-col justify-center ps-3">
									<span class="block text-sm font-medium"> {{ option }}</span
									><span class="block text-xs font-normal text-gray-400"
										>همه فرودگاه&zwnj;ها</span
									>
								</div>
							</section>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div
			class="DatePickerCotainer_root__n_YOD DatePickerCotainer_root-bottom__GiDtG relative d:w-[22%] basis-1/4">
			<div
				aria-disabled="false"
				class="relative select-none appearance-none outline-none m:h-14 m:cursor-pointer d:h-[3.625rem]"
				id="datepicker-input"
				role="button"
				tabindex="0">
				<div
					class="absolute z-[1] flex h-full w-11 cursor-pointer start-0 m:items-center d:w-9 d:items-start d:pt-2">
					<svg
						aria-label="CalendarOutlineIcon"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						style="width: 1.5rem; height: 1.5rem">
						<path
							d="M17.4511 5.08496H6.54306C5.43628 5.08496 4.53906 5.98218 4.53906 7.08896V17.997C4.53906 19.1037 5.43628 20.001 6.54306 20.001H17.4511C18.5578 20.001 19.4551 19.1037 19.4551 17.997V7.08896C19.4551 5.98218 18.5578 5.08496 17.4511 5.08496Z"
							class="stroke-gray-500"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
						<path
							d="M15.1953 6.13198V4.00098"
							class="stroke-gray-500"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
						<path
							d="M8.38086 6.13198V4.00098"
							class="stroke-gray-500"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
						<path
							d="M8.23438 13.2971C8.51052 13.2971 8.73438 13.0733 8.73438 12.7971C8.73438 12.521 8.51052 12.2971 8.23438 12.2971C7.95823 12.2971 7.73438 12.521 7.73438 12.7971C7.73438 13.0733 7.95823 13.2971 8.23438 13.2971Z"
							class="fill-gray-500 stroke-gray-500"
							stroke-width="1.5"></path>
						<path
							d="M11.998 13.2969C12.2742 13.2969 12.498 13.073 12.498 12.7969C12.498 12.5207 12.2742 12.2969 11.998 12.2969C11.7219 12.2969 11.498 12.5207 11.498 12.7969C11.498 13.073 11.7219 13.2969 11.998 13.2969Z"
							class="fill-gray-500 stroke-gray-500"
							stroke-width="1.5"></path>
						<path
							d="M15.7578 13.2971C16.034 13.2971 16.2578 13.0733 16.2578 12.7971C16.2578 12.521 16.034 12.2971 15.7578 12.2971C15.4817 12.2971 15.2578 12.521 15.2578 12.7971C15.2578 13.0733 15.4817 13.2971 15.7578 13.2971Z"
							class="fill-gray-500 stroke-gray-500"
							stroke-width="1.5"></path>
						<path
							d="M8.23438 16.2971C8.51052 16.2971 8.73438 16.0733 8.73438 15.7971C8.73438 15.521 8.51052 15.2971 8.23438 15.2971C7.95823 15.2971 7.73438 15.521 7.73438 15.7971C7.73438 16.0733 7.95823 16.2971 8.23438 16.2971Z"
							class="fill-gray-500 stroke-gray-500"
							stroke-width="1.5"></path>
						<path
							d="M11.998 16.2969C12.2742 16.2969 12.498 16.073 12.498 15.7969C12.498 15.5207 12.2742 15.2969 11.998 15.2969C11.7219 15.2969 11.498 15.5207 11.498 15.7969C11.498 16.073 11.7219 16.2969 11.998 16.2969Z"
							class="stroke-gray-500"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
						<path
							d="M15.7578 16.2971C16.034 16.2971 16.2578 16.0733 16.2578 15.7971C16.2578 15.521 16.034 15.2971 15.7578 15.2971C15.4817 15.2971 15.2578 15.521 15.2578 15.7971C15.2578 16.0733 15.4817 16.2971 15.7578 16.2971Z"
							class="fill-gray-500 stroke-gray-500"
							stroke-width="1.5"></path>
						<path
							d="M4.53906 9.29712H19.4551"
							class="stroke-gray-500"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
					</svg>
				</div>
				<label class="absolute bottom-0 z-[1] text-sm text-gray-400 start-9"
					>درتاریخ</label
				><input
					aria-autocomplete="list"
					aria-controls="react-autowhatever-source--autocomplete"
					autocomplete="off"
					type="text"
					tabindex="0"
					id="source-input--autocomplete"
					placeholder="تاریخ"
					:onclick="() => (closeModals(), (DateModal = !DateModal))"
					v-model="filters.dateFilter"
					class="appearance-none outline-none shadow-none w-full focus:outline-none disabled:text-gray-200 bg-white/0 font-bold d:h-[3.625rem] pb-6 ps-9 relative !text-xl text-gray-500 z-[2] placeholder:transition-all placeholder:!text-gray-500 focus:placeholder:!text-white" />
				<div
					v-show="DateModal"
					aria-label="flight source"
					aria-modal="true"
					role="dialog"
					class="absolute bg-white border max-h-[0] rounded-lg shadow-lg start-0 transition-d w-[0] z-[10] scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500/10 scrollbar-track-transparent scroll-smooth motion-reduce:scroll-auto m:!scrollbar-none top-[4.75rem] !max-h-[21rem] shadow-1__12__black/8 !opacity-100 overflow-x-hidden !w-[28.125rem] d:scrollbar-none"
					id="react-autowhatever-source--autocomplete">
					<div class="w-[28.125rem] p-4.5">
						<ul role="listbox">
							<li
								v-for="option in uniqueDates"
								:key="option"
								:value="option"
								:onclick="(e) => handleDate(option)"
								role="option"
								id="react-autowhatever-source--autocomplete--item-0"
								aria-selected="false"
								data-suggestion-index="0">
								<section
									class="m-container-px transition-inout-300 relative z-10 flex cursor-pointer select-none appearance-none rounded-md pt-1.5 pb-1.5 d:hover:bg-gray-75"
									role="button">
									<div
										class="flex h-11 w-11 flex-initial items-center justify-center rounded-2 border-1 border-divider">
										<svg
											aria-label="LocationIcon"
											width="24"
											height="24"
											viewBox="0 0 20 20"
											fill="none"
											style="width: 1.5rem; height: 1.5rem">
											<path
												d="M9.99989 1.66809C9.10874 1.66263 8.22563 1.8369 7.40336 2.18049C6.58109 2.52409 5.83653 3.02995 5.21421 3.66783C4.59188 4.30571 4.10456 5.06253 3.78137 5.89303C3.45818 6.72354 3.30576 7.61068 3.33323 8.50143C3.33323 11.1514 5.37212 14.2709 9.44989 17.8598C9.60386 17.9928 9.80056 18.066 10.0041 18.066C10.2076 18.066 10.4043 17.9928 10.5582 17.8598C14.6249 14.2681 16.661 11.1486 16.6666 8.50143C16.694 7.61068 16.5416 6.72354 16.2184 5.89303C15.8952 5.06253 15.4079 4.30571 14.7856 3.66783C14.1633 3.02995 13.4187 2.52409 12.5964 2.18049C11.7742 1.8369 10.891 1.66263 9.99989 1.66809ZM9.99989 10.0014C9.67026 10.0014 9.34802 9.90368 9.07394 9.72054C8.79986 9.53741 8.58624 9.27711 8.46009 8.97257C8.33395 8.66802 8.30094 8.33291 8.36525 8.00961C8.42956 7.68631 8.58829 7.38934 8.82138 7.15625C9.05447 6.92316 9.35144 6.76443 9.67474 6.70012C9.99804 6.63581 10.3332 6.66881 10.6377 6.79496C10.9422 6.92111 11.2025 7.13473 11.3857 7.40881C11.5688 7.68289 11.6666 8.00512 11.6666 8.33476C11.6652 8.77638 11.4892 9.19954 11.1769 9.51181C10.8647 9.82409 10.4415 10.0001 9.99989 10.0014Z"
												class="fill-gray-500"></path>
										</svg>
									</div>
									<div class="flex flex-1 flex-col justify-center ps-3">
										<span class="block text-sm font-medium"> {{ option }}</span>
									</div>
								</section>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<button
			:onclick="updateFilters"
			aria-label="Iconic button"
			class="Button_root__au8HI inline-flex relative transition-inout-300 p-0 !h-18 !w-18 !rounded-full rounded-4 h-11 w-11 bg-primary border-primary text-white md:ms-auto"
			type="submit">
			<svg
				aria-label="SearchOutlineIcon"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				style="width: 1.5rem; height: 1.5rem">
				<path
					d="M20.9989 20.9989L17.0039 17.0039"
					class="stroke-white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"></path>
				<path
					d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
					class="stroke-white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"></path></svg
			><span
				class="MuiTouchRipple-root css-w0pj6f"
				style="opacity: 0.35"></span>
		</button>
	</div>
</template>
<style>
	.bg-primary {
		--tw-bg-opacity: 1;
		background-color: rgb(53 95 222 / var(--tw-bg-opacity));
	}
</style>
