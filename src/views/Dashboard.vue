<template>
  <b-container>
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2"></i>Dashboard</h3>
      </b-col>        
    </b-row>
    <hr>

    <b-row class="mb-4">
      <b-col lg="5">
        <b-card class="shadow p-3 h-100">
          Graph Stats here
        </b-card>
      </b-col>

      <b-col lg="7">
        <b-card class="shadow p-3 h-100" title="Dernières Factures">
          <b-row>
            <b-col md="1">
              <h5>N°</h5>
            </b-col>
            <b-col md="3">
              <h5>Client</h5>
            </b-col>
            <b-col md="3">
              <h5>Montant HT</h5>
            </b-col>
            <b-col md="3">
              <h5>Montant TTC</h5>
            </b-col>
            <b-col md="2">
            </b-col>
          </b-row>
          <div class="row" v-for="item in twoLatestBills" :key="item">
            <b-col md="1">
              <p>{{item.id}}</p>
            </b-col>
            <b-col md="3">
              <p>{{item.client.firstname}}</p>
            </b-col>
            <b-col md="3">
              <p>montant ht</p>
            </b-col>
            <b-col md="3">
              <p>montant ttc</p>
            </b-col>
            <b-col  class="text-right" md="2">
              <b-button variant="light" size="md" :to="{ name: 'edition-facture', params: { id: item.id } }">
                Editer
              </b-button>
            </b-col>
          </div>
            <hr>

        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="5">
<!--        <b-card class="shadow p-3 mb-4">-->
<!--          <h3>Exemple counter:</h3>-->

<!--          <p class="h1 text-center">{{ counter }}</p>-->
<!--          <div class="d-flex justify-content-center mt-4">-->
<!--            <b-button @click="onAddCounter(-1)">- 1 au compteur</b-button>-->
<!--            <b-button class="ml-2" @click="onAddCounter(1)">+ 1 au compteur</b-button>-->
<!--          </div>-->
<!--        </b-card>-->

      </b-col>
      <b-col lg="7" class="mr-auto">
        <b-card class="shadow p-3 mb-4" title="Derniers clients">
            <b-row>
            <b-col md="4">
              <h5>Nom du contact</h5>
            </b-col>
            <b-col md="3">
              <h5>Entreprise</h5>
            </b-col>
            <b-col md="3">
              <h5>Date d'ajout</h5>
            </b-col>
              <b-col md="2">

              </b-col>
            </b-row>
          <div class="row" v-for="item in twoLatestClients" :key="item">
            <b-col md="4">
              <p><i class="fas fa-user"></i>
                {{item.firstname}} {{item.lastname}}</p>
            </b-col>
            <b-col md="3">
              <p>{{item.entreprise}}</p>
            </b-col>
            <b-col md="3">
              <p>{{item.date | date}}</p>
            </b-col>
            <b-col  class="text-right" md="2">
              <b-button variant="light" size="md" :to="{ name: 'edition-client', params: { id: item._id } }">
                 Editer
              </b-button>
            </b-col>
          </div>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    // mapState récupère la donnée bills du store dans le module bill
    // map `this.bills` avec `this.$store.bill.bills`
    ...mapState({
      bills: state => state.bill.bills,
      clients: state => state.client.clients
    }),
    ...mapActions('client', ['getClients']),
    ...mapGetters({
      //on utilise bill/ comme namespace car notre getters se trouve dans le module bill
      // map `this.twoLatestBills` avec `this.$store.getters.bill/getTwoLatestBills`
      twoLatestBills: 'bill/getTwoLatestBills',
      twoLatestClients: 'client/getTwoLatestClients'
    }),

    // utilisation du store principal (sans utiliser de module)
    // map `this.counter` avec this.$store.state.counter`
    // counter() {
    //   return this.$store.state.counter
    // }
  },
  methods: {
    // onAddCounter(num){
    //   // on doit déclencher une action dans le store
    //   // pour mettre à jour la donnée
    //   this.$store.dispatch('updateCounter', num)
    // }
  },
  created() {
    this.getClients().then(() => {
      console.log('liste mise à jour')
    })
    console.log(this.clients)
  },
}
</script>

<style scoped>

</style>