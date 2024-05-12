<script setup>
	import { RouterLink, RouterView } from 'vue-router';
	import { useResultStore } from '@/stores/results';

	const results = useResultStore();
	results.fill();
	const cities = ['تهران', 'اصفهان', 'بندرعباس', 'مشهد', 'رشت', 'شیراز'];
	const filters = ['گرانترین', 'ارزانترین', 'تاریخ صعودی', 'تاریخ نزولی'];

	const dates = ['2024-05-13', '2024-05-12'];
</script>

<template>
	<header>
		<div class="w-[1160px] m-auto">
			<!-- <nav class="">
				<RouterLink
					to="/"
					class="text-5xl"
					>Homeee</RouterLink
				>
				<RouterLink to="/about">About</RouterLink>
			</nav> -->
			<div class="w-[1160px] m-auto flex flex-row-reverse my-4 justify-between">
				<div class="flex flex-row-reverse gap-x-4">
					<p>:مبدا</p>
					<select
						v-on:change="results.filterOrigin($event.target.value)"
						class="bg-red-100"
						name="cars"
						id="cars">
						<option
							value="all"
							selected>
							همه
						</option>

						<option
							v-for="(item, index) in cities"
							:key="index"
							:value="item">
							{{ item }}
						</option>
					</select>
				</div>
				<div class="flex flex-row-reverse gap-x-4">
					<p>:مقصد</p>
					<select
						v-on:change="results.filterdestination($event.target.value)"
						class="bg-red-100"
						name="cars"
						id="cars">
						<option
							value="all"
							selected>
							همه
						</option>
						<option
							v-for="(item, index) in cities"
							:key="index"
							:value="item">
							{{ item }}
						</option>
					</select>
				</div>
				<div class="flex flex-row-reverse gap-x-4">
					<p>:تاریخ</p>
					<select
						v-on:change="results.filterDate($event.target.value)"
						class="bg-red-100"
						name="cars"
						id="cars">
						<option
							value="all"
							selected>
							همه
						</option>
						<option
							v-for="(item, index) in dates"
							:key="index"
							:value="item">
							{{ item }}
						</option>
					</select>
				</div>
				<div class="flex flex-row-reverse gap-x-4">
					<p>:موجود</p>

					<label class="switch">
						<input
							type="checkbox"
							value="false"
							@change="results.Avalable($event.target.checked)" />
						<span class="slider"></span>
					</label>
				</div>
				<div class="flex flex-row-reverse gap-x-4">
					<p>:مرتب سازی</p>
					<select
						class="bg-red-100"
						name="cars"
						id="cars">
						<option
							value="all"
							selected>
							همه
						</option>
						<option
							v-for="(item, index) in filters"
							:key="index"
							value="">
							{{ item }}
						</option>
					</select>
				</div>
			</div>
		</div>
	</header>

	<RouterView />
</template>
