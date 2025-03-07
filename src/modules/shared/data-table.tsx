"use client";

import {ColumnDef, flexRender, Table as TableType,} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {ReactNode} from "react";
import PaginationComponent from "./pagination";
import {Loader} from "@/modules/shared/loader";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";

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
                                             searchFilter
                                         }: Props<TData, TValue>) {
    return (
        <div>
            {searchFilter && (
                <div className={"w-full flex items-center relative mb-4"}>
                    <Search
                        width="15"
                        height="15"
                        className={"text-slate-500 absolute left-2"}
                    />
                    <Input
                        className={"w-150 h-8 pl-7 text-xs"}
                        placeholder={`Search ${searchFilter}`}
                        value={
                            (table.getColumn(`${searchFilter}`)?.getFilterValue() as string) ??
                            ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(`${searchFilter}`)
                                ?.setFilterValue(event.target.value)
                        }
                    />
                    <div className="flex w-full justify-end ">
                        <Button
                            role="presentation"
                            className={"text-xs h-8 w-24 capitalize border-blue-900 bg-transparent text-blue-900 border rounded-xs cursor-pointer hover:bg-blue-100"}
                            onClick={() => {
                                table.resetColumnFilters(true);
                            }}
                        >
                            Clear Results
                        </Button>
                    </div>
                </div>
            )}

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