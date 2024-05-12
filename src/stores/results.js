import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useResultStore = defineStore('result', {
	state() {
		return {
			results: [],
			filterdItems: [],
			originCity: '',
			destinationCitiy: '',
			currentDate: '',
			date: '',
			available: false,
			availablefilters: [],
		};
	},
	actions: {
		async fill() {
			let r = await import('@/db.json');
			let data = r.default;

			this.results = data.results;
			this.filterdItems = this.results;
		},
		Avalable(value) {
			if (value) {
				this.available = true;
				this.availablefilters = this.filterdItems;
				this.filterdItems = this.results.filter((item) =>
					item.is_available == true && this.destinationCitiy
						? item.destination == this.destinationCitiy
						: item.is_available == true && this.date
							? item.date == this.date
							: item.is_available == true && this.originCity
								? item.start == this.originCity
								: item.is_available == true,
				);
			} else {
				this.available = false;
				this.filterdItems = this.availablefilters;
			}
		},
		filterOrigin(value) {
			if (value == 'all') {
				this.filterdItems = this.results.filter((item) =>
					item.start && this.destination
						? item.destination == this.destinationCitiy
						: item.start && this.date
							? item.date == this.date
							: item.start && this.available
								? item.is_available == this.available
								: item.start,
				);
			} else {
				this.originCity = value;

				this.filterdItems = this.results.filter((item) =>
					item.start == value && this.destination
						? item.destination == this.destinationCitiy
						: item.start == value && this.date
							? item.date == this.date
							: item.start == value && this.available
								? item.is_available == this.available
								: item.start == value,
				);
			}
		},
		filterdestination(value) {
			if (value == 'all') {
				this.filterdItems = this.results.filter((item) =>
					item.destination && this.originCity
						? item.start == this.originCity
						: item.destination && this.date
							? item.date == this.date
							: item.destination && this.available
								? item.is_available == this.available
								: item.destination,
				);
			} else {
				this.destinationCitiy = value;

				this.filterdItems = this.results.filter((item) =>
					item.destination == value && this.originCity
						? item.start == this.originCity
						: item.destination == value && this.date
							? item.date == this.date
							: item.destination == value && this.available
								? item.is_available == this.available
								: item.destination == value,
				);
			}
		},
		filterDate(value) {
			if (value == 'all') {
				this.filterdItems = this.results.filter((item) =>
					item.date && this.originCity
						? item.start == this.originCity
						: item.date && this.destinationCitiy
							? item.destination == this.destinationCitiy
							: item.date && this.available
								? item.is_available == this.available
								: item.date,
				);
			} else {
				this.date = value;

				this.filterdItems = this.results.filter((item) =>
					item.date == value && this.originCity
						? item.start == this.originCity
						: item.date == value && this.destinationCitiy
							? item.destination == this.destinationCitiy
							: item.date == value && this.available
								? item.is_available == this.available
								: item.date == value,
				);
			}
		},
	},
});
