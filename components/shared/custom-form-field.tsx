/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";
import { E164Number } from "libphonenumber-js/core";
import { CalendarIcon, ChevronDown, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  UseControllerReturn,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { FormFieldTypes } from "@/config/enums";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "../ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import "react-phone-number-input/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PriceInput from "../ui/price-input";
import { RadioGroup } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ToggleGroup } from "../ui/toggle-group";

// const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
//   ssr: false,
// });

interface BaseCustomProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  fieldType: FormFieldTypes;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  required?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  formDescription?: string;
  renderSkeleton?: (
    field: UseControllerReturn<TFormValues>["field"]
  ) => React.ReactNode;
}

interface InputProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.INPUT;
  inputType?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  underText?: React.ReactNode;
}

interface TextareaProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.TEXTAREA;
  rows?: number;
  maxLength?: number;
  resizable?: boolean;
}
interface PriceInputProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.PRICE_INPUT;
  min?: number;
  max?: number;
  inputClassName?: string;
}

export interface MultiSelectProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.MULTI_SELECT;
  children: React.ReactNode;
  maxSelected?: number;
  searchable?: boolean;
  showSelectedBeneath?: boolean;
  renderSelectedItem?: (value: any, onRemove: () => void) => React.ReactNode;
  onSearch?: (searchTerm: string) => void;
}

interface CommandProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.COMMAND;
  children: React.ReactNode;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onSearch?: (value: string) => void;
  renderSelectedValue?: (value: any) => React.ReactNode;
}

interface DatePickerProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.DATE_PICKER;
  trigger?: React.ReactNode;
  dateFormat?: string;
  calendarProps?: {
    mode?: "single" | "multiple" | "range";
    selected?: Date | Date[] | { from: Date; to: Date };
    disabled?: (date: Date) => boolean;
    footer?: React.ReactNode;
    showTimePicker?: boolean;
    timeFormat?: string;
  };
}

interface SelectProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.SELECT;
  triggerContent?: React.ReactNode;
  children: React.ReactNode;
}

interface CheckboxProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.CHECKBOX;
  checkboxLabel?: string | React.ReactNode;
}

interface SwitchProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.SWITCH;
  switchLabel?: string | React.ReactNode;
}

interface RadioGroupProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.RADIO_GROUP;
  children: React.ReactNode;
}
interface ToggleGroupProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.TOGGLE_GROUP;
  type: "single" | "multiple";
  children: React.ReactNode;
}

interface ComboboxProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.COMBOBOX;
  children: React.ReactNode;
}
interface QuillProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.QUILL;
}
interface FileInputProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.FILE_INPUT;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesSelected?: (files: File[]) => void;
}
interface PhoneInputProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.PHONE_INPUT;
  defaultCountry?: string;
  onlyCountries?: string[];
  international?: boolean;
  withCountryCallingCode?: boolean;
}

interface SkeletonProps<TFormValues extends FieldValues>
  extends BaseCustomProps<TFormValues> {
  fieldType: FormFieldTypes.SKELETON;
}
type CustomProps<TFormValues extends FieldValues> =
  | InputProps<TFormValues>
  | TextareaProps<TFormValues>
  | PhoneInputProps<TFormValues>
  | SkeletonProps<TFormValues>
  | DatePickerProps<TFormValues>
  | SelectProps<TFormValues>
  | CheckboxProps<TFormValues>
  | SwitchProps<TFormValues>
  | RadioGroupProps<TFormValues>
  | ToggleGroupProps<TFormValues>
  | ComboboxProps<TFormValues>
  | FileInputProps<TFormValues>
  | CommandProps<TFormValues>
  | MultiSelectProps<TFormValues>
  | PriceInputProps<TFormValues>
  | QuillProps<TFormValues>;

export const MultiSelectPills = ({
  selected,
  onRemove,
  renderSelectedItem,
}: {
  selected: any[];
  onRemove: (value: any) => void;
  renderSelectedItem?: (value: any, onRemove: () => void) => React.ReactNode;
}) => {
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {selected.map((value, index) => {
        if (renderSelectedItem) {
          return (
            <div key={index}>
              {renderSelectedItem(value, () => onRemove(value))}
            </div>
          );
        }
        return (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 text-xs"
          >
            {value.toString()}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemove(value);
              }}
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="size-3" />
              <span className="sr-only">Remove</span>
            </button>
          </Badge>
        );
      })}
    </div>
  );
};

