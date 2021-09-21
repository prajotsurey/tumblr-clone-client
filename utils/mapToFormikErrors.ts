import { ValidateOutput } from "../generated/graphql"

const mapToFormikErrors = (errors: ValidateOutput[]) => {
  const map: Record<string, string> = {}
  errors.map(e => {
    map[e.field] = e.message
  })
  return map;
}

export default mapToFormikErrors;