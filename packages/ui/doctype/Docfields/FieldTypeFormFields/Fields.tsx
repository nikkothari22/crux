import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const SuffixField = () => {
    const { register } = useFormContext();

    return (
        <FormControl>
            <FormLabel>Suffix</FormLabel>
            <Input {...register("metadata.suffix")} placeholder="e.g. followers, kg, m, ltr" />
            <FormHelperText>Adds a suffix text while viewing data. e.g. "12000 followers".</FormHelperText>
        </FormControl>
    )
}

export const CurrencyField = () => {
    const { register } = useFormContext();

    return (
        <FormControl>
            <FormLabel>Currency</FormLabel>
            <Input {...register("metadata.currency")} placeholder="e.g. $, GBP, BTC" />
            <FormHelperText>Symbol/Text to be shown before the number.</FormHelperText>
        </FormControl>
    )
}