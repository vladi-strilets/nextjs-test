import { NotFoundLayout } from "@/components/NotFoundLayout";

// TODO: check why it doesnt render this custom error page, when the category path is wrong
export default function NotFound() {
  return <NotFoundLayout item="Category" />;
}
