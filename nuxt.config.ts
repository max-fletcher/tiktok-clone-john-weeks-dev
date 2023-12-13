// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
    css: ['~/assets/main.css'],
    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },
})
