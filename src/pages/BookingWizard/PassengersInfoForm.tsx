import { useContext, useEffect, useState } from "react";
import { FormInput } from "../../components/FormInput/FormInput";
import { ISeat } from "../../models/_api/ISeat";
import { ApiContext } from "../../contexts/ApiContext";

import { IPassenger } from "../../models/_api/IPassenger";
import styles from "./PassengerInfoForm.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { validateField } from "../../utils/validateField";
import { DataContext } from "../../contexts/DataContext";
import { Services } from "../../utils/services";
import { Profile } from "../User/Profile";
import { AuthContext } from "../../contexts/AuthContext";
import { Loading } from "../../components/Loading";

interface PersonalInfoFormProps {
  onNext: (info: PersonalInfoData) => void;
  onBack: () => void;
}

export type PersonalInfoItem = {
  [K in keyof IPassenger]: FormItem;
};

export interface PersonalInfoData {
  info: PersonalInfoItem[];
}

interface FormItem {
  value: string;
  error: string | null;
}

export const PassengersInfoForm = ({
  onNext,
  onBack,
}: PersonalInfoFormProps) => {
  const [availableSeats, setAvailableSeats] = useState<ISeat[]>([]);

  const { api_domain } = useContext(ApiContext);

  const { fetchSeatsForRoute, error, loading } = useFetch(api_domain);
  const { user } = useContext(AuthContext);

  const { chosenRoute, setCurrentStep, setPassengers, passengers } =
    useContext(DataContext);
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
  }, []);

  const defaultPassenger: PersonalInfoItem = {
    firstName: { value: "", error: null },
    lastName: { value: "", error: null },
    email: { value: "", error: null },
    cif: { value: "", error: null },
  };

  const startData: PersonalInfoItem[] =
    passengers && passengers.length !== 0
      ? Services.convertPassengersToPersonalInfo(passengers)
      : [defaultPassenger];

  const [data, setData] = useState<PersonalInfoItem[]>(startData);

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
    const { isValid, error } = validateField(key, value);
    if (!isValid) {
      const newData = [...data];
      newData[index][key as keyof PersonalInfoItem].error = error;
      setData(newData);
      return error;
    }
    return null;
  };

  const handleAddPassenger = () => {
    const newData = [...data];
    newData.push({
      firstName: { value: "", error: null },
      lastName: { value: "", error: null },
      email: { value: "", error: null },
      cif: { value: "", error: null },
    });
    setData(newData);
  };

  const handleDeletePassenger = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const validate = () => {
    const newData = [...data];
    data.forEach((element, index) => {
      Object.keys(element).forEach((key) => {
        const value = element[key as keyof PersonalInfoItem].value;
        const { isValid, error } = validateField(
          key as keyof PersonalInfoItem,
          value
        );

        if (!isValid) {
          newData[index][key as keyof PersonalInfoItem].error = error;
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
      const cnvData = Services.convertToIPassenger(data);
      setPassengers(cnvData);
      setCurrentStep("seat-map");
      onNext({ info: newData });
    }
  };

  const handleOnBack = () => {
    onBack();
  };

  const handleAddLoggedUser = () => {
    if (user && availableSeats.length > data.length) {
      const newData = [...data];
      newData.push({
        firstName: { value: user.firstName, error: null },
        lastName: { value: user.secondName, error: null },
        email: { value: user.email, error: null },
        cif: { value: "", error: null },
      });
      setData(newData);
    }
  };

  return (
    <div className={styles.passengerContainer}>
      {user ? (
        <div>
          <Profile user={user} />

          {availableSeats.length > data.length && (
            <button type='button' onClick={handleAddLoggedUser}>
              Add Logged User as Passenger
            </button>
          )}
        </div>
      ) : null}
      {!loading ? (
        <div>
          {availableSeats.length} available seats
          {data.map((item, index) => (
            <div key={index}>
              Passenger # {index}
              <div className={styles.passengertable} key={index}>
                <FormInput
                  field_name='Name'
                  placeholder='Enter the name'
                  key={index}
                  value={item.firstName.value}
                  onItemBlur={() =>
                    handleBlur("firstName", index, item.firstName.value)
                  }
                  onItemChange={(e) => handleChange("firstName", index, e)}
                  hasError={item.firstName.error}
                />
                <FormInput
                  field_name='Surname'
                  placeholder='Enter the lastName'
                  value={item.lastName.value}
                  onItemBlur={() =>
                    handleBlur("lastName", index, item.lastName.value)
                  }
                  onItemChange={(e) => handleChange("lastName", index, e)}
                  hasError={item.lastName.error}
                />
                <FormInput
                  field_name='Email'
                  placeholder='Enter the email'
                  value={item.email.value}
                  onItemBlur={() =>
                    handleBlur("email", index, item.email.value)
                  }
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
      ) : (
        <Loading message='Looking for seats' />
      )}
      <div>
        {availableSeats.length > data.length && (
          <button type='button' onClick={handleAddPassenger}>
            +
          </button>
        )}
        <button type='button' onClick={handleOnBack}>
          Back
        </button>
        <button type='button' onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
};
