import React, { useState, useCallback, useEffect } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import * as S from "./styles";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");

  const [repository, setRepository] = useState([]);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState(null);

  //buscar os dados no storage
  useEffect(() => {
    const repoStorage = localStorage.getItem("GITFAV");

    if (repoStorage) {
      setRepository(JSON.parse(repoStorage));
    }
  }, []);

  //Salvando os repos em storagelocal
  useEffect(() => {
    localStorage.setItem("GITFAV", JSON.stringify(repository));
  }, [repository]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function submit() {
        setLoading(true);
        setAlert(null);
        try {
          if (newRepo === "") {
            throw new Error("Repositorio em branco.");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repository.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositorio já existe em seus favoritos.");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepository([...repository, data]);

          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repository]
  );

  const handleDeleteRepo = useCallback(
    (repo) => {
      const findRepo = repository.filter((r) => r.name !== repo);

      setRepository(findRepo);
    },
    [repository]
  );

  return (
    <S.Container>
      <h1>
        <FaGithub size={25} /> Meus Favoritos
      </h1>

      <S.Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Add repo"
          value={newRepo}
          onChange={handleInputChange}
        />

        <S.SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#EAEAEA" size={14} />
          ) : (
            <FaPlus size={14} color="#EAEAEA" />
          )}
        </S.SubmitButton>
      </S.Form>

      <S.List>
        {repository.map((repo) => (
          <li key={repo.name}>
            <span>
              <S.DeleteButton onClick={() => handleDeleteRepo(repo.name)}>
                <FaTrash size={14} />
              </S.DeleteButton>
              {repo.name}
            </span>
            <a href="#">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </S.List>
    </S.Container>
  );
}
