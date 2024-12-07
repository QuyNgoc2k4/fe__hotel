import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";

// API
import { voucherApi } from "../../../api/voucherApi";

// Components
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";

// Validation
import { validation } from "../../../validation/others/StoreVoucherValidation";
import { formatDateForInput } from "../../../lib/dateUtils";


interface VoucherStoreProps {
  closeSheet: () => void;
  voucherId: string | null;
  action: string;
  onSubmitSuccess: () => void;
}

const VoucherStore = ({ voucherId, action, closeSheet, onSubmitSuccess }: VoucherStoreProps) => {
  const methods = useForm();
  const { setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["voucher", voucherId],
    () => voucherApi.getVoucherById(voucherId),
    {
      enabled: action === "update" && !!voucherId,
    }
  );

  useEffect(() => {
    if (action === "update" && data) {
      Object.keys(data).forEach((key) => {
        // Handle date fields
        if (key === "start_date" || key === "end_date") {
          setValue(key, formatDateForInput(data[key]));
        } else {
          setValue(key, data[key] || "");
        }
      });
    }
  }, [data, setValue, action]);

  const onSubmitHandler = async (payload: Record<string, any>) => {
    try {
      const formattedPayload = {
        ...payload,
        discount_amount: parseInt(payload.discount_amount || "0", 10),
        discount_percentage: parseInt(payload.discount_percentage || "0", 10),
        max_discount_amount: parseInt(payload.max_discount_amount || "0", 10),
        min_spend_amount: parseInt(payload.min_spend_amount || "0", 10),
        usage_limit: parseInt(payload.usage_limit || "0", 10),
      };

      if (action === "update" && voucherId) {
        await voucherApi.updateVoucher({ voucherId, data: formattedPayload });
        queryClient.invalidateQueries(["vouchers"]);
      } else {
        await voucherApi.createVoucher(formattedPayload);
        queryClient.invalidateQueries(["vouchers"]);
      }

      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {validation(data).map((item, index) => (
            <div key={index}>
              <CustomInput
                label={item.label}
                id={item.id}
                name={item.name}
                type={item.type}
                register={methods.register}
                rules={item.rules}
                defaultValue={item.defaultValue}
              />
            </div>
          ))}
        </div>
        <div className="text-right">
          <LoadingButton
            loading={isLoading}
            text={action === "update" ? "Cập nhật" : "Lưu thông tin"}
            className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default VoucherStore;
