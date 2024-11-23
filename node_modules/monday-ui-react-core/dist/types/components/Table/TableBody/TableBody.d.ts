import { ReactElement, ComponentProps } from "react";
import { VibeComponent, VibeComponentProps } from "../../../types";
import { ITableRowProps } from "../TableRow/TableRow";
import VirtualizedList from "../../VirtualizedList/VirtualizedList";
export interface ITableBodyProps extends VibeComponentProps {
    children?: ReactElement<ITableRowProps> | ReactElement<ITableRowProps>[] | ReactElement<ComponentProps<typeof VirtualizedList>>;
}
declare const TableBody: VibeComponent<ITableBodyProps, HTMLDivElement>;
export default TableBody;
