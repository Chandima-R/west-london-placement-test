'use client'

import {useSubscription} from "@apollo/client";
import {VIEW_ALL_CANDIDATES} from "@/graphql";
import {DataTable} from "@/modules/shared/data-table";
import {DataTableFunction} from "@/lib/data-table-functions";
import {ColumnDef} from "@tanstack/react-table";

type Candidates = {
    id: string;
    firstname: string;
    lastname: string;
    contact_number: string;
};


export const getColumns = (): ColumnDef<Candidates>[] => {
    return [
        {
            accessorKey: "id",
            header: "Candidate",
            cell: ({row}) => {
                const {firstname, lastname} = row.original;

                return (
                    <p
                        className="text-blue-900 hover:underline font-semibold cursor-pointer"

                    >
                        {firstname} {lastname}
                    </p>
                );
            },
        },

        {
            accessorKey: "email",
            header: "Email",
        },

        {
            accessorKey: "contact_number",
            header: "Contact number",
        },

        // {
        //     id: "actions",
        //     header: "Options",
        //     enableHiding: false,
        //     cell: ({row}) => {
        //         const availability = row.original.room.availability
        //
        //         console.log(availability)
        //         return (
        //             <div className="flex gap-4">
        //                 <TooltipProvider>
        //                     <Tooltip>
        //                         <TooltipTrigger asChild>
        //                             {
        //                                 availability === false ? (
        //                                     <Link
        //                                         href={`/dashboard/guests/${row.getValue("id")}/edit`}
        //                                         className="flex items-center gap-2 group tex-gray-400 hover:text-blue-400 cursor-pointer"
        //                                     >
        //                                         <Pencil className="w-3 h-3"/>
        //                                         <span className="text-xs">Edit</span>
        //                                     </Link>
        //                                 ) : (
        //                                     <p
        //                                         className="flex items-center gap-2 group tex-gray-400 cursor-not-allowed"
        //                                     >
        //                                         <Pencil className="w-3 h-3"/>
        //                                         <span className="text-xs">Edit</span>
        //                                     </p>
        //                                 )
        //                             }
        //                         </TooltipTrigger>
        //                         <TooltipContent>Edit</TooltipContent>
        //                     </Tooltip>
        //                 </TooltipProvider>
        //             </div>
        //         );
        //     },
        // },
    ];
};

export const CandidateDataTable = () => {
    const columns = getColumns();
    const {data: candidateData, loading: candidateDataLoading} = useSubscription(VIEW_ALL_CANDIDATES)

    const {table, pageIndex} = DataTableFunction({
        columns,
        tableData: candidateData?.candidate || [],
    });
    return (
        <div className="container mx-auto bg-white rounded-sm shadow p-4 border">
            <DataTable
                columns={columns}
                loading={candidateDataLoading}
                pageIndex={pageIndex}
                table={table}
            />
        </div>
    )
}