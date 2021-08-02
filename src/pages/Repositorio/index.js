import React from "react";

export default function Repositorio({ match }) {
  return <h1>{match.params.repository}</h1>;
}
