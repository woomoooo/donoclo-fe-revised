/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import svg from "./svgs/icon-top.svg";
import { ReactSVG } from "react-svg";

function TopIcon(props: any) {
  const { src = svg, size = [], fill = "", ...rest } = props;
  const width = size[0] || "";
  const height = size.length === 2 ? size[1] || width : "";

  return (
    <ReactSVG
      {...rest}
      css={css`
        & > div > svg {
          width: calc(${width}px);
          height: calc(${height}px);
          > path {
            fill: ${fill};
          }
        }
      `}
      src={src}
    />
  );
}

export default TopIcon;