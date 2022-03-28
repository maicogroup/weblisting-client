const isDev = process.env.NODE_ENV === 'development';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;1,400&family=Source+Serif+Pro:wght@700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // ...
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css'
    // ...
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lightGallery.client.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/editor.client.js'
  ],

  loading: {
    color: '#16A34A',
    height: '5px'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@nuxtjs/google-analytics'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false
    }
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://maico.vn:3101/graphql/'
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/router',
    'cookie-universal-nuxt',
    '@nuxtjs/toast'
  ],
  router: {
    middleware: ['cookies', 'userBehaviorTracking']
  },

  toast: {
    position: 'center',
    register: [ // Register custom toasts
      {
        name: 'featured-not-supported',
        message: 'Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn',
        options: {
          type: 'success',
          duration: 4000
        }
      }
    ]
  },

  // eslint-disable-next-line no-dupe-keys
  toast: {
    position: 'top-right',
    register: [{
      name: 'my-error',
      message: 'Oops...Something went wrong',
      options: {
        type: 'error'
      }
    }]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: !isDev,
      sourceRoot: __dirname
    },
    extend (config, { isClient }) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map';
      }
    }
  },
  googleAnalytics: {
    // Options
    id: 'G-ES9KCCENYC'
  }
};
