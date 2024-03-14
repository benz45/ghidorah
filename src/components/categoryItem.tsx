import Link from "next/link";

type Props = {
  emoji: String;
  title: String;
};

const CategoryItem = (props: Props) => {
  return (
    <li>
      <Link href={"/"} className="flex whitespace-nowrap items-center py-5">
        <span className="mr-4">{props.emoji}</span>
        <span className="">{props.title}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;
