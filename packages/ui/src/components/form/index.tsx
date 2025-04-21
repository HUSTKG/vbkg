import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Type definitions for form field options
type SelectOption = {
  label: string;
  value: string;
};

type RadioOption = {
  label: string;
  value: string;
};

type CheckboxOption = {
  label: string;
  value: string;
};

// Field type definition
export type FieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 
        'radio' | 'switch' | 'date' | 'hidden';
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[] | RadioOption[] | CheckboxOption[];
  validation?: z.ZodTypeAny;
  className?: string;
};

// Form props
export interface GeneralFormProps<T extends z.ZodType> {
  fields: FieldConfig[];
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  onError?: (errors: any) => void;
  submitButtonText?: string;
  resetButtonText?: string;
  resetButton?: boolean;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  isLoading?: boolean;
}

const GeneralForm = <T extends z.ZodType>({
  fields,
  schema,
  onSubmit,
  onError,
  submitButtonText = 'Submit',
  resetButtonText = 'Reset',
  resetButton = false,
  defaultValues = {},
  className = '',
  isLoading = false,
}: GeneralFormProps<T>) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Prepare default values for the form
  const formDefaultValues = fields.reduce((acc, field) => {
    if (defaultValues[field.name] !== undefined) {
      acc[field.name] = defaultValues[field.name];
    } else if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue;
    } else {
      // Set appropriate default values based on field type
      switch (field.type) {
        case 'checkbox':
          acc[field.name] = [];
          break;
        case 'switch':
          acc[field.name] = false;
          break;
        case 'date':
          acc[field.name] = null;
          break;
        default:
          acc[field.name] = '';
      }
    }
    return acc;
  }, {} as Record<string, any>);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: formDefaultValues,
    mode: 'onBlur',
  });

  // Handle form submission
  const handleSubmit = async (data: z.infer<T>) => {
    try {
      onSubmit(data);
      setSubmitSuccess(true);
      if (!resetButton) {
        form.reset(formDefaultValues);
      }
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle form errors
  const handleError = (errors: any) => {
    console.error('Form validation errors:', errors);
    if (onError) onError(errors);
  };

  // Render form field based on field type
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'hidden':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                {field.type !== 'hidden' && <FormLabel>{field.label}</FormLabel>}
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={field.disabled || isLoading}
                    className={field.type === 'hidden' ? 'hidden' : ''}
                  />
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'textarea':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    {...formField}
                    placeholder={field.placeholder}
                    disabled={field.disabled || isLoading}
                  />
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                <FormLabel>{field.label}</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                  disabled={field.disabled || isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'checkbox':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                <FormLabel>{field.label}</FormLabel>
                {field.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={formField.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          let updatedValue = [...(formField.value || [])];
                          if (checked) {
                            updatedValue.push(option.value);
                          } else {
                            updatedValue = updatedValue.filter((val) => val !== option.value);
                          }
                          formField.onChange(updatedValue);
                        }}
                        disabled={field.disabled || isLoading}
                      />
                    </FormControl>
                    <label className="text-sm font-medium leading-none cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'radio':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex flex-col space-y-1"
                    disabled={field.disabled || isLoading}
                  >
                    {field.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                        <label
                          htmlFor={`${field.name}-${option.value}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'switch':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-4", field.className)}>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{field.label}</FormLabel>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                </div>
                <FormControl>
                  <Switch
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    disabled={field.disabled || isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );

      case 'date':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className={field.className}>
                <FormLabel>{field.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !formField.value && "text-muted-foreground"
                        )}
                        disabled={field.disabled || isLoading}
                      >
                        {formField.value ? (
                          format(formField.value, "PPP")
                        ) : (
                          <span>{field.placeholder || "Select a date"}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formField.value}
                      onSelect={formField.onChange}
                      disabled={field.disabled || isLoading}
                    />
                  </PopoverContent>
                </Popover>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, handleError)}
        className={cn("space-y-6", className)}
      >
        {fields.map(renderField)}

        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Form submitted successfully!
          </div>
        )}

        <div className="flex items-center justify-end space-x-2">
          {resetButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              {resetButtonText}
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GeneralForm;
