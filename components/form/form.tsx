import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
`;

export const Form = ({
  children,
  defaultValues,
  validationSchema,
  onSubmit,
}) => {
  const hookForm = useForm({
    defaultValues,
    mode: "all",
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  return (
    <FormProvider {...hookForm}>
      <StyledForm onSubmit={hookForm.handleSubmit(onSubmit)}>
        {typeof children === "function" ? children(hookForm) : children}
      </StyledForm>
    </FormProvider>
  );
};
