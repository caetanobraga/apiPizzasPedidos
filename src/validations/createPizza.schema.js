import * as yup from 'yup'

export const createPizzaSchema =  yup.object().shape({
    name:
        yup
            .string()
            .required("Nome é necessário"),
    url:
        yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Informe endereço da imagem'),
    description:
        yup
            .string()
            .required('Informe a descrição'),
    price:
        yup
            .number()
            .required('Informe o valor'),
    ingredientes:
        yup
            .array()
            .required('Informe os ingredientes!')
})