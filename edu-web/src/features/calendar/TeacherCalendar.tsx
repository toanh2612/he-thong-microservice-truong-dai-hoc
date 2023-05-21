import * as React from "react";
import { BadgeProps, Modal } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { Popover } from "antd";
import { Button, TextField } from "@mui/material";
import { RightDrawer } from "@/components/rightDrawer";
import { TeacherAttendance } from "./TeacherAttendance";

export interface ITeacherCalendar {}

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "Toán Cao Cấp A1 - L01",
          address: "106-TA1",
        },
        // { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
          address: "106-TA1",
        },
        {
          type: "success",
          content: "This is usual event.",
          address: "106-TA1",
        },
        { type: "error", content: "This is error event.", address: "106-TA1" },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
          address: "106-TA1",
        },
        {
          type: "success",
          content: "This is very long usual event。。....",
          address: "106-TA1",
        },
        {
          type: "error",
          content: "This is error event 1.",
          address: "106-TA1",
        },
        {
          type: "error",
          content: "This is error event 2.",
          address: "106-TA1",
        },
        {
          type: "error",
          content: "This is error event 3.",
          address: "106-TA1",
        },
        {
          type: "error",
          content: "This is error event 4.",
          address: "106-TA1",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export default function TeacherCalendar(props: ITeacherCalendar) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [popOpen, setPopOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    try {
      setIsOpen(false);
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleShowDrawer = () => {
    // setPopOpen(false);
    setIsOpen(true);
  };
  const handleClosePopOver = () => {
    setPopOpen(false);
  };
  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpen(newOpen);
  // };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <div key={item.content}>
            <Popover
              style={{
                zIndex: 1,
              }}
              className="p-0"
              trigger={"click"}
              placement="bottom"
              content={
                <>
                  {`Address: ${item.address}`}
                  <Button
                    variant="contained"
                    style={{
                      margin: "1rem 0",
                      display: "block",
                    }}
                    onClick={handleShowDrawer}
                  >
                    ATTENDANCE
                  </Button>
                </>
              }
              title={item.content}
            >
              <Badge
                status={item.type as BadgeProps["status"]}
                text={item.content}
              />{" "}
            </Popover>
          </div>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <RightDrawer title={"Attendance"} open={isOpen} setOpen={setIsOpen}>
        <TeacherAttendance />
      </RightDrawer>
      <Calendar cellRender={cellRender} />;
    </>
  );
}
