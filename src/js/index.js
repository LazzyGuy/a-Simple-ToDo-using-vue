
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
        <p style="color: red;" v-if="error">Please type a task</p>
    </div>`,
   
    methods:{
        addItem(){
            
            if(this.newItem!=''){
                this.error = false
                this.$emit('newItemAdded',{text: this.newItem,isVisible: true,isChecked: false})
                this.newItem = ''
            }else{
                this.error = true
            }

            
            
        }
    },

    data(){
        return{
            newItem: '',
            error: false
        }
    }

})

// list component
Vue.component('todo-list',{
    template: `
    <div>
    <ul>
        <li v-for="item in itemlist" v-bind:item="item" v-bind:key="item.id">
           
            <div v-if="item.isVisible" class="notification has-text-left family-sans-serif" style="margin:12px;">
            <input type="checkbox" @click="item.isChecked=true">
                    {{item.text}} 
                    <button class="button is-light" style="float: right;" @click="item.isVisible=false">
                        <i class="fas fa-times"></i>
                    </button>
            </div>
        </li>

       
        
    </ul>
    </div>
    `,

    props:[
        'itemlist'
    ],
    
    data(){
        return{
            
        }
    },
    created(){
        
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
        <button class="button is-right is-light" v-if="show" @click="clearDoneTask">
    clear Complete         
    </button>
    </div>`,
    
    props: [
        'newitem'
    ],

    methods:{
        newItemAddedToList(obj){
           this.listItem.push(obj)
           this.show = true
        },
        clearDoneTask(){
            for(let i = 0;i<this.listItem.length;i++){
                if(this.listItem[i].isChecked==true){
                    this.listItem[i].isVisible==false
                }
            }
        }
    },

    data(){
        return{
            listItem: [],
            show: false
        }
    }
})


// root vue component
new Vue({

    el: '#root'
})