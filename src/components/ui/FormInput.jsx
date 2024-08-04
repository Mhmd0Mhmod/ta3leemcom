import password from "../../../public/Icons/password.svg";

function FormInput({type, name, placeholder, value, onChange, className, icon, flag ,divClassName}) {

    return (
        <div className={`border-2 rounded-2xl flex gap-2 p-5 items-center ${divClassName}`}>
            {icon &&
                <div className={"w-5"}>
                    <img src={icon} className={"w-full"} alt={"icon"}/>
                </div>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
            {type === "password" && <div className={"w-5 "}>
                <img src={password} alt={"icon"} className={"w-full cursor-pointer"}/>
            </div>}

        </div>
    );
}

export default FormInput;