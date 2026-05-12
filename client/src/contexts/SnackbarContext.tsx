import { type ReactNode } from "react";
import { SnackbarProvider, useSnackbar as usk } from "notistack";

export const AppSnackbarProvider = ({ children }: { children: ReactNode }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export const useSnackbar = () => {
  const { enqueueSnackbar } = usk();

  return {
    error: (msg: string) => enqueueSnackbar(msg, { variant: "error" }),
    success: (msg: string) => enqueueSnackbar(msg, { variant: "success" }),
    warning: (msg: string) => enqueueSnackbar(msg, { variant: "warning" }),
  };
};
