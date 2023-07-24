import React from 'react';

interface PersonalInfoFormProps {
    onNext: (info: any) => void; 
}

interface PersonalInfoData {
    info: PersonalInfoItem[];
}

interface FormItem {
    value?: string;
    error?: string;
}

const PersonalInfoForm = (props: PersonalInfoFormProps) => {

    const [data, setData] = useState<PersonalInfoItem[]>([
        { name: {error: undefined, value: undefined} }
    ]);

    const handleChange = (key, index, value) => {
        const newData = {...data};
        newData[index][key].value = value;
        newData[index][key].error = null;
        setData(newData);
    }

    const validators = {
        'name': (value) => {},
        'email': (value) => {},
        'additionalInfo': (value) => {} 
    }

    const validate = () => {
        const newData = {...data};
        data.forEach((element, index) => {
            Object.keys(element).forEach(key => {
                if(!validators[key](element[key])) {
                    newData[index][key].error = 'specified error'
                }
            });
        });

        if(newData.some( element => 
            Object.keys(element).some(key => element[key].error))
        )
        setData(newData)
        else props.onNext(data);
    }

    return (
        <div>
            <div>
            {data.map((item, index) => (<div>
                <CustomInput 
                    value={data[index]['name'].value} 
                    onChange={(e)=> handleChange('name', index, e.target.value)}
                    validator={validators['name']}
                    hasError={data[index]['name'].error}
                />
                <CustomInput 
                    value={data[index]['email'].value} 
                    onChange={(e)=> handleChange('email', index, e.target.value)}
                    validator={validators['email']}
                    hasError={data[index]['email'].error}
                />
                <CustomInput 
                    value={data[index]['additionalInfo'].value} 
                    onChange={(e)=> handleChange('additionalInfo', index, e.target.value)}
                    validator={validators['additionalInfo']}
                    hasError={data[index]['additionalInfo'].error}
                />
            </div>))}
            <div>
                <button>Back</button>
                <button onClick={validate}>Next</button>
            </div>
        </div>
    )
}