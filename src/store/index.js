import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		donorDetails: null,
		donorDonations: [],
		donorRelevantRequests: [],
		hospitalDetails: null,
		donationsRequests: [],
		pendingBloodRequests: [],
		answeredBloodRequests: [],
	},
	mutations: {
		setDonorDetails(state, payload) {
			console.log("Donor Details Set");
			console.log(payload);
			state.donorDetails = payload;
		},
		setDonorDonations(state, payload) {
			state.donorDonations = payload;
		},
		setDonorRelevantRequests(state, payload) {
			state.donorRelevantRequests = payload;
		},
		setHospitalDetails(state, payload) {
			state.hospitalDetails = payload;
		},
		setDonationRequest(state, payload) {
			state.donationsRequests = payload;
		},
		addBloodRequest(state, payload) {
			state.donationsRequests.push(payload);
		},
		setHospitalDonations(state, payload) {
			state.hospitalDetails.donationsCompleted = payload;
		},
	},
	getters: {
		hospitalDonations(state) {
			return state.hospitalDetails?.donationsCompleted || [];
		},
		hospitalAccountDetails(state) {
			const account = {
				username: state.hospitalDetails.username,
				email: state.hospitalDetails.email,
				location: state.hospitalDetails.location,
				bloodType: state.hospitalDetails.bloodType,
			};
			return account;
		},
		bloodDatabase(state) {
			return state.hospitalDetails?.bloodDatabase || [];
		},
		bloodRequests(state) {
			return {
				pending: state.donationsRequests
					.filter((request) => !request.answered)
					.reverse(),
				answered: state.donationsRequests
					.filter((request) => request.answered)
					.reverse(),
			};
		},
	},
});
