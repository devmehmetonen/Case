import Icon from "@ant-design/icons";
import { notification } from "antd";
import { ReactComponent as ErrorIcon } from "assets/icons/error.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import { ReactComponent as SuccessIcon } from "assets/icons/success.svg";
import { ReactComponent as WarningIcon } from "assets/icons/warning.svg";

const icons = {
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};
export const openNotificationWith = (
  type: "info" | "warning" | "success" | "error",
  message: string,
  description: string,
  className?: string
) => {
  const options = {
    message,
    description,
    className,
    icon: <Icon component={icons[type]} />,
  };

  notification[type]({
    ...options,
  });
};
