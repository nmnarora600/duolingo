import {BooleanInput, Edit, NumberInput, ReferenceInput, SimpleForm,  TextInput, required} from "react-admin"

export const ChallengeOptionEdit=()=>{
    return(
        <Edit>
            <SimpleForm>
                
                <TextInput source="text" validate={required()} label="Text"/>
              <BooleanInput source="correct" label="Correct Option"/>
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc"  label="Image Source"/>
                <TextInput source="audioSrc"  label="Audio Source"/>
            </SimpleForm>
        </Edit>
    )
}