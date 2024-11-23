import React from "react";
import { VibeComponent, VibeComponentProps } from "../../../types";
import { ITableHeaderCellProps } from "../TableHeaderCell/TableHeaderCell";
export interface ITableHeaderProps extends VibeComponentProps {
    children?: React.ReactElement<ITableHeaderCellProps> | React.ReactElement<ITableHeaderCellProps>[];
}
declare const TableHeader: VibeComponent<ITableHeaderProps, HTMLDivElement>;
export default TableHeader;
