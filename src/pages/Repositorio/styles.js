import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20px;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    text-transform: capitalize;
    color: #06092b;
  }

  p {
    margin-top: 7px;
    font-size: 14px;
    color: #030517;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 35px;
      border-radius: 50%;
      border: 2px solid #06092b;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #06092b;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #8f8f8f;
        transform: 0.2s;

        &:hover {
          color: #3cd3c1;
        }
      }

      span {
        background: #ff6347;
        color: #fafafa;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin-left: 10px;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: 0;
    border: 0;
    background: transparent;
    padding: 5px 10px;
    transition: 0.2s;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:hover {
      color: #f231a5;
    }
  }
`;

export const FilterList = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;

  button {
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;

    &:nth-child(${(props) => props.active + 1}) {
      background: #3cd3c1;
      color: #fdfdfd;
    }
  }
`;
