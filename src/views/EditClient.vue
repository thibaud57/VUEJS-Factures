<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2" />{{ form._id ? 'Editer':'Créer' }} un client {{ form.firstname ? form.firstname : '' }} {{ form.lastname ? form.lastname : '' }}</h3>
        <hr />
      </b-col>
    </b-row>

    <b-card class="shadow p-3" v-if="form.firstname">
      <b-row>
        <b-col lg=12 class="mb-2">
          <h3>Contact</h3>
        </b-col>


        <b-col lg=4>

          <b-form-group
              id="fieldset-firstname"
              label="Prénom"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="firstname"
          >
            <b-form-input id="firstname" v-model="form.firstname" />
          </b-form-group>

          <b-form-group
              id="fieldset-fonction"
              label="Fonction:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="fonction"
          >

            <b-form-input id="fonction" v-model="form.fonction" />
          </b-form-group>

        </b-col>
        <b-col lg=4>

          <b-form-group
              id="fieldset-lastname"
              label="Nom"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="lastname"
          >
            <b-form-input id="lastname" v-model="form.lastname" />
          </b-form-group>

          <b-form-group
              id="fieldset-phone"
              label="Telephone:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="phone"
          >

            <b-form-input id="phone" v-model="form.phone" />
          </b-form-group>
        </b-col>

        <b-col lg=4>
          <b-form-group
              id="fieldset-formdate"
              label="Date d'ajout:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="formdate"
          >
            <b-form-datepicker
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                id="formdate"
                v-model="form.date" />
          </b-form-group>





        </b-col>
        <b-col lg="8" class="mb-2">
          <b-form-group
              id="fieldset-email"
              label-cols-md="2"
              content-cols-md="10"
              label="Email:"
              label-for="email"
          >
            <b-form-input id="email" v-model="form.email"></b-form-input>
          </b-form-group>

          <b-form-group
              id="fieldset-entreprise"
              label-cols-md="2"
              content-cols-md="10"
              label="Entreprise:"
              label-for="entreprise"
          >
            <b-form-input id="entreprise" v-model="form.entreprise"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="mt-2 mb-2">
          <h3>Coordonnées</h3>
        </b-col>

        <b-col lg="8">
          <b-form-group
              id="fieldset-address1"
              label-cols-md="2"
              content-cols-md="10"
              label="Adresse 1:"
              label-for="address1"
          >
            <b-form-input id="address1" v-model="form.address1"></b-form-input>
          </b-form-group>

          <b-form-group
              id="fieldset-address2"
              label-cols-md="2"
              content-cols-md="10"
              label="Adresse 2:"
              label-for="address2"
          >
            <b-form-input id="address2" v-model="form.address2"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4"></b-col>

        <b-col lg="4">
          <b-form-group
              id="fieldset-postalCode"
              label-cols-md="4"
              content-cols-md="8"
              label="Code postal:"
              label-for="postalCode"
          >
            <b-form-input id="postalCode" v-model="form.postalCode"></b-form-input>
          </b-form-group>

                    <b-form-group
                        id="fieldset-country"
                        label-cols-md="4"
                        content-cols-md="8"
                        label="Pays:"
                        label-for="country"
                    >
                      <b-form-select
                          id="country"
                          v-model="form.country"
                          :options="countries" />
                    </b-form-group>
        </b-col>

        <b-col lg="4">

          <b-form-group
              id="fieldset-city"
              label-cols-md="4"
              content-cols-md="8"
              label="Ville:"
              label-for="city"
          >
            <b-form-input id="city" v-model="form.city"></b-form-input>
          </b-form-group>
        </b-col>


      </b-row>

      <hr>

      <b-row>
        <b-col>
          <b-button variant="danger" @click="onDeleteclient()">Supprimer</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" @click="onSaveclient()">Enregister</b-button>
        </b-col>
      </b-row>

    </b-card>

  </b-container>

</template>


<script>

import { mapState, mapActions } from 'vuex'

const newClient = {
  id: '',
  firstname: 'Votre prénom',
  lastname: 'Votre nom',
  date: new Date(),
  fonction: '',
  phone: '',
  email: '',
  entreprise: '',
  address1: '',
  address2: '',
  postalCode: '',
  city: '',
  country: 'France'
}

export default {
  name: 'Editclient',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      debug: true,
      countries: [
        { text: 'FRANCE', value: 'France' },
        { text: 'ALLEMAGNE', value: 'Allemagne' },
        { text: 'BELGIQUE', value: 'Belgique' },
        { text: 'ESPAGNE', value: 'Espagne' },
        { text: 'ITALIE', value: 'Italie' },
        { text: 'PORTUGAL', value: 'Portugal' }
      ],
      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    })
  },
  methods: {
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),

    onDeleteclient(){

      console.log(this.form.id)
      this.deleteClient(this.form._id)

      this.$router.push({ name: 'clients' })
    },

    onSaveclient(){
      this.saveClient( this.form ).then(()=> {
        this.$router.push({ name: 'clients' })
      })
    }
  },
  created() {

    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>
