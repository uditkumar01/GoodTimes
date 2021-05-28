import { useEffect, useState } from "react";

export function FormField({
    label,
    type,
    textFilter,
    field,
    setFieldText,
    error,
}) {
    const [fieldType, setFieldType] = useState(type.toLowerCase());
    useEffect(() => {
        setFieldType(type.toLowerCase());
    }, [type]);
    return (
        <div
            class={`form-field ${
                error && Object.keys(error).length > 0 ? error.type : "custom"
            }-bg bg-transparent`}
        >
            <input
                class="input-field"
                type={fieldType}
                value={field}
                onChange={(event) => {
                    if (textFilter(event.target.value)) {
                        setFieldText(event.target.value);
                    }
                }}
                required
            />

            {type.toLowerCase() === "password" ? (
                <span
                    title="No Issues Found"
                    class={`far fa-eye${
                        fieldType === "password" ? "-slash" : ""
                    } secondary-bg bg-inherit icon`}
                    onClick={() => {
                        setFieldType((fieldType) =>
                            fieldType === "password" ? "text" : "password"
                        );
                    }}
                ></span>
            ) : (
                ""
            )}
            {error && Object.keys(error).length > 0 ? (
                <span
                    title={error.msg}
                    class={`fas fa-exclamation-triangle ${error.type}-bg bg-inherit icon`}
                    style={{ marginLeft: "0.7rem" }}
                    onClick={() => {
                        setFieldType((fieldType) =>
                            fieldType === "password" ? "text" : "password"
                        );
                    }}
                ></span>
            ) : (
                ""
            )}
            <label for="input" class="form-label">
                {label}
            </label>
            <hr />
            <hr />
        </div>
    );
}
