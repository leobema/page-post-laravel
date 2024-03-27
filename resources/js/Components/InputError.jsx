export default function InputError({ message, customMessage, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-red-600 ' + className}>
            {customMessage ? customMessage : message}
        </p>
    ) : null;
}

