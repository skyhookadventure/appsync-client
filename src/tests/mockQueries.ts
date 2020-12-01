/**
 * @file
 *
 * Mock Types Document Node Query
 *
 * Auto-generated by https://graphql-code-generator.com/
 *
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  todo?: Maybe<Todo>;
};

export type QueryTodoArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["ID"];
  detail: Scalars["String"];
};

export type GetTodoQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetTodoQuery = { __typename?: "Query" } & {
  todo?: Maybe<{ __typename?: "Todo" } & Pick<Todo, "id" | "detail">>;
};

export const GetTodoDocument: DocumentNode<
  GetTodoQuery,
  GetTodoQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getTodo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "detail" } },
              ],
            },
          },
        ],
      },
    },
  ],
};