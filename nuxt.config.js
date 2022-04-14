const isDev = process.env.NODE_ENV === "development";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "client",
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;1,400&family=Source+Serif+Pro:wght@700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // ...
    "quill/dist/quill.core.css",
    // for snow theme
    "quill/dist/quill.snow.css",
    // for bubble theme
    "quill/dist/quill.bubble.css",
    // ...
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lightGallery.client.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/editor.client.js',
    '~/plugins/editorjs.client.js',
    '~/plugins/jsonld',
    '~/plugins/gtag'
  ],

  loading: {
    color: "#16A34A",
    height: "5px",
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api-listing.maico.vn/graphql/'
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/router',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap'
  ],
  router: {
    middleware: ["cookies", "userBehaviorTracking"],
  },

  toast: {
    position: "center",
    register: [
      // Register custom toasts
      {
        name: "featured-not-supported",
        message: "Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn",
        options: {
          type: "success",
          duration: 4000,
        },
      },
    ],
  },

  // eslint-disable-next-line no-dupe-keys
  toast: {
    position: "top-right",
    register: [
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: !isDev,
      sourceRoot: __dirname,
    },
    extend(config, { isClient }) {
      if (isDev) {
        config.devtool = isClient ? "source-map" : "inline-source-map";
      }
    }
  },
  sitemap:{
    hostname: 'https://maico.vn',
    gzip: true,
    exclude: [
      '/**',
    ],
    routes: [
      'cho-thue-can-ho-chung-cu-lavita-charm-thu-duc',
      'ban-can-ho-chung-cu-lavita-charm-thu-duc',
      '/du-an/chung-cu-lavita-charm',
      'ban-can-ho-chung-cu-sunview-town-thu-duc',
      'cho-thue-can-ho-chung-cu-sunview-town-thu-duc',
      '/du-an/chung-cu-sunview-town',
      'ban-can-ho-chung-cu-the-art-quan-9',
      'cho-thue-can-ho-chung-cu-the-art-quan-9',
      '/du-an/chung-cu-the-art-gia-hoa',
      'ban-can-ho-chung-cu-him-lam-phu-an',
      'cho-thue-can-ho-chung-cu-him-lam-phu-an-quan-9',
      '/du-an/chung-cu-him-lam-phu-an',
      'ban-can-ho-chung-cu-the-sun-avenue-quan-2',
      'cho-thue-can-ho-the-sun-avenue-quan-2',
      '/du-an/chung-cu-the-sun-avenue',
      'ban-can-ho-chung-cu-sai-gon-gateway-quan-9',
      'cho-thue-can-ho-chung-cu-sai-gon-gateway-quan-9',
      '/du-an/chung-cu-sai-gon-gateway',
      'cho-thue-can-ho-chung-cu-opal-boulevard',
      '/du-an/chung-cu-opal-boulevard',
      'ban-can-ho-chung-cu-opal-boulevard',
      'ban-can-ho-chung-cu-dat-gia-thu-duc',
      'cho-thue-can-ho-chung-cu-dat-gia-thu-duc',
      '/du-an/chung-cu-dat-gia-residence',
      'ban-can-ho-chung-cu-4s-linh-dong-thu-duc',
      'cho-thue-can-ho-chung-cu-4s-linh-dong-thu-duc',
      '/du-an/chung-cu-4s-linh-dong',
      'cho-thue-can-ho-chung-cu-marina-tower-thuan-an',
      'ban-can-ho-chung-cu-marina-tower-thuan-an',
      '/du-an/chung-cu-marian-tower',
      'cho-thue-can-ho-chung-cu-vinhomes-central-park',
      'ban-can-ho-chung-cu-vinhomes-central-park',
      '/du-an/chung-cu-vinhomes-central-park',
      'ban-can-ho-chung-cu-sai-gon-avenue-thu-duc',
      'cho-thue-can-ho-chung-cu-sai-gon-avenue-thu-duc',
      '/du-an/chung-cu-sai-gon-avenue'
    ]
  }
};
