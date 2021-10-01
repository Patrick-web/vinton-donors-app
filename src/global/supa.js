const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://tephcdfhqvrngcyytrys.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjg5NTgyNCwiZXhwIjoxOTQ4NDcxODI0fQ.PsLUl0z3MQdV99U95XRAiezSzNdpO7U4p1r467upIEE";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerDonor(newUserInfo) {
	let { user, error } = await supabase.auth.signUp({
		email: newUserInfo.email,
		password: newUserInfo.password,
	});
	if (user) {
		const newUser = {
			username: newUserInfo.username,
			email: newUserInfo.email,
			location: newUserInfo.location,
			bloodType: newUserInfo.bloodType,
			donations: [],
		};

		console.log(newUser);
		const { data, error } = await supabase.from("users").insert([newUser]);
		if (!error) {
			return data;
		} else {
			console.log(error);
			return false;
		}
	} else {
		console.log(error);
		alert("Error while registering");
	}
}

export async function loginUser(credentials, type) {
	console.log(credentials);
	let { user, error } = await supabase.auth.signIn(credentials);
	if (!error) {
		let { data, err } = await supabase
			.from(type)
			.select("*")
			.eq("email", user.email);
		if (!err) {
			console.log(data);
			return data[0];
		}
	} else {
		console.log(error);
		return false;
	}
}
export async function registerHospital(newHospitalInfo) {
	let { user, error } = await supabase.auth.signUp({
		email: newHospitalInfo.email,
		password: newHospitalInfo.password,
	});
	if (!error) {
		const newHospital = {
			username: newHospitalInfo.username,
			email: newHospitalInfo.email,
			location: newHospitalInfo.location,
			donationRequests: [],
			donationsCompleted: [],
			bloodDatabase: [
				{
					bloodType: "A+",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "A-",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "B+",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "B-",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "AB+",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "AB-",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "O+",
					balance: 0,
					minimum: 5,
				},
				{
					bloodType: "O-",
					balance: 0,
					minimum: 5,
				},
			],
		};

		console.log("Registered");

		const { data, error } = await supabase
			.from("hospitals")
			.insert([newHospital]);
		if (!error) {
			console.log("Hospital");
			console.log(data);
			return data;
		} else {
			return false;
		}
	} else {
		console.log(error);
		alert("Error while registering hospital");
	}
}

export async function newDonationRequest(newRequest) {
	console.log("Sending new request");
	const newBloodRequest = {
		id: Date.now(),
		hospital: newRequest.hospital,
		answered: false,
		bloodType: newRequest.bloodType,
		description: newRequest.description,
		accept_donor: "",
	};

	const { data, error } = await supabase
		.from("donation_requests")
		.insert([newBloodRequest]);

	if (!error) {
		return data;
	} else {
		return false;
	}
}

export async function newDonationCompleted(donation) {
	const newBloodDonation = {
		donorName: donation.donorName,
		bloodType: donation.bloodType.replace(/pos/, "+"),
		recipientName: donation.recipientName,
		date: donation.date,
		hospital: donation.hospital,
	};
	const { data, error } = await supabase
		.from("donation_requests")
		.insert([newBloodDonation]);

	if (!error) {
		return data;
	} else {
		return false;
	}
}

export async function getDonorDetails(email) {
	let { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("email", email);

	if (!error) {
		return user;
	} else {
		console.log("User Not Found");
		return null;
	}
}

export async function getDonorDonations(donorEmail) {
	let { data: hospitals, error } = await supabase.from("hospitals").select("*");
	if (!error) {
		console.log(donorEmail);
		console.log("==============");
		const allDonations = hospitals
			.map((hospital) => hospital.donationsCompleted)
			.flat();
		console.log(allDonations);
		const thisDonorDonations = allDonations.filter(
			(donation) => donation.donor == donorEmail
		);
		console.log(thisDonorDonations);
		groupDonations(thisDonorDonations);
		console.log("==============");
		return groupDonations(thisDonorDonations);
	} else {
		console.log(error);
		return false;
	}
}

function groupDonations(donations) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const donationMonths = new Set(
		donations.map((donation) => {
			const month = new Date(donation.date).getMonth();
			const monthName = monthNames[month];
			return monthName;
		})
	);
	const groupedDonations = new Map();
	donationMonths.forEach((month) => {
		groupedDonations.set(month, []);
	});
	donations.forEach((donation) => {
		const month = new Date(donation.date).getMonth();
		const monthName = monthNames[month];
		const thisMonthsDonations = groupedDonations.get(monthName);
		groupedDonations.set(monthName, [...thisMonthsDonations, donation]);
	});
	const groupedDonationsAsArray = Array.from(
		groupedDonations,
		([month, donations]) => ({
			month,
			donations,
		})
	);
	return groupedDonationsAsArray;
}

export async function getDonationRequestsRelevantToUser(bloodType) {
	let { data: requests, error } = await supabase
		.from("donation_requests")
		.select("*")
		.eq("bloodType", bloodType)
		.eq("answered", false);

	if (!error) {
		console.log("This users Donation Requests");
		console.log(requests);
		return requests;
	} else {
		console.log("Could not fetch Requests");
		return null;
	}
}

export async function getHospitalDetails(email) {
	let { data: hospital, error } = await supabase
		.from("hospitals")
		.select("*")
		.eq("email", email);

	if (!error) {
		return hospital;
	} else {
		console.log("Hospital Not Found");
		return null;
	}
}
export async function getDonationRequests(filter) {
	let { data: requests, error } = await supabase
		.from("donation_requests")
		.select("*")
		.eq(`${filter.column}`, `${filter.value}`);

	if (!error) {
		console.log("Donation Requests");
		console.log(requests);
		return requests;
	} else {
		console.log("Could not fetch Requests");
		return null;
	}
}

export async function hospital_addBloodDonation(donations, hospitalEmail) {
	console.log("Updated donations");
	console.log(donations);
	console.log(hospitalEmail);
	const { data, error } = await supabase
		.from("hospitals")
		.update({ donationsCompleted: donations })
		.eq("email", hospitalEmail);

	if (!error) {
		console.log(data[0]);
		console.log(data[0].donationsCompleted);
		return data[0].donationsCompleted;
	} else {
		return false;
	}
}

export async function updateHospitalDetails(updatedDetails, targetHospital) {
	const { data, error } = await supabase
		.from("hospitals")
		.update(updatedDetails)
		.eq("username", targetHospital);
	if (targetHospital.email) {
		const { user, err } = await supabase.auth.update({
			email: targetHospital.email,
		});
	}
	if (!error && !err) {
		console.log("Account Updated");
		console.log(data);
		return data;
	} else {
		console.log(error);
		return false;
	}
}
