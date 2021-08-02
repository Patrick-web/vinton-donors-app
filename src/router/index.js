import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Choice from "../views/Choice.vue";
import DonorLogin from "../views/DonorLogin.vue";
import DonorSignup from "../views/DonorSignup.vue";
import InstituteHome from "../views/InstituteHome.vue";
import InstituteLogin from "../views/InstituteLogin.vue";
import InstituteSignup from "../views/InstituteSignup.vue";
import DonorHome from "../views/DonorHome.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Choice",
		component: Choice,
	},
	{
		path: "/donor_login",
		name: "DonorLogin",
		component: DonorLogin,
	},
	{
		path: "/donor_signup",
		name: "DonorSignup",
		component: DonorSignup,
	},
	{
		path: "/institute_login",
		name: "InstituteLogin",
		component: InstituteLogin,
	},
	{
		path: "/institute_home",
		name: "InstituteHome",
		component: InstituteHome,
	},
	{
		path: "/institute_signup",
		name: "InstituteSignup",
		component: InstituteSignup,
	},
	{
		path: "/donor_home",
		name: "DonorHome",
		component: DonorHome,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
