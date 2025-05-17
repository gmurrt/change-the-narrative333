import { useAdminDonation } from "@/hooks/useAdminDonation";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertTriangle, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

const DonationContentForm = () => {
  const { content, saveDonationContent, loading } = useAdminDonation();
  const [isLoading, setIsLoading] = useState(false);
  const [allocationError, setAllocationError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      allocation: {
        directSupport: 60,
        communityPrograms: 25,
        operations: 15,
      },
      impacts: [{ amount: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "impacts",
  });

  useEffect(() => {
    if (content) {
      reset({
        allocation: content.allocation || {
          directSupport: 60,
          communityPrograms: 25,
          operations: 15,
        },
        impacts: content.impacts || [],
      });
    }
  }, [content, reset]);

  const onSubmit = async (data: any) => {
    const { directSupport, communityPrograms, operations } = data.allocation;
    const total = directSupport + communityPrograms + operations;

    if (total !== 100) {
      setAllocationError(true);
      return;
    }

    setAllocationError(false);
    setIsLoading(true);
    await saveDonationContent(data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Fund Allocation</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="number"
            {...register("allocation.directSupport", { valueAsNumber: true })}
            placeholder="Direct Support Services %"
          />
          <Input
            type="number"
            {...register("allocation.communityPrograms", {
              valueAsNumber: true,
            })}
            placeholder="Community Programs %"
          />
          <Input
            type="number"
            {...register("allocation.operations", { valueAsNumber: true })}
            placeholder="Operations %"
          />
        </div>
        <p className="text-xs text-muted-foreground">Total must equal 100%</p>
        {allocationError && (
          <div className="text-sm p-4 text-red-500 font-medium mt-1 inline-flex gap-1 items-center bg-red-50 border border-red-500 rounded-lg">
            <AlertTriangle/>
            <p>Total allocation must be exactly 100%</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label>Impact Examples</Label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-4 lg:grid-cols-5 gap-4 items-center"
          >
            <div className="col-span-1">
              <Input
                type="number"
                {...register(`impacts.${index}.amount`, { required: true })}
                placeholder="Amount"
              />
            </div>
            <div className="col-span-3">
              <Input
                {...register(`impacts.${index}.description`, {
                  required: true,
                })}
                placeholder="Impact description"
              />
            </div>
            <div className="lg:col-span-1">
              <Button
                type="button"
                variant="ghost"
                className="border border-red-200 hover:text-white text-red-300"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ amount: "", description: "" })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Impact Example
        </Button>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default DonationContentForm;
