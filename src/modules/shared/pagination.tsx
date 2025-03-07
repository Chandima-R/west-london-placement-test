import {ArrowLeft, ArrowRight} from "lucide-react";
import * as React from "react";
import {Table as TableType} from "@tanstack/table-core";
import {Button} from "@/components/ui/button";

interface PaginationComponentProps<TData> {
    table: TableType<TData>;
    pageIndex: number;
}

export default function Pagination<TData>({
                                              table,
                                              pageIndex,
                                          }: PaginationComponentProps<TData>) {
    const getVisibleNumber = () => {
        const pageNumbersToShow = 6;
        const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);
        const visiblePageNumbers = [];
        const totalPages = table.getPageCount();
        let start = pageIndex - halfPageNumbersToShow;
        let end = pageIndex + halfPageNumbersToShow;

        if (start < 1) {
            start = 1;
            end = Math.min(pageNumbersToShow, totalPages);
        }

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - pageNumbersToShow + 1);
        }

        for (let i = start; i <= end; i += 1) {
            visiblePageNumbers.push(i);
        }
        return visiblePageNumbers;
    };

    return (
        <div className="flex w-full items-center justify-between space-x-2 py-4">
            <div className="text-muted-foreground flex items-center">
                <Button
                    className="flex h-8 w-24 text-xs items-center"
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeft width="20" height="20" className={"mr-1"}/>
                    <p>Previous</p>
                </Button>
            </div>
            <div className="flex w-full justify-center gap-1">
                {getVisibleNumber().map((pageNumber) => (
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-md bg-slate-200 focus:bg-slate-400 ${
                            pageIndex + 1 === pageNumber && "border"
                        }`}
                        key={pageNumber}
                        onClick={() => {
                            table.setPageIndex(pageNumber - 1);
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            <div>
                <Button
                    className="flex h-8 w-24 text-xs items-center"
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <p>Next</p>
                    <ArrowRight width="12" height="12" className={"ml-1"}/>
                </Button>
            </div>
        </div>
    );
}