const RenderInput = <TFormValues extends FieldValues>({
  field,
  props,
}: {
  field: any;
  props: CustomProps<TFormValues>;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selected = useMemo(() => field.value || [], [field.value]);

  const renderIcon = () => {
    if (!iconSrc) return null;
    return (
      <Image
        src={iconSrc}
        height={24}
        width={24}
        alt={iconAlt || "icon"}
        className="ml-2"
      />
    );
  };

  switch (fieldType) {
    case FormFieldTypes.INPUT: {
      const inputProps = props as InputProps<typeof field.value>;
      return (
        <div className="relative">
          {renderIcon()}
          {inputProps.prefix && (
            <div className="absolute left-3">{inputProps.prefix}</div>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={props.disabled}
              {...field}
              className={cn(
                "landtana-input no-focus !w-full",
                inputProps.prefix && "pl-10",
                inputProps.suffix && "pr-10",
                props.className
              )}
              type={inputProps.inputType}
            />
          </FormControl>
          {inputProps.underText && <div>{inputProps.underText}</div>}
          {inputProps.suffix && (
            <div className="absolute right-3">{inputProps.suffix}</div>
          )}
        </div>
      );
    }
    case FormFieldTypes.PRICE_INPUT: {
      const inputProps = props as PriceInputProps<typeof field.value>;
      return (
        <div className="relative">
          <FormControl>
            <PriceInput
              {...field}
              min={inputProps.min}
              max={inputProps.max}
              placeholder={placeholder}
              inputClassname={inputProps.inputClassName}
              className={inputProps.className}
              disabled={inputProps.disabled}
            />
          </FormControl>
        </div>
      );
    }

    case FormFieldTypes.MULTI_SELECT: {
      const multiSelectProps = props as MultiSelectProps<typeof field.value>;
      const handleSearch = (value: string) => {
        setSearchTerm(value);
        multiSelectProps.onSearch?.(value);
      };

      const handleRemoveSelection = (value: any) => {
        field.onChange(selected.filter((item: any) => item !== value));
      };

      const getSelectedLabel = () => {
        if (selected.length === 0)
          return props.placeholder || "Select items...";
        return `${selected.length} selected`;
      };

      return (
        <div className="flex flex-col gap-1.5">
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !selected.length && "text-muted-foreground"
                  )}
                >
                  <span className="truncate">{getSelectedLabel()}</span>
                  <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                {multiSelectProps.searchable && (
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 size-4 shrink-0 opacity-50" />
                    <Input
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                )}
                <Command className="max-h-[300px] overflow-auto">
                  <CommandGroup>{multiSelectProps.children}</CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>

          {!multiSelectProps.showSelectedBeneath && selected.length > 0 && (
            <MultiSelectPills
              selected={selected}
              onRemove={handleRemoveSelection}
              renderSelectedItem={multiSelectProps.renderSelectedItem}
            />
          )}
        </div>
      );
    }

    case FormFieldTypes.COMMAND: {
      const commandProps = props as CommandProps<typeof field.value>;

      return (
        <FormControl>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {field.value
                  ? commandProps.renderSelectedValue?.(field.value) ||
                    field.value.toString()
                  : props.placeholder || "Select an option..."}
                <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder={commandProps.searchPlaceholder || "Search..."}
                  onValueChange={commandProps.onSearch}
                />
                <CommandEmpty>
                  {commandProps.emptyMessage || "No results found."}
                </CommandEmpty>
                {commandProps.children}
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
      );
    }
    case FormFieldTypes.TOGGLE_GROUP: {
      const toggleProps = props as ToggleGroupProps<typeof field.value>;
      return (
        <FormControl>
          <ToggleGroup
            type={toggleProps.type}
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={props.disabled}
            className={props.className}
          >
            {toggleProps.children}
          </ToggleGroup>
        </FormControl>
      );
    }
    case FormFieldTypes.DATE_PICKER: {
      const dateProps = props as DatePickerProps<typeof field.value>;
      return (
        <Popover>
          <PopoverTrigger asChild>
            {dateProps.trigger || (
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={props.disabled}
                >
                  {field.value ? (
                    format(field.value, props.dateFormat || "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={dateProps.calendarProps?.mode || "single"}
              selected={dateProps.calendarProps?.selected || field.value}
              onSelect={field.onChange}
              disabled={dateProps.calendarProps?.disabled || props.disabled}
              initialFocus
              {...dateProps.calendarProps}
            />
            {dateProps.calendarProps?.footer}
          </PopoverContent>
        </Popover>
      );
    }
    case FormFieldTypes.TEXTAREA: {
      const textareaProps = props as TextareaProps<typeof field.value>;
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            disabled={props.disabled}
            rows={textareaProps.rows}
            maxLength={textareaProps.maxLength}
            className={cn(
              "landtana-input min-h-32",
              !textareaProps.resizable && "resize-none",
              props.className
            )}
            {...field}
          />
        </FormControl>
      );
    }
    // case FormFieldTypes.QUILL: {
    //   return (
    //     <FormControl>
    //       <QuillEditor
    //         {...field}
    //         className="dark:light-border-2 rounded-[10px] bg-white p-0 text-base outline-none  placeholder:text-sm  dark:bg-transparent dark:text-light-600 dark:placeholder:text-white  [&>.ql-container_.ql-editor]:min-h-[200px] [&_.ql-editor_span]:!bg-transparent [&_p]:bg-transparent "
    //       />
    //     </FormControl>
    //   );
    // }
    case FormFieldTypes.SWITCH: {
      const switchProps = props as SwitchProps<typeof field.value>;
      return (
        <div className="flex items-center space-x-2">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
              className={props.className}
            />
          </FormControl>
          {switchProps.switchLabel && (
            <div className="text-sm font-medium leading-none">
              {switchProps.switchLabel}
            </div>
          )}
        </div>
      );
    }
    case FormFieldTypes.RADIO_GROUP: {
      const radioProps = props as RadioGroupProps<typeof field.value>;
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={props.disabled}
            className={props.className}
          >
            {radioProps.children}
          </RadioGroup>
        </FormControl>
      );
    }
    case FormFieldTypes.PHONE_INPUT: {
      const phoneProps = props as PhoneInputProps<typeof field.value>;

      return (
        <FormControl>
          <PhoneInput
            international={phoneProps.international}
            countryCallingCodeEditable={phoneProps.withCountryCallingCode}
            defaultCountry={"US"}
            onlyCountries={phoneProps.onlyCountries}
            value={field.value as E164Number}
            onChange={(value) => field.onChange(value)}
            disabled={props.disabled}
            className={cn(
              "landtana-input !border !p-2 !rounded-md",
              props.className
            )}
          />
        </FormControl>
      );
    }
    //

    case FormFieldTypes.CHECKBOX: {
      const checkboxProps = props as CheckboxProps<typeof field.value>;

      return (
        <div className="flex items-center gap-4">
          <FormControl>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
              className={props.className}
            />
            {checkboxProps.checkboxLabel && (
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {checkboxProps.checkboxLabel}
              </div>
            )}
          </FormControl>
        </div>
      );
    }

    case FormFieldTypes.SELECT: {
      const selectProps = props as SelectProps<typeof field.value>;
      return (
        <FormControl>
          <Select
            disabled={props.disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className={cn("landtana-input", props.className)}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="landtana-select-content ">
              {selectProps.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    }

    case FormFieldTypes.SKELETON:
      return props.renderSkeleton ? <>{props.renderSkeleton(field)}</> : null;
    default:
      return null;
  }
};

export const CustomFormField = <TFormValues extends FieldValues>(
  props: CustomProps<TFormValues>
) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("flex-1", props.className)}>
          {props.fieldType !== FormFieldTypes.CHECKBOX &&
            props.fieldType !== FormFieldTypes.SWITCH &&
            props.label && (
              <FormLabel
                className={cn("landtana-input-label", {
                  required: props.required,
                })}
              >
                {props.label}{" "}
                {props.required && <span className="required">*</span>}
              </FormLabel>
            )}
          <RenderInput field={field} props={props} />

          {props.formDescription && (
            <FormDescription>{props.formDescription}</FormDescription>
          )}

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
