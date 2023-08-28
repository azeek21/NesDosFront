import useGlobalStore from "@/store";
import Header from "./Header";
import { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
interface ILoayoutProps extends PropsWithChildren {
  user?: User | null;
}
export default function Layout({ children }: ILoayoutProps) {
  return <>{children}</>;
}
