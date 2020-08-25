import {Component, OnInit, Input} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';


const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
      id
      title
      created_at
      is_completed
  }
 }`;

@Component({
  selector: 'TodoPrivateList',
  templateUrl: './TodoPrivateList.template.html',
})
export class TodoPrivateList implements OnInit {

  filter = 'all';
  clearInProgress = false;
  todos = [
    // {
    //   id: '1',
    //   title: 'This is private todo 1',
    //   is_completed: true,
    //   is_public: false
    // },
    // {
    //   id: '2',
    //   title: 'This is private todo 2',
    //   is_completed: false,
    //   is_public: false
    // }
  ];
  filteredTodos: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GET_MY_TODOS
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.todos = data.todos;
        this.filteredTodos = this.todos;
      });
  }

  filterResults($event) {
    this.filter = $event.filter;
    this.filteredTodos = this.todos;
    if (this.filter === 'active') {
      this.filteredTodos = this.todos.filter(todo => todo.is_completed !== true);
    } else if (this.filter === 'completed') {
      this.filteredTodos = this.todos.filter(todo => todo.is_completed === true);
    }
  }

  clearCompleted() {
  }
}
