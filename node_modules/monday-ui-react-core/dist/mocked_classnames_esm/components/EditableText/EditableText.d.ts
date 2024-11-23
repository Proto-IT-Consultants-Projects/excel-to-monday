import React from "react";
import { VibeComponent, VibeComponentProps } from "../../types";
import { EditableTypographyImplementationProps } from "../EditableTypography/EditableTypography";
import { TextType, TextWeight } from "../Text/TextConstants";
export interface EditableTextProps extends VibeComponentProps, EditableTypographyImplementationProps {
    /**
     * Sets the Text type
     * @type {TextType}
     * */
    type?: TextType;
    /** Sets the Text weight
     * @type {TextWeight}
     */
    weight?: TextWeight;
}
declare const _default: ((VibeComponent<EditableTextProps & React.RefAttributes<HTMLElement>, HTMLElement> & Partial<{
    types: typeof TextType;
    weights: typeof TextWeight;
}>) | (React.FC<EditableTextProps & React.RefAttributes<HTMLElement>> & Partial<{
    types: typeof TextType;
    weights: typeof TextWeight;
}>)) & {
    types: typeof TextType;
    weights: typeof TextWeight;
};
export default _default;
