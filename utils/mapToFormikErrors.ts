import { ValidateOutput } from "../generated/graphql"

const mapToFormikErrors = (errors: ValidateOutput[]) => {
  //maps the server errors to errors which formik can deal with
  const map: Record<string, string> = {}
  errors.map(e => {
    map[e.field] = e.message
  })
  return map;
}

export default mapToFormikErrors;