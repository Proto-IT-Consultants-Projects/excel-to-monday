import React from "react";
import { VibeComponent, VibeComponentProps } from "../../../types";
import { ITableCellProps } from "../TableCell/TableCell";
export interface ITableRowProps extends VibeComponentProps {
    /**
     * Does the row have a highlighted style
     */
    highlighted?: boolean;
    children?: React.ReactElement<ITableCellProps> | React.ReactElement<ITableCellProps>[];
    style?: React.CSSProperties;
}
declare const TableRow: VibeComponent<ITableRowProps, HTMLDivElement>;
export default TableRow;
