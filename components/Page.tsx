import styled from "styled-components";

const StyledPage = styled.div`
  padding: 13px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;
export const Page = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};
