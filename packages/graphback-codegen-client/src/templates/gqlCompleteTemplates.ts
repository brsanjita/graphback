import { getFieldName, getSubscriptionName, GraphbackCRUDOperationType, ModelDefinition } from '@graphback/core'
import { GraphQLObjectType } from 'graphql';
import { createMutation, deleteMutation, expandedFragment, findAllQuery, findQuery, fragment, subscription, updateMutation } from './gqlTemplates';

export const findAllQueryComplete = (t: GraphQLObjectType) => {
  return `

${findAllQuery(t)}

${expandedFragment(t)}

`
}

export const findQueryComplete = (t: GraphQLObjectType) => {

  return `

${findQuery(t)}

${expandedFragment(t)}

`
}


export const createMutationComplete = (t: GraphQLObjectType) => {

  return `

${createMutation(t)}

${fragment(t)}

`
}

export const updateMutationComplete = (t: GraphQLObjectType) => {
  return `

${updateMutation(t)}

${fragment(t)}

`
}

export const deleteMutationComplete = (t: GraphQLObjectType) => {
  return `

${deleteMutation(t)}

${fragment(t)}

`
}

export const subscriptionComplete = (t: GraphQLObjectType, subscriptionName: string) => {
  return `

${subscription(t, subscriptionName)}

${fragment(t)}

`
}


export const createQueries = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.find) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackCRUDOperationType.FIND),
        implementation: findQueryComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackCRUDOperationType.FIND_ALL),
        implementation: findAllQueryComplete(t.graphqlType)
      })
    }
  })

  return queries
}

const createMutations = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.create) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackCRUDOperationType.CREATE),
        implementation: createMutationComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackCRUDOperationType.UPDATE),
        implementation: updateMutationComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackCRUDOperationType.DELETE),
        implementation: deleteMutationComplete(t.graphqlType)
      })
    }
  })

  return mutations
}

const createSubscriptions = (types: ModelDefinition[]) => {
  const subscriptions = []

  types.forEach((t: ModelDefinition) => {
    const name = t.graphqlType.name;
    if (t.crudOptions.create && t.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackCRUDOperationType.CREATE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation)
      })
    }

    if (t.crudOptions.update && t.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackCRUDOperationType.UPDATE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation)
      })
    }

    if (t.crudOptions.delete && t.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackCRUDOperationType.DELETE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation)
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsGqlComplete = (inputContext: ModelDefinition[]) => {

  return {
    fragments: [],
    queries: createQueries(inputContext),
    mutations: createMutations(inputContext),
    subscriptions: createSubscriptions(inputContext)
  }
}

