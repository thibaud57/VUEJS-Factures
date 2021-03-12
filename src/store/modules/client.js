import Vue from 'vue'

const namespaced = true

const state = {
  client: {},
  clients: [
    {
      id: '',
      firstname: '',
      lastname: '',
      date: '',
      fonction: '',
      phone: '',
      email: '',
      entreprise: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      country: ''
    }
  ],
  loading: false
}

const mutations = {
  UPDATE_CLIENT(state, payload){
    state.client = payload
  },
  UPDATE_CLIENTS(state, payload){
    state.clients = payload
  },
  UPDATE_LOADING(state, payload){
    state.loading = payload
  }
}

const actions = {
  getClients({commit}) {
    commit('UPDATE_LOADING', true)
    return Vue.axios.get('/clients').then((response) => {
      // console.log(response.data)

      commit('UPDATE_CLIENTS', response.data)
      commit('UPDATE_LOADING', false)
    })
    
  },
  getClient({commit}, id) {
    commit('UPDATE_LOADING', true)
    return Vue.axios.get('/clients/'+ id).then((response) => {
      commit('UPDATE_CLIENT', response.data)
      commit('UPDATE_LOADING', false)
    })
  },

  //permet de récupérer les données d'une facture en fonction d'un id
  saveClient({commit}, payload) {

    commit('UPDATE_LOADING', true)
    //s'il y a un id, on modifie une facture existante
    if (payload._id) {
      //l'id de la bill qu'on veut enregistrer
      const id = payload._id

      return Vue.axios.patch(`/clients/${id}`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })

      //sinon, création d'une nouvelle facture
    } else {
      return Vue.axios.post(`/clients`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })
    }
  },

  deleteClient({commit}, id){
    commit('UPDATE_LOADING', true)

    return Vue.axios.delete('/clients/'+ id).then((response) => {
      
      console.log(response.data)
      commit('UPDATE_LOADING', false)
    })
  }
}

const getters = {
  getTwoLatestClients: (state) => {
    return state.clients.slice(0, 2)
  }
}


export {
  namespaced,
  state,
  mutations,
  actions,
  getters
}