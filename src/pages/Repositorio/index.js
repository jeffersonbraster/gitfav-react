/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import * as S from "./styles";

export default function Repositorio({ match }) {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState([
    { state: "all", label: "Todas", active: true },
    { state: "open", label: "Abertas", active: false },
    { state: "closed", label: "Fechadas", active: false },
  ]);

  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function loadRepo() {
      const nomeRepo = decodeURIComponent(match.params.repository);

      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    loadRepo();
  }, [match.params.repository]);

  useEffect(() => {
    async function loadIssues() {
      const nomeRepo = decodeURIComponent(match.params.repository);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    }

    loadIssues();
  }, [match.params.repository, page, filters, filterIndex]);

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (loading) {
    return (
      <S.Loading>
        <h1>Carregando..</h1>
      </S.Loading>
    );
  }

  return (
    <S.Container>
      <S.BackButton to="/">
        <FaArrowLeft color="#030517" size={30} />
      </S.BackButton>

      <S.Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />

        <h1>{repo.name}</h1>

        <p>{repo.description}</p>
      </S.Owner>

      <S.FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            type="button"
            key={filter.label}
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </S.FilterList>

      <S.IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url} target="_blank">
                  {issue.title}
                </a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </S.IssuesList>

      <S.PageActions>
        <button
          type="button"
          onClick={() => handlePage("back")}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage("next")}>
          Proxima
        </button>
      </S.PageActions>
    </S.Container>
  );
}
