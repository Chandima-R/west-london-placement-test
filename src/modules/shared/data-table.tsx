"use client";

import {ColumnDef, flexRender, Table as TableType,} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {ReactNode} from "react";
import PaginationComponent from "./pagination";
import {Loader} from "@/modules/shared/loader";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props<TData, TValue> {
    columns: ColumnDef<TData>[];
    searchFilter?: string;
    table: TableType<TData>;
    pageIndex: number;
    customDropdownFunction?: () => ReactNode;
    loading: boolean;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             table,
                                             loading,
                                             pageIndex,
                                         }: Props<TData, TValue>) {
    return (
        <div>
            {loading ? (
                <div className={"flex items-center justify-center"}>
                    <Loader/>
                </div>
            ) : (
                <>
                    <div>
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="text-xs">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-xs">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <div>
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    </div>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <PaginationComponent table={table} pageIndex={pageIndex}/>
                </>
            )}
        </div>
    );
}