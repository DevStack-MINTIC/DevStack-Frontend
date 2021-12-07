import { gql } from '@apollo/client';

export const UPDATE_USER_STATE = gql`
  mutation UpdateUserState($id: ID!, $state: State!) {
    updateUserState(_id: $id, state: $state)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $fullName: String, 
    $password: String
  ) {
    updateUser(
      fullName: $fullName, 
      password: $password
    )
  }
`;
