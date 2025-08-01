import * as Yup from "yup";

export const addReadingSchema = Yup.object().shape({
  page: Yup.number()
    .required("Page number is required")
    .min(1, "Page number must be at least 1")
    .integer("Page number must be an integer")
    .typeError("Page number must be a valid number")
    .test('max-pages', 'Page number cannot exceed total pages', function(value) {
      const { parent } = this;
      const totalPages = parent.totalPages;
      if (totalPages && value > totalPages) {
        return this.createError({ message: `Page number cannot exceed ${totalPages}` });
      }
      return true;
    }),
});
