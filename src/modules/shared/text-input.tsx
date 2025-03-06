"use client";

import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RequiredIndicator} from "@/modules/shared/required-indicator";

interface Props {
    name: string;
    label: string;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    required: boolean;
    disabled?: boolean;
}

export const InputField = ({
                               name,
                               placeholder,
                               label,
                               control,
                               required,
                               disabled,
                           }: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={"flex flex-col justify-start items-start"}>
                    <FormLabel className={"capitalize gap-1 flex text-black text-xs font-normal"}>
                        {label}
                        {required && <RequiredIndicator/>}
                    </FormLabel>
                    <FormControl>
                        <Input
                            disabled={disabled}
                            className="h-10 rounded-xs bg-white text-xs focus:ring-red-900 focus:border-red-900 border-gray-300 focus:shadow-none hover:border-red-900"
                            placeholder={placeholder}
                            {...field}
                        />

                    </FormControl>
                    <FormMessage className={'text-xs font-normal'}/>
                </FormItem>
            )}
        />
    );
};