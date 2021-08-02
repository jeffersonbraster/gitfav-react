import React, { useState, useEffect } from "react";
import api from "../../services/api";
import * as S from "./styles";

export default function Repositorio({ match }) {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);

  const [loading, setLoading] = useState(true);

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

  return <S.Container></S.Container>;
}
