<template>
    <div id="nav">
        <router-link id="logo-url" to="/">
            <img :src="logo" :alt="alt" id="logo" />
        </router-link>
        <router-link data-testid="home-page" to="/">Home</router-link>
        <router-link data-testid="orders-page" to="/pedidos">Commandes</router-link>
        <router-link data-testid="iframe" to="/iframe">iframe</router-link>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['logo', 'alt']
}
</script>

<style scoped>
#nav {
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 1.3rem 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#nav #logo-url {
    margin: auto;
    margin-left: 0;
}

#logo {
    width: 3rem;
    height: 3rem;
}

#nav a {
    color: #fcba03;
    text-decoration: none;
    margin: 0.8rem;
    transition: 0.5s;
}

#nav a:hover {
    color: #fff;
}

@media (max-width: 768px) {
    #nav {
        width: 100%;
    }
}
</style>
