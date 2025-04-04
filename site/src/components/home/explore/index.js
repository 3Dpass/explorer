import { useRef } from "react";
import styled, { css } from "styled-components";
import { smcss } from "../../../styles/responsive";
import { bg_theme500, w_full } from "../../../styles/tailwindcss";
import { Inter_24_700 } from "../../../styles/text";
import { useIsDark } from "../../../utils/hooks";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import ExploreInputOrigin from "./input";

const ExploreInput = styled(ExploreInputOrigin)`
  ${w_full};
`;

const ExploreButton = styled(Button)`
  ${(p) => p.dark && bg_theme500};
`;

const Wrapper = styled(Flex)`
  width: 644px;
  position: relative;
  gap: 16px;

  ${smcss(w_full)};
  ${smcss(css`
    flex-wrap: wrap;
    input,
    button {
      flex-basis: 100%;
    }
  `)}
`;

const Title = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  text-transform: capitalize;
  color: ${(props) => props.theme.fontPrimary};
`;

export default function Explore() {
  const exploreRef = useRef();
  const isDark = useIsDark();

  function handleExplore() {
    exploreRef.current.handleExplore();
  }

  return (
    <div>
      <Title>The Ledger of Things Explorer</Title>
      <Wrapper style={{ gap: 16 }}>
        <ExploreInput ref={exploreRef} />
        <ExploreButton dark={isDark} onClick={handleExplore}>
          Explore
        </ExploreButton>
      </Wrapper>
    </div>
  );
}
