import { gql } from '@apollo/client';

export const GET_PROGRESS_BY_PROJECT_ID = gql`
  query GetProgressByProjectId($projectId: ID!) {
    getProgressByProjectId(projectId: $projectId) {
      _id
      progressDate
      description
      observation
    }
  }
`;