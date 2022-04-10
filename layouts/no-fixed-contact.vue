<template>
	<div>
		<MainHeader />
		<div class="relative flex justify-center max-w-full mt-header">
			<Nuxt />
		</div>
		<MainFooter />

		<tracking-data />
		<facebook-chat />
	</div>
</template>

<script>
import MainHeader from "./components/mainHeader/MainHeader.vue";
import MainFooter from "./components/mainFooter.vue";
import TrackingData from "./components/tracking-data.vue";
import FacebookChat from "./components/facebook-chat.vue";

export default {
	name: "DefaultLayout",
	components: { MainHeader, MainFooter, TrackingData, FacebookChat },
	jsonld() {
		return {
			"@context": "http://schema.org",
			"@type": "Organization",
			url: "https://maico.vn",
			logo: "https://maico.vn/images/logo.png",
			contactPoint: [
				{
					"@type": "ContactPoint",
					telephone: "0938 140 024",
					contactType: "customer service",
				},
			],
			sameAs: [
				"https://www.facebook.com/maicogroup",
				"https://www.linkedin.com/company/maicogroup/",
			],
		};
	},
};
</script>

<style scoped>
.mt-header {
	margin-top: 73px;
}
</style>
