
// Intput component
Vue.component('todo-input',{
    template: `
    <div class="family-sans-serif has-text-centered">
        <div class="field is-grouped">

            <p class="control is-expanded">
                <input class="input is-rounded" type="text" placeholder="Add new item !" v-model="newItem">
            </p>
            
            <p class="control">
                <a class="button is-outlined is-rounded" @click="addItem">
                    <span class="icon is-medium">
                        <i class="fa fa-check "></i>
                    </span>
                    
                    <span>
                        Add Item
                    </span>
                </a>
            </p>
        </div>
    </div>`,
   
    methods:{
        addItem(){
            
            if(this.newItem!=''){
                this.$emit('newItemAdded',{text: this.newItem,isVisible: true})
                this.newItem = ''
            }
            
        }
    },

    data(){
        return{
            newItem: ''
        }
    }

})

// list component
Vue.component('todo-list',{
    template: `
    <ul>
        <li v-for="item in itemlist" v-bind:item="item" v-bind:key="item.id">
            <div v-if="item.isVisible" class="notification has-text-left family-sans-serif" style="margin:12px;">
                    
                    {{item.text}} 
                    
                    <button class="button is-right is-light" @click="item.isVisible=false">
                        <i class="fas fa-times"></i>
                    </button>
            </div>
        </li>
    </ul>`,

    props:[
        'itemlist'
    ],
    
    data(){
        return{

        }
    }
})

// main todo component
Vue.component('to-do',{
    template: `
    <div>
        <todo-input v-bind:newitem="newitem" @newItemAdded="newItemAddedToList">
        </todo-input>
        <todo-list v-bind:itemlist="listItem">
        </todo-list>
    </div>`,
    
    props: [
        'newitem'
    ],

    methods:{
        newItemAddedToList(obj){
           this.listItem.push(obj)
        }
    },

    data(){
        return{
            listItem: []
        }
    }
})


// root vue component
new Vue({

    el: '#root'
})