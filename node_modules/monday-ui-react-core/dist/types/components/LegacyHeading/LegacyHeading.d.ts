import { DialogPosition, Sizes } from "../../constants";
import React, { CSSProperties } from "react";
import { HeadingTypes } from "./LegacyHeadingConstants";
import { VibeComponentProps } from "../../types";
export interface HeadingProps extends VibeComponentProps {
    type?: HeadingTypes;
    ariaLabel?: string;
    value?: string;
    ellipsis?: boolean;
    ellipsisMaxLines?: number;
    suggestEditOnHover?: boolean;
    /** Tooltip to show when no overflow */
    nonEllipsisTooltip?: string;
    size?: Sizes;
    highlightTerm?: string;
    customColor?: string;
    style?: CSSProperties;
    tooltipPosition?: DialogPosition;
}
declare const _default: ((import("../../types/VibeComponent").default<HeadingProps, unknown> & Partial<{
    types: typeof HeadingTypes;
    sizes: typeof Sizes;
}>) | (React.FC<HeadingProps> & Partial<{
    types: typeof HeadingTypes;
    sizes: typeof Sizes;
}>)) & {
    types: typeof HeadingTypes;
    sizes: typeof Sizes;
};
export default _default;
