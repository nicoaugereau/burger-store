<template>
    <div class="main-container">
        <h1 data-testid="page-title">Gestion des commandes</h1>
        <Dashboard />
    </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'
export default {
    name: 'Pedidos',
    components: {
        Dashboard
    }
}
</script>
