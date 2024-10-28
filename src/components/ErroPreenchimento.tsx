import * as yup from 'yup';

export const requiredString = (message = 'Campo obrigatório') => yup.string().required(message);
export const requiredEmail = (message = 'Email obrigatório') => yup.string().email('Email inválido').required(message);
export const requiredPassword = (message = 'Senha é obrigatória', min = 6) => 
    yup.string().min(min, `A senha deve ter pelo menos ${min} caracteres`).required(message);
export const requiredConfirmPassword = ( message = 'Senha é obrigatória') => yup.string().oneOf([yup.ref('password')], 'As senhas devem coincidir').required(message)
export const requiredNumber = (message = 'Campo obrigatório', typeErrorMessage = 'Apenas números são permitidos') => 
    yup
        .mixed()
        .test('is-empty', message, value => value !== null && value !== undefined && value !== '')
        .test('is-number', typeErrorMessage, value => !isNaN(value)); 
export const requiredNumberString = (message = 'Campo obrigatório', typeErrorMessage = 'Apenas números são permitidos') =>
  yup
    .string()
    .required(message)
    .matches(/^[0-9]+$/, typeErrorMessage);
