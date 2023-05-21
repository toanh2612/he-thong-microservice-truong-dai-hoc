import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DropDownList<T extends { id: any; name: any }>({
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
  const [chosenValue, setChosenValue] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setChosenValue(event.target.value);
    setValue(event.target.value);
  };
  React.useEffect(() => {
    setChosenValue(value != null ? value : "");
  }, [value]);

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id={value}
          value={chosenValue}
          label={label}
          onChange={handleChange}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
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
