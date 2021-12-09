<template>
    <Message :msg="msg" v-show="msg" />
    <div>
        <form data-testid="orders-form" id="burger-form" @submit="createBurger">
            <div class="input-container">
                <label for="nome">Nom de l'utilisateur :</label>
                <input data-testid="username" type="text" id="nome" name="nome" v-model="nome" placeholder="Saisissez votre nom" />
            </div>
            <div class="input-container">
                <label for="pao">Choisissez votre pain :</label>
                <select data-testid="pao" name="pao" v-model="pao" id="pao">
                    <option value="">Sélectionnez votre pain</option>
                    <option data-testid="pao-option" v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                </select>
            </div>
            <div class="input-container">
                <label for="carne">Choisissez la viande de votre burger :</label>
                <select data-testid="carne" v-model="carne" name="carne" id="carne">
                    <option value="">Sélectionnez la viande</option>
                    <option data-testid="carne-option" v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                </select>
            </div>
            <div class="input-container">
                <label id="opcionais-title" for="opcionais">Choisissez les options :</label>
                <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                    <input data-testid="opcionais-option" type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo" />
                    <span>{{ opcional.tipo }}</span>
                </div>
            </div>
            <div class="input-container">
                <input data-testid="submit-order" type="submit" class="submit-btn" value="Créer mon Burger!" />
            </div>
        </form>
    </div>
</template>

<script>
import Message from './Message.vue'

export default {
    name: 'BurgerForm',
    components: {
        Message
    },
    data() {
        return {
            paes: null,
            carnes: null,
            opcionaisdata: null,
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            msg: null
        }
    },
    methods: {
        async getIngredientes() {
            const req = await fetch('http://localhost:3000/ingredientes')
            const data = await req.json()

            this.paes = data.paes
            this.carnes = data.carnes
            this.opcionaisdata = data.opcionais
        },

        async createBurger(e) {
            e.preventDefault()

            const data = {
                nome: this.nome,
                pao: this.pao,
                carne: this.carne,
                opcionais: Array.from(this.opcionais),
                status: 'En attente'
            }

            const dataJson = JSON.stringify(data)

            const req = await fetch('http://localhost:3000/burgers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: dataJson
            })

            const res = await req.json()

            //limpar inputs
            this.nome = ''
            this.pao = ''
            this.carne = ''
            this.opcionais = ''

            //mensagem
            this.msg = `Pedido N°${res.id} realizado com sucesso!`

            //apagando mensagem
            setTimeout(() => (this.msg = ''), 3000)
        }
    },
    mounted() {
        this.getIngredientes()
    }
}
</script>

<style scoped>
#burger-form {
    max-width: 10rem;
    margin: 0 auto;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

label {
    font-weight: bold;
    margin-bottom: 1.4rem;
    color: #222;
    padding: 0.4rem 0.7rem;
    border-left: 4px solid #fcba03;
}

input,
select {
    padding: 0.5rem 0.8rem;
    width: 20rem;
}

#opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
}

#opcionais-title {
    width: 100%;
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 1.2rem;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span {
    font-weight: bold;
    margin-left: 0.5rem;
}

.submit-btn {
    background-color: #222;
    color: #fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 0.7rem;
    font-size: 1.2rem;
    margin: 0 auto;
    cursor: pointer;
    transition: 0.5s;
}

.submit-btn:hover {
    background-color: transparent;
    color: #222;
}

@media (max-width: 768px) {
    #burger-form {
        max-width: 100%;
    }
}
</style>
