import { defaultHead } from "next/head";
import ListItem from "./ListItem";

export default function ({ title }: { title: string }) {
  return (
    <ListItem
      type="compact"
      className="sticky top-0 z-10 border-none py-1 backdrop-blur-3xl"
    >
      {title}
    </ListItem>
  );
}
