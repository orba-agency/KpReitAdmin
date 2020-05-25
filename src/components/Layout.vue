<template>
    <div class="c-app">
        <Navigation />
        <div class="c-wrapper c-fixed-components">
            <Header />
            <div class="c-body">
                <main class="c-main">
                    <router-view></router-view>
                </main>
            </div>
            <Footer class="footer"></Footer>
        </div>
    </div>
</template>

<script>
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

export default {
    name: 'Layout',

    components: {
        Header,
        Navigation,
        Footer,
    },
}
</script>
