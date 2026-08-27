const insuranceForm = {
    formId: "auto-insurance-claim",

    name: "Auto Insurance Claim",

    description: "Dynamic form for filing an automobile insurance claim.",

    version: 1,

    status: "published",

    fields: [
        {
            id: "incidentType",
            label: "What type of incident occurred?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Animal Collision",
                    value: "animal_collision"
                },
                {
                    label: "Vehicle Collision",
                    value: "vehicle_collision"
                },
                {
                    label: "Theft",
                    value: "theft"
                },
                {
                    label: "Weather Damage",
                    value: "weather_damage"
                },
                {
                    label: "Other",
                    value: "other"
                }
            ]
        },

        {
            id: "vehicle",
            label: "What vehicle was involved?",
            type: "text",
            required: true,
            placeholder: "e.g. Honda Civic"
        },

        {
            id: "damage",
            label: "What was damaged?",
            type: "text",
            required: true,
            placeholder: "e.g. Windshield, bumper, door..."
        },

        {
            id: "incidentDate",
            label: "When did the incident occur?",
            type: "date",
            required: true
        },

        {
            id: "description",
            label: "Describe what happened",
            type: "textarea",
            required: true,
            placeholder: "Describe the incident in detail..."
        },

        {
            id: "anotherVehicle",
            label: "Was another vehicle involved?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "otherDriverName",
            label: "What is the other driver's name?",
            type: "text",
            required: true,
            placeholder: "Enter the driver's name...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherInsurance",
            label: "What is the other driver's insurance company?",
            type: "text",
            required: true,
            placeholder: "e.g. State Farm, Geico...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherVehicleNumber",
            label: "What is the other vehicle's registration number?",
            type: "text",
            required: true,
            placeholder: "Enter registration number...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "policeReport",
            label: "Was a police report filed?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        }
    ]
};

export default insuranceForm;