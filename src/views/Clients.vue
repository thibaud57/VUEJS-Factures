<template>
  <div>
    <b-container>
      <b-row class="mt-5">
        <b-col>
          <h1 class="h3">
            <i class="fas fa-angle-down text-muted mr-2" />
            Liste des clients
          </h1>
          <p class="text-muted mb-0">Page: {{currentPage}}/{{totalPages}} - {{ rows }} résultats</p>
        </b-col>
        <b-col class="d-flex justify-content-end align-items-end">
          <b-button variant="light" class="mr-2" to="/editclient/0"><i class="fas fa-plus circle mr-2" />Ajout d'un client</b-button>
          <b-button variant="light" to="/editbill/0"><i class="fas fa-plus circle mr-2" />Ajout d'une facture</b-button>
        </b-col>
      </b-row>
      <hr>

      <b-card class="shadow p-3">
        <b-table
            id="clients-table"
            :current-page="currentPage"
            :per-page="perPage"
            stacked="md"
            :fields="fields"
            :items="clients">

          <template #cell(firstname)="row">
            {{row.item.firstname}} {{row.item.lastname}}
          </template>

          <template #cell(date)="row">
            {{row.value | date}}
          </template>

          <template #cell(actions)="row">
            <b-button variant="light" size="md" :to="{ name: 'edition-client', params: { id: row.item._id } }">
              <i class="fa-fw fas fa-pen mr-2 text-primary" /> Modifier
            </b-button>
          </template>

        </b-table>

        <b-pagination
            class="mt-4"
            align="center"
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="rows"
            aria-controls="clients-table"
        />
      </b-card>

    </b-container>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'


export default {
  name: 'Clients',
  data(){
    return {
      debug: true,
      perPage: 2,
      currentPage: 1,
      fields: [
        {
          key: 'firstname',
          label: 'Nom',
          class: 'cell-idfirstname',
          sortable: true
        },
        {
          key: 'entreprise',
          label: 'Entreprise',
          class: 'cell-entreprise',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date d\'ajout',
          class: 'cell-date',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'cell-actions',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      clients: state => state.client.clients
    }),

    totalPages(){
      return Math.ceil( this.rows / this.perPage )
    },
    rows(){
      return this.clients.length
    }
  },
  methods: {
    ...mapActions('client', ['getClients']),
  },
  created() {
    this.getClients().then(() => {
      console.log('liste mise à jour')
    })
  },
}
</script>

<style scoped>

</style>