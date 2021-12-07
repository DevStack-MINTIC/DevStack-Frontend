import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login(
    $email: String!, 
    $password: String!
  ) {
    login(
      email: $email, 
      password: $password
    )
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!, 
    $identificationNumber: String!, 
    $fullName: String!, 
    $password: String!, 
    $role: Role!
  ) {
    register(
      email: $email, 
      identificationNumber: $identificationNumber, 
      fullName: $fullName, 
      password: $password, 
      role: $role
    )
  }
`;
