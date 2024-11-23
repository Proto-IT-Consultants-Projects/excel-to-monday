import React from "react";
import { TypographyColor } from "../Typography/TypographyConstants";
type AlertBannerContextType = {
    textColor: TypographyColor.ON_PRIMARY | TypographyColor.ON_INVERTED | TypographyColor.FIXED_DARK;
};
export declare const AlertBannerContext: React.Context<AlertBannerContextType>;
export {};
