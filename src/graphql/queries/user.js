import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      email
      identificationNumber
      fullName
      role
      state
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(_id: $id) {
      _id
      email
      identificationNumber
      fullName
      role
      state
    }
  }
`;