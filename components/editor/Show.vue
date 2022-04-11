<template>
	<div>
		<template v-for="(block, index) in editorContent.blocks">
			<h2
				v-if="block.type === 'header' && block.data.level === 1"
				:key="block.id"
			>
				{{ block.data.text }}
			</h2>

			<h2
				v-else-if="block.type === 'header' && block.data.level === 2"
				:key="block.id"
			>
				{{ block.data.text }}
			</h2>

			<h3
				v-else-if="block.type === 'header' && block.data.level === 3"
				:key="block.id"
			>
				{{ block.data.text }}
			</h3>

			<h4
				v-else-if="block.type === 'header' && block.data.level === 4"
				:key="block.id"
			>
				{{ block.data.text }}
			</h4>

			<h5
				v-else-if="block.type === 'header' && block.data.level === 5"
				:key="block.id"
			>
				{{ block.data.text }}
			</h5>

			<h6
				v-else-if="block.type === 'header' && block.data.level === 6"
				:key="block.id"
			>
				{{ block.data.text }}
			</h6>

			<p
				v-else-if="block.type === 'paragraph'"
				:key="block.id"
				v-html="block.data.text"
			></p>

			<div
				v-else-if="block.type === 'list' && block.data.style === 'unordered'"
				:key="index"
			>
				<ul>
					<li v-for="item in block.data.items" :key="item">{{ item }}</li>
				</ul>
			</div>

			<div
				v-else-if="block.type === 'list' && block.data.style === 'ordered'"
				:key="index"
			>
				<ol>
					<li v-for="item in block.data.items" :key="item">{{ item }}</li>
				</ol>
			</div>

			<div :key="block.id" v-else-if="block.type === 'image'">
				<img :src="block.data.file.url" :alt="block.data.caption" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: "Blog",
	props: {
		editorContent: { type: Object, default: () => {} },
	},
};
</script>

<style lang="scss" scoped>
* {
	color: #1c1917;
}

h2 {
	display: block;
	font-size: 2em;
	margin-top: 0.67em;
	margin-bottom: 0.67em;
	margin-left: 0;
	margin-right: 0;
	font-weight: bold;
}

h3 {
	display: block;
	font-size: 1.5em;
	margin-top: 0.83em;
	margin-bottom: 0.83em;
	margin-left: 0;
	margin-right: 0;
	font-weight: bold;
}

h4 {
	display: block;
	font-size: 1.17em;
	margin-top: 1em;
	margin-bottom: 1em;
	margin-left: 0;
	margin-right: 0;
	font-weight: bold;
}

h5 {
	display: block;
	font-size: 1em;
	margin-top: 1.33em;
	margin-bottom: 1.33em;
	margin-left: 0;
	margin-right: 0;
	font-weight: bold;
}

h6 {
	display: block;
	font-size: 0.83em;
	margin-top: 1.67em;
	margin-bottom: 1.67em;
	margin-left: 0;
	margin-right: 0;
	font-weight: bold;
}

// h6 {
//   display: block;
//   font-size: .67em;
//   margin-top: 2.33em;
//   margin-bottom: 2.33em;
//   margin-left: 0;
//   margin-right: 0;
//   font-weight: bold;
//}

img {
	margin: auto;
}

ul {
	list-style-type: disc;
	list-style-position: inside;
}

ol {
	list-style-type: decimal;
	list-style-position: inside;
}

::v-deep a {
	text-decoration: underline;
}
h1 {
	font-weight: 700;
	font-size: 41px;
	line-height: 51px;
}
</style>
