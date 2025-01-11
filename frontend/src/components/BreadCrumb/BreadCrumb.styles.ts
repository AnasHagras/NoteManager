import styled from "styled-components";

// Container for the breadcrumb
export const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin: 1rem 0;
`;

// Individual breadcrumb item
export const BreadCrumbItem = styled.span`
  color: rgb(20, 45, 112);
  cursor: pointer;
  //   color: black;
  &:hover {
    text-decoration: underline;
  }
`;

// Separator between breadcrumb items
export const BreadCrumbSeparator = styled.span`
  color: #888;
`;
