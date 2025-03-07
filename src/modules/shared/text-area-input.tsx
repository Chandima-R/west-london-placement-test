import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {RequiredIndicator} from "@/modules/shared/required-indicator";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    label: string;
    name: string;
    placeholder: string;
    required: boolean;
}

export const TextAreaInput = ({
                                  name,
                                  placeholder,
                                  label,
                                  control,
                                  required
                              }: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel className={"capitalize gap-1 flex text-black text-xs font-normal"}>
                        {label}
                        {required && <RequiredIndicator/>}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            {...field}
                            className="min-h-64 !text-xs h-auto rounded-xs"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};