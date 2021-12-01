import { gql } from '@apollo/client';

export const CREATE_PROGRESS = gql`
  mutation CreateProgress(
    $projectId: ID!, 
    $description: String!
  ) {
    createProgress(
      projectId: $projectId, 
      description: $description
    )
  }
`;

export const UPDATE_PROGRESS = gql`
  mutation UpdateProgress(
    $id: ID!, 
    $description: String!
    ) {
    updateProgress(
      _id: $id, 
      description: $description
    )
  }
`;

export const UPDATE_OBSERVATION = gql`
  mutation UpdateObsevation(
    $id: ID!, 
    $observation: String!
  ) {
    updateObsevation(
      _id: $id, 
      observation: $observation
    )
  }
`;
