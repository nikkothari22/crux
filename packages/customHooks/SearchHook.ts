import React, { useState, useCallback } from "react";
import get from "lodash/get";

export const useSearchFilter = <T>(data: T[], columns: string[]): [string, (event: React.ChangeEvent<HTMLInputElement>) => void, T[], (data: T[]) => void] => {

    const [searchString, setSearchString] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
        const searchStringLower = event.target.value.toLowerCase();
        // console.log("Searching for ", searchStringLower);

        let cols = columns.slice();

        setFilteredData(data.filter(item => {
            return cols.some(column => {

                let value = get(item, column, "")

                if (typeof value === "number") {
                    value = value.toString();
                }

                if (typeof value === "undefined" || value === null) {
                    value = ""
                }
                return value.toLowerCase().indexOf(searchStringLower) !== -1;
            });
        }));

    }, [data, columns])

    const setData = useCallback((data: T[]) => setFilteredData(data), [])


    return [searchString, handleChange, filteredData, setData]

}