import React, { useContext, useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { ISeat } from "../../models/ISeat";
import { ApiContext } from "../../contexts/ApiContext";
import axios from "axios";

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

export const PassengersInfoForm = ({ onNext }: PersonalInfoFormProps) => {
  const [availableSeats, setAvailableSeats] = useState<ISeat[]>([]);
  const { api_domain } = useContext(ApiContext);

  useEffect(() => {
    const getSeatsInfo = async () => {
      try {
        const gI = localStorage.getItem("chosenRoute");
        const route = gI ? JSON.parse(gI) : [];

        const response = await axios.post<ISeat[]>(
          `${api_domain}/api/Booking/seats`,
          route
        );
        setAvailableSeats(
          response.data.filter((seat) => seat.isVacant === true)
        );
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getSeatsInfo();
  }, [api_domain]);

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

  const handleAddPassenger = () => {
    const updatedPassengersList = [...data];
    updatedPassengersList.push({
      name: { value: "", error: null },
      surname: { value: "", error: null },
      email: { value: "", error: null },
      cif: { value: "", error: null },
    });
    setData(updatedPassengersList);
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengersList = [...data];
    updatedPassengersList.splice(index, 1);
    setData(updatedPassengersList);
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
      onNext({ info: newData });
    }
  };

  return (
    <div>
      <div>
        {data.length}
        {data.map((item, index) => (
          <div key={index}>
            Passenger # {index}
            <FormInput
              field_name='Name'
              placeholder='Enter the name'
              key={index}
              value={data[index]["name"].value}
              onItemBlur={() => handleBlur("name", index, item.name.value)}
              onItemChange={(e) => handleChange("name", index, e)}
              hasError={item.name.error != null}
            />
            <FormInput
              field_name='Surname'
              placeholder='Enter the surname'
              value={data[index]["surname"].value}
              onItemBlur={() =>
                handleBlur("surname", index, item.surname.value)
              }
              onItemChange={(e) => handleChange("surname", index, e)}
              hasError={item.surname.error != null}
            />
            <FormInput
              field_name='Email'
              placeholder='Enter the email'
              value={data[index]["email"].value}
              onItemBlur={() => handleBlur("email", index, item.email.value)}
              onItemChange={(e) => handleChange("email", index, e)}
              hasError={item.email.error != null}
            />
            <FormInput
              field_name='CIF'
              placeholder='Enter the CIF'
              value={data[index]["cif"].value}
              onItemBlur={() => handleBlur("cif", index, item.cif.value)}
              onItemChange={(e) => handleChange("cif", index, e)}
              hasError={item.cif.error != null}
            />
            {data.length > 1 && (
              <button
                type='button'
                onClick={() => handleDeletePassenger(index)}>
                -
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        {availableSeats.length > data.length && (
          <button type='button' onClick={handleAddPassenger}>
            +
          </button>
        )}
        <button>Back</button>
        <button type='button' onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};
