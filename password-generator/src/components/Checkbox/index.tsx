import { ChangeEvent, FC } from 'react'
import './index.css'

// interface CheckboxProps {
//     id: string
//     label: string
//     checked: boolean
//     name: string
//     onChange: (event: ChangeEvent<HTMLInputElement>) => void
// }

// const Checkbox: FC<CheckboxProps> = ({ id, label, checked, name, onChange }: any) => {

//     return (
//         <div className="checkbox-wrapper">
//             <input
//                 type="checkbox"
//                 id={id}
//                 name={name}
//                 checked={checked}
//                 onChange={onChange}
//             />
//             <label htmlFor={id}>{label}</label>
//         </div>
//     )
// }

const Checkbox = ({ id, label, checked, name, onChange }: any) => {

    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default Checkbox
