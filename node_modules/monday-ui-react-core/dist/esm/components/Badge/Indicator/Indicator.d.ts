import React from "react";
import { IndicatorColor } from "./IndicatorConstants";
import { VibeComponentProps } from "../../../types";
export interface IndicatorProps extends VibeComponentProps {
    color?: IndicatorColor;
}
declare const Indicator: React.FC<IndicatorProps> & {
    colors?: typeof IndicatorColor;
};
export default Indicator;
