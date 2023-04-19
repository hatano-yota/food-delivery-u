import Link from "next/dist/client/link";
import { LinkProps } from "next/link";

interface MyLinkProps extends LinkProps {
  children: React.ReactNode;
}
const MyLink = (props: MyLinkProps) => {
  const { children, ...rest } = props;

  return <Link {...rest}>{children}</Link>;
};

export default MyLink;
