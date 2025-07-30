export const renderValidationErrors = (errors, field) => {
    return errors?.[field]?.length && errors[field].map((err, idx) => {
        return <div className="alert alert-danger my-2" key={idx}>
            {err}
        </div>
    });
}