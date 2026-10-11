import { redirect } from "next/navigation";

/** The project index lives on the homepage; /work just points there. */
export default function WorkIndex() {
  redirect("/#work");
}
