export const validationMessages = {
    PASSWORD_HELP: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    CONFIRM_PASSWORD_ERROR: 'Пароли не совпадают',
};

export const VALIDATE_PASSWORD_SCHEMA = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$');
