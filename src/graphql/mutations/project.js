import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!, 
    $generalObjective: String!, 
    $specificObjectives: [String]!, 
    $budget: Int!
  ) {
    createProject(
      name: $name, 
      generalObjective: $generalObjective, 
      specificObjectives: $specificObjectives, 
      budget: $budget
    )
  }
`;

export const APPROVE_PROJECT = gql`
  mutation ApproveProject($id: ID!) {
    approveProject(_id: $id)
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!, 
    $name: String, 
    $generalObjective: String, 
    $specificObjectives: [String], 
    $budget: Int
  ) {
    updateProject(
      _id: $id, 
      name: $name, 
      generalObjective: $generalObjective, 
      specificObjectives: $specificObjectives, 
      budget: $budget
    )
  }
`;