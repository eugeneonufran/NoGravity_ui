import React, { useContext, useEffect, useState } from "react";
import { FormInput } from "../../components/FormInput/FormInput";
import { ISeat } from "../../models/ISeat";
import { ApiContext } from "../../contexts/ApiContext";
import axios from "axios";
import { IPassenger } from "../../models/IPassenger";
import styles from "./PassengerInfoForm.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface PersonalInfoFormProps {
  onNext: (info: PersonalInfoData) => void;
  onBack: () => void;
  setPassengersInfo: (passengers: IPassenger[]) => void;
}

type PersonalInfoItem = {
  [K in keyof IPassenger]: FormItem;
};

interface PersonalInfoData {
  info: PersonalInfoItem[];
}

interface FormItem {
  value: string;
  error: string | null;
}

export const PassengersInfoForm = ({
  onNext,
  onBack,
  setPassengersInfo,
}: PersonalInfoFormProps) => {
  const [availableSeats, setAvailableSeats] = useState<ISeat[]>([]);
  const { api_domain } = useContext(ApiContext);

  const { fetchSeatsForRoute, error, loading } = useFetch(api_domain);
  const { getItemFromLS } = useLocalStorage();

  const chosenRoute = getItemFromLS("chosenRoute");

  useEffect(() => {
    const fetchData = async () => {
      if (chosenRoute) {
        const response = await fetchSeatsForRoute(chosenRoute);
        if (response) {
          setAvailableSeats(response.filter((seat) => seat.isVacant === true));
        }
      }
    };

    fetchData();
  });

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
    const extractedPassengers = newData.map((passenger) => ({
      name: passenger.name.value,
      surname: passenger.surname.value,
      email: passenger.email.value,
      cif: passenger.cif.value,
    }));
    setPassengersInfo(extractedPassengers);
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
      const extractedPassengers = newData.map((passenger) => ({
        name: passenger.name.value,
        surname: passenger.surname.value,
        email: passenger.email.value,
        cif: passenger.cif.value,
      }));
      setPassengersInfo(extractedPassengers);
      return errorMessage;
    }
    return null;
  };

  const validators = {
    name: (value: string) => value.trim() !== "",
    surname: (value: string) => value.trim() !== "",
    email: (value: string) => value.trim() !== "",
    //value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    cif: (value: string) => value.trim() !== "",
  };

  const handleAddPassenger = () => {
    const newData = [...data];
    newData.push({
      name: { value: "", error: null },
      surname: { value: "", error: null },
      email: { value: "", error: null },
      cif: { value: "", error: null },
    });
    setData(newData);
    const extractedPassengers = newData.map((passenger) => ({
      name: passenger.name.value,
      surname: passenger.surname.value,
      email: passenger.email.value,
      cif: passenger.cif.value,
    }));
    setPassengersInfo(extractedPassengers);
  };

  const handleDeletePassenger = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    const extractedPassengers = newData.map((passenger) => ({
      name: passenger.name.value,
      surname: passenger.surname.value,
      email: passenger.email.value,
      cif: passenger.cif.value,
    }));
    setPassengersInfo(extractedPassengers);
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
      localStorage.setItem("passengersItems", JSON.stringify(data));
      onNext({ info: newData });
    }
  };

  return (
    <div>
      <div>
        {data.length}
        {data.map((item, index) => (
          <div>
            Passenger # {index}
            <div className={styles.passengertable} key={index}>
              <FormInput
                field_name='Name'
                placeholder='Enter the name'
                key={index}
                value={item.name.value}
                onItemBlur={() => handleBlur("name", index, item.name.value)}
                onItemChange={(e) => handleChange("name", index, e)}
                hasError={item.name.error}
              />
              <FormInput
                field_name='Surname'
                placeholder='Enter the surname'
                value={item.surname.value}
                onItemBlur={() =>
                  handleBlur("surname", index, item.surname.value)
                }
                onItemChange={(e) => handleChange("surname", index, e)}
                hasError={item.surname.error}
              />
              <FormInput
                field_name='Email'
                placeholder='Enter the email'
                value={item.email.value}
                onItemBlur={() => handleBlur("email", index, item.email.value)}
                onItemChange={(e) => handleChange("email", index, e)}
                hasError={item.email.error}
              />
              <FormInput
                field_name='CIF'
                placeholder='Enter the CIF'
                value={item.cif.value}
                onItemBlur={() => handleBlur("cif", index, item.cif.value)}
                onItemChange={(e) => handleChange("cif", index, e)}
                hasError={item.cif.error}
              />
              {data.length > 1 && (
                <button
                  type='button'
                  onClick={() => handleDeletePassenger(index)}>
                  -
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {availableSeats.length > data.length && (
          <button type='button' onClick={handleAddPassenger}>
            +
          </button>
        )}
        <button type='button'>Back</button>
        <button type='button' onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};
