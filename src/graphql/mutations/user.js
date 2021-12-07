import { gql } from '@apollo/client';

export const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus(
    $id: ID!, 
    $status: Status!
  ) {
    updateUserStatus(
      _id: $id, 
      status: $status
    )
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
