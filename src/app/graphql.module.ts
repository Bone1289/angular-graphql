import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpHeaders} from '@angular/common/http';

const uri = 'https://hasura.io/learn/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    cache: new InMemoryCache(),
    link:  httpLink.create({
      uri: 'https://hasura.io/learn/graphql',
      headers:  new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    })
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
