<script setup>
	const { result } = defineProps(['result']);
	import { useTicketsStore } from '@/stores/tickets';

	import { computed } from 'vue';

	const ticketsStore = useTicketsStore();

	const checkAlreadyAdd = computed(() => {
		const check = ticketsStore.cart.find((item) => item?.id == result.id);
		return !!check;
	});
</script>

<template>
	<div
		class="mb-4 transition-inout-300 relative mb-4.5 rounded-lg border-1 border-divider bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center m-auto">
		<div class="flex w-full flex-col">
			<div class="flex w-full flex-col">
				<div class="flex flex-col md:flex-row items-center">
					<div class="absolute flex items-center start-6 top-6">
						<div
							:key="ticket_type"
							v-for="ticket_type in result.ticket_type">
							<span class="border-r px-4 text-xs text-gray-400">{{
								ticket_type
							}}</span>
						</div>
					</div>
					<div class="flex flex-col md:flex-row items-end pt-10 md:pt-2">
						<div class="flex items-center overflow-hidden pb-2 w-[14.375rem]">
							<div class="flex items-center w-[4.25rem]">
								<div
									class="h-11 w-11 z-[3] flex-0-auto flex items-center overflow-hidden bg-white border-1 border-divider rounded-full">
									<img
										alt=""
										class="max-h-full w-full text-sm"
										height="100"
										loading="lazy"
										width="100"
										:src="result.company_img" />
								</div>
							</div>
							<div class="flex flex-col overflow-hidden pe-3">
								<span class="text-dots text-sm">{{ result.company_name }}</span>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<div class="flex h-5 justify-between w-[9.25rem]">
								<span class="w-5"></span><span class="w-3"></span>
							</div>
							<div class="flex w-[16.75rem] items-center pt-3.5">
								<span class="w-[3.875rem] text-lg font-bold">{{
									result.departure
								}}</span>
								<div
									class="relative flex h-4 items-center w-[9.25rem] justify-center">
									<span class="relative z-[2] bg-white px-0.5"
										><svg
											width="16"
											height="16"
											viewBox="0 0 20 20"
											fill="none"
											style="width: 1rem; height: 1rem">
											<path
												d="M1.13116 9.76487C1.13121 9.93994 1.16618 10.1132 1.23402 10.2746C1.30185 10.436 1.40119 10.5823 1.52622 10.7048C1.65126 10.8274 1.79947 10.9238 1.9622 10.9883C2.12493 11.0529 2.2989 11.0844 2.47394 11.0809L6.51093 10.9977L9.73864 17.4185L11.7619 17.4161L10.2187 10.9214L14.3751 10.835L15.4641 12.3546L17.2948 12.3546L16.0487 9.76487L17.2917 7.17202L15.461 7.17202L14.3736 8.69316L10.2171 8.60673L11.7626 2.10967H9.73707L6.50701 8.52816L2.47001 8.44487C2.29497 8.44193 2.1211 8.47392 1.95857 8.53898C1.79604 8.60404 1.64811 8.70086 1.52344 8.82377C1.39878 8.94668 1.29987 9.09321 1.23252 9.25481C1.16516 9.4164 1.1307 9.5898 1.13116 9.76487Z"
												class="fill-gray-400"></path></svg></span
									><i
										class="absolute top-2 z-[1] h-[0.063rem] bg-divider right-0 w-full"></i>
								</div>
								<span class="w-[3.875rem] text-lg font-bold text-end">{{
									result.arrival
								}}</span>
							</div>
							<div class="flex w-[17rem] justify-between pt-3 text-gray-400">
								<span
									class="en w-9 cursor-default text-right text-sm font-normal"
									>{{ result.start }}</span
								><span class="text-sm font-normal en">{{
									result.duration
								}}</span
								><span class="en w-9 cursor-default text-sm font-normal">{{
									result.destination
								}}</span>
							</div>
						</div>
					</div>

					<div
						class="relative flex w-full flex-col items-center md:items-end md:w-[14.063rem] ms-auto">
						<div class="flex flex-col items-center gap-2 my-4">
							<span
								class="flex select-none text-sm font-normal text-gray-400 text-end"
								>هر مسافر</span
							>
							<p class="font-bold text-lg">
								{{ Intl.NumberFormat().format(result.price) }} تومان
							</p>
							<button
								v-if="!checkAlreadyAdd && result.is_available"
								:onClick="() => ticketsStore.openReserveModal(result)"
								class="Button_root__au8HI inline-flex relative transition-inout-300 w-[9.188rem] text-lg Button_btn__6gvuU Button_tertiary__t13FP bg-[#3c6ce6] text-white border border-gray-75 d:hover:bg-gray-50 h-11 px-6 rounded-full">
								جزییات و خرید<span style="opacity: 0.35"></span>
							</button>
							<button
								v-if="checkAlreadyAdd"
								@click="ticketsStore.editCart(result)"
								class="Button_root__au8HI inline-flex transition-inout-300 bg-gray-500 text-sm hover:!opacity-100 Button_btn__6gvuU Button_primary__aXrKu border-1 border-primary text-white h-11 px-6 rounded-full hover:cursor-pointer w-[9.188rem]">
								ویرایش بلیط<span style="opacity: 0.35"></span>
							</button>
							<button
								v-if="!result.is_available"
								disabled
								class="Button_root__au8HI inline-flex transition-inout-300 w-[9.188rem] text-sm hover:!opacity-100 Button_btn__6gvuU Button_primary__aXrKu border-1 border-primary text-white bg-red-500 h-11 px-6 rounded-full hover:cursor-pointer">
								تکمیل ظرفیت<span style="opacity: 0.35"></span>
							</button>
						</div>

						<div class=""></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.bg-divider {
		--tw-bg-opacity: 1;
		background-color: rgb(230 232 238 / var(--tw-bg-opacity));
	}
	.desktop .d\:hover\:bg-\[\#3c6ce6\]:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(60 108 230 / var(--tw-bg-opacity));
	}
	.desktop .d\:hover\:bg-\[\#3c6ce6\]:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(60 108 230 / var(--tw-bg-opacity));
	}
	.Button_root__au8HI {
		-webkit-user-select: none;
		user-select: none;
		-webkit-appearance: none;
		appearance: none;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}
	.desktop .d\:hover\:bg-gray-50:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(241 242 246 / var(--tw-bg-opacity));
	}
</style>
