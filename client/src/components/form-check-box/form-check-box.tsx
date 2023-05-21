export function FormCheckBox({name}: {name: string}) {
  return (
    <label>
      <input type="checkbox" name={name}/>
      {name}
    </label>

  )
}
