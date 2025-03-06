"use client";

import {FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {RequiredIndicator} from "@/modules/shared/required-indicator";

interface Props {
    name: string;
    label: string;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    required: boolean;
}

export const PasswordInput = ({
                                  name,
                                  label,
                                  placeholder,
                                  control,
                                  required,
                              }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={"text-start text-sm"}>
                    <Label className={`capitalize gap-1 flex text-xs text-black`}>
                        {label}
                        {required && <RequiredIndicator/>}
                    </Label>
                    <FormControl>
                        <div style={{position: "relative"}}>
                            <Input
                                className={"h-10 rounded-xs bg-white text-xs"}
                                placeholder={placeholder}
                                type={showPassword ? "text" : "password"}
                                {...field}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                {showPassword ? (
                    <EyeIcon size={20} className={"text-gray-400"}/>
                ) : (
                    <EyeOffIcon size={20} className={"text-gray-400"}/>
                )}
              </span>
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};