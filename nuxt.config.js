const isDev = process.env.NODE_ENV === 'development'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // script: [
    //   { src: '/js/onBeforeUnload.js', body: true, isSSR: false }
    // ]
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
    '~/plugins/editor.client.js',
    '~/plugins/lightGallery.client.js'
  ],


  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
      {
        path: '~/components', // will get any components nested in let's say /components/test too
        pathPrefix: false
      }
    ]
  ,
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://maicogroup.net:3001/graphql/'
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/router',
    'cookie-universal-nuxt',
  ],
  router: {
    middleware: ['cookies', 'userBehaviorTracking']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: !isDev ,
      sourceRoot : __dirname
    },
    extend(config, {isClient}) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
};
