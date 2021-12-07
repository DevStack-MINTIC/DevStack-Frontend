import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      _id
      name
      status
      phase
      leader {
        fullName
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    getProjectById(_id: $id) {
      _id
      name
      generalObjective
      specificObjectives
      budget
      startDate
      endDate
      status
      phase
      leader {
        _id
        fullName
        email
        identificationNumber
      }
    }
  }
`;