import { gql } from '@apollo/client';

export const GET_INSCRIPTIONS = gql`
  query GetInscriptions {
    getInscriptions {
      _id
      status
      admissionDate
      departureDate
      projectId {
        _id
        name
      }
      studentId {
        _id
        fullName
      }
    }
  }
`;