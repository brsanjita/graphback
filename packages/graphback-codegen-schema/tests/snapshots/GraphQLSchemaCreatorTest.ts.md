# Snapshot report for `tests/GraphQLSchemaCreatorTest.ts`

The actual snapshot is saved in `GraphQLSchemaCreatorTest.ts.snap`.

Generated by [AVA](https://ava.li).

## Test snapshot config gql

> Snapshot 1

    `␊
    ␊
    type Note {␊
      id: ID!␊
      title: String!␊
      description: String!␊
      comment: [Comment!]␊
    }␊
    ␊
    type Comment {␊
      id: ID!␊
      title: String!␊
      description: String!␊
      note: Note!␊
    }␊
    ␊
    input NoteInput {␊
      title: String!␊
      description: String!␊
    }␊
    ␊
    input CommentInput {␊
      title: String!␊
      description: String!␊
      noteId: ID!␊
    }␊
    ␊
    input NoteFilter {␊
        id: ID␊
        title: String␊
        description: String␊
    }␊
    ␊
    input CommentFilter {␊
        id: ID␊
        title: String␊
        description: String␊
        noteId: ID␊
    }␊
    ␊
    type Query {␊
      findNotes(fields: NoteFilter!): [Note!]!␊
      findComments(fields: CommentFilter!): [Comment!]!␊
      findAllNotes: [Note!]!␊
      findAllComments: [Comment!]!␊
      ## Custom queries␊
      getLikedNotes(id: ID!, names: [String]!): Note!␊
    }␊
    ␊
    type Mutation {␊
      createNote(input: NoteInput!): Note!␊
      createComment(input: CommentInput!): Comment!␊
      updateNote(id: ID!, input: NoteInput!): Note!␊
      updateComment(id: ID!, input: CommentInput!): Comment!␊
      deleteNote(id: ID!): ID!␊
      deleteComment(id: ID!): ID!␊
      ## Custom mutations␊
      likeNote(id: ID!): Note!␊
    }␊
    ␊
    type Subscription {␊
      newNote: Note!␊
      newComment: Comment!␊
      updatedNote: Note!␊
      updatedComment: Comment!␊
      deletedNote: ID!␊
      deletedComment: ID!␊
    }␊
    `