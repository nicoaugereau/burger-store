<template>
    <Banner />
    <div class="main-container">
        <h1 data-testid="page-title">Créez votre Burger</h1>
        <BurgerForm />
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
