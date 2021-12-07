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

export const GET_INSCRIPTIONS_BY_STUDENT_ID = gql`
  query Query {
    getInscriptionsByStudentId
  }
`;