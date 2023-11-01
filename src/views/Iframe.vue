<template>
    <Banner />
    <div class="main-container">
        <Iframe />
    </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import BurgerForm from '../components/BurgerForm.vue'
import Iframe from '../components/Iframe.vue'

export default {
    name: 'Home',
    components: {
        Banner,
        BurgerForm,
        Iframe
    }
}
</script>
