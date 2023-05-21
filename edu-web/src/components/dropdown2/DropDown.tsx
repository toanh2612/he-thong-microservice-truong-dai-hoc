import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

export default function DropDown<T extends { id: any; name: any }>({
  id,
  list,
  label,
  value,
  setValue,
}: {
  id: string;
  list: T[];
  label: string;
  value: any;
  setValue: Function;
}) {
  const [chosenValue, setChosenValue] = React.useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setChosenValue(event.target.value);
    setValue(id, event.target.value);
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id={chosenValue}
          value={value}
          label={label}
          onChange={handleChange}
          // defaultValue=""
        >
          <MenuItem key="" value="" disabled={true}>
            <em>None</em>
          </MenuItem>
          {list.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
