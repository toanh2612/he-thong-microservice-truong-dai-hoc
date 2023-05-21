import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";

interface Props {
  title: string;
  open: boolean | false;
  setOpen: Function;
  children: React.ReactNode;
}

export const RightDrawer: React.FC<Props> = ({
  title,
  open,
  setOpen,
  children,
}: Props) => {
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onChange = (e: RadioChangeEvent) => {
  //   setPlacement(e.target.value);
  // };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        width={"50%"}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //   </Space>
        // }
      >
        <>{children}</>
      </Drawer>
    </>
  );
};
