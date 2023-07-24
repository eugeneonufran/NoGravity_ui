import React, { useState } from "react";
import { FormInput } from "./FormInput"; // Assuming you have the CustomInput component

interface PersonalInfoFormProps {
  onNext: (info: PersonalInfoData) => void;
}

interface PersonalInfoItem {
  name: FormItem;
  surname: FormItem;
  email: FormItem;
  cif: FormItem;
}

interface PersonalInfoData {
  info: PersonalInfoItem[];
}

interface FormItem {
  value: string;
  error?: string | null;
}

export const PassengersInfoForm: React.FC<PersonalInfoFormProps> = (props) => {
  const [data, setData] = useState<PersonalInfoItem[]>([
    {
      name: { value: "", error: null },
      surname: { value: "", error: null },
      email: { value: "", error: null },
      cif: { value: "", error: null },
    },
  ]);

  const handleChange = (
    key: keyof PersonalInfoItem,
    index: number,
    value: string
  ) => {
    const newData = [...data];
    newData[index][key].value = value;
    newData[index][key].error = null;
    setData(newData);
  };

  const handleBlur = (
    key: keyof PersonalInfoItem,
    index: number,
    value: string
  ): string | null => {
    const isValid = validators[key as keyof PersonalInfoItem](value);
    if (!isValid) {
      const errorMessage = "specified error";
      const newData = [...data];
      newData[index][key as keyof PersonalInfoItem].error = errorMessage;
      setData(newData);
      return errorMessage;
    }
    return null;
  };

  const validators = {
    name: (value: string) => value.trim() !== "",
    surname: (value: string) => value.trim() !== "",
    email: (value: string) =>
      value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    cif: (value: string) => value.trim() !== "",
  };

  const validate = () => {
    const newData = [...data];
    data.forEach((element, index) => {
      Object.keys(element).forEach((key) => {
        if (
          !validators[key as keyof PersonalInfoItem](
            element[key as keyof PersonalInfoItem].value
          )
        ) {
          newData[index][key as keyof PersonalInfoItem].error =
            "specified error";
        }
      });
    });

    if (
      newData.some((element) =>
        Object.keys(element).some(
          (key) => element[key as keyof PersonalInfoItem].error
        )
      )
    ) {
      setData(newData);
    } else {
      props.onNext({ info: newData });
    }
  };

  return (
    <div>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <FormInput
              key={index}
              value={data[index]["name"].value}
              onItemBlur={() =>
                handleBlur("name", index, data[index]["name"].value)
              }
              onItemChange={(e) => handleChange("name", index, e)}
              hasError={data[index]["name"].error != null}
            />
            <FormInput
              value={data[index]["surname"].value}
              onItemBlur={() =>
                handleBlur("surname", index, data[index]["surname"].value)
              }
              onItemChange={(e) => handleChange("surname", index, e)}
              hasError={data[index]["surname"].error != null}
            />
            <FormInput
              value={data[index]["email"].value}
              onItemBlur={() =>
                handleBlur("email", index, data[index]["email"].value)
              }
              onItemChange={(e) => handleChange("email", index, e)}
              hasError={data[index]["email"].error != null}
            />
            <FormInput
              value={data[index]["cif"].value}
              onItemBlur={() =>
                handleBlur("cif", index, data[index]["cif"].value)
              }
              onItemChange={(e) => handleChange("cif", index, e)}
              hasError={data[index]["cif"].error != null}
            />
          </div>
        ))}
      </div>
      <div>
        <button>Back</button>
        <button type='button' onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};
