import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../../services/api";
import * as S from "./styles";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");

  const [repository, setRepository] = useState([]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function submit() {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        setRepository([...repository, data]);

        setNewRepo("");
      }

      submit();
    },
    [newRepo, repository]
  );

  return (
    <S.Container>
      <h1>
        <FaGithub size={25} /> Meus Favoritos
      </h1>

      <S.Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add repo"
          value={newRepo}
          onChange={handleInputChange}
        />

        <S.SubmitButton>
          <FaPlus size={14} color="#EAEAEA" />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
