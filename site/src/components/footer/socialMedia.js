import styled from "styled-components";

import { gap_x } from "../../styles/tailwindcss";
import { ReactComponent as Github } from "./github.svg";
import { ReactComponent as X } from "./x.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  ${gap_x(16)};
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  svg * {
    fill: ${(p) => p.theme.fontTertiary};
  }

  &:hover {
    svg {
      * {
        fill-opacity: 0.35 !important;
      }
    }
  }
`;

export default function SocialMedia() {
  return (
    <Wrapper>
      <Link
        href="https://github.com/3dpass/explorer"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <Github width={20} height={20} />
      </Link>
      <Link
        href="https://x.com/3Dpass_genesis"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <X width={20} height={20} />
      </Link>
    </Wrapper>
  );
}
