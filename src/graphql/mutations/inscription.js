import { gql } from '@apollo/client';

export const CREATE_INSCRIPTION = gql`
  mutation CreateInscription($projectId: ID!) {
    createInscription(projectId: $projectId)
  }
`;

export const APPROVE_INSCRIPTION = gql`
  mutation ApproveInscription($id: ID!, $status: Status!) {
    approveInscription(_id: $id, status: $status)
  }
`;
