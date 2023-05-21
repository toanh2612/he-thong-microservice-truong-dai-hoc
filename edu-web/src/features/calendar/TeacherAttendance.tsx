import React, { useState } from "react";
import { Checkbox, Divider, List, Space } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { Button, TextField } from "@mui/material";
import { AttendanceRequest } from "@/types/attendance/AttendanceRequest";

const mockDataStudent = [
  {
    id: "1",
    username: "CT020301",
    firstName: "Do Phu",
    lastName: "Tung",
    class: "CT2C",
  },
  {
    id: "2",
    username: "CT020302",
    firstName: "Nguyen Tuan",
    lastName: "Anh",
    class: "CT2C",
  },
  {
    id: "3",
    username: "CT020303",
    firstName: "Tran Quang",
    lastName: "Canh",
    class: "CT1D",
  },
  {
    id: "4",
    username: "CT020304",
    firstName: "Tran Quang",
    lastName: "Kien",
    class: "CT1D",
  },
  {
    id: "5",
    username: "CT020305",
    firstName: "Tran Quang",
    lastName: "Trung",
    class: "CT1D",
  },
  {
    id: "6",
    username: "CT020306",
    firstName: "Nguyen Quang",
    lastName: "Canh",
    class: "CT1D",
  },
];

export const TeacherAttendance = () => {
  const [checkedList, setCheckedList] = useState<any>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [request, setRequest] = useState<AttendanceRequest[]>([]);

  React.useEffect(() => {
    if (mockDataStudent) {
      const checklistData = mockDataStudent.map((item) => ({
        id: item.id,
        username: item.username,
        firstName: item.firstName,
        lastName: item.lastName,
        class: item.class,
        status: false,
      }));
      setCheckedList(checklistData);
    }
  }, [mockDataStudent]);

  const onChange = (e: any, id: string) => {
    const newData = [...checkedList];
    const index = newData.findIndex((item) => item.id === id);
    newData[index].status = e.target.checked;

    setCheckedList(newData);
    const checkAllCondition = newData.filter((e) => e.status === false);
    setCheckAll(checkAllCondition.length > 0 ? false : true);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const newData = [...checkedList];
    const data = newData.map((item) => ({ ...item, status: !item.status }));
    setCheckedList(data);

    if (checkAll === false) {
      setCheckAll(true);
      const newData = [...checkedList];
      newData.forEach((e) => (e.status = true));
      setCheckedList(newData);
    }
    if (checkAll === true) {
      setCheckAll(false);
      const newData = [...checkedList];
      newData.forEach((e) => (e.status = false));
      setCheckedList(newData);
    }
  };
  const handleSave = () => {
    console.log(1111, checkedList);
  };

  return (
    <div>
      <Space
        style={{
          zIndex: 100,
          display: "block",
        }}
      >
        <Button
          onClick={handleSave}
          variant="contained"
          style={{
            margin: "1rem 0",
          }}
        >
          Save
        </Button>
        <Checkbox
          indeterminate={false}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
      </Space>
      <Divider />

      <div
        className="w-full h-full"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {checkedList.map((item: any) => (
          <div
            style={{
              display: "grid",
              alignItems: "center",
              height: "100%",
              gridTemplateColumns: "repeat(10,minmax(0,1fr))",
              gap: 20,
            }}
            key={item.id}
          >
            <Checkbox
              // checked={item.status}
              checked={item.status}
              id={item.id}
              onChange={(e) => onChange(e, item.id)}
              style={{ gridColumn: "span 1 / span 1" }}
            />
            <div style={{ gridColumn: "span 5 / span 7" }}>
              <label
                htmlFor={item.id}
                style={{
                  cursor: "pointer",
                }}
              >
                {item.username} - {item.firstName} {item.lastName}
              </label>
            </div>
            <div style={{ gridColumn: "span 4 / span 2" }}>
              <TextField
                id="description"
                label="Description"
                autoComplete="off"
                value={"Good"}
                // onChange={handleOnChange}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
