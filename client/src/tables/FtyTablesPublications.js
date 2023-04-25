import React from "react";
import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { Button } from "@material-tailwind/react";


export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";
    return (
        <span
            className={classNames(
                "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",

                status.startsWith("verified") ? "bg-green-100 text-green-700" : null,
                status.startsWith("pending..") ? "bg-red-100 text-red-700" : null
            )}
        >
            {status}
        </span>
    );
}

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function FtyTablesPublications({ columns, data,utype }) {
    var email = localStorage.getItem('email');

    const navigate = useNavigate();
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage,
        nextPage, previousPage, setPageSize, state, // new
        preGlobalFilteredRows, // new
        setGlobalFilter, } =
        useTable({
            columns,
            data,
        },
            useGlobalFilter,
            useSortBy,
            usePagination);

    // Render the UI for your table
    return (
        <>
            <div style={{ display: "flex" }}>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}

                />


                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" style={{ marginLeft: "auto", }} onClick={() => navigate("./FtyPublicationAdd.js",{state:{utype:utype}})} >Add More</button>
            </div> <br />
            <div className="pagination"  >
                              <button class="mr-1 bg-gray-300 hover:bg-gray-400 focus:bg-blue-700 text-black font w-28 h-6 rounded-md"  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            
                                {'Start Page'}
                              </button>{' '}
                              <button class="mr-2 bg-gray-300 hover:bg-gray-400 focus:bg-blue-700 text-black font w-16 h-6 rounded-md"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'prev'}
                              </button>{' '}
                              <span class="mr-10">
                                Page{' '}
                                <strong>
                                  {state.pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                              </span>
                              
                              
                              <select
         value={state.pageSize}
          onChange={e => {
          setPageSize(Number(e.target.value));
           }}
  className="mr-4 bg-gray-100 hover:bg-white-600 focus:bg-white-300 text-black font w-18 h-6 rounded-none flex justify-center items-center"
                                               >
                                       {[5, 10, 20].map(pageSize => (
                                                       <option
                                                  key={pageSize}
                                                value={pageSize}
                                          className="text-black font" 
                                                >
                                            {"Show "}{pageSize}
                                     </option>
                                      ))}
                                </select>

                              <button class="mr-1 bg-gray-300 hover:bg-gray-400 focus:bg-blue-700 text-black font w-16 h-6 rounded-md" onClick={() => nextPage()} disabled={!canNextPage}>
                                {'next'}
                              </button>{' '}
                              <button class="mr-10 bg-gray-300 hover:bg-gray-400 focus:bg-blue-700 text-black font w-28 h-6 rounded-md" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'End Page'}
                              </button>{' '}
                             
           
            
                            
                            </div>
      
      
      <br></br>     
      
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render("Header")}
                                                    {/* Add a sort direction indicator */}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' ▼'
                                                                : ' ▲'
                                                            : ''}
                                                    </span>

                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row);
                                        if(utype === "1" || utype === "4"){
                                            return (
                                                <tr {...row.getRowProps()}>
                                                 
    
                                                    {row.cells.map((cell) => {
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className="px-6 py-4 whitespace-nowrap"
                                                            > 
                                                                {cell.render("Cell")}
                                                                
                                                            
                                                            </td>
                                                            
                                                        )
                                                    })}
                                                        
    
                                                </tr>
                                            );
                                        }
                                        else if(page[i].original.faculty_name===email)
                                        {return (
                                            <tr {...row.getRowProps()}>
                                             

                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        > 
                                                            {cell.render("Cell")}
                                                            
                                                        
                                                        </td>
                                                        
                                                    )
                                                })}
                                                    

                                            </tr>
                                        );}
                                    })}
                                </tbody>
                            </table>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FtyTablesPublications;