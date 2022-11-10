import * as yup from 'yup'

export const createSolicitationSchema =  yup.object().shape({
    name_client:
        yup
            .string()
            .required("Nome é necessário"),
    document_client:
        yup
        .number()
        .required('documento necessário'),
    contact_client:
        yup
            .string()
            .required('número de contato'),
    address_client:
        yup
            .string()
            .required('endereço necessário'),
    payment_method:
        yup
            .string()
            .required('Informe forma de pagamento'),
    observation:
        yup
            .string(),
    itens:

    yup.array().of(
        yup.object().shape({
            id:
                yup
                .string()
                .required("id do item é necessário"),
            obs:
                yup
                .string()
                .nullable(),
        })
    )
})