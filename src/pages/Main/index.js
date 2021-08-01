import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import * as S from "./styles";

export default function Main() {
  return (
    <S.Container>
      <h1>
        <FaGithub size={25} /> Meus favoritos
      </h1>

      <S.Form onSubmit={() => {}}>
        <input type="text" placeholder="Add repo" />

        <S.SubmitButton>
          <FaPlus size={14} color="#EAEAEA" />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
