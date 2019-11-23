import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    flavor: "",
    toDoListItems: []
  },
  mutations: {
    change(state, flavor) {
      state.flavor = flavor;
    },
    setshoplist(state, list) {
      state.toDoListItems = list;
    },
    addshoplist(state, data) {
      state.toDoListItems.push(data);
    },
    editlistitem(state, item) {
      var editedIndex;
      var editedItem;
      editedIndex = state.toDoListItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
    }
  },
  getters: {
    flavor: state => state.flavor
  }
});
