<template>
  <v-app>
    <v-container fluid>
      <v-layout row wrap align-center justify-center>
        <v-flex xs6>
          <v-layout justify-center>
            <h1>To Do List</h1>
          </v-layout>
          <v-divider></v-divider>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12></v-flex>
        <v-spacer></v-spacer>
        <v-flex xs6 sm6>
          <v-data-table :headers="headers" :items="toDoItems">
            <template v-slot:top>
              <v-toolbar>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-layout justify-center>
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </v-layout>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="To Do Item"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon small @click="deleteItem(item)">delete</v-icon>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Task",
        value: "name",
        width: "80%"
      },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    toDoItems(){
      return this.$store.state.toDoListItems
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.toDoItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.commit('editlistitem', item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.toDoItems.indexOf(item);
      this.toDoItems.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.toDoItems[this.editedIndex], this.editedItem);
      } else {
        this.toDoItems.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
