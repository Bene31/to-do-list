import Todos from './api/todos'
import './assets/css/style.css'
import {createApp} from 'vue'

const apiTodos = new Todos()

const app = createApp({
    data(){
        return{
            todos: [],
            form: {
                text: '',
                done: false,
            },
        }
    },
    created(){
        this.fetchTodos()
    },
    methods: {
        async fetchTodos(){
            this.todos = await apiTodos.index()
            console.log(this.todos)
        },
        async createTodo(){
            const data = await apiTodos.store(this.form)
            this.todos.push(data)

            this.form.text = ''
            this.form.done = false
        },
        async toggleTodoStatus(todo){
            const data = await apiTodos.update({
                ... todo,
                done: !todo.done
            })

            const index = this.todos.findIndex(({id}) => id == data.id)
            this.todos[index] = data
        },
        async deleteTodo(id){
            await apiTodos.delete({id})

            const index = this.todos.findIndex((todo) => todo.id == id)
            this.todos.splice(index, 1)
        },
    },
})

app.mount('#app')


/*const todos = new Todos()

    const response = await todos.index()
    const response = await todos.store({id: 5, text: 'beber água', done: true})
    const response = await todos.update({id: 5, text: 'beber água', done: true})
    const response = await todos.delete({id: 5})

    console.log(response)*/