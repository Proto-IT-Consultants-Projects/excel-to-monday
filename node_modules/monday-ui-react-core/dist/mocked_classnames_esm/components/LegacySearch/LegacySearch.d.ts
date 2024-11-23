import React from "react";
import { SearchType } from "./SearchConstants";
import { SubIcon, VibeComponentProps, VibeComponent } from "../../types";
import { BASE_SIZES } from "../../constants";
export interface SearchProps extends VibeComponentProps {
    secondaryIconName?: SubIcon;
    iconName?: SubIcon;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    debounceRate?: number;
    onBlur?: (event: React.FocusEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    wrapperClassName?: string;
    setRef?: () => void;
    autoComplete?: string;
    size?: (typeof BASE_SIZES)[keyof typeof BASE_SIZES];
    type?: SearchType;
    validation?: {
        status: "error" | "success";
        text: string;
    } | {
        text: string;
    };
    inputAriaLabel?: string;
    searchResultsContainerId?: string;
    activeDescendant?: string;
    iconNames?: {
        layout: string;
        primary: string;
        secondary: string;
    };
    /** shows loading animation */
    loading?: boolean;
}
declare const _default: ((VibeComponent<SearchProps & React.RefAttributes<unknown>, unknown> & Partial<{
    sizes: {
        readonly SMALL: "small";
        readonly MEDIUM: "medium";
        readonly LARGE: "large";
    };
    types: typeof SearchType;
}>) | (React.FC<SearchProps & React.RefAttributes<unknown>> & Partial<{
    sizes: {
        readonly SMALL: "small";
        readonly MEDIUM: "medium";
        readonly LARGE: "large";
    };
    types: typeof SearchType;
}>)) & {
    sizes: {
        readonly SMALL: "small";
        readonly MEDIUM: "medium";
        readonly LARGE: "large";
    };
    types: typeof SearchType;
};
export default _default;
