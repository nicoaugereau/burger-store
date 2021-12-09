<template>
    <div data-testid="orders-table" id="burger-table">
        <Message :msg="msg" v-show="msg" />
        <div>
            <div id="burger-table-heading">
                <div class="order-id">N°:</div>
                <div>Client</div>
                <div>Pain</div>
                <div>Viande</div>
                <div>Options</div>
                <div>Actions</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div data-testid="order-id" class="order-number">{{ burger.id }}</div>
                <div data-testid="order-nome">{{ burger.nome }}</div>
                <div data-testid="order-pao">{{ burger.pao }}</div>
                <div data-testid="order-carne">{{ burger.carne }}</div>
                <div data-testid="order-opcionais">
                    <ul>
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <div>
                    <select data-testid="order-status" name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option value="">Selection</option>
                        <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">{{ s.tipo }}</option>
                    </select>
                    <button data-testid="order-delete" class="delete-btn" @click="deleteBurger(burger.id)">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue'

export default {
    name: 'Dashboard',
    components: {
        Message
    },
    data() {
        return {
            burgers: null,
            burger_id: null,
            status: [],
            msg: null
        }
    },
    methods: {
        async getPedidos() {
            const req = await fetch('http://localhost:3000/burgers')

            const data = await req.json()

            this.burgers = data

            this.getStatus()
        },
        async getStatus() {
            const req = await fetch('http://localhost:3000/status')

            const data = await req.json()

            this.status = data
        },
        async deleteBurger(id) {
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: 'DELETE'
            })

            const res = req.json()

            //recarrega página de pedidos
            this.getPedidos()

            //mensagem
            this.msg = `Commande N°${id} supprimée avec sucess !`

            //apagando mensagem
            setTimeout(() => (this.msg = ''), 3000)
        },
        async updateBurger(event, id) {
            const option = event.target.value

            const dataJson = JSON.stringify({ status: option })

            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: dataJson
            })

            const res = req.json()

            //mensagem
            this.msg = `Commande N°${id} actualisée à ${option}!`

            //apagando mensagem
            setTimeout(() => (this.msg = ''), 3000)
        }
    },

    mounted() {
        this.getPedidos()
    }
}
</script>

<style scoped>
#burger-table {
    max-width: 90rem;
    margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
    display: flex;
    flex-wrap: wrap;
}

#burger-table-heading {
    font-weight: bold;
    padding: 1.5rem;
    border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
    width: 19%;
}

.burger-table-row {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
    width: 5%;
}

select {
    padding: 0.8rem 0.4rem;
}

.delete-btn {
    background-color: #222;
    color: #fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 0.8rem;
    font-size: 0.9rem;
    margin: 0 auto;
    cursor: pointer;
    transition: 0.5s;
}

.delete-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>
