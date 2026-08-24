import { version } from "mongoose";

const insuranceForm = {
    formId: "auto-insurance-claim",

    name: "Auto Insurance Claim",

    description:
        "Dynamic form for filing an automobile insurance claim.",

    version: 1,
    
    status: "published",

     fields: [
        {
            id: "incidentType",
            type: "select",
            label: "What type of incident occurred?",
            required: true,

            options: [
                {
                    label: "Animal Collision",
                    value: "animal_collision"
                },
                {
                    label: "Accident",
                    value: "accident"
                },
                {
                    label: "Theft",
                    value: "theft"
                }
            ]
        },

        {
            id: "incidentDate",
            type: "date",
            label: "When did the incident occur?",
            required: true
        },

        {
            id: "vehicle",
            type: "text",
            label: "What is the vehicle make?",
            required: true
        },

        {
            id: "damage",
            type: "select",
            label: "What was damaged?",
            required: true,

            options: [
                {
                    label: "Windshield",
                    value: "windshield"
                },
                {
                    label: "Bumper",
                    value: "bumper"
                },
                {
                    label: "Engine",
                    value: "engine"
                },
                {
                    label: "Other",
                    value: "other"
                }
            ]
        },

        {
            id: "location",
            type: "text",
            label: "Where did the incident occur?",
            required: true
        },

        {
            id: "animalType",
            type: "text",
            label: "What animal was involved?",

            required: true,

            showIf: {
                field: "incidentType",
                operator: "equals",
                value: "animal_collision"
            }
        },

        {
            id: "policeReport",
            type: "checkbox",
            label: "Was a police report filed?",

            showIf: {
                field: "incidentType",
                operator: "equals",
                value: "accident"
            }
        },

        {
            id: "injuries",
            type: "checkbox",
            label: "Were there any injuries?",

            showIf: {
                field: "incidentType",
                operator: "equals",
                value: "accident"
            }
        },

        {
            id: "medicalTreatment",
            type: "text",
            label: "Describe the medical treatment received.",

            required: true,

            showIf: {
                field: "injuries",
                operator: "equals",
                value: true
            }
        },

        {
            id: "stolenItems",
            type: "text",
            label: "What items were stolen?",

            required: true,

            showIf: {
                field: "incidentType",
                operator: "equals",
                value: "theft"
            }
        },

        {
            id: "theftPoliceReport",
            type: "checkbox",
            label: "Was the theft reported to the police?",

            showIf: {
                field: "incidentType",
                operator: "equals",
                value: "theft"
            }
        }
    ]
};

export default insuranceForm;
