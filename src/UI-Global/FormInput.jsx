import Password from "../../public/Icons/password.svg";

function FormInput({type, name, placeholder, value, onChange, className, Icon, flag ,divClassName}) {
    

    return (
        <div className={`border-2 border-[#D0D0D0] rounded-2xl flex gap-2 p-5 items-center ${divClassName}`}>
            {Icon &&
                <div className={"w-5"}>
                    <Icon/>
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
                <Password className={"w-full cursor-pointer"}/>
            </div>}

        </div>
    );
}

export default FormInput;